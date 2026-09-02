import { expect, test } from "@playwright/test";

const viewports = [320, 360, 768, 884, 1440] as const;

test.describe.configure({ mode: "serial" });

for (const width of viewports) {
  test(`visual baseline at ${width}px`, async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Visual baselines are captured once in Chromium.");
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(async () => document.fonts.ready);

    const visualFrames = page.locator(".case-media-frame, .playground-frame");
    for (let index = 0; index < (await visualFrames.count()); index += 1) {
      const frame = visualFrames.nth(index);
      await frame.evaluate((element) => element.scrollIntoView({ block: "center" }));
      const image = frame.locator("img").first();
      if (await image.count()) {
        const imageAlt = await image.getAttribute("alt");
        await image.evaluate((element: HTMLImageElement) => {
          element.loading = "eager";
        });
        await expect.poll(
          () => image.evaluate((element: HTMLImageElement) => element.naturalWidth),
          {
            message: `Visual asset did not load: ${imageAlt ?? `frame ${index + 1}`}`,
            timeout: 30_000,
          },
        ).toBeGreaterThan(0);
        await expect(frame.locator(".resilient-media")).toHaveClass(/is-loaded/);
      }
    }

    await expect(page).toHaveScreenshot(`portfolio-${width}.png`, { fullPage: true });
  });
}
