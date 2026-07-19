# YUKAKO STORY ARCHIVE — 記事追加ガイド

「活動の軌跡」（`/archive`, `/archive/<slug>`）に新しい記事を追加する手順です。
実装は `src/data/archive.ts` の `ArchiveItem` 配列にオブジェクトを1つ追加するだけで、
一覧ページ・個別記事ページ・ホームの「これまでの歩み」（連携する場合）・sitemap.xml・
OGP/JSON-LDが自動で反映されます。

## 手順

1. 画像を `public/images/yukako-<なにか>.jpg` に保存し、`node scripts/generate-responsive-images.mjs`
   を実行（`AGENTS.md`「画像を追加する手順」と同じ）。動画を使う場合は `public/videos/` に
   圧縮済みmp4を置く（11MB前後の元動画をそのまま置かない。目安は3MB前後まで）。
2. `src/data/archive.ts` の `archiveItems` 配列の末尾に、下記テンプレートを埋めて追加する
   （表示順は `date` の新しい順に自動で並び替わるため、配列内の位置は問わない）。
3. ホームの「これまでの歩み」にも載せたい場合は `src/data/highlights.ts` に1件追加し、
   `link: { label: "続きを見る", url: "/archive/<slug>" }` でこの記事につなぐ
   （`mgj-2025-miss-peace` の例を参照）。
4. `npx tsc --noEmit` と `npm run build` を実行して確認する
   （`npm run build` の postbuild で `/archive` 系の静的HTMLも生成される）。

## テンプレート

```ts
{
  slug: "yyyy-mm-dd-short-slug", // URLになる。英数字とハイフンのみ
  title: "記事の正式タイトル（読み物として）",
  shortTitle: "カード・タイムライン用の短いタイトル",
  date: "YYYY.MM.DD", // 表示用
  year: "YYYY",
  platform: "Instagram", // "Instagram" | "X" | "TikTok" | "YouTube" | "公式発表"
  category: "受賞・ミスコン", // カテゴリー一覧はArchiveCategory型を参照
  tags: ["タグ1", "タグ2"],
  summary: "一覧カード用の短い概要（2〜3文）",
  lead: ["記事冒頭のリード文（段落ごとに配列）"],
  sections: [
    { heading: "見出し", body: ["段落1", "段落2"] }
  ],
  quotes: [
    { text: "本人の発言の引用（「」は付けない、表示側で付与）", afterSectionIndex: 0 }
  ],
  images: [
    { src: "/images/yukako-xxx.jpg", alt: "事実描写のalt（文体ガイドは適用しない）" }
  ],
  ogImage: "/images/yukako-xxx.jpg", // SNSカード用（images内のsrcを指定）。省略時はimages[0]

  // 動画がなければ省略可
  video: {
    type: "local", // ローカルmp4なら"local"、Googleドライブ埋め込みなら"drive"
    src: "/videos/xxx.mp4",
    poster: "/images/yukako-xxx.jpg", // 元パスでよい（表示時に最適化WebPへ自動変換される）
    heading: "Stage Movie",
    subheading: "動画セクションの見出し",
    description: "動画の説明文",
    label: "aria-label / iframe title用の説明",
    fallbackUrl: "https://www.instagram.com/p/xxxxx/"
  },
  videoAfterSectionIndex: 2, // 省略時は本文の末尾に表示
  sourceUrl: { label: "Instagramで本人の投稿を読む", url: "https://www.instagram.com/p/xxxxx/" },
  relatedUrls: [{ label: "関連リンクの説明", url: "https://..." }],
  award: { event: "大会名", title: "受賞名", yearLabel: "YYYY AWARD" }, // 受賞がなければ省略可
  featured: false, // 一覧の先頭に大きく表示したい場合のみtrue
  seoTitle: "SEO用タイトル｜活動アーカイブ",
  seoDescription: "SEO・OGP用の説明文（120字前後）",
  datePublished: "YYYY-MM-DD", // 出来事の日付
  dateModified: "YYYY-MM-DD" // サイトに掲載した日付
}
```

## 文体・掲載ルール

- `AGENTS.md` の文体ガイド（レポート調で締めない、感想の代弁をしない、カギ括弧は正確な引用のみ）
  に従う。SNS投稿の丸写しではなく、ファン編集記事として構成する。
- 「公式/公認」と書かない。未確認情報は書かない。顔をAI生成・加工しない。
- 写真はトリミングしない（`ArchivePhotoFrame` は `object-contain` で全体表示する）。
- カテゴリーが増えて記事数が十分に増えたら、`ArchiveListPage.tsx` の
  「カテゴリー一覧」表示（現状はタグ表示のみで絞り込み機能なし）にフィルターボタンを追加できる。
  記事が少ないうちは追加しない。
