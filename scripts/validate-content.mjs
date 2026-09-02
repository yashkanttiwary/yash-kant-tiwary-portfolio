import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const source = await readFile(join(root, "content/site.ts"), "utf8");
const errors = [];

if (/\bTBD\b/.test(source)) errors.push("content/site.ts still contains TBD copy");
if (/src:\s*null/.test(source)) errors.push("content/site.ts contains a null media source");
if (/href:\s*["']\s*["']/.test(source)) errors.push("content/site.ts contains an empty link");
if (!existsSync(join(root, ".git"))) errors.push("the portfolio is not a standalone Git repository");

const referencedPaths = [...source.matchAll(/(?:src|poster|deck):\s*["'](\/[^"']+)["']/g)].map((match) => match[1]);
for (const publicPath of referencedPaths) {
  if (!existsSync(join(root, "public", publicPath))) errors.push(`missing public asset: ${publicPath}`);
}

const heroBytes = (await stat(join(root, "public/media/hero-loop.mp4"))).size;
if (heroBytes > 6 * 1024 * 1024) errors.push("hero-loop.mp4 exceeds the 6 MB budget");

const ogBytes = (await stat(join(root, "public/og.png"))).size;
if (ogBytes > 300 * 1024) errors.push("og.png exceeds the 300 KB budget");

async function directoryBytes(directory) {
  let total = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    total += entry.isDirectory() ? await directoryBytes(path) : (await stat(path)).size;
  }
  return total;
}

const publicBytes = await directoryBytes(join(root, "public"));
if (publicBytes > 50 * 1024 * 1024) errors.push("public/ exceeds the 50 MB budget");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Content validation passed. ${referencedPaths.length} required assets found; public/ is ${(publicBytes / 1024 / 1024).toFixed(2)} MB.`);
}
