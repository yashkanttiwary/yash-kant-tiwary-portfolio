import { expect, test } from "@playwright/test";

test("stays inside the initial-load performance budget", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Performance budgets use one stable browser engine.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
      transferredBytes: resources.reduce((total, resource) => total + resource.transferSize, 0),
      resourceCount: resources.length,
    };
  });

  expect(metrics.domContentLoaded).toBeLessThan(5_000);
  expect(metrics.transferredBytes).toBeLessThan(4 * 1024 * 1024);
  expect(metrics.resourceCount).toBeLessThan(80);
});
