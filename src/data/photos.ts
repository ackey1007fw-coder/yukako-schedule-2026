export type GalleryPhoto = {
  src: string;
  alt: string;
};

const contextOnlyPhotoNumbers = new Set([23, 26, 42, 46, 51, 56, 60]);

const archivePhotos: GalleryPhoto[] = Array.from({ length: 65 }, (_, index) => {
  const number = index + 1;
  const fileNumber = String(number).padStart(2, "0");
  return {
    src: `/images/gallery/g${fileNumber}.jpg`,
    alt: `吉井優花子さんのフォトアーカイブ（2026年2月〜7月・${number}枚目）`
  };
}).filter((photo) => {
  const match = photo.src.match(/g(\d+)\.jpg$/);
  return match ? !contextOnlyPhotoNumbers.has(Number(match[1])) : true;
});

export const galleryPhotos: GalleryPhoto[] = [
  ...archivePhotos,
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
  platform: "X" | "Instagram" | "TikTok" | "Archive";
  note: string;
  url: string;
} = {
  date: "2026.7.5",
  platform: "Archive",
  note: "2026年2月〜7月のフォトアーカイブを追加",
  url: "#photo-selection"
};
