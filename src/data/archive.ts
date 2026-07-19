// YUKAKO STORY ARCHIVE｜活動の軌跡
// 吉井優花子さんのSNS投稿・活動記録を、ファン編集記事としてまとめるアーカイブのデータソース。
// 新しい記事を追加するときは `docs/ARCHIVE_TEMPLATE.md` を参照。配列末尾に追加すればよい
// （表示順は featured → datePublished の新しい順に自動で並び替わる）。

export type ArchiveCategory =
  | "受賞・ミスコン"
  | "舞台・出演"
  | "モデル・撮影"
  | "映像・CM"
  | "イベント"
  | "秋田・地域活動"
  | "配信・SNS"
  | "オフショット";

export type ArchivePlatform = "Instagram" | "X" | "TikTok" | "YouTube" | "公式発表";

export type ArchiveImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ArchiveVideo = {
  /** "local" = public/videos の自己ホストmp4 / "drive" = Googleドライブ埋め込み */
  type: "local" | "drive";
  src: string;
  poster: string;
  heading: string;
  subheading: string;
  description: string;
  /** aria-label（local）または iframe title（drive）に使う */
  label: string;
  /** 再生できない場合の代替リンク先（元投稿など） */
  fallbackUrl: string;
};

export type ArchiveSection = {
  heading: string;
  body: string[];
};

export type ArchiveQuote = {
  text: string;
  /** このインデックス（0始まり）の sections の直後に表示。省略時はリード文の直後 */
  afterSectionIndex?: number;
};

export type ArchiveLink = {
  label: string;
  url: string;
};

export type ArchiveAward = {
  event: string;
  title: string;
  yearLabel: string;
};

export type ArchiveItem = {
  slug: string;
  title: string;
  shortTitle: string;
  /** 表示用の日付（例: 2025.09.11） */
  date: string;
  year: string;
  platform: ArchivePlatform;
  category: ArchiveCategory;
  tags: string[];
  /** 一覧カード用の短い概要 */
  summary: string;
  /** 記事冒頭のリード文（段落ごとに配列） */
  lead: string[];
  sections: ArchiveSection[];
  quotes: ArchiveQuote[];
  /** images[0] を記事冒頭のメインビジュアルとして使用 */
  images: ArchiveImage[];
  /** OGP/SNSカードに使う画像（images内のsrcを指定）。省略時は images[0] */
  ogImage?: string;
  video?: ArchiveVideo;
  /** このインデックス（0始まり）の sections の直後に動画を表示。省略時は本文の末尾 */
  videoAfterSectionIndex?: number;
  sourceUrl: ArchiveLink;
  relatedUrls: ArchiveLink[];
  award?: ArchiveAward;
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
  /** 撮影・提供クレジット（確認できている場合のみ設定） */
  credit?: string;
  /** JSON-LD用のISO日付。datePublished=出来事の日付、dateModified=サイトに記事を掲載した日付 */
  datePublished: string;
  dateModified: string;
};

