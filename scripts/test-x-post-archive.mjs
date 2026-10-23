import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { build } from "esbuild";

// 既存TypeScriptデータをそのままバンドルして、実際の集約結果を検証する。
// Xのスクレイピングや外部API呼び出しはしない。
const bundle = await build({
  entryPoints: ["src/data/xPostArchive.ts"],
  platform: "node",
  format: "esm",
  bundle: true,
  write: false,
  logLevel: "silent"
});
const source = Buffer.from(bundle.outputFiles[0].contents).toString("base64");
const { xArchivePosts, getXArchiveIdentity, collectXArchivePosts } =
  await import(`data:text/javascript;base64,${source}`);

assert.equal(
  getXArchiveIdentity("https://x.com/mokoopy/status/2105673651819598269?s=12")?.sourceUrl,
  "https://x.com/mokoopy/status/2105673651819598269"
);
assert.equal(getXArchiveIdentity("https://x.com/stranger/status/123"), null);
assert.equal(getXArchiveIdentity("https://x.com/mokoopy"), null);
assert.equal(getXArchiveIdentity("https://www.instagram.com/yoppy_777"), null);

assert.ok(xArchivePosts.length >= 40, "既存のX投稿が十分に収録されていること");
assert.equal(new Set(xArchivePosts.map((post) => post.id)).size, xArchivePosts.length);
assert.ok(xArchivePosts.some((post) => post.account === "mokoopy"));
assert.ok(xArchivePosts.some((post) => post.account === "yukako_produce"));
assert.ok(xArchivePosts.some((post) => post.images.length > 1), "複数画像の投稿を表示できること");

const missing = [];
for (const post of xArchivePosts) {
  assert.match(post.sourceUrl, /^https:\/\/x\.com\/(mokoopy|yukako_produce)\/status\/\d+$/);
  for (const photo of post.images) {
    assert.ok(photo.src.startsWith("/images/"), "自己ホストの画像だけを表示すること");
    if (!existsSync(`public${photo.src}`)) missing.push(`${post.sourceUrl}: ${photo.src}`);
  }
}
assert.deepEqual(missing, [], "画像ファイルがすべて存在すること");

// クエリパラメータ違いの投稿は1件にまとめ、登録順が変わっても人物を取り違えない。
const repeated = collectXArchivePosts([
  { id: "a", date: "2026.10.1", category: "X", title: "A", sourceUrl: "https://x.com/mokoopy/status/2105673651819598269?s=12" },
  { id: "b", date: "2026.10.1", category: "X", title: "A", sourceUrl: "https://twitter.com/mokoopy/status/2105673651819598269" },
  { id: "c", date: "2026.10.1", category: "X", title: "別アカウント", sourceUrl: "https://x.com/someone/status/123" }
]);
assert.equal(repeated.length, 1);

console.log(
  `X投稿アーカイブOK: ${xArchivePosts.length}件 / 写真・画像付き ${xArchivePosts.filter((post) => post.images.length > 0).length}件 / 合計画像 ${xArchivePosts.reduce((n, post) => n + post.images.length, 0)}枚`
);
