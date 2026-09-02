import { expect, test } from "@playwright/test";

const viewports = [320, 360, 768, 884, 1440] as const;
const visualAssets = [
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

test.describe.configure({ mode: "serial" });

for (const width of viewports) {
  test(`visual baseline at ${width}px`, async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Visual baselines are captured once in Chromium.");
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/?skip=1", { waitUntil: "networkidle" });
    await page.evaluate(async () => document.fonts.ready);

    const loaded = await page.evaluate(async (assets) => Promise.all(assets.map((src) => new Promise<boolean>((resolve) => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = src;
    }))), visualAssets);
    expect(loaded.every(Boolean), "one or more visual assets failed to preload").toBeTruthy();

    await expect(page).toHaveScreenshot(`portfolio-${width}.png`, { fullPage: true });
  });
}
