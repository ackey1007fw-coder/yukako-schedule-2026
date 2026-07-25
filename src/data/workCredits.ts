// お仕事実績｜PR案件・出演・メディア掲載などを時系列で記録するデータソース。
// 新しいエントリは配列に追記するだけでよい（表示順は日付の新しい順に自動で並び替わる）。
// published: false のエントリは掲載コントロール用（サイトには一切レンダリングされない）。

export type WorkCreditCategory = "pr" | "stage" | "media" | "other";
export type WorkCreditEmbedType = "instagram" | "thumbnail" | "none";
export type WorkCreditStatus = "ongoing" | "ended" | "none";

export type WorkCreditLink = {
  label: string;
  url: string;
};

export type WorkCreditEventPeriod = {
  /** ISO 8601（省略可。単日の場合は end のみでよい） */
  start?: string;
  /** ISO 8601 */
  end: string;
  /** 催事・会場名など */
  label?: string;
};

export type WorkCreditEntry = {
  id: string;
  category: WorkCreditCategory;
  title: string;
  /** 投稿日または公開日（ISO 8601） */
  date: string;
  summary: string;
  /** 本人投稿など一次ソースのURL */
  sourceUrl: string;
  embedType: WorkCreditEmbedType;
  /** embedType が "thumbnail" の場合のみ使用 */
  thumbnail?: string;
  /** thumbnail 使用時のaltテキスト */
  alt?: string;
  links: WorkCreditLink[];
  isPr: boolean;
  eventPeriod?: WorkCreditEventPeriod;
  /** 省略時は eventPeriod（現在日時JST比較）から自動判定する */
  status?: WorkCreditStatus;
  published: boolean;
};

export const workCredits: WorkCreditEntry[] = [
  {
    id: "the-chocola-2026-06",
    category: "pr",
    title: "THE chocola（ザ ショコラ）ガトーショコラ ご紹介",
    date: "2026-06-06",
    summary:
      "名古屋発の人気店「THE chocola」のガトーショコラをご紹介。カカオ・卵・生クリーム・バター・てんさい糖・塩のみを使ったグルテンフリーの一品で、職人が1本1本焼き上げているとのこと。西武秋田店の催事「シューイチ 全国うまいもの博」に合わせた投稿です。",
    sourceUrl: "https://www.instagram.com/reel/DZOwnJnhGwy/",
    embedType: "instagram",
    links: [
      { label: "本人のリール投稿", url: "https://www.instagram.com/reel/DZOwnJnhGwy/" },
      { label: "@the_chocola_", url: "https://www.instagram.com/the_chocola_" },
      { label: "@seibuakita_official", url: "https://www.instagram.com/seibuakita_official" }
    ],
    isPr: true,
    eventPeriod: {
      end: "2026-06-07",
      label: "西武秋田店 地階催事場「シューイチ 全国うまいもの博」"
    },
    published: false
  }
];
