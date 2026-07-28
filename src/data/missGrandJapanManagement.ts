// Miss Grand Japan「代表補佐／運営マネジメント」就任｜専用コーナー用データ。
// 出典: 吉井優花子さん本人のInstagram投稿（@yoppy_777）
// https://www.instagram.com/p/DZSK68wgVm4/?igsh=ZDY4YTQ3a2M5bHcz

export type MissGrandJapanManagementImage = {
  src: string;
  alt: string;
};

// Miss Grand Japan のシリーズ企画リール。
// 動画ファイルは自己ホストせず、Instagram標準の埋め込み（blockquote + embed.js）で再生する。
// 新しいリールは reels 配列の先頭に追記する。
export type MissGrandJapanSeriesReel = {
  id: string;
  /** 元投稿の公開日 */
  dateLabel: string;
  title: string;
  /** リポスト元アカウント（#Repost 表記があるときだけ） */
  repostFrom?: { handle: string; url: string };
  hashtags: string[];
  /** リール本体のURL（埋め込みにもリンクにも使う） */
  url: string;
};

export const missGrandJapanSeries = {
  eyebrow: "MISS GRAND JAPAN / SERIES",
  title: "シリーズ企画のリール",
  copy: "ミス・グランド・ジャパンのシリーズ企画から、吉井優花子さんがリポストしたリール。再生はInstagramの埋め込みプレーヤーで。",
  reels: [
    {
      id: "float-my-boat-challenge-2026-05",
      dateLabel: "2026.5.18",
      title: "#floatmyboat チャレンジ",
      repostFrom: { handle: "@suke_japan", url: "https://www.instagram.com/suke_japan" },
      hashtags: ["#floatmyboat", "#challenge", "#misstake", "#チャレンジ失敗😂"],
      url: "https://www.instagram.com/reel/DYe2xLHhrwp/"
    }
  ] satisfies MissGrandJapanSeriesReel[]
};

export const missGrandJapanManagement = {
  // 投稿日（=就任日ではなく、就任を発表した日として扱う）
  dateLabel: "2026.6.7",
  eyebrow: "MISS GRAND JAPAN / MANAGEMENT",
  title: "挑戦する人と大会を支える、新たな役割",
  subtitle: "Miss Grand Japan 代表補佐／運営マネジメント",
  badge: "在任中",
  body: [
    "2026年度より、吉井優花子さんはミス・グランド・ジャパンの「代表補佐／運営マネジメント」を務めています。",
    "大会運営全体のマネジメントと体制強化を担い、参加者それぞれの挑戦や目標に寄り添いながら、大会のさらなるレベルアップを支えていく役割です。",
    "俳優・タレント・モデルとして表現するだけでなく、舞台のプロデュースや大会運営など、人と組織を支える分野にも活動を広げています。"
  ],
  quote: ["一人ひとりの挑戦に寄り添いながら、", "大会のさらなるレベルアップに尽力いたします。"],
  images: {
    main: {
      src: "/images/miss-grand-japan/yukako-miss-grand-japan-management-2026-01.jpg",
      alt: "白い衣装を着た吉井優花子さんの宣材写真。ミス・グランド・ジャパン代表補佐／運営マネジメント就任発表"
    } satisfies MissGrandJapanManagementImage,
    sub: {
      src: "/images/miss-grand-japan/yukako-miss-grand-japan-management-2026-02.jpg",
      alt: "吉井優花子さんのクローズアップ宣材写真"
    } satisfies MissGrandJapanManagementImage
  },
  photoCredit: "@thestudio.japan",
  postUrl: "https://www.instagram.com/p/DZSK68wgVm4/?igsh=ZDY4YTQ3a2M5bHcz",
  ctaLabel: "Instagramで元の投稿を見る"
};
