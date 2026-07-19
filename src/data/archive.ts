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

/** 本人投稿の原文（折りたたみ表示用）。改行・絵文字をそのまま保持する */
export type ArchiveOriginalPost = {
  heading: string;
  body: string;
  authorLabel?: string;
  dateLabel?: string;
  platformLabel?: string;
};

export type ArchiveItem = {
  slug: string;
  title: string;
  shortTitle: string;
  /** タイトル直下のサブタイトル（任意） */
  subtitle?: string;
  /** 日付付近に添える短い移動記号など（任意） */
  journeyMark?: string;
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
  /** 専用OG画像を使う場合の具体的な代替テキスト。省略時は同じsrcのimages項目かimages[0]を使う */
  ogImageAlt?: string;
  video?: ArchiveVideo;
  /** このインデックス（0始まり）の sections の直後に動画を表示。省略時は本文の末尾 */
  videoAfterSectionIndex?: number;
  /** 本人が綴った投稿原文。details で折りたたみ表示する */
  originalPost?: ArchiveOriginalPost;
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
      "「MISS GRAND JAPAN 2025」でMISS PEACE賞を受賞。平和的な活動への姿勢と、ファイナリスト一人ひとりを気にかけてきた行動が仲間からも認められた、挑戦の記録です。",
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
        heading: "過去の経験と、受賞の意味",
        body: [
          "投稿では、これまで人間関係の中で傷つき、苦しんできた経験についても率直に綴られています。",
          "その経験を踏まえ、信念や人への接し方が仲間から認められたことへの思いを綴っています。"
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
    ogImage: "/images/og/yukako-mgj-2025-miss-peace-1200x630.jpg",
    ogImageAlt:
      "赤いイブニングガウンでMISS PEACE賞のトロフィーを持つ吉井優花子さんと受賞記事タイトルを配したSNS共有画像",
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
    dateModified: "2026-07-19"
  },
  {
    slug: "2022-10-01-akita-to-tokyo",
    title: "秋田から東京へ――俳優として歩み出した日",
    shortTitle: "秋田から東京へ・俳優として歩み出した日",
    subtitle:
      "2022年10月1日、夢を追うために東京へ。家族や故郷への思いを胸に、新しい一歩を踏み出した日の記録。",
    journeyMark: "秋田 👹🌾 → 東京 🗼✨",
    date: "2022.10.01",
    year: "2022",
    platform: "Instagram",
    category: "秋田・地域活動",
    tags: ["転機", "上京", "原点", "俳優への挑戦"],
    summary:
      "公務員を退職し、初舞台の稽古にできる限り参加するため、秋田から東京へ拠点を移した2022年10月1日。家族や故郷、応援してくれる人への思いと、俳優として夢に挑み続ける覚悟を綴った、吉井優花子さんの原点となる投稿です。",
    lead: [
      "2022年10月1日。",
      "吉井優花子さんは、俳優として本格的に活動するため、故郷・秋田を離れ、東京へ拠点を移しました。",
      "公務員を退職してから約半年。12月に控えていた初舞台の稽古へできる限り参加し、より多くのチャンスをつかむために決断した上京でした。",
      "投稿には、新しい挑戦への覚悟だけでなく、離れて暮らすことになる家族への思い、応援してくれる人への感謝、過去の経験を糧に前へ進もうとする強さが、本人の言葉で丁寧に記されています。",
      "現在へと続く吉井優花子さんの歩みを知るうえで、大切な原点の一つです。"
    ],
    sections: [
      {
        heading: "上京という決断",
        body: [
          "3月に公務員を退職したあと、夏の移住をぼんやり考えていた時期もあったといいます。夏には動かず、12月の初舞台へ向けて稽古へ極力参加するため、この日に拠点を移すことを決めた。",
          "東京に拠点を置くメリットを活かし、果敢に挑戦してチャンスをつかんでいく——そんな決意が、投稿の冒頭にあります。"
        ]
      },
      {
        heading: "家族と故郷への思い",
        body: [
          "秋田にはできるだけ帰る、大切な人たちを大切にしたい、という気持ちも同時に綴られています。",
          "母親との別れの日の出来事や、新幹線での涙、そして仲直りできたこと。一番近くで苦楽を共にしてくれた存在に、輝いているところをたくさん見せたいという願いが記されています。"
        ]
      },
      {
        heading: "経験を糧に、夢へ",
        body: [
          "学生時代からの傷つきやすさや、うまくいかないと感じた日々についても、率直に触れられています。",
          "そのうえで、やりたいことをやる行動力、まわりを考える思いやり、何度でも立ち上がる逞しさを得られたこと。経験を糧にできるところを強みとして、負けずに夢へ挑戦していく——その言葉が、この日の核心です。"
        ]
      },
      {
        heading: "いまにつながる原点",
        body: [
          "「必ず大きくなって秋田に帰ってくる。」「いってきます！」——投稿の締めくくりは、故郷への約束と、新しい土地への一歩です。",
          "この日の記録は、その後の舞台デビュー、映像、ミスコン、プロデュース公演へと続く歩みの起点として、いまも読む人に届きます。"
        ]
      }
    ],
    quotes: [
      {
        text: "もっと“吉井優花子”が届くように頑張りたい。",
        afterSectionIndex: 1
      },
      {
        text: "だから負けない。私自身の強みで今後も夢に挑戦していく。",
        afterSectionIndex: 2
      },
      {
        text: "必ず大きくなって秋田に帰ってくる。",
        afterSectionIndex: 3
      }
    ],
    images: [
      {
        src: "/images/yukako-tokyo-20221001.jpg",
        alt: "東京への移住を開始した2022年10月1日、秋田犬の大型ぬいぐるみと撮影した吉井優花子さん"
      }
    ],
    ogImage: "/images/yukako-tokyo-20221001.jpg",
    ogImageAlt:
      "秋田犬の大型ぬいぐるみと並び、東京への移住を始めた日の吉井優花子さん",
    originalPost: {
      heading: "本人が綴った当時の言葉を読む",
      authorLabel: "吉井優花子さん（@yoppy_777）",
      dateLabel: "2022年10月1日",
      platformLabel: "Instagram",
      // 改行・顔文字・絵文字を原文どおり保持するため、行配列で持つ
      body: [
        "💐",
        "",
        "今日から東京です🗼",
        "あまり推敲してないため、行ったり来たりな中身ですが、心の内を⬇️",
        "",
        "3月に公務員をやめて、夏に移動かなとぼんやり考えてたけど、夏には移住せず…",
        "12月に控えている初舞台の稽古に極力参加するため、今日から移住することに。",
        "東京に拠点を置くことのメリットを考え、活用していきたいな。",
        "時間はあっという間に過ぎていくから、果敢に挑戦してたくさんのチャンスを掴んでいかなきゃ。",
        "",
        "秋田にはできるだけ帰ってこようと思っています。",
        "甘えではなく、大切な人たちを大切にしたいから(´ . .̫ . `)",
        "そのためにもやるべきことはやらないといけない。",
        "自分を鼓舞して踏ん張ります。",
        "",
        "秋田最後の日に母親と喧嘩をして(しかも私が悪い)",
        "寂しい思いをさせていることと、",
        "喧嘩で嫌な気持ちにまでさせてごめんねって気持ちで",
        "新幹線で涙が止まらなくて",
        "ますます頑張らなきゃと思った。",
        "(バイバイの前に仲直りはできました🍀)",
        "一番近くで苦楽を共にしてくれた、そして今も応援してくれている大切な存在に、輝いているところをたくさん見せたい。",
        "",
        "いつも応援してくれている全員に、",
        'もっと"吉井優花子"が届くように頑張りたい。',
        "",
        "私は、昔からできることも多かったから器用さには自信があったけど",
        "無視や仲間外れはよくされて落ち込んで過ごしていたし、自分の未熟さ故に身から出た錆もあれば、そうじゃないのに傷ついたこともたくさんあった。",
        "まわりとテンションが合わないと感じたり、どうして自分はうまくいかないんだろうと悩んだりする日々ばかり。",
        "気づきやすいし、傷つきやすいし、気にしいな性格だからすごく苦しかった。",
        "閉ざしてしまうと言いたいことが言えない性分だから、後からもやもやすることもあったなあ。",
        "つらい過去、多いなとしみじみ（´-`）もう大丈夫だけど👌",
        "学生時代の自分に会えたら、「人それぞれ違うもので、ただ合わないだけだから、気にしないで自分磨きだけ頑張り！」って言いたいです。",
        "今でも抱えている傷も、正直自信がない部分も、大人なのに未熟なところも、感じている。25歳なのにスイッチ入ってないとだめだめなところも( ; ･᷅ὢ･᷄ )",
        "そんな私でも、これまでの色々な経験から、",
        "やりたいことをやる行動力と",
        "常にまわりのことを考える思いやりと",
        "何度でも立ち上がる逞しさを得られた。",
        "こうやって経験を糧にできるところも強みだと思う。",
        "だから負けない。私自身の強みで今後も夢に挑戦していく。",
        "そして、どんなときでも、私のそばにいてくれる人たちに心を向けることを大切にしたい。",
        "( みんないつもありがとう( ⸝⸝⸝˘ω˘⸝⸝⸝)ﾍﾟｺﾘ )",
        "",
        "改めて、",
        "ここに記したことに意味を持たせられるように新天地で頑張ります。",
        "",
        "必ず大きくなって秋田に帰ってくる。",
        "",
        "いってきます！",
        "",
        "👹🌾▷🗼✨",
        "",
        "---------------",
        "✿2022.10.1✿",
        "#yukakophoto",
        "---------------"
      ].join("\n")
    },
    sourceUrl: {
      label: "Instagramで当時の投稿を見る",
      url: "https://www.instagram.com/p/CjKI6d_vdwy/?igsh=dXJrMDh6bHUzYzg0"
    },
    relatedUrls: [],
    seoTitle: "秋田から東京へ――俳優として歩み出した日｜吉井優花子 応援ポータル",
    seoDescription:
      "2022年10月1日、吉井優花子さんが俳優として本格的に活動するため、秋田から東京へ拠点を移した日の記録。家族や故郷への思い、応援してくれる人への感謝、新天地で夢に挑む決意を紹介します。",
    datePublished: "2022-10-01",
    dateModified: "2026-07-19"
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
