import { expect as baseExpect, test as baseTest } from "@playwright/test";
import { linkCheckerFixtures, linkCheckerMatchers } from "./link-checker";

const expect = baseExpect.extend(linkCheckerMatchers);
const test = baseTest.extend(linkCheckerFixtures);

test.use({ javaScriptEnabled: false });

test("all links are valid", async ({ links }) => {
  const result = await links.checkLinks(["/about", "/projects"], {
    ignore: ["https://linkedin.com/in/ezzatron"],
    ignoreAnchors: ["TODO"],
  });

  expect(result).toHaveValidLinks();
  expect(JSON.stringify(result, null, 2) + "\n").toMatchSnapshot("links.json");
});
