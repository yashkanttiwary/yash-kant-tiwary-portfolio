import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const conceptAssets = [
  "/media/hero-loop.mp4",
  "/media/hero-poster.jpg",
  "/media/case-mba-launch.webp",
  "/media/case-skillshala.webp",
  "/media/case-unfair-advantage.webp",
  "/media/case-youtube-channels.webp",
  "/media/case-volume.webp",
  "/media/playground-water.webp",
  "/media/playground-morning.webp",
  "/media/playground-landscape.webp",
  "/media/playground-portrait.webp",
  "/media/playground-travel.webp",
] as const;

test("renders the complete editing-suite portfolio and production metadata", async ({ page, request }) => {
  await page.goto("/?skip=1");
  await expect(page).toHaveTitle(/Yash Kant Tiwary/);
  await expect(page.getByRole("heading", { level: 1, name: "Yash Kant Tiwary" })).toBeVisible();
  await expect(page.locator("main section")).toHaveCount(7);
  await expect(page.locator(".clip")).toHaveCount(5);
  await expect(page.locator(".frame")).toHaveCount(5);
  await expect(page.locator("#wave span")).toHaveCount(180);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.getByText("TBD", { exact: true })).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\.png$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\//);

  const resume = await request.get("/yash-kant-tiwary-resume.pdf");
  expect(resume.ok()).toBeTruthy();
  expect(resume.headers()["content-disposition"]).toContain("attachment");

  for (const asset of conceptAssets) {
    expect((await request.get(asset)).ok(), `missing deployed asset: ${asset}`).toBeTruthy();
  }
});

test("exposes a valid section outline without decorative emphasis semantics", async ({ page }) => {
  await page.goto("/?skip=1");
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(6);
  await expect(page.locator("main section[aria-labelledby]")).toHaveCount(7);
  await expect(page.locator("i, em")).toHaveCount(0);
  await expect(page.locator("#exif")).not.toHaveAttribute("aria-live");

  const invalidLabels = await page.locator("main section").evaluateAll((sections) => sections.filter((section) => {
    const labelId = section.getAttribute("aria-labelledby");
    return !labelId || !document.getElementById(labelId);
  }).length);
  expect(invalidLabels).toBe(0);
});

test("keeps focus inside the opening clapper until it clears", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const slate = page.locator("#slate");
  await expect(slate).toBeVisible();
  await expect(slate).toBeFocused();
  await expect(page.locator("#main")).toHaveJSProperty("inert", true);
  await expect(slate).toBeHidden();
  await expect(page.locator("#main")).toHaveJSProperty("inert", false);
});

test("does not overflow at supported viewport boundaries", async ({ page }) => {
  await page.goto("/?skip=1", { waitUntil: "domcontentloaded" });

  for (const width of [320, 360, 768, 884, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.locator("html").evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(dimensions.scrollWidth, `horizontal overflow at ${width}px`).toBe(dimensions.clientWidth);
  }
});

test("marks clips, preserves marks in the URL, and builds a useful email", async ({ page }) => {
  await page.goto("/?skip=1#work");
  const firstClip = page.locator(".clip").first();
  const mark = firstClip.getByRole("button", { name: "Mark" });
  await mark.click();

  await expect(mark).toHaveAttribute("aria-pressed", "true");
  await expect(mark).toHaveText("Marked");
  await expect(page).toHaveURL(/#marks=0$/);
  await expect(page.locator("#marked")).toHaveClass(/on/);
  await expect(page.locator("#marklist")).toContainText("PW IOI MBA launch");
  await expect(page.locator("#mail")).toHaveAttribute("href", /subject=.*portfolio/i);

  await page.reload();
  await expect(firstClip.getByRole("button", { name: "Marked" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Clear marks" }).click();
  await expect(page.locator("#marked")).not.toHaveClass(/on/);
});

test("opens concept media in an inert viewer, closes with Escape, and returns focus", async ({ page }) => {
  await page.goto("/?skip=1#work");
  const trigger = page.getByRole("button", { name: "Open Skillshala concept clip" });
  await trigger.click();

  const viewer = page.getByRole("dialog", { name: "Viewer" });
  await expect(viewer).toBeVisible();
  await expect(viewer.locator("img")).toHaveAttribute("src", "/media/case-skillshala.webp");
  await expect(viewer.getByRole("button", { name: /Close/ })).toBeFocused();
  await expect(page.locator("#main")).toHaveJSProperty("inert", true);

  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("#main")).toHaveJSProperty("inert", false);
});

test("plays the concept reel in the same production viewer", async ({ page }) => {
  await page.goto("/?skip=1");
  await page.getByRole("button", { name: "Play concept showreel" }).click();
  const viewer = page.getByRole("dialog", { name: "Viewer" });
  const video = viewer.locator("video");
  await expect(viewer).toBeVisible();
  await expect(video).toHaveAttribute("src", "/media/hero-loop.mp4");
  await expect(video).toHaveAttribute("poster", "/media/hero-poster.jpg");
});

test("supports stage, career, and contact-sheet inspectors", async ({ page }) => {
  await page.goto("/?skip=1#system");
  await page.getByRole("button", { name: /05 AI REVIEW/ }).click();
  await expect(page.locator("#stageinfo")).toContainText("flags what's missing");

  await page.getByRole("button", { name: "2025 AI systems" }).click();
  await expect(page.locator("#pathinfo")).toContainText("craft, operations and tooling");

  const frame = page.getByRole("button", { name: "Open concept frame 03" });
  await frame.focus();
  await expect(frame).toHaveAccessibleDescription("24mm, f/8.0, 1/125, ISO 400");
  await expect(page.locator("#exif")).toContainText("24mm");
});

test("opens the searchable command palette and jumps to a result", async ({ page }) => {
  await page.goto("/?skip=1");
  await page.keyboard.press(process.platform === "darwin" ? "Meta+K" : "Control+K");
  const palette = page.getByRole("dialog", { name: "Command palette" });
  const input = palette.getByPlaceholder(/Jump to a section/);
  await expect(palette).toBeVisible();
  await expect(input).toBeFocused();
  await input.fill("Skillshala");
  await expect(palette.getByRole("option")).toHaveCount(2);
  await input.press("Enter");
  await expect(palette).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test("makes the timeline operable by keyboard", async ({ page }) => {
  await page.goto("/?skip=1");
  const timeline = page.getByRole("slider", { name: "Timeline position" });
  await timeline.focus();
  await timeline.press("ArrowRight");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expect.poll(() => timeline.getAttribute("aria-valuenow").then(Number)).toBeGreaterThan(0);
});

test("honors reduced motion without hiding content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#slate")).toBeHidden();
  await expect(page.locator(".rv").first()).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: "Play forward" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test("falls back intelligibly when viewer media fails", async ({ page }) => {
  await page.goto("/?skip=1#work");
  const trigger = page.getByRole("button", { name: "Open Skillshala concept clip" });
  await trigger.evaluate((element) => element.setAttribute("data-src", "/media/missing-concept.webp"));
  await trigger.click();
  await expect(page.locator("#lbmedia")).toContainText("Media could not be loaded");
  await expect(page.locator("#toast")).toContainText("Media unavailable");
});

test("has no automatically detectable WCAG A/AA violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?skip=1");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("serves a useful custom 404", async ({ page }) => {
  await page.goto("/missing-cut");
  await expect(page.getByRole("heading", { name: "This cut does not exist." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to the portfolio" })).toHaveAttribute("href", "/");
});
