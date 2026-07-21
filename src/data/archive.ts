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
  aspectRatio?: "3/4" | "9/16";
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
  /** 本人以外の投稿など、一覧・詳細で出典区分を明示する短いラベル（任意） */
  attributionLabel?: string;
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
  /** images[1] 以降をリード文の直後に掲載する記事のみ指定 */
  showAdditionalImages?: boolean;
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
      "思い出の舞台を、今度はプロデューサーとして――『GO,JET!GO!GO! vol.1 Premium』始動",
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
    showAdditionalImages: true,
    sourceUrl: {
      label: "Instagramで元の投稿を見る",
      url: "https://www.instagram.com/p/DZch0STFB0M/?igsh=MWt2amJ6djV3ZGZnaA=="
    },
    sourceNote:
      "この投稿では、発表当時の出演者募集についても案内されていました。現在の募集状況を示すものではありません。最新の公演・チケット情報はゆかJET特集と公演ページへ。",
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
    dateModified: "2026-07-20"
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
  },
  {
    slug: "2026-07-20-yukajet-countdown-3days",
    title: "「親切に」を胸に、最後まで――開幕直前の #ゆかJET",
    shortTitle: "開幕直前に綴った、優花子さんの決意",
    subtitle:
      "プロデューサー、制作、B班JET・C班早紀。大切にする姿勢を言葉にした開幕直前の記録。",
    date: "2026.07.20",
    year: "2026",
    platform: "X",
    category: "舞台・出演",
    tags: [
      "ゆかJET",
      "GOJET",
      "Premium",
      "舞台",
      "プロデュース",
      "吉井優花子",
      "JET",
      "早紀",
      "本番まであと3日",
      "公演直前",
      "舞台制作"
    ],
    summary:
      "本番まであと3日。プロデューサー、制作、JET・早紀の二役を担う吉井優花子さんが、温かいキャストへの思いと、最後まで親切を大切にする言葉を綴りました。",
    lead: [
      "『GO,JET!GO!GO! vol.1 Premium』の開幕まで、あと3日。",
      "プロデューサーとして公演全体をまとめ、制作にも携わりながら、B班では主役のJET、C班ではガールズの早紀を演じる吉井優花子さん。",
      "慌ただしい日々の中で、温かいキャストに「ほんわかしてます」と綴り、お客様、キャスト、スタッフへの親切を最後まで大切にすると言葉にしました。"
    ],
    sections: [
      {
        heading: "投稿本文（2026年7月20日）",
        body: [
          "#ゆかJET \nあと３日だなんて‼️",
          "プロデューサーと制作と二役出演で\nドタバタな日々ですが😵‍💫🔥\n温かいキャストたちにほんわかしてます🕊️",
          "\"いつでもお客様とキャストとスタッフに親切に\"\n最後まで頑張ります😭",
          "素晴らしいPremium舞台\nラストGO,JET! を観に来てください🙇‍♀️‼️"
        ]
      },
      {
        heading: "プロデューサー・制作・二役",
        body: [
          "公演全体を担うプロデューサーと制作に加え、B班では主役JET、C班ではガールズ早紀として出演します。",
          "同じ作品で異なる二役を演じるからこそ、班ごとに違う優花子さんの芝居を楽しめます。"
        ]
      },
      {
        heading: "最後まで大切にすること",
        body: [
          "開幕直前に記したのは、お客様、キャスト、スタッフの一人ひとりに親切にするという言葉。温かいキャストに囲まれながら、最後まで進みます。",
          "この投稿は、吉井優花子プロデュース公演アカウントの投稿を引用したものです。引用元の個別リンクは掲載していません。"
        ]
      },
      {
        heading: "ラストGO,JET!へ",
        body: [
          "出演日程は、添付のスケジュール画像にB班JET・C班早紀それぞれの回と、7月27日の全キャストLIVEまでまとめられています。",
          "『GO,JET!GO!GO! vol.1 Premium』は、2026年7月23日から27日まで上演されます。"
        ]
      }
    ],
    quotes: [
      {
        text: "いつでもお客様とキャストとスタッフに親切に",
        afterSectionIndex: 0
      }
    ],
    images: [
      {
        src: "/images/yukako-yukajet-countdown-3days-2026-07-20.jpg",
        alt: "吉井優花子さんが犬のぬいぐるみを抱えた、GO,JET!GO!GO! vol.1 Premiumの出演スケジュール告知画像"
      }
    ],
    sourceUrl: {
      label: "Xで元の投稿を見る",
      url: "https://x.com/mokoopy/status/2079223875905491204"
    },
    sourceNote:
      "この記事の紹介文は、投稿内容をもとにファンが編集しています。本人の言葉は「投稿本文」と引用欄に分けて掲載しています。",
    relatedUrls: [
      {
        label: "公演詳細・チケット",
        url: "https://premiumgoyukajet.hp.peraichi.com/"
      },
      {
        label: "#ゆかJET 特集を見る",
        url: "/#gojet-feature-updates"
      }
    ],
    featured: true,
    seoTitle: "「親切に」を胸に、最後まで――開幕直前の #ゆかJET｜活動アーカイブ",
    seoDescription:
      "『GO,JET!GO!GO! vol.1 Premium』開幕3日前。プロデューサー、制作、B班JET・C班早紀の二役を担う吉井優花子さんの言葉を紹介します。",
    datePublished: "2026-07-20",
    dateModified: "2026-07-20"
  },
  {
    slug: "2026-07-20-yukajet-premium-promo-video",
    title:
      "日ごとに増す、役としての輝き――開幕3日前の #ゆかJET プロモーション映像",
    shortTitle: "開幕3日前、Premiumへ進むキャストたち",
    subtitle:
      "歌、ダンス、芝居、公演の世界観。開幕直前の熱量を映像で届けた記録。",
    date: "2026.07.20",
    year: "2026",
    platform: "X",
    category: "舞台・出演",
    tags: [
      "ゆかJET",
      "GOJET",
      "Premium",
      "プロモーション動画",
      "稽古",
      "全キャスト",
      "本番まであと3日",
      "舞台",
      "配信",
      "吉井優花子プロデュース"
    ],
    summary:
      "『GO,JET!GO!GO! vol.1 Premium』開幕まであと3日。役としての輝きを増す全キャストの姿や、公演の世界観を紹介するプロモーション映像が公開されました。",
    lead: [
      "『GO,JET!GO!GO! vol.1 Premium』の開幕まで、あと3日。",
      "吉井優花子プロデュース公演アカウントから、キャストの稽古風景や作品の世界観、公演情報をまとめたプロモーション映像が公開されました。",
      "投稿では、全キャストが日ごとに役としての輝きを増していること、そして本番へ向けてさらに“Premium”なクオリティを目指していることが伝えられています。",
      "劇場での観劇だけでなく配信も用意され、新たな『GO,JET!GO!GO! vol.1』を幅広い形で楽しめることを案内しています。"
    ],
    sections: [
      {
        heading: "投稿本文（2026年7月20日）",
        body: [
          "【#ゆかJET 本番まであと３日‼️✨】",
          "全キャスト、日ごとに役としての輝きが増しております☺️✨\nここからさらに、“Premium”なクオリティへ🔥🔥",
          "ぜひ、新たな”GO,JET!GO!GO! vol.1”を観に来てください🎶\n配信もあります✨",
          "⬇️ご予約・応援、お待ちしております！\nhttps://premiumgoyukajet.hp.peraichi.com/"
        ]
      },
      {
        heading: "動画で紹介されている内容",
        body: [
          "冒頭は、全キャストの集合とともにタイトル『GO,JET!GO!GO! vol.1 Premium』と、7月23日から27日まで（会場：Air studio 両国）の公演日程が示されます。",
          "続いて、GO,JET! Girlsをはじめとする登場人物の相関図で、作品の世界観と役どうしの関係が紹介されます。",
          "稽古の様子として、マイクに向かう歌唱、大きく体を動かすダンス、掛け合いのある芝居のシーンが次々と映し出されます。",
          "役に取り組むキャストの表情や、笑顔の絶えない稽古場の空気も収められています。",
          "ラストは公演のキービジュアルと、A・B・C班のキャスト一覧、タイムテーブル、来場・配信チケットの案内でしめくくられます。"
        ]
      },
      {
        heading: "日ごとに増す「役としての輝き」",
        body: [
          "投稿では、稽古を重ねる中で全キャストが日ごとに役としての輝きを増していることが伝えられています。",
          "本番直前まで積み重ねられる稽古の熱量が、映像からも伝わってきます。"
        ]
      },
      {
        heading: "“Premium”な新しいGO,JET!",
        body: [
          "『GO,JET!GO!GO! vol.1 Premium』は、これまでのGO,JET!をさらに磨いた“Premium”版として届けられます。",
          "歌やダンスを増やしたオリジナル構成で、新たな『GO,JET!GO!GO! vol.1』の世界が描かれます。"
        ]
      },
      {
        heading: "劇場・配信への案内",
        body: [
          "新たな『GO,JET!GO!GO! vol.1 Premium』は、劇場での観劇に加えて配信でも楽しめます。",
          "公演は2026年7月23日（木）から27日（月）まで、Air studio 両国で上演。チケットや配信、応援に関する最新情報は、公演詳細ページで確認できます。"
        ]
      }
    ],
    quotes: [
      {
        text: "全キャスト、日ごとに役としての輝きが増しております",
        afterSectionIndex: 2
      },
      {
        text: "ここからさらに、“Premium”なクオリティへ",
        afterSectionIndex: 3
      }
    ],
    images: [
      {
        src: "/images/yukako-yukajet-premium-countdown-3days-video-poster-2026-07-20.jpg",
        alt: "『GO,JET!GO!GO! vol.1 Premium』の全キャストが稽古場で集合した、タイトルと公演日程入りのプロモーション映像の一場面"
      }
    ],
    video: {
      type: "local",
      src: "/videos/yukajet-premium-countdown-3days-2026-07-20.mp4",
      poster:
        "/images/yukako-yukajet-premium-countdown-3days-video-poster-2026-07-20.jpg",
      heading: "Promotion Movie",
      subheading: "歌・ダンス・芝居――映像で伝わるPremiumの世界",
      description:
        "冒頭は全キャストの集合とタイトル『GO,JET!GO!GO! vol.1 Premium』・公演日程、続いて登場人物の相関図、そして歌・ダンス・芝居の稽古風景が映し出され、ラストは公演のキービジュアルとキャスト・公演情報でしめくくられます。約1分50秒・音声あり。再生ボタンを押すと動画が始まります。",
      label:
        "#ゆかJET本番3日前に公開された、キャストの稽古風景と公演情報を紹介するプロモーション動画（約1分50秒・音声あり）",
      fallbackUrl: "https://x.com/yukako_produce/status/2079205943192191096"
    },
    videoAfterSectionIndex: 0,
    sourceUrl: {
      label: "Xで動画付き投稿を見る",
      url: "https://x.com/yukako_produce/status/2079205943192191096"
    },
    sourceNote:
      "この記事の紹介文と動画解説は、投稿内容および添付動画をもとにファンが編集しています。公演アカウントの原文は「投稿本文」に分けて掲載しています。",
    relatedUrls: [
      {
        label: "公演詳細・チケット",
        url: "https://premiumgoyukajet.hp.peraichi.com/"
      },
      {
        label: "#ゆかJET 特集を見る",
        url: "/#gojet-feature-updates"
      },
      {
        label: "開幕直前に綴った優花子さんの決意",
        url: "/archive/2026-07-20-yukajet-countdown-3days"
      }
    ],
    featured: true,
    seoTitle:
      "日ごとに増す、役としての輝き――#ゆかJET プロモーション映像｜活動アーカイブ",
    seoDescription:
      "『GO,JET!GO!GO! vol.1 Premium』開幕3日前に公開されたプロモーション映像。歌、ダンス、芝居、公演の世界観と、役として輝きを増すキャストの姿を紹介します。",
    datePublished: "2026-07-20",
    dateModified: "2026-07-20"
  },
  {
    slug: "2026-07-21-taga-yukako-premium-comment",
    title:
      "演出・多賀雅人さんが称賛――「初プロデュースとは思えぬ気配り」",
    shortTitle: "演出家が称賛する、優花子さんの初プロデュース",
    subtitle:
      "台本脚色、オリジナル楽曲、現場への気配り。演出家から届いた本番直前の言葉。",
    date: "2026.07.21",
    year: "2026",
    platform: "X",
    category: "舞台・出演",
    tags: [
      "ゆかJET",
      "GOJET",
      "Premium",
      "関係者投稿",
      "演出家コメント",
      "多賀雅人",
      "台本脚色",
      "オリジナル楽曲",
      "初プロデュース",
      "本番直前",
      "吉井優花子"
    ],
    summary:
      "演出を担当する多賀雅人さんが、吉井優花子さんによる台本脚色やオリジナル楽曲、初プロデュースとは思えぬ気配りを称賛。俳優として見せる幅のある演技と歌にも触れた、関係者からの言葉です。",
    lead: [
      "2026年7月21日、『GO,JET!GO!GO! vol.1 Premium』の演出を担当する多賀雅人さんから、吉井優花子さんの初プロデュースへ言葉が届きました。",
      "台本脚色とオリジナル楽曲を“Premium”と表現し、細やかな気配りによって素敵な現場がつくられていることを紹介。",
      "プロデューサーとしての仕事だけでなく、俳優として見せる幅のある演技と歌にも触れ、本番直前の舞台へ観客を招いています。"
    ],
    sections: [
      {
        heading: "演出家から見た初プロデュース",
        body: [
          "多賀雅人さんは、演出家の立場から、吉井優花子さんが手がける台本脚色とオリジナル楽曲、そして現場での気配りに言及しました。",
          "初めてのプロデュースでありながら、細やかに現場を支えている仕事ぶりへの率直な言葉です。"
        ]
      },
      {
        heading: "台本脚色とオリジナル楽曲",
        body: [
          "『GO,JET!GO!GO! vol.1 Premium』では、優花子さんが脚色と楽曲制作に携わっています。",
          "多賀さんは、その台本脚色とオリジナル楽曲を“Premium”と表現。作品づくりの中心となる二つの要素へ、演出家から評価が寄せられました。"
        ]
      },
      {
        heading: "プロデューサーと俳優、二つの立場",
        body: [
          "優花子さんはプロデュース、制作、脚色、楽曲、デザインに携わりながら、B班では主役JET、C班ではガールズ早紀を演じます。",
          "多賀さんが最後に挙げたのは、優花子さんの「幅のある演技や歌」。作品をつくる側と舞台に立つ側、その両面に向けたコメントです。"
        ]
      },
      {
        heading: "開幕直前に届いた関係者コメント",
        body: [
          "投稿は、優花子さんが開幕3日前に綴った投稿を引用したものです。",
          "演出家として稽古と作品づくりをともにしてきた多賀さんから、本番を前に届けられた観劇への呼びかけです。"
        ]
      }
    ],
    quotes: [
      {
        text: "初プロデュースとは思えぬ気配りで素敵な現場を作っていただいてます",
        afterSectionIndex: 0
      },
      {
        text: "幅のある演技や歌を今回もぜひご覧ください！！",
        afterSectionIndex: 2
      }
    ],
    images: [
      {
        src: "/images/yukako-yukajet-taga-director-2026-07-21-01.jpg",
        alt: "演出の多賀雅人さんと笑顔でピースをする吉井優花子さん"
      },
      {
        src: "/images/yukako-yukajet-taga-director-2026-07-21-02.jpg",
        alt: "コミカルな表情でピースをする多賀雅人さんと吉井優花子さん"
      }
    ],
    showAdditionalImages: true,
    sourceUrl: {
      label: "多賀雅人さんのX投稿を見る",
      url: "https://x.com/ryuburan_taga/status/2079368211527790758"
    },
    sourceNote:
      "多賀雅人さんによる関係者投稿です。本文は投稿内容をもとにファンが編集し、多賀さんの言葉は引用欄に分けて掲載しています。",
    relatedUrls: [
      {
        label: "#ゆかJET 公演HP",
        url: "https://premiumgoyukajet.hp.peraichi.com/"
      },
      {
        label: "#ゆかJET 特集を見る",
        url: "/#gojet-taga-director-comment-2026-07-21"
      }
    ],
    featured: true,
    seoTitle:
      "演出・多賀雅人さんが称賛――優花子さんの初プロデュース｜活動アーカイブ",
    seoDescription:
      "『GO,JET!GO!GO! vol.1 Premium』演出の多賀雅人さんが、吉井優花子さんの台本脚色、オリジナル楽曲、現場での気配り、幅のある演技と歌に寄せた言葉を紹介します。",
    datePublished: "2026-07-21",
    dateModified: "2026-07-21"
  },
  {
    slug: "2026-07-21-eri1408-saki-three-shot-story",
    title: "3人の“早紀ちゃん”がそろった、貴重な3ショット",
    shortTitle: "3人の“早紀ちゃん”がそろった3ショット",
    attributionLabel: "共演者投稿",
    subtitle:
      "@eri_1408_さんのInstagramストーリーに登場した、3者3様の「早紀」をつなぐ一枚。",
    date: "2026.07.21 取得",
    year: "2026",
    platform: "Instagram",
    category: "オフショット",
    tags: [
      "ゆかJET",
      "Instagramストーリー",
      "共演者投稿",
      "稽古場オフショット",
      "早紀"
    ],
    summary:
      "@eri_1408_さんのInstagramストーリーに、『早紀』役の3人が並んだ3ショットが登場。ストーリーにはB班の出演日程と、会場へ行けない方に向けた応援コンテンツも記されています。",
    lead: [
      "『早紀』役の3人が、稽古場でそろって3ショット。",
      "#ゆかJETのB班に出演する@eri_1408_さんのInstagramストーリーに、3者3様の“早紀ちゃん”を劇場で見てほしいというメッセージが添えられました。"
    ],
    sections: [
      {
        heading: "3者3様の“早紀ちゃん”",
        body: [
          "ストーリーでは、この一枚を「最初で最後の3ショットになってるぅ」と紹介。3人それぞれが演じる「早紀」への来場を呼びかけています。"
        ]
      },
      {
        heading: "ストーリー掲載情報｜B班出演日程",
        body: [
          "2026年7月23日 19:00\n2026年7月24日 15:30\n2026年7月25日 12:00\n2026年7月26日 19:00\n2026年7月27日 20:00 全班合同LIVE",
          "掲載された日程は、サイト内の#ゆかJET公演データと一致しています。"
        ]
      },
      {
        heading: "会場へ行けないときの応援",
        body: [
          "会場へ足を運ぶことが難しい方へ、エールカード、メッセージ動画、応援チケットの3つも案内されています。",
          "3つの応援コンテンツは、#ゆかJET公演特設ページから案内されています。"
        ]
      }
    ],
    quotes: [
      {
        text: "3者3様の早紀ちゃんをぜひ劇場にてご覧ください！",
        afterSectionIndex: 0
      }
    ],
    images: [
      {
        src: "/images/yukajet/2026-07-21-eri1408-saki-three-shot-story.jpg",
        alt: "『早紀』役の3人が稽古場で並んで撮影したInstagramストーリー画像",
        caption: "@eri_1408_さんのInstagramストーリーより／2026年7月21日取得",
        aspectRatio: "9/16"
      }
    ],
    sourceUrl: {
      label: "投稿者のInstagramを見る",
      url: "https://www.instagram.com/eri_1408_/"
    },
    sourceNote:
      "共演者の@eri_1408_さんによる投稿で、吉井優花子さん本人の投稿ではありません。Instagramストーリーは公開を終了している場合があります。",
    relatedUrls: [
      {
        label: "元ストーリーを開く",
        url: "https://www.instagram.com/stories/eri_1408_/3945289180455925938/"
      },
      {
        label: "応援コンテンツを見る",
        url: "https://premiumgoyukajet.hp.peraichi.com"
      },
      {
        label: "#ゆかJET 特集を見る",
        url: "/#gojet-eri1408-saki-story-2026-07-21"
      }
    ],
    featured: true,
    seoTitle:
      "3人の“早紀ちゃん”がそろった3ショット｜#ゆかJET 活動アーカイブ",
    seoDescription:
      "#ゆかJETの共演者@eri_1408_さんのInstagramストーリーをアーカイブ。『早紀』役3人の稽古場3ショットとB班日程、応援コンテンツを紹介します。",
    datePublished: "2026-07-21",
    dateModified: "2026-07-21"
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
