// 観劇レポート｜観客がリポストされ、優花子さんから感謝コメントが届いた投稿の記録。
// 元投稿者本人の許諾が確認できるまでは published を false のままにする。
// 取り下げ依頼が来た場合は、該当エントリの published を false にするだけでよい。

export type AudienceReportImage = {
  src: string;
  alt: string;
};

export type AudienceReportEntry = {
  id: string;
  published: boolean;
  /** 表示用の日付ラベル（正確な日付が未確認のため月単位） */
  dateLabel: string;
  /** 元投稿者のInstagramハンドル（@付き） */
  posterHandle: string;
  /** 元投稿者のInstagramプロフィールURL */
  posterUrl: string;
  /** 優花子さんがストーリーズで返したコメント（原文どおり） */
  yukakoComment: string;
  image: AudienceReportImage;
};

export const audienceReports: AudienceReportEntry[] = [
  {
    id: "2026-07-meeeik-o",
    published: false,
    dateLabel: "2026年7月",
    posterHandle: "@meeeik_o",
    posterUrl: "https://www.instagram.com/meeeik_o",
    yukakoComment:
      "来てくれてありがとう🥹✨\n初日から観に来てもらえて楽しんでもらえて嬉しいなあ",
    image: {
      src: "/images/yukajet/2026-07-fan-report-meeeik-o-story.jpg",
      alt: "GO,JET!GO!GO! Premium公演のキャスト集合写真"
    }
  },
  {
    id: "2026-07-erika-opie",
    published: false,
    dateLabel: "2026年7月",
    posterHandle: "@erika_opie",
    posterUrl: "https://www.instagram.com/erika_opie",
    yukakoComment:
      "いつも観にきてくれてありがとう😭\n楽しんでもらえてよかった〜✨\n芝居しながらちゃんと見てるから えりかが笑ってるの気づいてたよ😏",
    image: {
      src: "/images/yukajet/2026-07-fan-report-erika-opie-story.jpg",
      alt: "GO,JET!GO!GO! Premium公演のキャスト集合写真（アメリカンダイナー風のセット）"
    }
  }
];
