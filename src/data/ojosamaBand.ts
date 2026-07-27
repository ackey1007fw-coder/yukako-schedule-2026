export type OjosamaBandPhoto = {
  src: string;
  alt: string;
};

export const ojosamaBandPhotos: OjosamaBandPhoto[] = Array.from(
  { length: 24 },
  (_, index) => index + 1,
)
  .filter((number) => number !== 8)
  .map((number) => {
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

export const ojosamaBandVenue = "シアターグリーン Big Tree Theater（南池袋）";

export type OjosamaBandAnnouncementImage = {
  src: string;
  alt: string;
  caption: string;
};

export const ojosamaBandAnnouncement = {
  date: "2026年5月19日",
  source: "Instagram @yoppy_777",
  url: "https://www.instagram.com/p/DYhcKlZmU6e/",
  headline: "いよいよ明日から——開幕前日の告知",
  quotes: [
    "とっても重要な役で歌も多くて、ワクワクです",
    "雲雀(ひばり)として楽しみながら、心を込めてしっかりと表現を届けます！",
    "歌も感情芝居もコミカル芝居もお楽しみに"
  ],
  notes: [
    "A班4公演、会場はシアターグリーン Big Tree Theater（南池袋）。チケットは特典付き優先入場 ¥8,000 / 一般 ¥5,500。",
    "劇場ロビーにはブロマイドとチェキ。「推し花」は劇場に飾られる電光掲示板型の応援メッセージで、3,000円・5,000円・10,000円の3種類。"
  ],
  images: [
    {
      src: "/images/ojosama-band-2026/yukako-ojosama-band-2026-05-19-flyer.jpg",
      alt: "コメディミュージカル「お嬢様はバンドがやりたい」A班のフライヤー。黒白院雲雀（こくびゃくいん ひばり）役の吉井優花子さんと、5月20日から24日までの公演日程、会場のBig Tree Theater、チケット料金が記載されている",
      caption: "A班フライヤー"
    },
    {
      src: "/images/ojosama-band-2026/yukako-ojosama-band-2026-05-19-costume.jpg",
      alt: "黒白院雲雀の衣装で立つ吉井優花子さん。生成り色のケープ付きロングドレスに緑のリボンタイ",
      caption: "雲雀の衣装"
    },
    {
      src: "/images/ojosama-band-2026/yukako-ojosama-band-2026-05-19-oshibana.jpg",
      alt: "「お嬢様はバンドがやりたい」推し花受付開始の告知画像。電光掲示板型メッセージ3種類の見本と価格、ご注文特典の案内、黒白院雲雀役の吉井優花子さんの写真",
      caption: "推し花の受付案内"
    }
  ] satisfies OjosamaBandAnnouncementImage[]
};

export const ojosamaBandMoments = [
  {
    label: "役柄",
    text: "主人公・黒白院すずめのお母様、黒白院雲雀役。娘の夢を止めるのではなく、見守り、支える母。"
  },
  {
    label: "見どころ",
    text: "歌に、感情芝居に、コミカルな場面まで。声と表現の幅をたっぷり味わえる役どころ。"
  },
  {
    label: "記録",
    text: "公演後に本人が「黒白院 雲雀の記録」として公開した写真24枚を、このページに収蔵。"
  }
];
