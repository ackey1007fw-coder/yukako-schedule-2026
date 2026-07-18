import {
  gojetFeatureUpdates as sourceUpdates,
  type GojetFeatureUpdate
} from "./gojetPromo";

export type DisplayGojetFeatureUpdate = GojetFeatureUpdate & {
  // トップの最新情報から対象カードへ直接移動するための任意アンカー
  anchorId?: string;
  // 記事ごとに、公演情報と元投稿のどちらを主CTAにするか指定する
  primaryCta?: "post" | "homepage";
};

const CBAN_GIRLS_POST_URL =
  "https://x.com/mokoopy/status/2078281074199982129";

// 元投稿データは維持しつつ、表示上の文章・導線に必要な情報だけを補う。
// 今後、同様の個別最適化が増えた場合は GojetFeatureUpdate 本体への統合を検討する。
export const gojetFeatureUpdates: DisplayGojetFeatureUpdate[] = sourceUpdates.map(
  (update) => {
    if (update.postUrl !== CBAN_GIRLS_POST_URL) return update;

    return {
      ...update,
      title:
        "まだ模索中だからこそ面白い。C班ガールズ3人でつくる「絶対良いもの」",
      body:
        "#ゆかJETのC班で早紀を演じる優花子さんが、GO,JET! Girlsの3人で稽古に取り組む姿を投稿。「まだまだ模索中なのが新鮮」「絶対良いものになる」と、本番へ向けて試行錯誤する今の空気を伝えています。完成前だからこそ、3人が舞台でどんな関係性を見せるのかが楽しみになる投稿です。写真と本人の言葉はXで、C班の日程・予約は公演ページで確認できます。",
      ctaLabel: "優花子さんの投稿と写真を見る",
      homepageLabel: "C班の日程・予約を見る",
      roleTags: ["C班：早紀", "GO,JET! Girls", "引用投稿"],
      anchorId: "gojet-cban-girls-2026-07-18",
      primaryCta: "homepage"
    };
  }
);
