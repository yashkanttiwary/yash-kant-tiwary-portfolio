import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders the supplied portfolio composition", async ({ page, request }) => {
  await page.goto("/?skip=1");
  await expect(page).toHaveTitle(/Yash Kant Tiwary/);
  await expect(page.getByRole("heading", { level: 1, name: "Yash Kant Tiwary" })).toBeVisible();
  await expect(page.locator("main section")).toHaveCount(7);
  await expect(page.locator(".clip")).toHaveCount(5);
  await expect(page.locator(".frame")).toHaveCount(5);
  await expect(page.getByText("The Return Loop", { exact: false }).first()).toBeVisible();
  expect((await request.get("/yash-kant-tiwary-resume.pdf")).ok()).toBeTruthy();
});

test("keeps its route, prediction, and campaign decisions interactive", async ({ page }) => {
  await page.goto("/?skip=1");
  await page.getByRole("button", { name: /craft.*show me the work/i }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);

  await page.locator("#pred-scale").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "About 50" }).click();
  await expect(page.locator("#verdict-scale")).toContainText("100 or more");
  await expect(page.locator("#readout")).not.toHaveClass(/veiled/);

  await page.locator("#choice-skill").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Build one content engine" }).click();
  await expect(page.locator("#answer-skill")).toContainText("That is what he did");

  await page.locator("#pred-turn").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "About half a day" }).click();
  await expect(page.locator("#verdict-turn")).toContainText("Correct");
});

test("supports the work flag and forwardable email flow", async ({ page }) => {
  await page.goto("/?skip=1#work");
  const clip = page.locator(".clip").first();
  const flag = clip.locator("[data-mark]");
  await flag.click();
  await expect(flag).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#markcount")).toHaveText("1");
  await expect(page.locator("#mail")).toHaveAttribute("href", /100%2B|100\+/);
});

test("operates the production system and reading controls", async ({ page }) => {
  await page.goto("/?skip=1#system");
  const stage = page.getByRole("button", { name: /Stage 5, AI review/i });
  await stage.focus();
  await stage.press("Enter");
  await expect(page.locator("#stageinfo")).toContainText("flags what is missing");

  await page.getByRole("button", { name: /Reading/ }).click();
  await expect(page.locator("body")).toHaveClass(/reading/);
  await page.getByRole("button", { name: /Calm/ }).click();
  await expect(page.locator("body")).toHaveClass(/calm/);
});

test("does not overflow at supported viewport boundaries", async ({ page }) => {
  await page.goto("/?skip=1");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const size = await page.locator("html").evaluate((el) => ({ client: el.clientWidth, scroll: el.scrollWidth }));
    expect(size.scroll, `horizontal overflow at ${width}px`).toBe(size.client);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#mstrip")).toBeVisible();
  await expect(page.locator(".rail")).toBeHidden();
  await expect(page.getByRole("button", { name: "Play forward" })).toBeVisible();
});

test("has no automatically detectable WCAG A or AA violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?skip=1");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("serves the custom not-found page", async ({ page }) => {
  await page.goto("/missing-cut");
  await expect(page.getByRole("heading", { name: "This cut does not exist." })).toBeVisible();
});
