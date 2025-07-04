/* eslint-disable react-hooks/rules-of-hooks */
import type {
  BrowserContext,
  expect,
  ExpectMatcherState,
  Fixtures,
  Locator,
  MatcherReturnType,
  Page,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  test,
} from "@playwright/test";

export type _DocsTypes = typeof expect | typeof test;

/**
 * The options to use when checking links.
 */
export type CheckLinksOptions = {
  /**
   * The options to pass to {@link Page.goto}.
   *
   * @see {@link https://playwright.dev/docs/api/class-page#page-goto}
   */
  gotoOptions?: GotoOptions;

  /**
   * A list of URLs to ignore.
   */
  ignore?: string[];

  /**
   * A list of anchors to ignore.
   *
   * @example `["TODO", "WIP"]` will ignore `#TODO` and `#WIP` anchor links.
   */
  ignoreAnchors?: string[];
};

type GotoOptions = NonNullable<Parameters<Page["goto"]>[1]>;

/**
 * The result of checking links.
 */
export type CheckLinksResult = {
  /**
   * Whether all links are valid.
   */
  ok: boolean;

  /**
   * The URLs that were checked.
   */
  urls: CheckLinksURLResult[];
};

/**
 * The result of checking a single target URL.
 */
export type CheckLinksURLResult = {
  /**
   * The URL that was checked, relative to
   * {@link PlaywrightTestOptions.baseURL | `baseURL`}.
   */
  url: string;

  /**
   * Whether the URL is valid.
   */
  ok: boolean;

  /**
   * The hashes that were checked.
   */
  hashes: CheckLinksHashResult[];
};

/**
 * The result of checking a single hash.
 */
export type CheckLinksHashResult = {
  /**
   * The hash that was checked.
   *
   * Example: `#some-anchor`
   */
  hash: string;

  /**
   * Whether the hash is valid.
   *
   * This is `true` if there is a matching anchor on the page, either from an
   * `<a>` element with a `name` attribute or an element with an `id` attribute.
   */
  ok: boolean;

  /**
   * The URLs that linked to this hash, relative to
   * {@link PlaywrightTestOptions.baseURL | `baseURL`}.
   */
  referrers: string[];
};

/**
 * Supply this to {@link test.extend} to add the `links` fixture.
 *
 * @see {@link https://playwright.dev/docs/api/class-test#test-extend}
 */
export const linkCheckerFixtures: Fixtures<
  { links: LinkCheckerFixture },
  object,
  PlaywrightTestArgs & PlaywrightTestOptions
> = {
  links: async ({ baseURL, context }, use) => {
    if (!baseURL) throw new Error("baseURL is not defined");

    await use(new LinkCheckerFixture(baseURL, context));
  },
};

/**
 * Supply this to {@link expect.extend} to add the `toHaveValidLinks` matcher.
 *
 * @see {@link https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend}
 */
export const linkCheckerMatchers = {
  /**
   * Asserts that the given result from {@link LinkCheckerFixture.checkLinks}
   * has no broken links.
   */
  toHaveValidLinks: function (
    this: ExpectMatcherState,
    result: CheckLinksResult,
  ): MatcherReturnType {
    const name = "toHaveValidLinks";

    return {
      name,
      pass: result.ok,

      message: () => {
        const brokenByReferrer: Record<string, string[]> = {};
        let brokenCount = 0;

        for (const { url, hashes } of result.urls) {
          for (const { hash, ok, referrers } of hashes) {
            if (ok) continue;

            for (const referrer of referrers) {
              ++brokenCount;

              brokenByReferrer[referrer] ??= [];
              brokenByReferrer[referrer].push(`${url}${hash}`);
            }
          }
        }

        const lines = [
          this.utils.matcherHint(name, undefined, undefined, {
            isNot: this.isNot,
          }),
          "",
          `Expected ${this.isNot ? "" : "not "}to have broken links`,
          brokenCount
            ? `Found ${brokenCount} broken links:`
            : "Found no broken links",
        ];

        const brokenByReferrerEntries = Object.entries(brokenByReferrer).sort(
          ([a], [b]) => a.localeCompare(b),
        );

        for (const [referrer, urls] of brokenByReferrerEntries) {
          urls.sort((a, b) => a.localeCompare(b));

          lines.push(`- From ${referrer}:`);

          for (const url of urls) {
            lines.push(`  - To ${url}`);
          }
        }

        return lines.join("\n");
      },
    };
  },
} as const;

