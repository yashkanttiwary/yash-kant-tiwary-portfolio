import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders complete launch-safe content and metadata", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Yash Kant Tiwary/);
  await expect(page.getByRole("heading", { level: 1, name: "Yash Kant Tiwary" })).toBeVisible();
  await expect(page.locator(".placeholder")).toHaveCount(0);
  await expect(page.getByText("TBD", { exact: true })).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\.png$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https?:\/\//);

  const resume = await request.get("/yash-kant-tiwary-resume.pdf");
  expect(resume.ok()).toBeTruthy();
  expect(resume.headers()["content-disposition"]).toContain("attachment");
});

test("does not overflow at supported viewport boundaries", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  for (const width of [320, 360, 768, 884, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.locator("html").evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(dimensions.scrollWidth, `horizontal overflow at ${width}px`).toBe(dimensions.clientWidth);
  }
});

test("keeps the system readable at the former tablet failure point", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/#system");
  const labels = page.locator(".system-flow-node > span:last-child");
  await expect(labels).toHaveCount(7);
  const fontSizes = await labels.evaluateAll((elements) => elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)));
  expect(Math.min(...fontSizes)).toBeGreaterThanOrEqual(15);
});

test("opens an inert modal, closes with Escape, and returns focus", async ({ page }) => {
  await page.goto("/#work");
  const trigger = page.getByRole("button", { name: "Play PW IOI MBA launch" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "PW IOI MBA launch" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/Concept visual only/)).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("provides a reduced-motion still and an explicit play control", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-media video")).toHaveCSS("display", "none");
  await expect(page.locator(".hero-reduced-still")).toBeVisible();
  await expect(page.getByRole("button", { name: "Play concept reel" })).toBeVisible();
});

test("falls back intelligibly when a visual request fails", async ({ page }) => {
  await page.route("**/*", async (route) => {
    if (route.request().url().includes("case-mba-launch")) await route.abort();
    else await route.continue();
  });
  await page.goto("/#work");
  await expect(page.getByRole("img", { name: /live event.*currently unavailable/i })).toBeVisible();
});

test("has no automatically detectable serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("serves a useful custom 404", async ({ page }) => {
  await page.goto("/missing-cut");
  await expect(page.getByRole("heading", { name: "This cut does not exist." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to the portfolio" })).toHaveAttribute("href", "/");
});
