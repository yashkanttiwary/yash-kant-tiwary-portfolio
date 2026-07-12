import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders Yash's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Yash Kant Tiwary · Creative Producer &amp; Strategist/i);
  assert.match(html, /Selected Systems &amp; Campaigns/i);
  assert.match(html, /PW IOI MBA Launch/i);
  assert.match(html, /100\+ videos/i);
  assert.match(html, /Yash_Kant_Tiwary_Resume\.pdf/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships accessible portfolio landmarks and controls", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /Skip to portfolio/i);
  assert.match(html, /aria-label="Primary navigation"/i);
  assert.match(html, /aria-label="Creative tools"/i);
  assert.match(html, /id="main-content"/i);
  assert.match(html, /Download résumé/i);
});
