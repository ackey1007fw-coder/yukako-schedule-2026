// 2026.9.5 Instagram @yoppy_777
// Miss Grand Japan × #名水のDAG米 #大曲の花火 ツアー・秋田犬としんちゃん。
// Instagram permalink: https://www.instagram.com/p/Dc6OokunNfi/
// 同ツアーの先行X: https://x.com/mokoopy/status/2095128310351385016 （2026.9.2「あきたいぬ / しんちゃんと」）

export type AkitaInuPhoto = {
  src: string;
  alt: string;
  caption: string;
  /** フォトギャラリー（本人スナップ）にも載せるか。 */
  inGallery: boolean;
};

export const akitaInuTour = {
  id: "akita-inu-omagari-2026-09-05",
  dateLabel: "2026.9.5",
  weekdayLabel: "土",
  eyebrow: "Akita / Omagari",
  title: "「秋田・大曲で秋田犬になりました」",
  copy: "Miss Grand Japan × #名水のDAG米。#大曲の花火 ツアーで、秋田犬に。",
  instagramProfileUrl: "https://www.instagram.com/yoppy_777",
  instagramPostUrl: "https://www.instagram.com/p/Dc6OokunNfi/",
  xPostUrl: "https://x.com/mokoopy/status/2095128310351385016",
  missGrandJapanUrl: "https://www.instagram.com/missgrandjapan",
  heroSrc: "/images/yukako-omagari-shinchan-statue-2026-09-05.jpg",
  body: [
    "秋田犬は、秋田県原産の日本犬。国の天然記念物にも指定されていて、忠犬ハチ公も秋田犬として有名です。",
    "大曲がある大仙市は、『クレヨンしんちゃん』の父・野原ひろしの実家がある設定のまち。しんちゃんともツーショット。"
  ],
  photos: [
    {
      src: "/images/yukako-omagari-akita-inu-members-2026-09-05.jpg",
      alt: "秋田犬の被り物をした4人の集合写真。左から2人目が黒いTシャツの吉井優花子さん。上部に『MGJ 大曲花火ツアーメンバー』の文字",
      caption: "MGJ 大曲花火ツアーメンバー",
      inGallery: true
    },
    {
      src: "/images/yukako-omagari-shinchan-welcome-2026-09-05.jpg",
      alt: "大仙市のクレヨンしんちゃん歓迎ボードの前、秋田犬の被り物で赤白の新幹線モニュメントに座る吉井優花子さん",
      caption: "大仙市へようこそ",
      inGallery: true
    },
    {
      src: "/images/yukako-omagari-shinchan-statue-2026-09-05.jpg",
      alt: "秋田犬の着ぐるみを着たクレヨンしんちゃんの像の隣で、同じ被り物をして指さす吉井優花子さん",
      caption: "しんちゃんと",
      inGallery: true
    }
  ] satisfies AkitaInuPhoto[]
};
