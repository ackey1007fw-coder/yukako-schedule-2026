// 2026.9.3 Instagram @yoppy_777
// Miss Grand Japan × #名水のDAG米 #大曲の花火 ツアー初日・角館の武家屋敷。
// Instagram permalink: https://www.instagram.com/p/Dc0xhC_lG95/
// X 案内: https://x.com/mokoopy/status/2095487887819395429

export type KakunodatePhoto = {
  src: string;
  alt: string;
  caption: string;
  /** フォトギャラリー（本人スナップ）にも載せるか。俥夫の後ろ姿など本人が写っていないカットは false。 */
  inGallery: boolean;
};

export const kakunodateTour = {
  id: "kakunodate-bukeyashiki-2026-09-03",
  dateLabel: "2026.9.3",
  weekdayLabel: "木",
  eyebrow: "Akita / Kakunodate",
  title: "「自然が気持ち良い」",
  copy: "Miss Grand Japan × #名水のDAG米。#大曲の花火 ツアー初日は、角館の武家屋敷へ。",
  instagramProfileUrl: "https://www.instagram.com/yoppy_777",
  instagramPostUrl: "https://www.instagram.com/p/Dc0xhC_lG95/",
  xPostUrl: "https://x.com/mokoopy/status/2095487887819395429",
  missGrandJapanUrl: "https://www.instagram.com/missgrandjapan",
  heroSrc: "/images/yukako-kakunodate-rickshaw-2026-09-03.jpg",
  body: [
    "初日は角館の武家屋敷を。人力車に乗りながら、角館の歴史を学びました。",
    "お天気も良く、緑の中での撮影も。顔はめパネルも。"
  ],
  photos: [
    {
      src: "/images/yukako-kakunodate-portrait-2026-09-03.jpg",
      alt: "緑の庭園の前で、三つ編みの白いTシャツに青いスカートの吉井優花子さん",
      caption: "緑の中で",
      inGallery: true
    },
    {
      src: "/images/yukako-kakunodate-forest-smile-2026-09-03.jpg",
      alt: "緑の中で頭に手を添え、振り返って微笑む吉井優花子さん",
      caption: "緑の中で",
      inGallery: true
    },
    {
      src: "/images/yukako-kakunodate-forest-look-up-2026-09-03.jpg",
      alt: "木漏れ日の緑の中で、手を額に当て空を見上げる吉井優花子さん",
      caption: "木漏れ日",
      inGallery: true
    },
    {
      src: "/images/yukako-kakunodate-rickshaw-2026-09-03.jpg",
      alt: "赤いシートの人力車に並んで座る2人。右が三つ編みの白いTシャツの吉井優花子さん",
      caption: "人力車",
      inGallery: true
    },
    {
      src: "/images/yukako-kakunodate-rickshaw-street-2026-09-03.jpg",
      alt: "角館の武家屋敷通りを走る人力車。市松模様の衣服の俥夫の後ろ姿",
      caption: "武家屋敷通り",
      inGallery: false
    },
    {
      src: "/images/yukako-kakunodate-aoyagi-house-2026-09-03.jpg",
      alt: "茅葺屋根の角館・青柳家の前でパンフレットを手に並ぶ4人。左端が吉井優花子さん",
      caption: "角館・青柳家",
      inGallery: true
    },
    {
      src: "/images/yukako-kakunodate-engawa-2026-09-03.jpg",
      alt: "武家屋敷の縁側に腰かけ、赤い和傘の下で空を見上げる4人。右端が三つ編みの吉井優花子さん",
      caption: "縁側",
      inGallery: true
    },
    {
      src: "/images/yukako-kakunodate-samurai-panel-2026-09-03.jpg",
      alt: "角館・青柳家の顔はめパネル。赤い甲冑の切り抜きに顔を入れて微笑む吉井優花子さん",
      caption: "顔はめパネル",
      inGallery: true
    }
  ] satisfies KakunodatePhoto[]
};