export const archiveItems: ArchiveItem[] = [
  {
    slug: "miss-grand-japan-2025-miss-peace",
    title:
      "「みんなで楽しく平和に」を貫いて　MISS GRAND JAPAN 2025「MISS PEACE賞」を受賞",
    shortTitle: "MISS GRAND JAPAN 2025 MISS PEACE賞受賞",
    date: "2025.09.11",
    year: "2025",
    platform: "Instagram",
    category: "受賞・ミスコン",
    tags: ["受賞", "ミスコン", "MISS GRAND JAPAN", "MISS PEACE賞"],
    summary:
      "「MISS GRAND JAPAN 2025」でMISS PEACE賞を受賞。平和的な活動への姿勢や、ファイナリスト一人ひとりを気にかけてきた行動が仲間からも認められました。Top9には届かなかったものの、参加目的を見失わず、最後まで自分らしく駆け抜けた挑戦の記録です。",
    lead: [
      "仲間への思いやりと、「誰もが安心して輝ける社会」への信念。",
      "吉井優花子さんが大会を通して大切にしてきた姿勢が、「MISS PEACE賞」という一つの形になった日を振り返ります。"
    ],
    sections: [
      {
        heading: "MISS PEACE賞という結果",
        body: [
          "吉井優花子さんは「MISS GRAND JAPAN 2025」で、MISS PEACE賞を受賞しました。会場はMSCベリッシマ号。",
          "この賞は、大会のコンセプトを理解し、平和的な活動へ積極的に取り組んだファイナリストに贈られるものです。ファイナリスト同士による投票も行われ、受賞後には仲間から多くの温かい言葉が届けられました。"
        ]
      },
      {
        heading: "「誰もが安心して輝ける社会」を目指して",
        body: [
          "大会への参加にあたって優花子さんが大切にしていたのは、「誰かが理不尽に悲しむことなく、みんなで楽しく平和に」という思いでした。",
          "自分だけが評価されることを目指すのではなく、ファイナリストチーム全体が誰もが安心して輝ける場所になるように、一人ひとりを気にかけながら行動していたことが投稿で語られています。"
        ]
      },
      {
        heading: "仲間から届けられた言葉",
        body: [
          "受賞後、ファイナリストやディレクターから、「PEACEは絶対優花子だと思っていた」「優花子に投票した」「優花子でよかった」「自分も嬉しい」といった言葉が届けられました。",
          "トロフィーを受け取り、仲間たちの笑顔を見た瞬間は、優花子さんにとって忘れられない時間になりました。"
        ]
      },
      {
        heading: "過去の経験を明るく照らした瞬間",
        body: [
          "投稿では、これまで人間関係の中で傷つき、苦しんできた経験についても率直に綴られています。",
          "だからこそ、自分の信念や人への接し方が仲間から認められたことは、単なる受賞以上の意味を持つ出来事となりました。"
        ]
      },
      {
        heading: "自分らしく駆け抜けた挑戦",
        body: [
          "Top9へ進めなかったことへの残念さや、応援してくれた人への申し訳なさも語られています。",
          "一方で、初めて挑戦した世界最大級のミスコンを、参加目的からブレることなく最後まで楽しみ、できる限りの力でやりきったことも記されています。100時間以上の講義で得た学びや、ファイナリストとの出会いは、次の活動へつながる大切な宝物になりました。"
        ]
      },
      {
        heading: "これからへ",
        body: [
          "受賞という結果だけではなく、優花子さんが大切にしてきた信念、仲間との絆、応援への感謝が刻まれた挑戦でした。",
          "この経験は、その後の俳優、モデル、ライバー、そしてプロデューサーとしての活動へとつながっていきます。"
        ]
      }
    ],
    quotes: [
      { text: "誰もが安心して輝ける社会", afterSectionIndex: 1 },
      { text: "私の信念と特性が結果を掴んだ", afterSectionIndex: 3 },
      { text: "大変だった、でも挑戦してよかった！", afterSectionIndex: 5 }
    ],
    images: [
      {
        src: "/images/yukako-miss-grand-japan-2025-peace-trophy.jpg",
        alt: "MISS GRAND JAPAN 2025の会場で掲げられたMISS PEACE賞のトロフィー"
      },
      {
        src: "/images/yukako-mgj-award.jpg",
        alt: "MISS GRAND JAPAN 2025のステージで、赤いイブニングガウンを着てMISS PEACE賞のトロフィーを持つ吉井優花子さん"
      }
    ],
    ogImage: "/images/yukako-mgj-award.jpg",
    video: {
      type: "local",
      src: "/videos/miss-grand-japan-2025-stage-720.mp4",
      poster: "/images/yukako-mgj-award.jpg",
      heading: "Stage Movie",
      subheading: "ステージで見せた、堂々としたパフォーマンス",
      description:
        "大会のステージでは、ダンスやウォーキング、表情を通して自身の魅力を表現しました。写真だけでは伝わらない、ステージ上での姿をご覧ください。",
      label: "MISS GRAND JAPAN 2025 ステージパフォーマンス動画",
      fallbackUrl: "https://www.instagram.com/p/DOd2DpckhV0/?igsh=eGowMDQwMTE5eDU0"
    },
    videoAfterSectionIndex: 4,
    sourceUrl: {
      label: "Instagramで本人の投稿を読む",
      url: "https://www.instagram.com/p/DOd2DpckhV0/?igsh=eGowMDQwMTE5eDU0"
    },
    relatedUrls: [
      {
        label: "大会の様子を公式YouTubeで見る",
        url: "https://www.youtube.com/live/SaX-uoZU9Ys?si=UmNYVWWNzgXTyAXE"
      }
    ],
    award: {
      event: "MISS GRAND JAPAN 2025",
      title: "MISS PEACE賞",
      yearLabel: "2025 AWARD"
    },
    featured: true,
    seoTitle:
      "吉井優花子、MISS GRAND JAPAN 2025でMISS PEACE賞を受賞｜活動アーカイブ",
    seoDescription:
      "吉井優花子さんがMISS GRAND JAPAN 2025で受賞したMISS PEACE賞。仲間への思いやりと「誰もが安心して輝ける社会」への信念が認められた挑戦を、写真と動画で振り返ります。",
    datePublished: "2025-09-11",
    dateModified: "2026-07-18"
  }
];

export const getArchiveItemBySlug = (slug: string) =>
  archiveItems.find((item) => item.slug === slug);

// 一覧の表示順: featured を先頭に固定し、あとは datePublished（ISO形式なので文字列比較で正しく並ぶ）の新しい順。
// 表示用の date（"2025.09.11"）はゼロ埋め忘れで並びが壊れるため、ソートには使わない。
export const sortedArchiveItems = [...archiveItems].sort((a, b) => {
  const featuredDiff = Number(b.featured ?? false) - Number(a.featured ?? false);
  if (featuredDiff !== 0) return featuredDiff;
  return b.datePublished.localeCompare(a.datePublished);
});