/**
 * A fixture that checks links on a page.
 *
 * @example
 * ```ts
 * import { expect as baseExpect, test as baseTest } from "@playwright/test";
 * import { linkCheckerFixtures, linkCheckerMatchers } from "./link-checker";
 *
 * const expect = baseExpect.extend(linkCheckerMatchers);
 * const test = baseTest.extend(linkCheckerFixtures);
 *
 * test("all links are valid", async ({ links }) => {
 *   const result = await links.checkLinks(["/"]);
 *
 *   expect(result).toHaveValidLinks();
 *   expect(JSON.stringify(result, null, 2) + "\n").toMatchSnapshot("links.json");
 * });
 * ```
 */
class LinkCheckerFixture {
  constructor(baseURL: string, context: BrowserContext) {
    this.#baseURL = new URL(baseURL);
    this.#baseURLString = this.#baseURL.toString();
    this.#context = context;
  }

  /**
   * Crawl the given entrypoints and check for broken links.
   *
   * @param entrypoints The entrypoints to crawl, relative to
   *   {@link PlaywrightTestOptions.baseURL | `baseURL`}.
   * @param options The options to use when checking links.
   */
  async checkLinks(
    entrypoints: (URL | string)[],
    options: CheckLinksOptions = {},
  ): Promise<CheckLinksResult> {
    if (entrypoints.length < 1) throw new Error("No entrypoints provided");

    const { gotoOptions = {}, ignore = [], ignoreAnchors = [] } = options;
    const isIgnored: IsIgnored = (u) => ignore.includes(u.toString());

    const results: Record<string, Node> = {};
    for (const entrypoint of entrypoints) {
      this.#addNode(results, this.#normalizeURL(entrypoint, this.#baseURL));
    }

    let unresolved: Node[];
    do {
      unresolved = Object.values(results).filter(({ result }) => !result);

      await Promise.all(
        unresolved.map((node) =>
          this.#crawlNode(gotoOptions, isIgnored, results, node),
        ),
      );
    } while (unresolved.length > 0);

    const resultsArray = Object.values(results);

    if (resultsArray.length < 1) {
      throw new Error("Invariant violation: No results found");
    }

    let ok = true;
    const urls: CheckLinksURLResult[] = [];

    for (const { url, referrers, result } of resultsArray) {
      if (!result) throw new Error(`Invariant violation: ${url} is unresolved`);

      ok &&= result.ok;
      const hashes: CheckLinksHashResult[] = [];

      for (const [hash, hashReferrers] of referrers) {
        const anchor = decodeURIComponent(hash.substring(1));
        const isAnchorIgnored = ignoreAnchors.includes(anchor);

        if (isAnchorIgnored) continue;

        const hashOk =
          result.ok && (anchor === "" || result.anchors.has(anchor));
        ok &&= hashOk;

        hashes.push({
          hash,
          ok: hashOk,
          referrers: Array.from(hashReferrers)
            .map((r) => this.#relativeToBaseURL(r))
            .sort((a, b) => a.localeCompare(b)),
        });
      }

      hashes.sort((a, b) => a.hash.localeCompare(b.hash));

      urls.push({
        url: this.#relativeToBaseURL(url.toString()),
        ok: result.ok,
        hashes,
      });
    }

    urls.sort((a, b) => a.url.localeCompare(b.url));

    return { ok, urls };
  }

  #addNode(results: Record<string, Node>, url: URL, referrer?: URL): Node {
    const resource = this.#resourceURL(url);
    let node = results[resource.toString()];

    if (!node) {
      node = {
        url: resource,
        referrers: new Map(),
      };
      results[resource.toString()] = node;
    }

    if (referrer) this.#addReferrer(node, referrer, url);

    return node;
  }

