export type RyomaKunPhoto = {
  src: string;
  alt: string;
};

export const ryomaKunPhotos: RyomaKunPhoto[] = Array.from({ length: 49 }, (_, index) => {
  const number = index + 1;
  const fileNumber = String(number).padStart(2, "0");
  return {
    src: `/images/ryoma-kun-2026/yukako-ryoma-kun-2026-archive-${fileNumber}.jpg`,
    alt: `舞台『かわええのう、龍馬くん』B班坂本龍馬役・C班おりょう役の吉井優花子さん 記録写真 ${number}`
  };
});

export const ryomaKunSchedule = [
  "2026年4月7日(火) 20:00",
  "2026年4月9日(木) 16:00",
  "2026年4月10日(金) 12:00",
  "2026年4月11日(土) 20:00",
  "2026年4月12日(日) 16:00"
];

export const ryomaKunMoments = [
  {
    label: "役柄",
    text: "B班で坂本龍馬役、C班でおりょう役の二役を演じ、アソシエイトプロデューサーも務めました。"
  },
  {
    label: "見どころ",
    text: "幕末の群像劇をコメディタッチで描く舞台。班によって異なる役に挑み、幅広い表現力を見せました。"
  },
  {
    label: "記録",
    text: "A-root赤坂での上演後に公開された記録写真49枚を、このページに収蔵。"
  }
];
