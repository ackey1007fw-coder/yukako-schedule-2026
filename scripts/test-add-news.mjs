import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ALLOWED_LABELS,
  escapeTsString,
  extractNewsItems,
  findDuplicateUrl,
  formatDryRunReport,
  normalizeUrlForCompare,
  prepareNewsAddition,
  validateDate,
  validateLabel,
  validateText,
  validateUrl
} from "./lib/addNewsCore.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const realNewsPath = path.join(root, "src/data/news.ts");
const realNewsSource = readFileSync(realNewsPath, "utf8");
const realNewsSnapshot = realNewsSource;

const sampleSource = `export type NewsItem = {
  date: string;
  label: string;
  text: string;
  url: string;
};

export const news: NewsItem[] = [
  {
    date: "2026.7.13",
    label: "X",
    text: "既存の本文です。",
    url: "https://x.com/example/status/1"
  },
  {
    date: "2026.7.11",
    label: "Instagram",
    text: "別の本文",
    url: "https://www.instagram.com/reel/abc/"
  }
];
`;

function assertRejects(input, messageIncludes) {
  const result = prepareNewsAddition({
    source: sampleSource,
    filePath: "/tmp/fake-news.ts",
    write: false,
    ...input
  });
  assert.equal(result.ok, false, `expected reject for ${JSON.stringify(input)}`);
  assert.ok(
    result.errors.some((error) => error.includes(messageIncludes)),
    `expected error including "${messageIncludes}", got: ${result.errors.join(" / ")}`
  );
  assert.equal(result.nextSource, null);
}

// --- 単体検証 ---
assert.equal(validateDate("2026.7.19"), null);
assert.equal(validateDate("2026.07.19"), null);
assert.match(validateDate("2026.6") ?? "", /形式/);
assert.match(validateDate("2026-7-19") ?? "", /形式/);
assert.match(validateDate("2026.13.01") ?? "", /月/);
assert.match(validateDate("2026.2.30") ?? "", /実在しない/);

assert.equal(validateLabel("X"), null);
assert.equal(validateLabel("Instagram"), null);
assert.equal(validateLabel("チケット"), null);
assert.equal(validateLabel("お知らせ"), null);
assert.match(validateLabel("TikTok") ?? "", /許可/);
assert.deepEqual(ALLOWED_LABELS, ["X", "Instagram", "チケット", "お知らせ"]);

assert.equal(validateText("本文"), null);
assert.match(validateText("   ") ?? "", /空/);
assert.match(validateUrl("http://example.com") ?? "", /https/);
assert.match(validateUrl("ftp://example.com") ?? "", /https/);
assert.equal(validateUrl("https://x.com/a"), null);

assert.equal(escapeTsString(`a"b\\c`), String.raw`a\"b\\c`);

// --- 正常 dry-run ---
const dryRun = prepareNewsAddition({
  source: sampleSource,
  filePath: "/tmp/fake-news.ts",
  date: "2026.7.19",
  label: "X",
  text: "掲載する短い本文",
  url: "https://x.com/example/status/999",
  write: false
});
assert.equal(dryRun.ok, true);
assert.equal(dryRun.mode, "dry-run");
assert.equal(dryRun.item.date, "2026.7.19");
assert.match(dryRun.itemTs, /掲載する短い本文/);
assert.match(dryRun.nextSource, /https:\/\/x\.com\/example\/status\/999/);
assert.ok(dryRun.nextSource.startsWith(sampleSource.slice(0, sampleSource.indexOf("["))));
assert.ok(dryRun.nextSource.indexOf("https://x.com/example/status/999") < dryRun.nextSource.indexOf("https://x.com/example/status/1"));

const report = formatDryRunReport(dryRun);
assert.match(report, /追加先ファイル/);
assert.match(report, /2026\.7\.19/);
assert.match(report, /--write/);

// --- 同一URL拒否 ---
assertRejects(
  {
    date: "2026.7.19",
    label: "X",
    text: "新しい本文",
    url: "https://x.com/example/status/1"
  },
  "同一URL"
);

// --- 空本文拒否 ---
assertRejects(
  {
    date: "2026.7.19",
    label: "X",
    text: "",
    url: "https://x.com/example/status/2"
  },
  "text が空"
);

// --- 不正URL拒否 ---
assertRejects(
  {
    date: "2026.7.19",
    label: "X",
    text: "本文",
    url: "http://x.com/example/status/2"
  },
  "https://"
);

// --- 不正日付拒否 ---
assertRejects(
  {
    date: "2026/7/19",
    label: "X",
    text: "本文",
    url: "https://x.com/example/status/2"
  },
  "形式"
);

// --- ほぼ同じ本文は --write でも追加しない ---
const similar = prepareNewsAddition({
  source: sampleSource,
  filePath: "/tmp/fake-news.ts",
  date: "2026.7.19",
  label: "X",
  text: "既存の本文です",
  url: "https://x.com/example/status/777",
  write: true
});
assert.equal(similar.ok, false);
assert.match(similar.errors.join("\n"), /ほぼ同じ本文|同一またはほぼ同じ本文/);
assert.equal(similar.nextSource, null);

