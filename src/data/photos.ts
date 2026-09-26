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
  {
    src: "/images/yukako-summer-portrait-2026-09-25.jpg",
    alt: "夕暮れの海辺で、白いTシャツと淡い黄色の衣装姿で振り返って微笑む吉井優花子さん（2026.9.25 Xより）"
  },
  {
    src: "/images/yukako-theater-arms-open-story-2026-09-21.jpg",
    alt: "赤い客席の劇場ステージ上で、白いキャップに黒い服、両手を大きく広げて立つ吉井優花子さん（2026.9.21 Instagramストーリーズより）"
  },
  {
    src: "/images/baby-shark/baby-shark-hetty-with-babyshark-2026-09-18.jpg",
    alt: "赤いスパンコールのヤドカリ衣装で、ベイビーシャークの着ぐるみと並んで微笑む吉井優花子さん（2026.9.18 Instagramより）"
  },
  {
    src: "/images/yukako-mgj-miss-peace-reflection-2026-09-11.jpg",
    alt: "赤を基調としたステージ衣装で、片腕を上げてポーズを取る女性（2025年のMISS GRAND JAPAN日本大会を振り返る2026.9.11 X投稿より）"
  },
  {
    src: "/images/yukako-omagari-akita-inu-members-2026-09-05.jpg",
    alt: "秋田犬の被り物をした4人の集合。左から2人目が吉井優花子さん（2026.9.5 Instagramより）"
  },
  {
    src: "/images/yukako-omagari-shinchan-welcome-2026-09-05.jpg",
    alt: "大仙市のクレヨンしんちゃん歓迎ボードの前、秋田犬の被り物で新幹線モニュメントに座る吉井優花子さん（2026.9.5 Instagramより）"
  },
  {
    src: "/images/yukako-omagari-shinchan-statue-2026-09-05.jpg",
    alt: "秋田犬の着ぐるみを着たクレヨンしんちゃんの像の隣で、同じ被り物をして指さす吉井優花子さん（2026.9.5 Instagramより）"
  },
  {
    src: "/images/yukako-kakunodate-portrait-2026-09-03.jpg",
    alt: "緑の庭園の前で、三つ編みの白いTシャツに青いスカートの吉井優花子さん（2026.9.3 Instagramより）"
  },
  {
    src: "/images/yukako-kakunodate-forest-smile-2026-09-03.jpg",
    alt: "緑の中で頭に手を添え、振り返って微笑む吉井優花子さん（2026.9.3 Instagramより）"
  },
  {
    src: "/images/yukako-kakunodate-forest-look-up-2026-09-03.jpg",
    alt: "木漏れ日の緑の中で、手を額に当て空を見上げる吉井優花子さん（2026.9.3 Instagramより）"
  },
  {
    src: "/images/yukako-kakunodate-rickshaw-2026-09-03.jpg",
    alt: "赤いシートの人力車に並んで座る吉井優花子さん（2026.9.3 Instagramより）"
  },
  {
    src: "/images/yukako-kakunodate-aoyagi-house-2026-09-03.jpg",
    alt: "茅葺屋根の角館・青柳家の前でパンフレットを手にする吉井優花子さん（2026.9.3 Instagramより）"
  },
  {
    src: "/images/yukako-kakunodate-engawa-2026-09-03.jpg",
    alt: "武家屋敷の縁側、赤い和傘の下で空を見上げる吉井優花子さん（2026.9.3 Instagramより）"
  },
  {
    src: "/images/yukako-kakunodate-samurai-panel-2026-09-03.jpg",
    alt: "角館・青柳家の顔はめパネル。赤い甲冑の切り抜きに顔を入れて微笑む吉井優花子さん（2026.9.3 Instagramより）"
  },
  {
    src: "/images/yukako-akita-inu-shinchan-2026-09-02.jpg",
    alt: "秋田犬の被り物をし、同じ秋田犬の着ぐるみを着たしんちゃん像の横で両手を上げて微笑む吉井優花子さん（2026.9.2 Xより）"
  },
  {
    src: "/images/yukako-omagari-hanabi-komachi-megenai-2026-08-29.jpg",
    alt: "ピンクの『こまちめげない』Tシャツの文字を指さして微笑む吉井優花子さん（2026.8.29 Xより）"
  },
  ...driveYukakoPhotos,
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
  date: "2026.9.25",
  platform: "X",
  note: "海辺のポートレート写真を追加",
  url: "https://x.com/mokoopy/status/2103488688424644773"
};