  #addReferrer(node: Node, referrer: URL, url: URL): void {
    let hashReferrers = node.referrers.get(url.hash);

    if (!hashReferrers) {
      hashReferrers = new Set();
      node.referrers.set(url.hash, hashReferrers);
    }

    hashReferrers.add(referrer.toString());
  }

  async #crawlNode(
    gotoOptions: GotoOptions,
    isIgnored: IsIgnored,
    results: Record<string, Node>,
    node: Node,
  ): Promise<void> {
    const page = await this.#context.newPage();

    try {
      const response = await page.goto(node.url.toString(), gotoOptions);

      if (!response) {
        throw new Error(`Invariant violation: ${node.url} had empty response`);
      }

      const anchors = new Set<string>();
      const [anchorElements, idElements] = await Promise.all([
        page.locator("css=a[name]").all(),
        page.locator("css=[id]").all(),
      ]);
      const anchorNames = await this.#findDefinedAttributes(
        anchorElements,
        "name",
      );
      const ids = await this.#findDefinedAttributes(idElements, "id");

      for (const name of anchorNames) anchors.add(name);
      for (const id of ids) anchors.add(id);

      node.result = { ok: response.ok(), anchors };

      if (!this.#isWithinBaseURL(node.url)) return;

      const links = await page.getByRole("link").all();
      const downloadAttrs = await this.#findAttributes(links, "download");
      const nonDownloadLinks = links.filter((l, i) => downloadAttrs[i] == null);
      const hrefs = await this.#findDefinedAttributes(nonDownloadLinks, "href");

      for (const href of hrefs) {
        const hrefURL = this.#normalizeURL(href, node.url);

        const isHTTP =
          hrefURL.protocol === "http:" || hrefURL.protocol === "https:";

        if (isHTTP && !isIgnored(hrefURL)) {
          this.#addNode(results, hrefURL, node.url);
        }
      }
    } finally {
      await page.close();
    }
  }

  async #findAttributes(
    locators: Locator[],
    attribute: string,
  ): Promise<(string | null)[]> {
    return await Promise.all(locators.map((l) => l.getAttribute(attribute)));
  }

  async #findDefinedAttributes(
    locators: Locator[],
    attribute: string,
  ): Promise<string[]> {
    return (await this.#findAttributes(locators, attribute)).filter(
      (v) => v != null,
    );
  }

  #normalizeURL(url: URL | string, baseURL: URL): URL {
    const normalized = new URL(url, baseURL);
    normalized.searchParams.sort();
    if (normalized.hash === "#") normalized.hash = "";

    return normalized;
  }

  #resourceURL(url: URL): URL {
    const resource = new URL(url);
    resource.hash = "";

    return resource;
  }

  #isWithinBaseURL(url: URL): boolean {
    if (url.origin !== this.#baseURL.origin) return false;

    return (
      url.pathname === this.#baseURL.pathname ||
      url.pathname.startsWith(
        this.#baseURL.pathname.endsWith("/")
          ? this.#baseURL.pathname
          : `${this.#baseURL.pathname}/`,
      )
    );
  }

  #relativeToBaseURL(url: string): string {
    return url.startsWith(this.#baseURLString)
      ? url.substring(this.#baseURLString.length)
      : url;
  }

  readonly #baseURL: URL;
  readonly #baseURLString: string;
  readonly #context: BrowserContext;
}

type Node = {
  url: URL;
  referrers: Map<string, Set<string>>;
  result?: NodeResult;
};

type NodeResult = {
  ok: boolean;
  anchors: Set<string>;
};

type IsIgnored = (url: URL) => boolean;
