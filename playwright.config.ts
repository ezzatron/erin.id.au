import { defineConfig, devices } from "@playwright/test";

const isCI = process.env.CI === "true";
const isDefaultProjects =
  process.argv.some((a) => a === "test") &&
  !process.argv.some((a) => a.match(/^--project\b/));

const envBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = envBaseURL || "http://localhost:7357";

export default defineConfig({
  testDir: "test/playwright",
  outputDir: "artifacts/playwright/output",
  fullyParallel: true,
  retries: 1,
  timeout: isCI ? 30_000 : 10_000,
  reporter: [
    ["dot"],
    [
      "html",
      {
        open: "never",
        outputFolder: "artifacts/playwright/report/html",
      },
    ],
  ],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: envBaseURL
    ? undefined
    : {
        command: "make run-playwright-test",
        url: "http://localhost:7357/robots.txt",
        reuseExistingServer: false,
        timeout: 60 * 1000, // 60 seconds
        gracefulShutdown: { signal: "SIGINT", timeout: 500 },
      },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    ...(isDefaultProjects
      ? []
      : [
          {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
          },
          {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
          },
          {
            name: "links",
            testDir: "test/links",
            timeout: isCI ? 300_000 : 30_000,
            retries: 0,
            snapshotPathTemplate: "{testDir}/{arg}{ext}",
            use: { ...devices["Desktop Chrome"] },
          },
        ]),
  ],
});
