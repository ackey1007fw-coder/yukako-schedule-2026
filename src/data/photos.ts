export type GalleryPhoto = {
  src: string;
  alt: string;
};

const driveYukakoPhotos: GalleryPhoto[] = Array.from({ length: 118 }, (_, index) => {
  const number = index + 1;
  const fileNumber = String(number).padStart(3, "0");
  return {
    src: `/images/drive-yukako-2026/yukako-drive-2026-07-05-${fileNumber}.jpg`,
    alt: `吉井優花子さんのフォトアーカイブ（2026年2月〜7月・${number}枚目）`
  };
});

export const galleryPhotos: GalleryPhoto[] = [
  ...driveYukakoPhotos,
  { src: "/images/yukako-seaside-2026-08-19.jpg", alt: "白いTシャツにイエローのキャミソールワンピースで、海辺で自撮りする吉井優花子さん（2026.8.19 Xより）" },
  { src: "/images/yukako-omoriyama-zoo-kangaroo-2026-08-18.jpg", alt: "大森山動物園でガラス越しのアカカンガルーを指さす吉井優花子さん（2026.8.18 Xより）" },
  { src: "/images/yukako-selfie-2026-07-01.jpg", alt: "白Tシャツにピンクのベストで微笑む吉井優花子さん（2026.7.1 Xより）" },
  { src: "/images/yukako-stage-back.jpg", alt: "舞台上から客席を見つめる吉井優花子さん" },
  { src: "/images/yukako-stage-front.jpg", alt: "舞台衣装で演技中の吉井優花子さん" },
  { src: "/images/yukako-portrait.jpg", alt: "吉井優花子さんポートレート" },
  { src: "/images/yukako-babyshark-lobster.jpg", alt: "ヤドカリのヘッティー役の衣装を着た吉井優花子さん" },
  { src: "/images/yukako-babyshark-pirate.jpg", alt: "海賊のパール役の衣装を着た吉井優花子さん" },
  { src: "/images/yukako-babyshark-character.jpg", alt: "ヤドカリのヘッティー役の吉井優花子さんと共演キャラクター" },
  { src: "/images/yukako-cruise-captain.jpg", alt: "MSCベリッシマでのキャプテン帽ショット" },
  { src: "/images/yukako-cruise-night.jpg", alt: "クルーズ船デッキでの夜景ショット" },
  { src: "/images/yukako-cruise-gym.jpg", alt: "クルーズ船ジムでのトレーニング" },
  { src: "/images/yukako-casual-braids.jpg", alt: "三つ編みの吉井優花子さん" },
  { src: "/images/yukako-shuichi-event.jpg", alt: "シューイチ全国うまいもの博にて" },
  { src: "/images/yukako-noodles.jpg", alt: "麺を食べる吉井優花子さん" }
];

export const galleryUpdate: {
  date: string;
  platform: "X" | "Instagram" | "TikTok" | "Archive";
  note: string;
  url: string;
} = {
  date: "2026.8.19",
  platform: "X",
  note: "8/19の海辺と、引用元8/18の大森山動物園。X投稿の写真2枚を追加",
  // 元投稿へのリンクは最新情報の8/19カードが持つ。ここを同じX投稿に向けると
  // カードとポータルフィードの両方で同じ投稿が二重になるため、写真そのものへ送る。
  url: "#photo-selection"
};
