import { validateBabySharkUpdates } from "./lib/loadArchiveData.mjs";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

// 本物の活動記録は増やさず、検証ロジックだけを一時データで確認する。
const base = {
  date: "2024-03-01",
  dateLabel: "2024年3月1日",
  title: "テスト",
  body: ["本文"]
};

function expectSuccess(name, updates) {
  validateBabySharkUpdates(updates);
  console.log(`OK: ${name}`);
}

function expectFailure(name, updates, messageIncludes) {
  try {
    validateBabySharkUpdates(updates);
    throw new Error(`expected failure: ${name}`);
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes(messageIncludes)) {
      throw new Error(
        `unexpected error for ${name}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
    console.log(`OK: ${name} -> ${error.message}`);
  }
}

expectSuccess("異なるidで同じdateの2件", [
  { ...base, id: "a", sourceUrl: "https://example.com/a" },
  { ...base, id: "b", sourceUrl: "https://example.com/b" }
]);

expectFailure(
  "同じidの2件",
  [
    { ...base, id: "same", sourceUrl: "https://example.com/a" },
    { ...base, id: "same", sourceUrl: "https://example.com/b" }
  ],
  'duplicate update id "same"'
);

expectFailure(
  "同じsourceUrlの2件",
  [
    { ...base, id: "a", sourceUrl: "https://example.com/shared" },
    { ...base, id: "b", date: "2024-03-02", sourceUrl: "https://example.com/shared" }
  ],
  "duplicate update sourceUrl"
);

expectSuccess("InstagramプロフィールURLはStoryごとに再利用できる", [
  { ...base, id: "profile-a", sourceUrl: "https://www.instagram.com/yoppy_777" },
  {
    ...base,
    id: "profile-b",
    date: "2024-03-02",
    sourceUrl: "https://www.instagram.com/yoppy_777"
  }
]);

expectSuccess("sourceUrl未設定同士は重複扱いしない", [
  { ...base, id: "a" },
  { ...base, id: "b", date: "2024-03-02" }
]);

expectFailure(
  "不正なdate",
  [{ ...base, id: "bad-date", date: "2024/03/01" }],
  "YYYY-MM-DD"
);

expectFailure(
  "空のbody",
  [{ ...base, id: "empty-body", body: [] }],
  "body must not be empty"
);

expectFailure(
  "httpのsourceUrl",
  [{ ...base, id: "http-url", sourceUrl: "http://example.com/x" }],
  "https://"
);

const server = await createServer({
  appType: "custom",
  server: { middlewareMode: true }
});

try {
  const { babySharkLive, getBabySharkTourDates2026 } = await server.ssrLoadModule(
    "/src/data/babySharkLive.ts"
  );
  const { events } = await server.ssrLoadModule("/src/data/events.ts");
  const { news, latestNewsListingDate } = await server.ssrLoadModule("/src/data/news.ts");
  const { socialLinks } = await server.ssrLoadModule("/src/data/links.ts");
  const { siteUpdates } = await server.ssrLoadModule("/src/data/siteUpdates.ts");
  const { BabySharkLivePage } = await server.ssrLoadModule(
    "/src/pages/BabySharkLivePage.tsx"
  );

  const instagramUrl = socialLinks.find((link) => link.handle === "@yoppy_777")?.url;
  assert.equal(instagramUrl, "https://www.instagram.com/yoppy_777");

  const storyUpdate = babySharkLive.updates.find(
    (update) => update.id === "baby-shark-instagram-story-2026-08-21"
  );
  assert.ok(storyUpdate, "8/21 Instagram Storyの活動記録が無い");
  assert.equal(storyUpdate.sourceUrl, instagramUrl);
  assert.equal(storyUpdate.sourceLabel, "優花子さんのInstagramを見る");
  assert.doesNotMatch(storyUpdate.sourceUrl, /\/stories\//);
  assert.doesNotMatch(storyUpdate.sourceLabel, /元投稿|ストーリーを見る/);
  assert.deepEqual(
    storyUpdate.videos?.map((video) => video.src),
    [
      "/videos/baby-shark/baby-shark-instagram-story-2026-08-21-01.mp4",
      "/videos/baby-shark/baby-shark-instagram-story-2026-08-21-02.mp4"
    ],
    "Story動画の順番が変わっている"
  );
  storyUpdate.videos?.forEach((video) => {
    assert.ok(
      existsSync(new URL(`../public${video.src}`, import.meta.url)),
      `Story動画が無い: public${video.src}`
    );
  });

  assert.deepEqual(
    getBabySharkTourDates2026(new Date("2026-08-21T12:00:00+09:00")).map(
      (item) => item.id
    ),
    [
      "ebina-2026-05-30",
      "omiya-2026-06-07",
      "ogaki-2026-08-22",
      "fukuyama-2026-09-19",
      "kurume-2026-09-20"
    ]
  );

  const expectedEvents = [
    ["babyshark-live-2026-08-22", "2026-08-22T12:30:00+09:00"],
    ["babyshark-live-2026-09-19", "2026-09-19T11:30:00+09:00"],
    ["babyshark-live-2026-09-20", "2026-09-20T11:30:00+09:00"]
  ];
  for (const [id, startAt] of expectedEvents) {
    const event = events.find((item) => item.id === id);
    assert.ok(event, `${id} がevents.tsに無い`);
    assert.equal(event.startAt, startAt);
  }

  assert.equal(news[0]?.date, "2026.8.21");
  assert.equal(news[0]?.url, instagramUrl);
  assert.match(news[0]?.text ?? "", /大垣・福山・久留米/);
  assert.equal(latestNewsListingDate(news), "2026.8.21");
  assert.equal(
    siteUpdates.filter(
      (update) =>
        update.date === "2026.8.21" && update.sourceUrl === instagramUrl
    ).length,
    1,
    "8/21 StoryがLatest Updatesに重複している"
  );
  assert.equal(
    siteUpdates[0]?.sourceUrl,
    instagramUrl,
    "8/21 StoryがLatest Updatesの先頭に出ていない"
  );

  const html = renderToStaticMarkup(createElement(BabySharkLivePage));
  assert.equal((html.match(/<video/g) ?? []).length, 2);
  assert.equal((html.match(/controls=""/g) ?? []).length, 2);
  assert.equal((html.match(/playsinline=""/g) ?? []).length, 2);
  assert.equal((html.match(/preload="metadata"/g) ?? []).length, 2);
  assert.doesNotMatch(html, /<video[^>]+(?:autoplay|loop|muted)/i);
  assert.ok(
    html.indexOf("baby-shark-instagram-story-2026-08-21-01.mp4") <
      html.indexOf("baby-shark-instagram-story-2026-08-21-02.mp4")
  );
  assert.match(html, /優花子さんのInstagramを見る/);
  assert.match(html, /Instagram（@yoppy_777）へ/);
  assert.doesNotMatch(html, /元ストーリーを見る/);
} finally {
  await server.close();
}

console.log("baby-shark-updates validation tests OK");
