// BABY SHARK LIVE！ The Hidden Treasure — 代表出演作品特集
// 新しい出演告知・写真・コメントを足すときは、このファイルの配列へ追記するだけでよい。
// updates / upcomingAppearances は配列末尾へ追加してよい（表示は新しい順に並び替える）。

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
  videos?: BabySharkVideo[];
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

export type BabySharkVideo = {
  src: string;
  poster?: string;
  label: string;
  caption?: string;
};

export type BabySharkTourSource = {
  id: string;
  date: string;
  dateLabel: string;
  url: string;
  label: string;
};

export type BabySharkArchiveDate = {
  region: string;
  dateLabel: string;
  times: string;
  venue: string;
};

export type BabySharkAppearance = {
  id: string;
  dateLabel: string;
  venue?: string;
  note?: string;
  sourceUrl?: string;
};

export type BabySharkStage = {
  /** ①②などの回名 */
  label: string;
  /** 開演時刻（HH:mm） */
  time: string;
  /** 「お見送り有」などの補足 */
  note?: string;
};

/** 優花子さんの出演が本人告知で確認できた公演日 */
export type BabySharkTourDate = {
  id: string;
  region: string;
  /** 公演日（YYYY-MM-DD, JST） */
  date: string;
  dateLabel: string;
  venue: string;
  /** 会場の住所（会場公式サイト等で確認したもの） */
  address: string;
  /** 最寄り駅からのアクセス */
  access: string;
  /** Google マップ検索URL（住所で開く） */
  mapUrl: string;
  /** 会場の公式サイト */
  venueUrl: string;
  stages: BabySharkStage[];
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
  workStatus: "作品は全国公演継続中",
  /** 優花子さん個人の出演予定についての注記 */
  appearanceNote:
    "本人告知で確認できた2026年の出演公演を掲載中。追加の告知があれば更新します",
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
  ogImage: "/images/og/yukako-baby-shark-live-1200x630.jpg",
  ogImageAlt: "BABY SHARK LIVE！ 吉井優花子 出演記録",
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
   * 追加時は public/images/baby-shark/ に配置 → pnpm images:build → ここへ追記。
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
  /**
   * 2026年の出演公演。優花子さん本人のInstagram告知で確認できた日程だけを載せる。
   * 追加公演が告知されたら dates へ追記する（表示は日付順、終演済みは自動でグレーになる）。
   */
  tour2026: {
    sources: [
      {
        id: "instagram-2026-05-28",
        date: "2026-05-28",
        dateLabel: "2026年5月28日",
        url: "https://www.instagram.com/p/DY4au0dmbOg/",
        label: "5/28のInstagram投稿を見る"
      },
      {
        id: "instagram-story-2026-08-21",
        date: "2026-08-21",
        dateLabel: "2026年8月21日",
        url: "https://www.instagram.com/yoppy_777",
        label: "Instagram（@yoppy_777）へ"
      }
    ] satisfies BabySharkTourSource[],
    officialUrl: "https://babyshark-live-japan.com/ticket/",
    image: {
      src: "/images/baby-shark/baby-shark-schedule-2026.jpg",
      alt: "ベイビーシャークライブ2026年の公演日程。神奈川・海老名公演は5月30日（土）海老名市文化会館 大ホール ①12:30 ②14:50（お見送り有）、埼玉・大宮公演は6月7日（日）大宮ソニックシティ 大ホール ①11:00 ②13:30（お見送り有）、岐阜・大垣公演は8月22日（土）大垣市スイトピアセンター 文化ホール ①12:30 ②14:30（お見送り有）",
      caption: "本人の5/28 Instagram告知より（海老名・大宮・大垣）",
      available: true
    },
    dates: [
      {
        id: "ebina-2026-05-30",
        region: "神奈川・海老名",
        date: "2026-05-30",
        dateLabel: "2026年5月30日（土）",
        venue: "海老名市文化会館 大ホール",
        address: "神奈川県海老名市めぐみ町6番1号",
        access: "小田急小田原線・相鉄線 海老名駅 西口から徒歩5分／JR相模線 海老名駅 東口から徒歩5分",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E6%B5%B7%E8%80%81%E5%90%8D%E5%B8%82%E3%82%81%E3%81%90%E3%81%BF%E7%94%BA6%E7%95%AA1%E5%8F%B7%20%E6%B5%B7%E8%80%81%E5%90%8D%E5%B8%82%E6%96%87%E5%8C%96%E4%BC%9A%E9%A4%A8",
        venueUrl: "https://www.ebina-bunka.jp/",
        stages: [
          { label: "①", time: "12:30" },
          { label: "②", time: "14:50", note: "お見送り有" }
        ]
      },
      {
        id: "omiya-2026-06-07",
        region: "埼玉・大宮",
        date: "2026-06-07",
        dateLabel: "2026年6月7日（日）",
        venue: "大宮ソニックシティ 大ホール",
        address: "埼玉県さいたま市大宮区桜木町1-7-5",
        access: "JR・東武野田線 大宮駅 西口から徒歩3分",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=%E5%9F%BC%E7%8E%89%E7%9C%8C%E3%81%95%E3%81%84%E3%81%9F%E3%81%BE%E5%B8%82%E5%A4%A7%E5%AE%AE%E5%8C%BA%E6%A1%9C%E6%9C%A8%E7%94%BA1-7-5%20%E5%A4%A7%E5%AE%AE%E3%82%BD%E3%83%8B%E3%83%83%E3%82%AF%E3%82%B7%E3%83%86%E3%82%A3",
        venueUrl: "https://www.sonic-city.or.jp/",
        stages: [
          { label: "①", time: "11:00" },
          { label: "②", time: "13:30", note: "お見送り有" }
        ]
      },
      {
        id: "ogaki-2026-08-22",
        region: "岐阜・大垣",
        date: "2026-08-22",
        dateLabel: "2026年8月22日（土）",
        venue: "大垣市スイトピアセンター 文化ホール",
        address: "岐阜県大垣市室本町5-51",
        access: "JR大垣駅から徒歩15分／養老鉄道 室駅から徒歩5分",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=%E5%B2%90%E9%98%9C%E7%9C%8C%E5%A4%A7%E5%9E%A3%E5%B8%82%E5%AE%A4%E6%9C%AC%E7%94%BA5-51%20%E5%A4%A7%E5%9E%A3%E5%B8%82%E3%82%B9%E3%82%A4%E3%83%88%E3%83%94%E3%82%A2%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC",
        venueUrl: "https://www.og-bunka.or.jp/",
        stages: [
          { label: "①", time: "12:30" },
          { label: "②", time: "14:30", note: "お見送り有" }
        ]
      },
      {
        id: "fukuyama-2026-09-19",
        region: "広島・福山",
        date: "2026-09-19",
        dateLabel: "2026年9月19日（土）",
        venue: "ふくやま芸術文化ホール リーデンローズ",
        address: "広島県福山市松浜町二丁目1番10号",
        access: "JR福山駅南口からタクシー約10分、徒歩約25分／南口・北口から路線バスあり",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=%E5%BA%83%E5%B3%B6%E7%9C%8C%E7%A6%8F%E5%B1%B1%E5%B8%82%E6%9D%BE%E6%B5%9C%E7%94%BA%E4%BA%8C%E4%B8%81%E7%9B%AE1%E7%95%AA10%E5%8F%B7%20%E3%81%B5%E3%81%8F%E3%82%84%E3%81%BE%E8%8A%B8%E8%A1%93%E6%96%87%E5%8C%96%E3%83%9B%E3%83%BC%E3%83%AB%20%E3%83%AA%E3%83%BC%E3%83%87%E3%83%B3%E3%83%AD%E3%83%BC%E3%82%BA",
        venueUrl: "https://www.fukuyamabunkahall.jp/r-rose/",
        stages: [
          { label: "①", time: "11:30" },
          { label: "②", time: "14:00", note: "お見送り有" }
        ]
      },
      {
        id: "kurume-2026-09-20",
        region: "福岡・久留米",
        date: "2026-09-20",
        dateLabel: "2026年9月20日（日）",
        venue: "久留米シティプラザ ザ・グランドホール",
        address: "福岡県久留米市六ツ門町8-1",
        access: "西鉄久留米駅からタクシー約4分、路線バス約5分、徒歩約10分／JR久留米駅からタクシー約7分、路線バス約10分、徒歩約20分",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=%E7%A6%8F%E5%B2%A1%E7%9C%8C%E4%B9%85%E7%95%99%E7%B1%B3%E5%B8%82%E5%85%AD%E3%83%84%E9%96%80%E7%94%BA8-1%20%E4%B9%85%E7%95%99%E7%B1%B3%E3%82%B7%E3%83%86%E3%82%A3%E3%83%97%E3%83%A9%E3%82%B6",
        venueUrl: "https://kurumecityplaza.jp/",
        stages: [
          { label: "①", time: "11:30" },
          { label: "②", time: "14:00", note: "お見送り有" }
        ]
      }
    ] satisfies BabySharkTourDate[]
  },
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
  /** 新しい活動記録は配列の末尾へ追加。表示は date の新しい順。 */
  updates: [
    {
      id: "instagram-2024-03-01",
      date: "2024-03-01",
      dateLabel: "2024年3月1日",
      title: "初日を迎えて",
      body: [
        "初日公演を終え、ヤドカリのヘッティーと海賊のパールとして皆さんに会えたこと、楽しそうな笑顔を見られたことへの喜びを綴っています。",
        "「この後も、海の仲間たちとの冒険は続きます」と、全国公演への期待も伝えました。"
      ],
      sourceUrl:
        "https://www.instagram.com/p/C3-IholvnW4/?img_index=4&igsh=aGhuc2Z0NGZlbWc3",
      sourceLabel: "Instagramの元投稿を見る",
      kind: "comment"
    },
    {
      id: "instagram-2026-05-28",
      date: "2026-05-28",
      dateLabel: "2026年5月28日",
      title: "2026年の出演回のお知らせ",
      body: [
        "神奈川・海老名（5/30）、埼玉・大宮（6/7）、岐阜・大垣（8/22）の3公演。いずれも2回公演で、2回目は終演後にお見送りあり。",
        "「みんなと会えることを楽しみにしています☺️♪」——ヘッティー🐚&パール🏴‍☠️"
      ],
      sourceUrl: "https://www.instagram.com/p/DY4au0dmbOg/",
      sourceLabel: "Instagramの元投稿を見る",
      kind: "announcement"
    },
    {
      id: "baby-shark-instagram-story-2026-08-21",
      date: "2026-08-21",
      dateLabel: "2026年8月21日",
      title: "大垣へ。そして来月は福山・久留米へ",
      body: [
        "「明日は岐阜❤️\n来月は広島と福岡✨」——8月22日の大垣公演を前に、BABY SHARK LIVE! の出演予定をInstagramストーリーズでお知らせ。",
        "「メインシンガーを務めている\nミュージカルです♪\nぜひ来てね🥺✨」——2026年のツアースケジュールとともに、大垣・福山・久留米へ。"
      ],
      videos: [
        {
          src: "/videos/baby-shark/baby-shark-instagram-story-2026-08-21-01.mp4",
          label: "8/21 Instagram Story｜「明日は岐阜、来月は広島と福岡」"
        },
        {
          src: "/videos/baby-shark/baby-shark-instagram-story-2026-08-21-02.mp4",
          label: "8/21 Instagram Story｜BABY SHARK LIVE! 公演案内"
        }
      ],
      sourceUrl: "https://www.instagram.com/yoppy_777",
      sourceLabel: "優花子さんのInstagramを見る",
      kind: "announcement"
    }
  ] satisfies BabySharkUpdate[],
  /** 今後の出演日・告知を足す用（確定情報のみ追記）。空のときは一覧を出さない。 */
  upcomingAppearances: [] as BabySharkAppearance[],
  futureUpdateNote: "優花子さんの出演情報が発表され次第、こちらで更新します。"
} as const;

