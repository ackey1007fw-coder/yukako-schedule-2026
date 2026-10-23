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

const goldenPosts = xArchivePosts.filter((post) => post.id === "yukako_produce:2113599620542824827");
assert.equal(goldenPosts.length, 1, "10/23の公演告知を重複なく収録すること");
const goldenPost = goldenPosts[0];
assert.equal(goldenPost.date, "2026.10.23", "掲載日と元投稿日を混同しないこと");
assert.equal(goldenPost.sourceUrl, "https://x.com/yukako_produce/status/2113599620542824827");
assert.match(goldenPost.title, /新曲を含む全12曲/);
assert.match(goldenPost.title, /劇場・配信/);
assert.match(goldenPost.title, /歌唱映像を販売中（期限なし･寄り撮影）/);
assert.doesNotMatch(goldenPost.title, /販売期限|視聴期限/, "原文で特定されていない期限の対象を補わないこと");
assert.equal(goldenPost.embedXPost, true, "添付動画はX公式埋め込みで表示すること");
assert.deepEqual(goldenPost.images, [], "動画や引用先の写真を複製・流用しないこと");

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
  { id: "b", date: "2026.10.1", category: "X", title: "A", sourceUrl: "https://twitter.com/mokoopy/status/2105673651819598269", embedXPost: true },
  { id: "c", date: "2026.10.1", category: "X", title: "別アカウント", sourceUrl: "https://x.com/someone/status/123" }
]);
assert.equal(repeated.length, 1);
assert.equal(repeated[0].embedXPost, true, "重複をまとめても埋め込み指定を保持すること");

console.log(
  `X投稿アーカイブOK: ${xArchivePosts.length}件 / 写真・画像付き ${xArchivePosts.filter((post) => post.images.length > 0).length}件 / 合計画像 ${xArchivePosts.reduce((n, post) => n + post.images.length, 0)}枚`
);
