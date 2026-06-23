// TikTokなどのショート動画クリップ（自己ホスト・ミュート自動ループで表示）。
// ・新しいものを先頭に。配列が空ならセクションは非表示。
// ・src は public/videos/ 以下のパス。url は元の投稿（タップで本編へ）。
export type VideoClip = {
  src: string; // 例: "/videos/tiktok-2026-06-23.mp4"
  title: string; // 見出し
  caption: string; // ひとこと
  bgm?: string; // 使用BGM（クレジット表記用）
  date: string; // 表示用 例: "2026.6.23"
  url: string; // 元の投稿URL（TikTok）
};

export const clips: VideoClip[] = [
  {
    src: "/videos/tiktok-2026-06-23.mp4",
    title: "19歳最後の日",
    caption: "ハタチになる前日のショート動画。#19歳 #女子大生",
    bgm: "真夏の果実（cover）",
    date: "2026.6.23",
    url: "https://vt.tiktok.com/ZSCdDkd6K/"
  }
];