export const babySharkGalleryImages = babySharkLive.images.filter(
  (image) => image.kind === "gallery" || image.kind === "experience"
);

/** 活動記録を date の新しい順で返す（配列末尾追加でも表示は新しい順） */
export function getBabySharkUpdatesNewestFirst(): BabySharkUpdate[] {
  return [...babySharkLive.updates].sort((a, b) => b.date.localeCompare(a.date));
}

const toTokyoDateKey = (now: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(now);

export type BabySharkTourDateWithStatus = BabySharkTourDate & {
  /** upcoming = これから / today = 当日 / past = 終演 */
  status: "upcoming" | "today" | "past";
};

/** 2026年の出演公演を日付順（古い順）で返す。当日・終演の判定つき。 */
export function getBabySharkTourDates2026(
  now: Date = new Date()
): BabySharkTourDateWithStatus[] {
  const today = toTokyoDateKey(now);
  return [...babySharkLive.tour2026.dates]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item) => ({
      ...item,
      status: item.date === today ? "today" : item.date > today ? "upcoming" : "past"
    }));
}

/** 次に控えている出演公演（当日を含む）。すべて終演していれば null。 */
export function getBabySharkNextTourDate(
  now: Date = new Date()
): BabySharkTourDateWithStatus | null {
  return getBabySharkTourDates2026(now).find((item) => item.status !== "past") ?? null;
}
