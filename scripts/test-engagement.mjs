import assert from "node:assert/strict";
import {
  addShareUtm,
  getRelatedGojetUpdates,
  getStableGojetAnchorId,
} from "../src/lib/engagement.ts";

const current = {
  anchorId: "current",
  date: "2026.7.20 12:00",
  title: "現在の投稿",
  postUrl: "https://x.com/example/status/1",
  roleTags: ["B班：JET", "作品A"],
};
const candidates = [
  current,
  {
    anchorId: "two-tags",
    date: "2026.7.18 10:00",
    title: "共通タグ2件",
    postUrl: "https://x.com/example/status/2",
    roleTags: ["B班：JET", "作品A"],
  },
  {
    anchorId: "newer",
    date: "2026.7.21 10:00",
    title: "新しい関連投稿",
    postUrl: "https://x.com/example/status/3",
    roleTags: ["B班：JET"],
  },
  {
    anchorId: "older",
    date: "2026.7.19 10:00",
    title: "古い関連投稿",
    postUrl: "https://x.com/example/status/4",
    roleTags: ["B班：JET"],
  },
  {
    anchorId: "older",
    date: "2026.7.19 10:00",
    title: "重複データ",
    postUrl: "https://x.com/example/status/4?duplicate=1",
    roleTags: ["B班：JET"],
  },
  {
    anchorId: "unrelated",
    date: "2026.7.22 10:00",
    title: "無関係",
    postUrl: "https://x.com/example/status/5",
    roleTags: ["C班：早紀"],
  },
];

const related = getRelatedGojetUpdates(current, candidates);
assert.equal(related.length, 3, "関連投稿は最大3件");
assert.ok(related.every(({ candidate }) => candidate.anchorId !== current.anchorId), "自分自身を除外");
assert.equal(new Set(related.map(({ candidate }) => candidate.anchorId)).size, related.length, "重複を除外");
assert.equal(related[0].candidate.anchorId, "two-tags", "共通タグ数を優先");
assert.deepEqual(
  related.slice(1).map(({ candidate }) => candidate.anchorId),
  ["newer", "older"],
  "同じ関連度なら新しい順",
);
assert.deepEqual(
  getRelatedGojetUpdates({ ...current, roleTags: ["該当なし"] }, candidates),
  [],
  "関連投稿がなければ空配列",
);
assert.equal(
  getStableGojetAnchorId({ ...current, anchorId: undefined }),
  "gojet-post-1",
  "元投稿URLから安定アンカーを生成",
);

const canonical = "https://yukako-schedule-2026.vercel.app/archive/sample?ref=keep#section";
const tracked = addShareUtm(
  "https://yukako-schedule-2026.vercel.app/archive/sample?ref=keep&utm_source=old&utm_medium=old#section",
  "archive_sample",
);
const trackedUrl = new URL(tracked);
assert.equal(trackedUrl.searchParams.get("ref"), "keep", "既存クエリを保持");
assert.equal(trackedUrl.hash, "#section", "既存ハッシュを保持");
assert.equal(trackedUrl.searchParams.get("utm_source"), "x");
assert.equal(trackedUrl.searchParams.get("utm_medium"), "social");
assert.equal(trackedUrl.searchParams.get("utm_campaign"), "yukako_portal");
assert.equal(trackedUrl.searchParams.get("utm_content"), "archive_sample");

const replaced = new URL(addShareUtm("https://example.com/?utm_source=old&utm_source=older&utm_campaign=old", "home_share"));
assert.deepEqual(replaced.searchParams.getAll("utm_source"), ["x"], "UTMを重複させず置換");
assert.deepEqual(replaced.searchParams.getAll("utm_campaign"), ["yukako_portal"]);
assert.deepEqual(replaced.searchParams.getAll("utm_medium"), ["social"]);
assert.deepEqual(replaced.searchParams.getAll("utm_content"), ["home_share"]);

const shareTarget = addShareUtm("https://example.com/path?ref=1#hash", "home_share");
const intent = new URL(
  `https://twitter.com/intent/tweet?text=${encodeURIComponent("日本語タイトル")}&url=${encodeURIComponent(shareTarget)}`,
);
assert.equal(intent.searchParams.get("text"), "日本語タイトル", "日本語タイトルを正しくエンコード");
const sharedUrl = new URL(intent.searchParams.get("url"));
assert.equal(sharedUrl.searchParams.get("ref"), "1");
assert.equal(sharedUrl.hash, "#hash");
assert.equal(sharedUrl.searchParams.get("utm_source"), "x");
assert.equal(sharedUrl.searchParams.get("utm_content"), "home_share");

assert.ok(!canonical.includes("utm_"), "正規URLはUTMなしのまま");
assert.ok(!"https://x.com/mokoopy/status/123".includes("utm_"), "X元投稿URLはUTMなし");
assert.ok(!"https://ticket.example.com/order".includes("utm_"), "チケットURLはUTMなし");

console.log("engagement tests: ok");
