import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { generatePortalFeed } from "./generate-portal-feed.mjs";

const fixedGeneratedAt = "2026-08-18T00:00:00.000Z";
const first = await generatePortalFeed(fixedGeneratedAt);
const second = await generatePortalFeed(fixedGeneratedAt);

assert.equal(first.version, 1);
assert.equal(first.personId, "yukako");
assert.equal(first.siteUrl, "https://yukako-schedule-2026.vercel.app/");
assert.equal(first.generatedAt, fixedGeneratedAt);
assert.ok(first.items.length > 0 && first.items.length <= 20);
assert.deepEqual(
  first.items.map((item) => item.id),
  second.items.map((item) => item.id),
  "stable IDs must not change between builds"
);

const ids = new Set();
for (const [index, item] of first.items.entries()) {
  assert.match(item.id, /^yukako:(?:news|update|event|story):/);
  assert.equal(item.personId, "yukako");
  assert.ok(["news", "story", "schedule", "event", "update"].includes(item.type));
  assert.ok(item.title);
  assert.doesNotThrow(() => new URL(item.url));
  assert.ok(!Number.isNaN(Date.parse(item.publishedAt)));
  if (item.sourceUrl) assert.doesNotThrow(() => new URL(item.sourceUrl));
  if (item.image) assert.doesNotThrow(() => new URL(item.image));
  if (item.startsAt) assert.ok(!Number.isNaN(Date.parse(item.startsAt)));
  assert.equal(item.endsAt, undefined, "unverified event end times must not be emitted");
  assert.ok(!ids.has(item.id), `duplicate id: ${item.id}`);
  ids.add(item.id);

  if (index > 0) {
    assert.ok(
      Date.parse(first.items[index - 1].publishedAt) >= Date.parse(item.publishedAt),
      "items must be newest first"
    );
  }
}

for (const prefix of ["yukako:update:", "yukako:news:", "yukako:event:", "yukako:story:"]) {
  assert.ok(first.items.some((item) => item.id.startsWith(prefix)), `${prefix} source is missing`);
}

const babySharkOgaki = first.items.find(
  (item) => item.id === "yukako:event:babyshark-live-2026-08-22"
);
assert.equal(babySharkOgaki?.startsAt, "2026-08-22T12:30:00+09:00");

const lateListedNews = first.items.find(
  (item) => item.sourceUrl === "https://x.com/mokoopy/status/2012824363620331966"
);
assert.equal(lateListedNews?.publishedAt, "2026-08-18T00:00:00+09:00");

const distPath = path.resolve(import.meta.dirname, "..", "dist", "portal-feed.json");
try {
  const builtFeed = JSON.parse(await readFile(distPath, "utf8"));
  assert.deepEqual(
    builtFeed.items.map((item) => item.id),
    first.items.map((item) => item.id),
    "dist feed IDs must match a regenerated feed"
  );
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

console.log(`portal feed test: ${first.items.length} items, stable and contract-valid`);
