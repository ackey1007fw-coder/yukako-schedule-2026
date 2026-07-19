// BABY SHARK LIVE！ The Hidden Treasure — 代表出演作品特集
// 新しい出演告知・写真・コメントを足すときは、このファイルの配列へ追記するだけでよい。

export type BabySharkRole = {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  alt: string;
  objectPosition: string;
  summary: string;
};

export type BabySharkImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
  /** gallery = フォトギャラリー / schedule = 2024年アーカイブ専用（ヒーロー・ギャラリーに混ぜない） */
  kind: "gallery" | "schedule" | "experience";
};

export type BabySharkUpdate = {
  id: string;
  date: string;
  dateLabel: string;
  title: string;
  body: string[];
  sourceUrl?: string;
  sourceLabel?: string;
  kind:
    | "announcement"
    | "performance"
    | "behind-the-scenes"
    | "photo"
    | "comment"
    | "report";
};

export type BabySharkArchiveDate = {
  region: string;
  dateLabel: string;
  times: string;
  venue: string;
};

export const babySharkLive = {
  id: "baby-shark-live-hidden-treasure",
  slug: "baby-shark-live",
  path: "/works/baby-shark-live",
  title: "BABY SHARK LIVE！",
  subtitle: "The Hidden Treasure",
  titleJa: "ベイビーシャークライブ",
  category: "舞台／ミュージカル／ファミリーエンターテインメント",
  label: "代表出演作品",
  /** 作品自体の継続状況（優花子さん個人の出演状況ではない） */
  workStatus: "作品は現在も全国で公演継続中",
  /** 優花子さん個人の出演予定についての注記 */
  appearanceNote: "優花子さんの出演日は、本人からの告知確認後に更新します",
  firstPerformanceDate: "2024-02-25",
  firstPerformanceLabel: "2024年2月25日",
  postDate: "2024-03-01",
  postDateLabel: "2024年3月1日",
  officialUrl: "https://babyshark-live-japan.com/",
  sourceUrl:
    "https://www.instagram.com/p/C3-IholvnW4/?img_index=4&igsh=aGhuc2Z0NGZlbWc3",
  sourcePlatform: "Instagram",
  sourceHandle: "@yoppy_777",
  heroImage: "/images/baby-shark/baby-shark-pearl.jpg",
  heroAlt: "海賊のパール役の衣装を着た吉井優花子さん",
  heroObjectPosition: "center 18%",
  ogImage: "/images/baby-shark/baby-shark-pearl.jpg",
  ogImageAlt: "海賊のパール役の衣装を着た吉井優花子さん",
  cardSummary:
    "ヤドカリのヘッティーと海賊のパールとして出演してきた、全国公演のファミリーミュージカル。",
  summary: [
    "吉井優花子さんが、ヤドカリのヘッティーと海賊のパールとして出演してきた全国公演のファミリーミュージカル。",
    "歌やダンス、海の仲間たちとの冒険を通して、子どもたちと家族に笑顔を届ける代表出演作品です。"
  ],
  body: [
    "全国公演『BABY SHARK LIVE！ The Hidden Treasure』。",
    "吉井優花子さんは、ヤドカリのヘッティー、そして海賊のパールとして出演。",
    "2024年2月25日に初日公演を迎え、海の仲間たちとともに、全国の子どもたちへ歌とダンス、物語の楽しさを届けてきました。",
    "終演後には、キャラクターや出演者によるお見送りが実施される公演もあり、舞台の上だけでなく、最後まで観客の笑顔を大切にする作品です。",
    "作品自体は現在も全国で公演が続いています。吉井優花子さんの出演日については、本人からの告知が確認でき次第、このサイトでも更新します。"
  ],
  seoTitle: "ベイビーシャークライブ出演記録｜吉井優花子 応援ポータル",
  seoDescription:
    "吉井優花子さんがヤドカリのヘッティー、海賊のパールとして出演してきた『BABY SHARK LIVE！ The Hidden Treasure』の活動記録。写真、本人投稿、公式情報をまとめています。",
  isFeatured: true,
  roles: [
    {
      id: "hetty",
      name: "ヤドカリのヘッティー",
      nameEn: "Hetty the Hermit Crab",
      image: "/images/baby-shark/baby-shark-hetty.jpg",
      alt: "ヤドカリのヘッティー役の衣装を着た吉井優花子さん",
      objectPosition: "center 20%",
      summary: "赤いスパンコールの衣装と大きなハサミが印象的な役。"
    },
    {
      id: "pearl",
      name: "海賊のパール",
      nameEn: "Pirate Pearl",
      image: "/images/baby-shark/baby-shark-pearl.jpg",
      alt: "海賊のパール役の衣装を着た吉井優花子さん",
      objectPosition: "center 18%",
      summary: "海賊帽に青いマント。舞台上で歌とダンスを届ける役。"
    }
  ] satisfies BabySharkRole[],
  /**
   * フォトギャラリーに出す画像。
   * 追加時は public/images/baby-shark/ に配置 → npm run images:build → ここへ追記。
   *
   * 未配置（オーナー提供の添付がリポジトリ未投入）:
   * - baby-shark-stage-wide.jpg
   * - baby-shark-stage-cast.jpg
   * - baby-shark-goods.jpg
   * - baby-shark-sendoff.jpg（子どもが写るためメイン不可。ギャラリー追加時は配慮）
   * - baby-shark-schedule-2024.jpg（アーカイブ専用。ヒーロー不可）
   */
  images: [
    {
      id: "pearl",
      src: "/images/baby-shark/baby-shark-pearl.jpg",
      alt: "海賊のパール役の衣装を着た吉井優花子さん",
      caption: "海賊のパール",
      objectPosition: "center 18%",
      kind: "gallery"
    },
    {
      id: "hetty",
      src: "/images/baby-shark/baby-shark-hetty.jpg",
      alt: "ヤドカリのヘッティー役の衣装を着た吉井優花子さん",
      caption: "ヤドカリのヘッティー",
      objectPosition: "center 20%",
      kind: "gallery"
    },
    {
      id: "hetty-babyshark",
      src: "/images/baby-shark/baby-shark-hetty-with-babyshark.jpg",
      alt: "ヤドカリのヘッティー役の吉井優花子さんとベイビーシャーク",
      caption: "ベイビーシャークと",
      objectPosition: "center 22%",
      kind: "gallery"
    },
    {
      id: "hetty-william",
      src: "/images/baby-shark/baby-shark-hetty-with-william.jpg",
      alt: "ヤドカリのヘッティー役の吉井優花子さんと共演キャラクター",
      caption: "キャラクターと",
      objectPosition: "center 22%",
      kind: "gallery"
    }
  ] satisfies BabySharkImage[],
  /** 2024年当時の作品公演スケジュール（優花子さん個人の出演確定日ではない） */
  archiveScheduleNote:
    "こちらは2024年当時の公演情報です。現在の公演情報は公式サイトをご確認ください。",
  archiveScheduleImage: {
    src: "/images/baby-shark/baby-shark-schedule-2024.jpg",
    alt: "ベイビーシャークライブ2024年当時の公演日程",
    /** ファイル未配置のときはテキスト日程のみ表示 */
    available: false
  },
  archiveDates: [
    {
      region: "埼玉",
      dateLabel: "2024年3月31日（日）",
      times: "12:00 / 14:30",
      venue: "ウェスタ川越 大ホール"
    },
    {
      region: "埼玉",
      dateLabel: "2024年4月6日（土）",
      times: "12:00 / 14:10 / 16:20",
      venue: "大宮ソニックシティ 大ホール"
    },
    {
      region: "千葉",
      dateLabel: "2024年4月28日（日）",
      times: "11:30 / 14:00 / 16:30",
      venue: "森のホール21 大ホール"
    },
    {
      region: "東京",
      dateLabel: "2024年4月29日（月・祝）",
      times: "11:30 / 14:00 / 16:30",
      venue: "江戸川区総合文化センター 大ホール"
    },
    {
      region: "兵庫",
      dateLabel: "2024年5月5日（日）",
      times: "12:00 / 15:00",
      venue: "神戸国際会館 こくさいホール"
    }
  ] satisfies BabySharkArchiveDate[],
  updates: [
    {
      id: "instagram-2024-03-01",
      date: "2024-03-01",
      dateLabel: "2024年3月1日",
      title: "初日を迎えて",
      body: [
        "初日公演のあと——ヤドカリのヘッティーと海賊のパールとして、お客様と会えたこと、楽しんでいる笑顔を見られたことがとても嬉しい、と。",
        "全国の皆さんに会いたい、という一文も。"
      ],
      sourceUrl:
        "https://www.instagram.com/p/C3-IholvnW4/?img_index=4&igsh=aGhuc2Z0NGZlbWc3",
      sourceLabel: "Instagramの元投稿を見る",
      kind: "comment"
    }
  ] satisfies BabySharkUpdate[],
  /** 今後の出演日・告知を足す用の空配列（確定情報のみ追記） */
  upcomingAppearances: [] as {
    id: string;
    dateLabel: string;
    venue?: string;
    note?: string;
    sourceUrl?: string;
  }[],
  futureUpdateNote: "優花子さんの出演情報が発表され次第、こちらで更新します。"
} as const;

export const babySharkGalleryImages = babySharkLive.images.filter(
  (image) => image.kind === "gallery" || image.kind === "experience"
);
