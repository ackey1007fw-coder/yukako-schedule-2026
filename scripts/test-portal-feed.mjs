import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { generatePortalFeed, loadPortalFeedModule } from "./generate-portal-feed.mjs";

const fixedGeneratedAt = "2026-08-18T00:00:00.000Z";
const first = await generatePortalFeed(fixedGeneratedAt);
const second = await generatePortalFeed(fixedGeneratedAt);
const { createNewsCandidate, selectFeedCandidates, toPortalImageUrl } =
  await loadPortalFeedModule();
const offsetIsoDatetime =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const siteOrigin = new URL(first.siteUrl).origin;

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
  assert.match(item.publishedAt, offsetIsoDatetime);
  assert.ok(!Number.isNaN(Date.parse(item.publishedAt)));
  if (item.sourceUrl) assert.doesNotThrow(() => new URL(item.sourceUrl));
  if (item.image) {
    const imageUrl = new URL(item.image);
    assert.equal(imageUrl.origin, siteOrigin, "feed images must use the Yukako portal origin");
  }
  for (const field of ["startsAt", "updatedAt", "endsAt"]) {
    if (!item[field]) continue;
    assert.match(item[field], offsetIsoDatetime, `${field} must include a timezone offset`);
    assert.ok(!Number.isNaN(Date.parse(item[field])));
  }
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
assert.equal(
  first.items.find((item) => item.id === "yukako:event:babyshark-live-2026-09-19")
    ?.startsAt,
  "2026-09-19T11:30:00+09:00"
);
assert.equal(
  first.items.find((item) => item.id === "yukako:event:babyshark-live-2026-09-20")
    ?.startsAt,
  "2026-09-20T11:30:00+09:00"
);
const babySharkStory = first.items.find(
  (item) => item.type === "news" && item.title.includes("大垣・福山・久留米")
);
assert.equal(babySharkStory?.sourceUrl, "https://www.instagram.com/yoppy_777");
assert.equal(babySharkStory?.publishedAt, "2026-08-21T00:00:00+09:00");

const lateListedNews = first.items.find(
  (item) => item.sourceUrl === "https://x.com/mokoopy/status/2012824363620331966"
);
assert.equal(lateListedNews?.publishedAt, "2026-08-18T00:00:00+09:00");

assert.equal(
  toPortalImageUrl("/images/example.jpg"),
  "https://yukako-schedule-2026.vercel.app/images/example.jpg"
);
assert.equal(toPortalImageUrl("https://example.com/hotlink.jpg"), undefined);

const reusableProfileNews = [
  createNewsCandidate({
    date: "2026.8.21",
    label: "Instagram",
    text: "Story A",
    url: "https://www.instagram.com/yoppy_777"
  }),
  createNewsCandidate({
    date: "2026.8.22",
    label: "Instagram",
    text: "Story B",
    url: "https://www.instagram.com/yoppy_777"
  })
].filter(Boolean);
assert.equal(reusableProfileNews.length, 2);
assert.notEqual(reusableProfileNews[0].item.id, reusableProfileNews[1].item.id);
assert.equal(
  selectFeedCandidates(
    reusableProfileNews,
    "2026-08-23T00:00:00.000Z"
  ).length,
  2,
  "InstagramプロフィールURLを再利用した別Storyがdedupeで消えている"
);

const fixtureCandidate = ({ dataset, id, publishedAt, startsAt }) => ({
  dataset,
  dedupeKeys: [`fixture:${id}`],
  item: {
    id,
    personId: "yukako",
    type:
      dataset === "events"
        ? "schedule"
        : dataset === "archive"
          ? "story"
          : dataset === "news"
            ? "news"
            : "update",
    title: id,
    url: "https://yukako-schedule-2026.vercel.app/",
    publishedAt,
    ...(startsAt ? { startsAt } : {})
  }
});

// 14:00 JST時点で開始済みでも同一日なので保護される。より新しく掲載された過去予定が
// 5件あっても、eventsの過去枠4件とは別に20件feedへ残す。
const sameDayStartedEvent = fixtureCandidate({
  dataset: "events",
  id: "yukako:event:fixture-same-day",
  publishedAt: "2025-01-01T00:00:00+09:00",
  startsAt: "2026-08-22T12:30:00+09:00"
});
const newerPastEvents = Array.from({ length: 5 }, (_, index) =>
  fixtureCandidate({
    dataset: "events",
    id: `yukako:event:fixture-past-${index}`,
    publishedAt: `2026-08-${pad(18 - index)}T00:00:00+09:00`,
    startsAt: `2026-08-0${index + 1}T10:00:00+09:00`
  })
);
const fillerCandidates = [
  ...Array.from({ length: 8 }, (_, index) =>
    fixtureCandidate({
      dataset: "siteUpdates",
      id: `yukako:update:fixture-${index}`,
      publishedAt: `2026-08-${pad(20 - index)}T00:00:00+09:00`
    })
  ),
  ...Array.from({ length: 5 }, (_, index) =>
    fixtureCandidate({
      dataset: "news",
      id: `yukako:news:fixture-${index}`,
      publishedAt: `2026-08-${pad(20 - index)}T00:00:00+09:00`
    })
  ),
  ...Array.from({ length: 3 }, (_, index) =>
    fixtureCandidate({
      dataset: "archive",
      id: `yukako:story:fixture-${index}`,
      publishedAt: `2026-08-${pad(20 - index)}T00:00:00+09:00`
    })
  )
];
const fixtureSelection = selectFeedCandidates(
  [sameDayStartedEvent, ...newerPastEvents, ...fillerCandidates],
  "2026-08-22T05:00:00.000Z"
);
assert.equal(fixtureSelection.length, 20);
assert.ok(
  fixtureSelection.some(({ item }) => item.id === sameDayStartedEvent.item.id),
  "today/future event must survive newer published past events and the 20-item cap"
);
assert.equal(
  fixtureSelection.filter(({ dataset }) => dataset === "events").length,
  5,
  "the 4-event source limit applies only to past events"
);

// 今日・未来予定だけで20件を超える場合は、JST基準で開始が近い20件を残す。
const tooManyUpcomingEvents = Array.from({ length: 21 }, (_, index) =>
  fixtureCandidate({
    dataset: "events",
    id: `yukako:event:fixture-upcoming-${index}`,
    publishedAt: `2026-08-${pad(20 - (index % 10))}T00:00:00+09:00`,
    startsAt: `2026-08-22T${pad(index)}:00:00+09:00`
  })
);
const cappedUpcomingSelection = selectFeedCandidates(
  tooManyUpcomingEvents,
  "2026-08-21T15:00:00.000Z"
);
assert.equal(cappedUpcomingSelection.length, 20);
assert.ok(
  cappedUpcomingSelection.some(({ item }) => item.id.endsWith("upcoming-0"))
);
assert.ok(
  !cappedUpcomingSelection.some(({ item }) => item.id.endsWith("upcoming-20"))
);

const distPath = path.resolve(import.meta.dirname, "..", "dist", "portal-feed.json");
try {
  const builtFeed = JSON.parse(await readFile(distPath, "utf8"));
  const regeneratedBuiltFeed = await generatePortalFeed(builtFeed.generatedAt);
  assert.deepEqual(
    builtFeed.items.map((item) => item.id),
    regeneratedBuiltFeed.items.map((item) => item.id),
    "dist feed IDs must match a regenerated feed"
  );
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

console.log(`portal feed test: ${first.items.length} items, stable and contract-valid`);

function pad(value) {
  return String(value).padStart(2, "0");
}
