import { expect, test } from "playwright/test";

test("has a heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /software/i })).toBeVisible();
});