// --- 一時ファイルへの書き込み（本物の news.ts は触らない） ---
const tempDir = mkdtempSync(path.join(tmpdir(), "add-news-"));
const tempNews = path.join(tempDir, "news.ts");
try {
  writeFileSync(tempNews, sampleSource, "utf8");
  const before = readFileSync(tempNews, "utf8");
  const prepared = prepareNewsAddition({
    source: before,
    filePath: tempNews,
    date: "2026.7.19",
    label: "お知らせ",
    text: "一時ファイルへの書き込み確認",
    url: "https://yukako-schedule-2026.vercel.app/news-test",
    write: true
  });
  assert.equal(prepared.ok, true);
  writeFileSync(tempNews, prepared.nextSource, "utf8");
  const after = readFileSync(tempNews, "utf8");
  const items = extractNewsItems(after);
  assert.equal(items[0].text, "一時ファイルへの書き込み確認");
  assert.equal(items[0].label, "お知らせ");
  assert.equal(items[1].url, "https://x.com/example/status/1");
  assert.equal(items.length, 3);
  // 既存項目の内容が保たれている
  assert.equal(items[1].text, "既存の本文です。");
  assert.equal(items[2].label, "Instagram");
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}

// --- SNS共有URLの重複判定 ---
assert.equal(
  normalizeUrlForCompare("https://www.instagram.com/reel/abc/?igsh=NTFvYzVjdXQ2OHJy"),
  normalizeUrlForCompare("https://instagram.com/reel/abc")
);
assert.equal(
  normalizeUrlForCompare("https://x.com/mokoopy/status/123?s=12"),
  normalizeUrlForCompare("https://x.com/mokoopy/status/123")
);
assert.equal(
  normalizeUrlForCompare("https://twitter.com/mokoopy/status/123"),
  normalizeUrlForCompare("https://x.com/mokoopy/status/123")
);
assert.notEqual(
  normalizeUrlForCompare("https://x.com/mokoopy/status/123"),
  normalizeUrlForCompare("https://x.com/mokoopy/status/456")
);
assert.notEqual(
  normalizeUrlForCompare("https://example.com/page?id=1"),
  normalizeUrlForCompare("https://example.com/page?id=2")
);
// 機能用queryは維持し、utmだけ落とす
assert.equal(
  normalizeUrlForCompare("https://example.com/page?id=1&utm_source=x&utm_medium=social"),
  normalizeUrlForCompare("https://example.com/page?id=1")
);

const snsSource = `export type NewsItem = {
  date: string;
  label: string;
  text: string;
  url: string;
};

export const news: NewsItem[] = [
  {
    date: "2026.7.11",
    label: "Instagram",
    text: "リール本文",
    url: "https://www.instagram.com/reel/DaoGHTuSj2U/"
  },
  {
    date: "2026.7.13",
    label: "X",
    text: "X本文",
    url: "https://x.com/mokoopy/status/2076682572550267389"
  }
];
`;

const igDup = prepareNewsAddition({
  source: snsSource,
  filePath: "/tmp/sns-news.ts",
  date: "2026.7.19",
  label: "Instagram",
  text: "別文言でも同じ投稿",
  url: "https://www.instagram.com/reel/DaoGHTuSj2U/?igsh=NTFvYzVjdXQ2OHJy",
  write: false
});
assert.equal(igDup.ok, false);
assert.match(igDup.errors.join("\n"), /同一URL/);

const xShareDup = prepareNewsAddition({
  source: snsSource,
  filePath: "/tmp/sns-news.ts",
  date: "2026.7.19",
  label: "X",
  text: "共有パラメータ付き",
  url: "https://x.com/mokoopy/status/2076682572550267389?s=12",
  write: false
});
assert.equal(xShareDup.ok, false);
assert.match(xShareDup.errors.join("\n"), /同一URL/);

const twitterDup = prepareNewsAddition({
  source: snsSource,
  filePath: "/tmp/sns-news.ts",
  date: "2026.7.19",
  label: "X",
  text: "twitter.comドメイン",
  url: "https://twitter.com/mokoopy/status/2076682572550267389",
  write: false
});
assert.equal(twitterDup.ok, false);
assert.match(twitterDup.errors.join("\n"), /同一URL/);

const differentStatus = prepareNewsAddition({
  source: snsSource,
  filePath: "/tmp/sns-news.ts",
  date: "2026.7.19",
  label: "X",
  text: "別status",
  url: "https://x.com/mokoopy/status/9999999999999999999",
  write: false
});
assert.equal(differentStatus.ok, true);

const functionalQueryKept = prepareNewsAddition({
  source: snsSource,
  filePath: "/tmp/sns-news.ts",
  date: "2026.7.19",
  label: "お知らせ",
  text: "機能用queryは別URL",
  url: "https://example.com/ticket?seat=A1",
  write: false
});
assert.equal(functionalQueryKept.ok, true);
assert.equal(
  findDuplicateUrl([{ url: "https://example.com/ticket?seat=A2" }], "https://example.com/ticket?seat=A1"),
  null
);

// --- 本物の news.ts がテストで壊れていないこと ---
const afterReal = readFileSync(realNewsPath, "utf8");
assert.equal(afterReal, realNewsSnapshot, "本物の src/data/news.ts がテスト中に変更されました");
assert.match(afterReal, /export const news: NewsItem\[\] = \[/);

console.log("add-news tests OK");
