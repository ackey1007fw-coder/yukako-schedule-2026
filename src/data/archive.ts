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
  sourceUrl: ArchiveLink;
  /** 元投稿ボタン直前の案内文（任意） */
  sourceNote?: string;
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
    slug: "2026-06-11-gojet-produce-announce",
    title:
      "思い出の舞台を、今度はプロデューサーとして― 『GO,JET!GO!GO! vol.1 Premium』始動",
    shortTitle: "『GO,JET!GO!GO!』プロデュース発表",
    subtitle: "ゆかJETの始まり。出演者として挑んだ作品へ、プロデューサーとして向き合う発表の記録。",
    date: "2026.06.11",
    year: "2026",
    platform: "Instagram",
    category: "舞台・出演",
    tags: [
      "ゆかJET",
      "GOJET",
      "舞台",
      "プロデュース",
      "キャスティング",
      "ミュージカル",
      "吉井優花子"
    ],
    summary:
      "2026年6月11日、吉井優花子さんが思い出の舞台『GO,JET!GO!GO!』をプロデュースすることを発表。出演者として挑戦した作品へ、今度はプロデューサーとして向き合う、#ゆかJETの原点となる投稿です。",
    lead: [
      "吉井優花子さんにとって、芸能活動を始めて間もない頃に出演した思い出深い作品『GO,JET!GO!GO!』。",
      "歌もダンスも未経験だった当時、誰よりも早く稽古場へ向かい、わずか1週間ほどで16曲を覚えながら、仲間とともに舞台をつくり上げました。",
      "それから約3年。かつて出演者として挑戦した作品に、今度はプロデューサーとして携わることを発表。",
      "歌、ダンス、コメディ、そして愛と挑戦にあふれた新しい『GO,JET!GO!GO!』が、ここから動き始めました。"
    ],
    sections: [
      {
        heading: "投稿本文（2026年6月11日）",
        body: [
          "【7月舞台プロデュース】",
          "思い出の舞台『GO,JET!GO!GO!』をプロデュースすることになりました。歌×ダンス×コメディの舞台です。",
          "脚本も一部変更したり、歌を増やしたり、オリジナルにしますよ。",
          "『かわええのう、龍馬くん』に引き続き、愛と挑戦のあるおもしろい舞台にします。",
          "［本番は7月23日(木)〜7月27日(月)］ぜひ観に来てください。配信でもご視聴いただけます。",
          "若干名、役者を募集しています。キャスティングと配役にはこだわっています。そして、私はご本人のやる気を大切にしています。",
          "「即戦力です！」「挑戦したい！」という方は、お気軽にご連絡ください。",
          "☆7月に限らず、拡大させながら舞台を作っていきます！☆男役希望の女性にも、たくさん巡り逢いたいです。",
          "✿ 2026.6.11 ✿ #yukakophoto #舞台 #キャスティング #gojet #ミュージカル"
        ]
      },
      {
        heading: "出演者からプロデューサーへ",
        body: [
          "吉井優花子さんにとって『GO,JET!GO!GO!』は、芸能活動を始めて間もない頃に出演した、思い出深い作品です。",
          "当時は歌もダンスも未経験ながら、GO,JET! Girlsのリーダー・早紀役を担当。短い稽古期間の中で多くの楽曲を覚え、仲間とともに舞台へ挑戦しました。",
          "その経験から約3年を経て、今度は出演者が安心して挑戦し、成長できる環境をつくるプロデューサーという立場へ。",
          "「愛のある作品づくり」を掲げた、吉井優花子さんの新たな挑戦の始まりです。"
        ]
      },
      {
        heading: "公演情報（発表当時／現在の公演データ）",
        body: [
          "作品名：吉井優花子プロデュース『GO,JET!GO!GO! vol.1 Premium 〜 I LOVE YOU が言えなくて 〜』",
          "公演期間：2026年7月23日（木）〜7月27日（月）",
          "会場：Air studio 両国（東京都墨田区両国2-18-7 地下1階）※作品の舞台設定は BAR「Samasama」",
          "ジャンル：歌×ダンス×コメディ",
          "特徴：全編オリジナル楽曲／脚本の一部を新しく構成／歌・ダンス・笑いを盛り込んだエンターテインメント作品／愛と挑戦をテーマにした舞台／劇場公演と配信を予定"
        ]
      }
    ],
    quotes: [
      {
        text: "愛のある作品づくりを目指して",
        afterSectionIndex: 1
      }
    ],
    images: [
      {
        src: "/images/yukako-gojet-produce-announce-microphone-2026-06-11.jpg",
        alt: "ヴィンテージ風のステージでマイクを持つ吉井優花子さん"
      },
      {
        src: "/images/yukako-gojet-produce-announce-message-2026-06-11.jpg",
        alt: "GO,JET!への思いと愛のある作品づくりについて記された吉井優花子さんのメッセージ"
      },
      {
        src: "/images/yukako-gojet-produce-announce-flyer-2026-06-11.jpg",
        alt: "吉井優花子プロデュース『GO,JET!GO!GO! vol.1 Premium』公演紹介"
      }
    ],
    sourceUrl: {
      label: "Instagramで元の投稿を見る",
      url: "https://www.instagram.com/p/DZch0STFB0M/?igsh=MWt2amJ6djV3ZGZnaA=="
    },
    sourceNote:
      "2026年6月11日時点の発表投稿です。投稿内の出演者募集は当時の案内であり、現在の募集状況を示すものではありません。最新の公演・チケット情報はゆかJET特集と公演ページへ。",
    relatedUrls: [
      {
        label: "ゆかJET特集を見る",
        url: "/#next"
      },
      {
        label: "『GO,JET!GO!GO! vol.1 Premium』の最新情報を見る",
        url: "https://premiumgoyukajet.hp.peraichi.com/"
      },
      {
        label: "稽古から本番までの記録を見る",
        url: "/#gojet-feature-updates"
      }
    ],
    featured: true,
    seoTitle: "吉井優花子『GO,JET!GO!GO!』プロデュース発表｜ゆかJET",
    seoDescription:
      "吉井優花子さんが、思い出の舞台『GO,JET!GO!GO!』をプロデュースすることを発表。出演者として挑戦した作品へ、今度はプロデューサーとして向き合う新たな一歩を紹介します。",
    datePublished: "2026-06-11",
    dateModified: "2026-07-19"
  },
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
      "同年3月に公務員を退職した吉井優花子さんは、12月に控えていた初舞台の稽古にできる限り参加するため、故郷・秋田から東京へ拠点を移しました。",
      "投稿には、新しい挑戦への覚悟だけでなく、離れて暮らす家族への思い、応援してくれる人への感謝、過去の経験を糧に前へ進もうとする強さが、本人の言葉で丁寧に記されています。",
      "現在へと続く吉井優花子さんの歩みを知るうえで、大切な原点の一つです。"
    ],
    sections: [
      {
        heading: "上京という決断",
        body: [
          "3月に公務員を退職したあと、夏の移住をぼんやり考えていた時期もあったといいます。夏には移住せず、12月の初舞台へ向けて稽古に極力参加するため、この日から東京へ拠点を移しました。",
          "東京に拠点を置くメリットを活かし、果敢に挑戦して多くのチャンスをつかみたいという決意が綴られています。"
        ]
      },
      {
        heading: "家族と故郷への思い",
        body: [
          "秋田にはできるだけ帰る。大切な人たちを大切にしたい、という気持ちも同時に綴られています。",
          "出発の日に母親と喧嘩をしたこと、新幹線で涙が止まらなかったこと、別れる前には仲直りできたことも記されています。一番近くで苦楽を共にし、今も応援してくれる母親に、輝いている姿をたくさん見せたいという思いが綴られています。"
        ]
      },
      {
        heading: "経験を糧に、夢へ",
        body: [
          "過去に人間関係で傷ついた経験や、周囲との違いに悩んだ日々についても、率直に触れられています。",
          "その経験から、やりたいことへ進む行動力、周囲を考える思いやり、何度でも立ち上がる逞しさを得られたこと。そして、経験を糧にできる自分の強みで、これからも夢へ挑戦すると綴っています。"
        ]
      },
      {
        heading: "いまにつながる原点",
        body: [
          "「必ず大きくなって秋田に帰ってくる。」「いってきます！」——投稿の締めくくりは、故郷への約束と、新しい土地への一歩です。",
          "この日の記録は、その後の舞台、映像、ミスコン、プロデュース公演へと続く歩みを知るうえで、大切な節目の一つです。"
        ]
      }
    ],
    quotes: [
      {
        text: 'もっと"吉井優花子"が届くように頑張りたい。',
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
    ogImage: "/images/og/yukako-akita-to-tokyo-2022-1200x630.jpg",
    ogImageAlt:
      "秋田から東京へ俳優として歩み出した日の記録と、秋田犬のぬいぐるみと並ぶ吉井優花子さんを配したSNS共有画像",
    sourceUrl: {
      label: "Instagramで当時の投稿を読む",
      url: "https://www.instagram.com/p/CjKI6d_vdwy/?igsh=dXJrMDh6bHUzYzg0"
    },
    sourceNote:
      "当時の思いや決意は、本人のInstagram投稿で全文を読むことができます。",
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
