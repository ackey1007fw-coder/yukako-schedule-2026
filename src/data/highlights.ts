// これまでの歩み（ハイライト）データ
// ルール（AGENTS.md）:
// - 未確認情報は書かない。確定できた事実だけを追加する。
// - 画像は public/images/ に自己ホスト（例: /images/highlight-xxx.jpg）。Drive直リンク禁止。
// - 新規追加テンプレート:
//   {
//     id: "一意なslug",
//     year: "2024",                 // 並び替え用の年
//     date: "2024年◯月",            // 画面表示用（年だけでも可）
//     category: "受賞",             // 受賞 / メディア / 舞台 / イベント / 配信 など
//     title: "タイトル",
//     description: "確認できた事実のみ",
//     image: "/images/highlight-xxx.jpg", // 任意・自己ホスト
//     link: { label: "リンク名", url: "https://..." } // 任意
//   }

export type Highlight = {
  id: string;
  year: string;
  date: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  link?: { label: string; url: string };
};

export const highlights: Highlight[] = [
  {
    id: "frecam-2025-award",
    year: "2025",
    date: "2025年",
    category: "受賞",
    title: "フレキャン2025 審査員特別賞",
    description:
      "FRESH CAMPUS CONTEST 2025（Entry No.306）に出場し、審査員特別賞を受賞しました。",
    link: { label: "FRECページ", url: "https://2025.frecam.jp/entry/306" }
  },
  {
    id: "modelpress-2025-09",
    year: "2025",
    date: "2025年9月",
    category: "メディア",
    title: "モデルプレス掲載",
    description:
      "「注目の“日本一可愛い新入生”候補」として、フレキャン2025特集のインタビューに登場しました。",
    link: { label: "モデルプレスで読む", url: "https://mdpr.jp/news/detail/4646978" }
  },
  {
    id: "kimito-koi-drama-2023-10",
    year: "2023",
    date: "2023年10月",
    category: "ドラマ",
    title: "MBS深夜ドラマ『君となら恋をしてみても』",
    description:
      "2023年10月5日放送スタートのMBS深夜ドラマに出演。TVerなどでも配信されました。",
  },
  {
    id: "natsutodoroki-2023-09",
    year: "2023",
    date: "2023年9月",
    category: "朗読劇",
    title: "朗読LIVE公演『夏轟』",
    description:
      "Aznet Produce の朗読LIVE公演（2023年9月2日）に出演。浴衣チェキや配信アーカイブも販売されました。",
  },
  {
    id: "realizesummer-2023-08",
    year: "2023",
    date: "2023年8月",
    category: "舞台",
    title: "舞台『リアライズサマー』",
    description:
      "2023年8月上演の『リアライズサマー』にアンダー役として出演。終始笑顔の絶えない2日間の公演でした。",
  }
];
