export type GalleryPhoto = {
  src: string;
  alt: string;
};

export const galleryPhotos: GalleryPhoto[] = [
  { src: "/images/yukako-gojet-boost-2026-07-03-message.jpg", alt: "#ゆかJETへの想いと配信チケット案内を伝える吉井優花子さんの告知スライド" },
  { src: "/images/yukako-gojet-boost-2026-07-03-chart-schedule.jpg", alt: "#ゆかJETの相関図とA班B班C班の公演日程をまとめた告知画像" },
  { src: "/images/yukako-gojet-boost-2026-07-03-main-visual.jpg", alt: "GO,JET!GO!GO! vol.1 Premiumのキービジュアルとキャスト・チケット情報" },
  { src: "/images/yukako-gojet-boost-2026-07-03-ticket-info.jpg", alt: "#ゆかJETの来場チケットと配信チケットの案内画像" },
  { src: "/images/yukako-gojet-boost-2026-07-03-support-goods.jpg", alt: "#ゆかJETのエールカードやメッセージ動画などキャスト応援コンテンツの案内画像" },
  { src: "/images/yukako-gojet-boost-2026-07-03-schedule-theater.jpg", alt: "#ゆかJETの相関図、公演日程、Air studio両国の劇場情報をまとめた告知画像" },
  { src: "/images/yukako-yukajet-rehearsal-2026-07-04-selfie.jpg", alt: "#ゆかJETの稽古で笑顔を見せる吉井優花子さんとガールズキャストの自撮り写真" },
  { src: "/images/yukako-yukajet-rehearsal-2026-07-04-girls.jpg", alt: "#ゆかJETの稽古でハートポーズをする吉井優花子さんたちガールズキャストの集合写真" },
  { src: "/images/yukako-selfie-2026-07-01.jpg", alt: "白Tシャツにピンクのベストで微笑む吉井優花子さん（2026.7.1 Xより）" },
  { src: "/images/yukako-stage-back.jpg", alt: "舞台上から客席を見つめる吉井優花子さん" },
  { src: "/images/yukako-stage-front.jpg", alt: "舞台衣装で演技中の吉井優花子さん" },
  { src: "/images/yukako-portrait.jpg", alt: "吉井優花子さんポートレート" },
  { src: "/images/yukako-babyshark-lobster.jpg", alt: "Baby Shark Live ロブスター衣装" },
  { src: "/images/yukako-babyshark-pirate.jpg", alt: "Baby Shark Live 海賊衣装" },
  { src: "/images/yukako-babyshark-character.jpg", alt: "Baby Shark Live キャラクターと共演" },
  { src: "/images/yukako-cruise-captain.jpg", alt: "MSCベリッシマでのキャプテン帽ショット" },
  { src: "/images/yukako-cruise-night.jpg", alt: "クルーズ船デッキでの夜景ショット" },
  { src: "/images/yukako-cruise-gym.jpg", alt: "クルーズ船ジムでのトレーニング" },
  { src: "/images/yukako-casual-braids.jpg", alt: "三つ編みの吉井優花子さん" },
  { src: "/images/yukako-shuichi-event.jpg", alt: "シューイチ全国うまいもの博にて" },
  { src: "/images/yukako-noodles.jpg", alt: "麺を食べる吉井優花子さん" }
];

export const galleryUpdate: {
  date: string;
  platform: "X" | "Instagram" | "TikTok";
  note: string;
  url: string;
} = {
  date: "2026.7.3",
  platform: "X",
  note: "#ゆかJET 予約告知の呼びかけ。作品への想い、相関図、日程、チケット・応援メニューを案内",
  url: "https://x.com/mokoopy/status/2073008837641269562"
};
