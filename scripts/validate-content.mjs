import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const html = await readFile(join(root, "public/portfolio.html"), "utf8");
const errors = [];

if (/\[\s*value\s*\]/i.test(html)) errors.push("portfolio.html contains unfinished launch copy");
if (/href=["']#["']/.test(html)) errors.push("portfolio.html contains a dead # link");
if (/(?:localStorage|sessionStorage)/.test(html)) errors.push("portfolio.html uses unsupported browser storage");
if (!existsSync(join(root, ".git"))) errors.push("the portfolio is not a standalone Git repository");

const blankTargetLinks = [...html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gi)];
for (const [link] of blankTargetLinks) {
  if (!/rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/i.test(link)) {
    errors.push(`external link is missing noopener noreferrer: ${link.slice(0, 100)}`);
  }
}

const attributePaths = [...html.matchAll(/(?:data-src|data-poster|href|src)=["'](\/[^"'#?]+)["']/g)].map((match) => match[1]);
const cssPaths = [...html.matchAll(/url\(["']?(\/[^"')?#]+)["']?\)/g)].map((match) => match[1]);
const referencedPaths = [...new Set([...attributePaths, ...cssPaths])].filter((publicPath) => !publicPath.startsWith("/_vercel/"));

for (const publicPath of referencedPaths) {
  if (!existsSync(join(root, "public", publicPath))) errors.push(`missing public asset: ${publicPath}`);
}

const conceptMediaCount = [...html.matchAll(/class=["'][^"']*(?:monitor|thumb|frame|ba)(?:\s|["'])/g)].length;
if (conceptMediaCount !== 10) errors.push(`expected 10 supplied visual placements, found ${conceptMediaCount}`);
if ([...html.matchAll(/class=["'][^"']*clip\s/gi)].length !== 5) errors.push("expected 5 work clips");
if ([...html.matchAll(/class=["'][^"']*frame["']/gi)].length !== 5) errors.push("expected 5 contact-sheet frames");

const heroBytes = (await stat(join(root, "public/media/hero-loop.mp4"))).size;
if (heroBytes > 6 * 1024 * 1024) errors.push("hero-loop.mp4 exceeds the 6 MB budget");

const ogBytes = (await stat(join(root, "public/og-loot.png"))).size;
if (ogBytes > 350 * 1024) errors.push("og-loot.png exceeds the 350 KB budget");

async function directoryBytes(directory) {
  let total = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    total += entry.isDirectory() ? await directoryBytes(entryPath) : (await stat(entryPath)).size;
  }
  return total;
}

const publicBytes = await directoryBytes(join(root, "public"));
if (publicBytes > 50 * 1024 * 1024) errors.push("public/ exceeds the 50 MB budget");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Portfolio validation passed. ${referencedPaths.length} required assets and ${conceptMediaCount} concept placements found; public/ is ${(publicBytes / 1024 / 1024).toFixed(2)} MB.`);
}
