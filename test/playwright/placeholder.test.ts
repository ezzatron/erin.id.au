import { expect, test } from "playwright/test";

test("has a heading", async ({ page }) => {
  await page.goto("/about");

  await expect(
    page.getByRole("heading", { name: /making software for the love of it/i }),
  ).toBeVisible();
});
