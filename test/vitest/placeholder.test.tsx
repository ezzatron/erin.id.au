import { page } from "@vitest/browser/context";
import { beforeEach, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import Home from "../../src/app/page";

beforeEach(() => {
  render(<Home />);
});

it("has a heading", async () => {
  await expect
    .element(page.getByRole("heading", { name: /it works!/i }))
    .toBeVisible();
});
