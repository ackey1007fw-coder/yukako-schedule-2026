export type OjosamaBandPhoto = {
  src: string;
  alt: string;
};

export const ojosamaBandPhotos: OjosamaBandPhoto[] = Array.from({ length: 24 }, (_, index) => {
  const number = index + 1;
  const fileNumber = String(number).padStart(2, "0");
  return {
    src: `/images/ojosama-band-2026/yukako-ojosama-band-2026-${fileNumber}.jpg`,
    alt: `「お嬢様はバンドがやりたい ♪♪♪」黒白院雲雀役の吉井優花子さん 記録写真 ${number}`
  };
});

export const ojosamaBandSchedule = [
  "2026年5月20日(水) 19:00",
  "2026年5月22日(金) 13:00",
  "2026年5月23日(土) 18:00",
  "2026年5月24日(日) 12:00"
];

export const ojosamaBandMoments = [
  {
    label: "役柄",
    text: "主人公・黒白院すずめのお母様、黒白院雲雀役。娘の夢を見守り、支える母の深い愛を軸に演じた役です。"
  },
  {
    label: "見どころ",
    text: "歌、感情芝居、コミカルな芝居が重なる重要な役どころ。優花子さんの声と表現の幅が伝わる舞台でした。"
  },
  {
    label: "記録",
    text: "公演後には「黒白院 雲雀の記録」として写真を投稿。役への愛着と、応援への感謝が残る大切なアーカイブです。"
  }
];
