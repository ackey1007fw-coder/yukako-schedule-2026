// #ゆかJET『GO,JET!GO!GO! vol.1 Premium』の稽古写真・告知資料。
// 通常のフォトギャラリーとは分け、NowProducingSection内の特集ギャラリーで表示する。
export type PromoImage = {
  src: string;
  alt: string;
};

export type GojetSupportColor = {
  team: string;
  role: string;
  color: string;
  emoji: string;
  tone: "pink" | "red";
};

// 応援コンテンツ等の受付締切。指定すると締切前/後でカード内の案内文が自動的に切り替わる。
export type GojetDeadline = {
  // ISO8601（タイムゾーンオフセット付き, 例: "2026-07-16T23:59:59+09:00"）
  at: string;
  beforeText: string;
  afterText: string;
};

export type GojetFeatureUpdate = {
  date: string;
  label: string;
  title: string;
  body: string;
  // 元投稿の本文をカード内で全文掲載する場合に使用する
  caption?: string;
  postUrl: string;
  homepageUrl: string;
  ctaLabel: string;
  // 2つ目のボタン（予約・応援ページ）のラベル。未指定時は「公演ホームページへ」
  homepageLabel?: string;
  // 告知画像・ストーリーズのスクリーンショットなどを自己ホストできた場合に表示する
  photo?: PromoImage;
  // 稽古写真を複数枚まとめて見せたい場合はこちら（photoと併用しない）
  photos?: PromoImage[];
  // 引用リポストなど、リンクを推測せず引用元の投稿者と内容を補足する場合に使用する
  quotedPost?: {
    author: string;
    handle: string;
    body: string;
    // 引用元投稿へのリンク（確認できるURLのみ設定する）
    url?: string;
    // リンクのラベル（未指定時は「引用元の投稿を見る」）
    urlLabel?: string;
  };
  // 稽古動画などを手元にホストできた場合はカード内で直接再生する
  video?: {
    src: string;
    poster: string;
    label: string;
  };
  // 引用元に動画があるが自己ホスト（変換・poster生成）できない場合の代替。
  // 動画投稿への目立つリンクと、再生アイコン付きのプレースホルダーを表示する。
  videoGuide?: {
    // 動画投稿のURL（新しいタブで開く）
    url: string;
    // リンクボタンの文言（例: "Xで行き方動画を見る"）
    buttonLabel: string;
    // アクセシビリティ用の代替テキスト
    alt: string;
    // プレースホルダーの補足（例: "約60秒のアクセスガイド"）
    note?: string;
    // 折りたたみで補足する道順・目印の箇条書き（初めての来場者向け）
    steps?: string[];
    // 会場アクセス情報（地図アイコン付きで表示）
    venue?: {
      name: string;
      address: string;
      // 地下1階など、建物内での位置を短く補足する
      floorNote?: string;
      // 最寄り駅（例: "両国駅"）
      nearestStation?: string;
      // Googleマップの検索クエリ。未指定時は「会場名 住所」を使用する
      mapQuery?: string;
    };
  };
  deadline?: GojetDeadline;
  // 役ごとのペンライトカラーなど、色名も文字で伝える短い実用情報
  supportColors?: GojetSupportColor[];
  // 物販商品などの一覧。画像だけに頼らず、名称・価格を文字でも伝える。
  goods?: {
    heading: string;
    // 税込などの補足（例: "価格はすべて税込です。"）
    note?: string;
    items: {
      name: string;
      // 価格の文字表記（例: "2,000円（2枚1組）"）
      price: string;
      // 補足（例: "数量限定"、"終演後にキャストと撮影可能"）
      detail?: string;
    }[];
  };
  // 上演スケジュールなどの時刻付き一覧。画像だけに頼らず文字でも伝える。
  schedule?: {
    heading: string;
    // 補足（例: "開場は開演30分前"）
    note?: string;
    items: {
      time: string;
      label: string;
    }[];
  };
  // 役柄タグ(例: "B班：JET")。見出し下に小さなバッジとして並べる
  roleTags?: string[];
};

export type GojetTeamUpdate = {
  id: string;
  team: "A" | "B" | "C";
  date: string;
  label: string;
  title: string;
  quote: string;
  body: string;
  yukakoPostUrl: string;
  originalPostUrl: string;
  homepageUrl: string;
  photo?: PromoImage;
  video: {
    src: string;
    poster: string;
    label: string;
  };
};

export const gojetFeatureUpdates: GojetFeatureUpdate[] = [
  {
    date: "2026.7.24 21:24",
    label: "青木杏奈さん（@anna_aoki0906）・B班あかね役",
    title: "B班2日目終了！青木杏奈さんと優花子ちゃんのハートショット",
    body:
      "『GO,JET!GO!GO! vol.1 Premium 〜I LOVE YOUが言えなくて〜』公演2日目を終え、B班・あかね役の青木杏奈さんが、JET役の吉井優花子ちゃんとのツーショットを投稿しました。\n\nアメリカンダイナー風の舞台セットを背景に、二人で大きなハートを作った一枚。GOJETの世界を全力で楽しんだ、と青木さん。\n\n次回のB班公演は、2026年7月25日（土）12:00開演。同日はA班15:30、C班19:00も上演。Air studio 両国でお待ちしています。",
    caption:
      "#ゆかJET 2日目もありがとうございました✨️B班あかね役青木杏奈です❤️‍🔥\nGOJETの世界を全力で楽しみました！\n皆さんも一緒に楽しんでいただけましたかでしょうか？🥹\n\n明日7/25(土)は\n\n💙B班12:00 ◀︎出演回\n🩷A班15:30\n💛C班19:00  \n\nでお届けします！\nAir studio両国でお待ちしております💫",
    postUrl: "https://x.com/anna_aoki0906/status/2080630150077825528",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: ["共演者投稿", "B班", "公演2日目", "あかね＆JET"],
    photo: {
      src: "/images/yukajet/2026-07-24-aoki-anna-yukako-heart.jpg",
      alt: "B班あかね役の青木杏奈さんとJET役の吉井優花子が、舞台セットを背景に手でハートを作っているツーショット"
    },
    schedule: {
      heading: "次回公演スケジュール（2026年7月25日）",
      note: "会場：Air studio 両国。作品名：GO,JET!GO!GO! vol.1 Premium 〜I LOVE YOUが言えなくて〜。#ゆかJET",
      items: [
        { time: "12:00〜", label: "B班（あかね役・青木杏奈さん出演回）" },
        { time: "15:30〜", label: "A班" },
        { time: "19:00〜", label: "C班" }
      ]
    }
  },
  {
    date: "2026.7.24 20:40",
    label: "曽原加絵さん（@kaenomusic）・B班美里役",
    title: "「大好きなゆかJET」と仲良しショット！B班2日目終了",
    body:
      "『GO,JET!GO!GO! vol.1 Premium』B班・美里役の曽原加絵さん（@kaenomusic）が、2日目公演の終了を報告。来場への感謝とともに、残り「2公演＋LIVE」へ向け「最後まで全力で駆け抜けます」とつづっています。\n\n「大好きな大好きなゆかJET」——B班でJET役を務める吉井優花子さんとの写真を4枚公開。ハートポーズの連続や、笑顔のツーショットも。共演者同士の明るいオフショットです。\n\n※出演者の公開投稿をもとにした、非公式の応援まとめです。",
    caption:
      "#ゆかJET\n2日目終わりました！！✨\nご来場いただいた皆さま、ありがとうございました🫶\nあと2公演＋LIVEで終わりだと思うと、本当に寂しい…🥲\n最後まで全力で駆け抜けます！！🔥\n\n今日は大好きな大好きなゆかJETと写真を撮りました💝",
    postUrl: "https://x.com/kaenomusic/status/2080619068445597718",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "曽原加絵さんのX投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "公演レポート",
      "キャスト投稿",
      "舞台裏",
      "B班",
      "美里役",
      "JET役"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-24-kae-yukajet-01.jpg",
        alt: "BAR Samasamaの舞台セットでハートポーズをする吉井優花子さんと曽原加絵さん"
      },
      {
        src: "/images/yukajet/2026-07-24-kae-yukajet-02.jpg",
        alt: "コミカルな表情でハートを作る吉井優花子さんと、それを見つめる曽原加絵さん"
      },
      {
        src: "/images/yukajet/2026-07-24-kae-yukajet-03.jpg",
        alt: "ハートポーズが崩れて驚いた表情を見せる吉井優花子さんと曽原加絵さん"
      },
      {
        src: "/images/yukajet/2026-07-24-kae-yukajet-04.jpg",
        alt: "BAR Samasamaのセットで笑顔を見せる吉井優花子さんと曽原加絵さん"
      }
    ]
  },
  {
    date: "2026.7.24 19:06",
    label: "来瞳舞夢さん（@maimu_htk）・B班マスター役／C班美月役",
    title: "C班初日＆B班2日目ありがとうございました！｜来瞳舞夢さん",
    body:
      "C班初日とB班2日目が終演。来瞳舞夢さんが感謝を伝えるとともに、翌日以降の公演やチケット、各種応援メニューを案内しました。\n\n来瞳舞夢さん：B班マスター役／C班美月役。\n吉井優花子さん：B班JET役／C班早紀役。\n\n投稿時点では公式HPに不具合があったため、直接リンクが案内されました。\n\n【来場チケット】\nhttps://torioki.confetti-web.com/form/4827\n\n【配信チケット】\n申込締切：2026年8月3日／視聴期限：2026年8月10日\nhttps://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform\n\n【各種応援メニュー】（一部は7月25日 23:59締切）\n・エールカード https://airstudio.base.ec/items/148071826\n・メッセージ動画 https://airstudio.base.ec/items/148072028\n・応援チケット（チェキ特典付き） https://airstudio.base.ec/items/148071805",
    caption:
      "ハロー💋➰💕\n#ゆかJET\n本日はC班初日とB班2日目\nありがとうございました‼️✨\n\n明日もご来場お待ちしてます！\nHPバグってるらしいので\nチケットのご購入は下記からどうぞ⬇️",
    postUrl: "https://x.com/maimu_htk/status/2080595354442137931",
    homepageUrl: "https://torioki.confetti-web.com/form/4827",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "来場チケットを予約する",
    roleTags: [
      "#ゆかJET",
      "公演レポート",
      "キャスト投稿",
      "チケット案内",
      "応援情報",
      "B班：マスター",
      "C班：美月"
    ],
    photo: {
      src: "/images/yukajet/2026-07-24-kurume-maimu-cast.jpg",
      alt: "赤いダイナー風の舞台セットで、レトロなマイクを囲んでポーズを取る#ゆかJETの女性キャスト3名"
    },
    quotedPost: {
      author: "来瞳舞夢",
      handle: "@maimu_htk",
      body:
        "7/23〜27『GO,JET!GO!GO! vol.1 Premium』Air Studio 両国。B班マスター役／C班美月役の出演日程と、来場・配信チケット、エールカード・メッセージ動画・応援チケットの案内。",
      url: "https://x.com/maimu_htk/status/2075599809675964695",
      urlLabel: "7月10日のチケット案内投稿を見る"
    },
    deadline: {
      at: "2026-07-25T23:59:59+09:00",
      beforeText: "まもなく締切｜エールカードなど各種応援メニューは7月25日 23:59まで",
      afterText: "受付終了｜エールカードなど各種応援メニューの申込は終了しました"
    }
  },
  {
    date: "2026.7.24 15:02",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "C班初日＆B班2日目、公演御礼｜早紀とJET、二役の振り幅にも注目",
    body:
      "C班初日とB班2日目が終演。「#ゆかJET 好評で嬉しいです」と優花子さんから、来場へのお礼が届いています。\n\nB班では主人公のJET、C班では早紀。雰囲気も性格も大きく違う二役を、同じ一日のなかで演じ分けています。「早紀とJET、二役の違いすぎるお芝居をきっと楽しんでもらえる」——BもCも、両方見比べてほしいとのこと。\n\n連日の公演で声帯はピンチ。この日は早めにおやすみモードへ。プロデューサーと出演者を兼ねながら、残りの公演へ向かいます。\n\n※チケットの案内は2026年7月24日の投稿時点のものです。販売状況は各ページで確認してください。",
    caption:
      "#ゆかJET 好評で嬉しいです🥹\nC班初日✨B班2日目❗️\nご観劇ありがとうございました🙇‍♀️\n\n早紀とJET、二役の違いすぎるお芝居を\nきっと楽しんでもらえるので\nBもCも観てくださいね☺️🎶\n\n（私の声帯がピンチなので早く寝ます😴）",
    postUrl: "https://x.com/mokoopy/status/2080670012420083748",
    homepageUrl: "https://torioki.confetti-web.com/form/4827",
    ctaLabel: "Xで投稿を見る",
    homepageLabel: "来場チケットを見る",
    roleTags: [
      "#ゆかJET",
      "公演レポート",
      "吉井優花子さん本人",
      "C班初日",
      "B班2日目",
      "早紀／JET 二役"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-24-yukako-cast-group-01.jpg",
        alt: "アメリカンダイナー風の舞台セット前でポーズを取る、ゆかJET出演キャストの集合写真"
      },
      {
        src: "/images/yukajet/2026-07-24-yukako-cast-group-02.jpg",
        alt: "舞台セット内で笑顔やピースを見せる、ゆかJET出演キャストの自撮り風集合写真"
      }
    ],
    quotedPost: {
      author: "吉井優花子プロデュース公演公式",
      handle: "@yukako_produce",
      body:
        "C班初日・B班・A班への感謝と、2026年7月25日の公演予定（12:00 B班／15:30 A班／19:00 C班）の案内。優花子さんがこの投稿を引用しています。"
    },
    schedule: {
      heading: "2026年7月25日の公演案内（投稿時点）",
      note: "2026年7月24日の投稿で案内された予定です。会場：Air studio 両国。最新の日程は公演ページで確認してください。",
      items: [
        { time: "12:00〜", label: "B班（JET役）" },
        { time: "15:30〜", label: "A班" },
        { time: "19:00〜", label: "C班（早紀役）" }
      ]
    }
  },
  {
    date: "2026.7.24 09:45",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "7月24日は早紀役C班初日＆JET役B班に出演！",
    body:
      "7月24日の「#ゆかJET」は、吉井優花子さんが二つの役で舞台に立つ特別な一日です。\n\n12時からは、早紀役を務めるC班が初日を迎えます。続く15時30分からは、主役のJETを演じるB班に出演。19時からはA班の公演が行われます。\n\n当日の飛び入り観劇も歓迎されており、来場者へ向けて「ペンライト振ってね〜♪」と明るく呼びかけています。\n\n会場では、ブロマイドやカード＆ステッカーなどの物販も用意されています。観劇とあわせて、舞台の思い出となるグッズにも注目です。",
    caption:
      "#ゆかJET\n\n＼24日(金)／\n12:00〜早紀役C班💛(初日✨)\n15:30〜JET役B班💙\n19:00〜A班❤️\n\n飛び入り観劇も大歓迎です‼️\n皆様のご予約・応援、お待ちしています🙇‍♀️\n\nブロマイドとカード&ステッカー！！\nGETして帰ってね〜🫶✨",
    postUrl: "https://x.com/mokoopy/status/2080454389677039811",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "公演情報",
      "当日案内",
      "出演情報",
      "物販情報",
      "C班初日",
      "早紀役とJET役の二役",
      "飛び入り歓迎",
      "ペンライト応援"
    ],
    photo: {
      src: "/images/yukajet/2026-07-24-yukako-penlight.jpg",
      alt: "ピンクの衣装で黄色と青色のペンライトを持ち、7月24日のゆかJET公演を案内する吉井優花子さん"
    },
    schedule: {
      heading: "公演スケジュール（2026年7月24日）",
      note: "会場：Air studio 両国。優花子さんはC班で早紀役、B班でJET役を務めます。",
      items: [
        { time: "12:00〜", label: "C班（早紀役・初日）" },
        { time: "15:30〜", label: "B班（JET役）" },
        { time: "19:00〜", label: "A班" }
      ]
    }
  },
  {
    date: "2026.7.24 00:55",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "JET役初日を終えて｜もっと多くの方に届けたい #ゆかJET",

    body:
      "2026年7月23日のB班初日公演を終え、JET役を務めた吉井優花子さんから、観劇したお客様への感謝が伝えられました。\n\nA班・B班の初日を振り返りながら、「ここからもっと上げていきます」と、公演をさらに良いものへ育てていく意気込みも綴られています。\n\n翌日の7月24日は、12時から自身が早紀役を務めるC班の初日、15時30分からJET役のB班、19時からA班が上演される予定として案内されました。\n\n優花子さんは、「この舞台は本当にたくさんの方に見てもらいたい」と、より多くのお客様へ作品を届けたいという思いも発信しています。\n\n物販では、お好きなキャスト1名からサインを受け取れる「公演フライヤーカード＆記念ステッカーセット」と、本公演オリジナルブロマイドを紹介。プロデューサーとして舞台全体を支えながら、B班ではJET役、C班では早紀役として出演する優花子さんの熱意が伝わる投稿です。",
    postUrl: "https://x.com/mokoopy/status/2080320822825439518",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子さんのX投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "B班：JET役",
      "C班：早紀役",
      "初日終了",
      "物販情報",
      "フライヤーカード",
      "サイン特典"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-24-yukako-jet-opening-goods-sign.jpg",
        alt: "吉井優花子さんと共演者が、サイン特典付きのゆかJETフライヤーカードと記念ステッカーを紹介する写真"
      },
      {
        src: "/images/yukajet/2026-07-24-yukako-jet-opening-cast-selfie.jpg",
        alt: "#ゆかJET のキャストが、レトロアメリカンな舞台セットで撮影した初日後の集合セルフィー写真"
      }
    ],
    schedule: {
      heading: "翌日公演スケジュール（2026年7月24日）",
      note: "会場：Air studio 両国。優花子さんはB班でJET役、C班で早紀役を務めます。",
      items: [
        { time: "12:00〜", label: "C班（早紀役・初日）" },
        { time: "15:30〜", label: "B班（JET役）" },
        { time: "19:00〜", label: "A班" }
      ]
    },
    goods: {
      heading: "物販注目情報",
      note: "価格は税込です。ブロマイドは優花子さん本人が投稿内で「質も良くお得」とおすすめしています。",
      items: [
        {
          name: "公演フライヤーカード＆記念ステッカーセット",
          price: "500円",
          detail:
            "B5版両面カラーのフライヤーカードとオリジナル記念ステッカー。面会タイムに、お好きなキャスト1名からサインを受け取れる案内あり"
        },
        {
          name: "本公演オリジナルブロマイド",
          price: "2,000円（2枚1組）",
          detail: "優花子さん本人のおすすめ"
        }
      ]
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演公式",
      handle: "@yukako_produce",
      body:
        "A班・B班初日終了後の公式報告。翌日公演の案内と物販情報を伝える投稿を、優花子さんが引用してシェアしています。",
      url: "https://x.com/yukako_produce/status/2080297797144969336",
      urlLabel: "引用元の公式投稿を見る"
    }
  },
  {
    date: "2026.7.24 00:24",
    label: "吉井優花子プロデュース公演公式（@yukako_produce）",
    title: "#ゆかJET がX「本日のニュース」に登場｜公式も観劇を呼びかけ",
    body:
      "2026年7月23日の初日開幕に合わせて、吉井優花子プロデュース公演『GO,JET!GO!GO! vol.1 Premium ～I LOVE YOUが言えなくて～』が、Xの「本日のニュース」に表示されました。\n\nニュース欄には「ミュージカル『GO,JET!GO!GO! vol.1 Premium』本日両国で初日開幕」という見出しが掲載され、#ゆかJET に関する複数の投稿がまとめられていました。\n\nこの動きを紹介した引用元の投稿に対し、公演公式アカウントは「もちろんです☺️‼️ぜひご観劇ください✨」と反応し、予約・応援ページへつなげました。\n\n初日のタイミングで関連投稿が集まり、X上でも注目が広がっていたこと、そして公式アカウントがそれを観劇案内へつなげた記録です。",
    caption:
      "もちろんです☺️‼️ぜひご観劇ください✨\n#ゆかJET\n\nhttps://premiumgoyukajet.hp.peraichi.com/",
    postUrl: "https://x.com/yukako_produce/status/2080313032174174590",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "公式投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "初日開幕",
      "Xで話題",
      "本日のニュース",
      "公演公式",
      "観劇案内"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-24-x-news-summary.jpg",
        alt: "#ゆかJET がXの本日のニュースに掲載されたことを紹介する画像"
      },
      {
        src: "/images/yukajet/2026-07-24-x-todays-news-screen.jpg",
        alt: "Xの本日のニュースに #ゆかJET 初日開幕が表示された画面"
      }
    ],
    quotedPost: {
      author: "うえきゃん",
      handle: "@felicitar_0429",
      body:
        "「他のGOJETでは見かけなかったXで話題になるぐらいのお話だろうね」——引用元では、シリーズ内でも目立つ動きとして紹介されていました。",
      url: "https://x.com/felicitar_0429/status/2080247133488505148",
      urlLabel: "引用元投稿を見る"
    }
  },
  {
    date: "2026.7.23 23:23",
    label: "吉井優花子プロデュース公演公式（@yukako_produce）",
    title: "A班・B班初日終了報告｜翌日公演案内と物販情報",
    body:
      "2026年7月23日夜、吉井優花子プロデュース公演『GO,JET!GO!GO! vol.1 Premium 〜I LOVE YOUが言えなくて〜』のA班・B班初日公演終了後に、公式アカウントから感謝と翌日公演の案内が投稿されました。\n\n投稿では、A班・B班の初日公演へのお礼とともに、「まだまだクオリティを上げていきます」と今後に向けた意気込みも綴られています。\n\nあわせて、翌日7月24日の公演予定として、C班初日（12:00〜）、B班（15:30〜）、A班（19:00〜）のスケジュールが案内されました。\n\nまた、物販として「フライヤーカード＆ステッカーセット」も紹介されており、記念に手に取りやすいアイテムとして案内されています。",
    postUrl: "https://x.com/yukako_produce/status/2080297797144969336",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "公式の投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "初日終了報告",
      "翌日公演案内",
      "物販情報",
      "A班",
      "B班"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-23-after-opening-selfie-1.jpg",
        alt: "#ゆかJET A班・B班初日後のキャスト集合写真 1"
      },
      {
        src: "/images/yukajet/2026-07-23-after-opening-selfie-2.jpg",
        alt: "#ゆかJET A班・B班初日後のキャスト集合写真 2"
      },
      {
        src: "/images/yukajet/2026-07-23-after-opening-goods-flyer-sign.jpg",
        alt: "#ゆかJET 物販案内とフライヤーカード＆ステッカーの紹介"
      },
      {
        src: "/images/yukajet/2026-07-23-after-opening-relationship-schedule.jpg",
        alt: "#ゆかJET 相関図と公演日程表"
      }
    ],
    schedule: {
      heading: "翌日公演スケジュール（2026年7月24日）",
      note: "会場：Air studio 両国（両国駅 徒歩2分）",
      items: [
        { time: "12:00〜", label: "C班（初日）" },
        { time: "15:30〜", label: "B班" },
        { time: "19:00〜", label: "A班" }
      ]
    },
    goods: {
      heading: "物販注目情報",
      note: "価格は税込です。",
      items: [
        {
          name: "公演フライヤーカード＆ステッカーセット",
          price: "500円",
          detail:
            "B5版両面カラー。面会タイムに、お好きなキャスト1名からサインがもらえる案内あり"
        }
      ]
    }
  },
  {
    date: "2026.7.23 16:29",
    label: "荒井映里乃さん（@eri_no_a）・劇場アクセス案内",
    title: "B班初日へ！Air Studio 両国までの行き方動画",
    body:
      "2026年7月23日、#ゆかJETのB班初日公演を前に、B班で早紀を演じる荒井映里乃さんが、曽原加絵さん制作の「Air Studio 両国までの行き方動画」を紹介しました。動画は両国駅周辺から劇場までを実際に歩いて案内するアクセスガイドで、「BECK’S COFFEE」やサンマルクカフェを通り、「Beer Club POPEYE」の黄色い看板を目印に細い道へ入って、赤いタイルの階段を下りると、地下1階のAir Studio 両国に到着します。投稿では、B班初日19時公演について「まだまだ予約もお待ちしております」「飛び込みも大歓迎」と案内され、ご来場のお客様へ安全に気をつけて来てほしいというメッセージも添えられていました。",
    postUrl: "https://x.com/eri_no_a/status/2080193541503127649",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "荒井映里乃さんの投稿を見る",
    homepageLabel: "公演公式ページを見る",
    roleTags: [
      "#ゆかJET",
      "B班",
      "劇場アクセス",
      "キャスト発信",
      "動画",
      "Air Studio 両国"
    ],
    videoGuide: {
      url: "https://x.com/kaenomusic/status/2080192412178350103",
      buttonLabel: "Xで行き方動画を見る",
      alt: "両国駅周辺からAir Studio 両国までの道順を実際に歩いて紹介するアクセス動画",
      note: "約60秒のアクセスガイド",
      steps: [
        "両国駅から「BECK’S COFFEE」を左へ",
        "サンマルクカフェ方面へ進む",
        "信号を渡る",
        "提灯のある通りを進む",
        "「Beer Club POPEYE」の黄色い看板が目印",
        "看板付近の細い道に入り、赤いタイルの階段を降りると地下1階の劇場"
      ],
      venue: {
        name: "Air Studio 両国",
        address: "東京都墨田区両国2-18-7 ハイツ両国駅前 地下1階",
        floorNote: "地下1階の劇場",
        nearestStation: "両国駅",
        mapQuery: "Air Studio 両国 東京都墨田区両国2-18-7 ハイツ両国駅前"
      }
    },
    quotedPost: {
      author: "曽原加絵",
      handle: "@kaenomusic",
      body:
        "両国駅周辺からAir Studio 両国までの行き方を、実際に歩きながら案内する約60秒のアクセス動画。荒井映里乃さんはこの投稿を引用してシェアしています。"
    }
  },
  {
    date: "2026.7.23 12:18",
    label: "吉井優花子プロデュース公演公式（@yukako_produce）",
    title: "初日当日の重要案内｜上演時間・観劇マナー・物販情報",
    body:
      "2026年7月23日、吉井優花子プロデュース公演『GO,JET!GO!GO! vol.1 Premium 〜I LOVE YOUが言えなくて〜』の初日にあたり、公式アカウントからご来場者向けの案内と物販情報が公開されました。\n\n当初は約1時間20分と案内されていた上演時間は、カーテンコールを含めて約1時間40分に変更。開場時間は本編公演が開演30分前、千秋楽LIVEが開演15分前です。\n\n物販では、予定されていたクリアファイルが「公演フライヤーカード＆記念ステッカー」のセット（500円・税込／数量限定）へ変更されました。\n\n来場案内では、携帯電話・撮影のルール、ペンライトを振れるタイミング（舞台上の看板のライトが点灯している間のみ）、プレゼントの受け渡し、終演後のお見送り・面会やツーショットチェキについても案内されました。",
    postUrl: "https://x.com/yukako_produce/status/2080130440137232583",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "公式の投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "初日",
      "来場案内",
      "観劇マナー",
      "物販情報",
      "Air Studio 両国"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-23-visitor-guide.jpg",
        alt: "ゆかJET ご来場のお客様への案内"
      },
      {
        src: "/images/yukajet/2026-07-23-goods-guide.jpg",
        alt: "ゆかJET 公演物販の案内"
      }
    ],
    goods: {
      heading: "物販情報",
      note: "価格はすべて税込です。",
      items: [
        { name: "本公演オリジナルブロマイド", price: "2,000円（2枚1組）" },
        { name: "ソロチェキ", price: "1,500円（1枚）" },
        {
          name: "ツーショットチェキ",
          price: "2,000円（1枚）",
          detail: "終演後にキャストと撮影できます"
        },
        {
          name: "公演フライヤーカード＆記念ステッカー",
          price: "500円（1セット）",
          detail: "数量限定"
        }
      ]
    }
  },
  {
    date: "2026.7.23 11:25",
    label: "吉井優花子（@mokoopy）・X引用リポスト",
    title: "あかね役に葉山椎菜さんを迎えた理由",
    body:
      "2026年7月23日、舞台『GO,JET!GO!GO! vol.1 Premium』の初日に、吉井優花子さんが葉山椎菜さんの投稿を引用。\n\n「#ゆかJET のあかねはしいなちゃんだと思い、お声がけした」——あかね役に迎えた理由と、「いつも温かい大きな器で全体を支えてくれて感謝です🙏」の言葉。\n\n2人は同じC班。「同じC班で、最後まで頑張るぞ〜！！」——初日に交わされた2人の言葉はこちら。",
    caption:
      "こちらこそありがとうだよー😭❤️\n\n#ゆかJET のあかねはしいなちゃんだと思い、お声がけした🙂‍↕️✨\n\nいつも温かい大きな器で全体を支えてくれて感謝です🙏\n\n同じC班で、最後まで頑張るぞ〜！！",
    quotedPost: {
      author: "葉山椎菜",
      handle: "@shiina_style222",
      body:
        "#ゆかJETが2026年7月23日に開幕。初日はA班が15:30、B班が19:00に公演し、C班は休演です。ゲネプロや通し稽古で別班の公演を観て感動したこと、この座組へ呼んでもらえたこと、メンバーとの出会い、優花子さんへの感謝が綴られています。"
    },
    postUrl: "https://x.com/mokoopy/status/2080116978329763841",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで吉井優花子さんの投稿を見る",
    homepageLabel: "#ゆかJET 公演情報を見る",
    roleTags: [
      "吉井優花子さん本人",
      "引用リポスト",
      "C班",
      "あかね役：葉山椎菜さん",
      "#ゆかJET"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-23-shiina-akane-01.jpg",
        alt: "レトロなアメリカンダイナー風のセットでポーズを取る、ゆかJET出演者3人の集合写真"
      },
      {
        src: "/images/yukajet/2026-07-23-shiina-akane-02.jpg",
        alt: "赤と白の衣装でレトロな黒電話の受話器に頬を寄せる葉山椎菜さん"
      }
    ]
  },
  {
    date: "2026.7.23",
    label: "吉井優花子・Instagram",
    title: "ついに開幕！最後のGO,JET!「#ゆかJET」本番スタート",
    body:
      "吉井優花子さんプロデュース公演「GO,JET!GO!GO! vol.1 Premium」が、2026年7月23日に開幕。優花子さんはプロデューサーに加え、B班では主役JET、C班ではガールズ早紀を演じる。歌とダンスを盛り込んだ、こだわりのPremium版公演を紹介する投稿。",
    caption:
      "ついに‼️23日から #ゆかJET 本番を迎えます✨\n最後のGO,JET!の幕開けです😭\n最高のプロデュース舞台になる予感☺️\n来られない方は『配信チケット』でご覧ください🙇‍♀️！！！\n\nプロデューサー・B班主役JET・C班ガールズ早紀\nかなり大変ですが、充実しております✨\n最後までもがき続けて、私やみんな、そしてお客様にとって良い舞台にします❤️‍🔥\n\n歌ダンス盛りだくさんのドタバタラブコメです🎙️\n今回は特に、こだわりの脚色をして楽曲も追加しているので\n本当に観てほしい！！\n\nご予約、エールカードなどの応援も\n心よりお待ちしています🙇‍♀️✨✨\n\n🔍 #ゆかJET",
    postUrl:
      "https://www.instagram.com/p/DbGY3XDgT_5/?igsh=MXVyamZ0MWJjaDg0dA==",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Instagramで元の投稿を見る",
    homepageLabel: "#ゆかJET 公演情報・チケットを見る",
    roleTags: [
      "#ゆかJET",
      "#yukakophoto",
      "Repost元：@yoppy_777",
      "B班：JET",
      "C班：早紀"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-23-instagram-opening/01-yukako-as-jet.jpg",
        alt: "B班の主役JET役として、赤い衣装と丸眼鏡を身につけた吉井優花子さん"
      },
      {
        src: "/images/yukajet/2026-07-23-instagram-opening/02-yukajet-cast-schedule.jpg",
        alt: "#ゆかJETの全キャスト、タイムテーブル、チケット情報をまとめた公演案内"
      },
      {
        src: "/images/yukajet/2026-07-23-instagram-opening/03-yukajet-main-visual.jpg",
        alt: "GO,JET!GO!GO! vol.1 Premiumの公演名、日程、劇場を記したメインビジュアル"
      },
      {
        src: "/images/yukajet/2026-07-23-instagram-opening/04-yukajet-relationship-schedule.jpg",
        alt: "#ゆかJETの登場人物相関図とA・B・C班の公演スケジュール"
      },
      {
        src: "/images/yukajet/2026-07-23-instagram-opening/05-yukajet-story.jpg",
        alt: "BAR Samasamaを舞台にしたあらすじとPremium版の見どころ"
      },
      {
        src: "/images/yukajet/2026-07-23-instagram-opening/06-yukajet-tickets.jpg",
        alt: "#ゆかJETの来場チケットと配信チケットの料金・視聴案内"
      },
      {
        src: "/images/yukajet/2026-07-23-instagram-opening/07-yukajet-support-content.jpg",
        alt: "エールカード、メッセージ動画、キャストCM、応援チケットの案内"
      },
      {
        src: "/images/yukajet/2026-07-23-instagram-opening/08-yukajet-visitor-guide.jpg",
        alt: "来場時間、撮影、ペンライト、プレゼント、面会などの観劇案内"
      }
    ]
  },
  {
    date: "2026.7.23 00:14",
    label: "吉井優花子（@mokoopy）・X",
    title: "B班主役JETのビジュアル解禁！赤黒衣装と丸眼鏡で挑む男役",
    body:
      "吉井優花子さんが、プロデュース公演「#ゆかJET」で演じるB班主役・JETのビジュアルを公開。赤黒の衣装、黒髪ショート、丸眼鏡で、龍馬くん2026とはがらりと違う男役JETに。優花子さんはB班・JET役、C班・早紀役、LIVEに出演します。",
    caption:
      "#ゆかJET \n【ビジュアル解禁&明日23日から本番‼️】\n\nB班では主役JETを務めます😊\n#龍馬くん2026 の後だと\nびっくりするビジュアル🤓\n観たらもっとびっくりします！！\n絶対楽しめるよ〜\n\nA班 15:30✨\nB班 19:00 JET役🔥\n(C班は24日12:00)\n\n⬇️B班・C班・LIVE出演🎙️\nご予約も(配信も)応援もお待ちしてます🥺\nhttps://t.co/ozR8jr3L7Y\n\n#gojet #男役",
    postUrl: "https://x.com/mokoopy/status/2079948269850091668",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "#ゆかJET 公演情報・チケットを見る",
    roleTags: ["B班：主役JET", "C班：早紀", "男役", "ビジュアル解禁", "#ゆかJET"],
    photos: [
      {
        src: "/images/yukajet/2026-07-23-jet-visual/yukako-jet-visual-20260723.jpg",
        alt: "赤黒の衣装と丸眼鏡を身につけ、B班の主役JET役を演じる吉井優花子さん"
      }
    ]
  },
  {
    date: "2026.7.22 22:57",
    label: "吉井優花子プロデュース公演公式",
    title: "#ゆかJET ついに明日が本番です！",
    body:
      "【#ゆかJET ついに明日が本番です‼️】\n\n＼23日(木)／\nA班 15:30〜❤️\nB班 19:00〜💙\n(C班は24日12:00)\n\nたくさんの人に観ていただきたいクオリティになっています！！\nぜひご観劇ください‼️\n\n⬇️ご予約・応援はこちらから✨\nエールカードは25日まで\nhttps://premiumgoyukajet.hp.peraichi.com/",
    postUrl: "https://x.com/yukako_produce/status/2079928926068260939",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "@yukako_produce のX投稿を見る",
    homepageLabel: "予約・応援ページを見る",
    roleTags: [
      "#ゆかJET",
      "公演情報",
      "本番直前",
      "GO,JET!GO!GO!",
      "吉井優花子プロデュース公演"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-22-opening-eve/yukajet-opening-eve-01.jpg",
        alt: "ピンク・黄色・水色の衣装を着た女性キャスト3名が、アメリカンダイナー風の舞台セットでポーズを取る集合写真"
      },
      {
        src: "/images/yukajet/2026-07-22-opening-eve/yukajet-opening-eve-02.jpg",
        alt: "水色の衣装、赤いシャツと眼鏡、アロハシャツ姿のキャスト3名が舞台セットで撮影した写真"
      },
      {
        src: "/images/yukajet/2026-07-22-opening-eve/yukajet-opening-eve-03.jpg",
        alt: "本番直前の舞台セットで、色鮮やかな衣装を着たキャストたちが集まった集合写真"
      },
      {
        src: "/images/yukajet/2026-07-22-opening-eve/yukajet-opening-eve-04.jpg",
        alt: "ピンクや水色のリボンなどを身につけた多数のキャストによる、本番直前の自撮り風集合写真"
      }
    ]
  },
  {
    date: "2026.7.22",
    label: "本番まであと2日",
    title: "劇場入り！本番まであと2日",
    body:
      "#ゆかJET がAir studio 両国へ劇場入り。本番まであと2日となり、赤を基調にしたレトロアメリカンな舞台セットも公開されました。A・B・C班それぞれの本編と、全キャストによるLIVEに向けて、いよいよ最終準備が進んでいます。",
    postUrl: "https://x.com/yukako_produce/status/2079581898372968725",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "#ゆかJET公式のX投稿を見る",
    homepageLabel: "公演・予約・応援ページを見る",
    roleTags: ["劇場入り", "本番まであと2日", "レトロアメリカンな舞台セット"],
    photo: {
      src: "/images/yukajet/2026-07-22-theater-entry.jpg",
      alt: "赤を基調としたレトロアメリカン風のGO,JET!舞台セット。手前にヴィンテージマイク、中央に公演ロゴ、Route 66やコカ・コーラの装飾が並んでいる"
    }
  },
  {
    date: "2026.7.21 取得",
    label: "共演者投稿・Instagram Story",
    title: "3人の“早紀ちゃん”がそろった、貴重な3ショット",
    body:
      "@eri_1408_さんのInstagramストーリーより。『早紀』役の3人が稽古場で並んだ一枚に、3者3様の“早紀ちゃん”を劇場で見てほしいというメッセージが添えられました。B班の出演日程と、エールカード・メッセージ動画・応援チケットの案内も。",
    postUrl: "https://www.instagram.com/eri_1408_/",
    homepageUrl: "/archive/2026-07-21-eri1408-saki-three-shot-story",
    ctaLabel: "投稿者のInstagramを見る",
    homepageLabel: "ストーリーの記録を詳しく見る",
    roleTags: ["共演者投稿", "Instagram Story", "稽古場オフショット", "早紀"],
    photo: {
      src: "/images/yukajet/2026-07-21-eri1408-saki-three-shot-story.jpg",
      alt: "『早紀』役の3人が稽古場で並んで撮影したInstagramストーリー画像"
    }
  },
  {
    date: "2026.7.21",
    label: "関係者投稿・演出家コメント",
    title: "演出・多賀雅人さんが称賛――「初プロデュースとは思えぬ気配り」",
    body:
      "演出を担当する多賀雅人さんが、Premiumな台本脚色とオリジナル楽曲、初プロデュースとは思えぬ気配りを称賛。「素敵な現場を作っていただいてます」——プロデューサーとしての仕事ぶりに加え、幅のある演技や歌もぜひ劇場で。",
    postUrl: "https://x.com/ryuburan_taga/status/2079368211527790758",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "多賀雅人さんのX投稿を見る",
    homepageLabel: "#ゆかJET 公演HP",
    roleTags: [
      "関係者投稿",
      "演出・多賀雅人さん",
      "@ryuburan_taga",
      "引用投稿"
    ],
    photos: [
      {
        src: "/images/yukako-yukajet-taga-director-2026-07-21-01.jpg",
        alt: "演出の多賀雅人さんと笑顔でピースをする吉井優花子さん"
      },
      {
        src: "/images/yukako-yukajet-taga-director-2026-07-21-02.jpg",
        alt: "コミカルな表情でピースをする多賀雅人さんと吉井優花子さん"
      }
    ]
  },
  {
    date: "2026.7.20",
    label: "開幕直前の決意",
    title: "「親切に」を胸に、最後まで――開幕直前の #ゆかJET",
    body:
      "開幕まであと3日。プロデューサー、制作、B班JET・C班早紀の二役を担う吉井優花子さん。「いつでもお客様とキャストとスタッフに親切に」という言葉を胸に、温かいキャストとともに最後まで走ります。ラストGO,JET!となるPremium舞台への来場を呼びかけた投稿です。",
    postUrl: "https://x.com/mokoopy/status/2079223875905491204",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "公演詳細・チケット",
    roleTags: [
      "プロデューサー・制作",
      "B班：JET",
      "C班：早紀",
      "本番まであと3日"
    ],
    photo: {
      src: "/images/yukako-yukajet-countdown-3days-2026-07-20.jpg",
      alt: "吉井優花子さんが犬のぬいぐるみを抱えた、GO,JET!GO!GO! vol.1 Premiumの出演スケジュール告知画像"
    }
  },
  {
    date: "2026.7.20",
    label: "Premiumへ、あと3日",
    title: "日ごとに増す、役としての輝き――#ゆかJET プロモーション映像",
    body:
      "開幕まであと3日。稽古を重ねる中で、全キャストが日ごとに役としての輝きを増していることを伝えるプロモーション映像が公開されました。歌、ダンス、芝居、キャラクターたちの関係性など、新たな『GO,JET!GO!GO! vol.1 Premium』の世界を映像で紹介しています。劇場観劇に加えて配信でも楽しめます。",
    postUrl: "https://x.com/yukako_produce/status/2079205943192191096",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで動画付き投稿を見る",
    homepageLabel: "公演詳細・チケット",
    roleTags: [
      "プロモーション動画",
      "本番まであと3日",
      "全キャスト",
      "Premium",
      "劇場・配信"
    ],
    video: {
      src: "/videos/yukajet-premium-countdown-3days-2026-07-20.mp4",
      poster:
        "/images/yukako-yukajet-premium-countdown-3days-video-poster-2026-07-20.jpg",
      label:
        "#ゆかJET本番3日前に公開された、キャストの稽古風景と公演情報を紹介するプロモーション動画（約1分50秒・音声あり）"
    }
  },
  {
    date: "2026.7.19",
    label: "本番まであと3日",
    title: "本番まであと3日。二役とプロデュースで挑む #ゆかJET",
    body:
      "本番まであと3日。プロデューサー、B班JET、C班早紀の三つの立場で舞台へ。自身がこだわった脚色と楽曲、多賀雅人さんの緻密な演出、温かいキャストとつくる『GO,JET! Premium』——「きっと心に残る舞台になります。どうか観に来てください」。出演はB班が7/23 19:00、7/24 15:30、7/25 12:00、7/26 19:00。C班が7/24 12:00、7/25 19:00、7/26 12:00、7/27 18:00。7/27 20:00は全キャストLIVE。投稿時点の「予約少なめ」は、7/24 B班、7/26・27 C班、全キャストLIVE。",
    postUrl: "https://x.com/mokoopy/status/2078869508970995791?s=12",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子さんの投稿を見る",
    homepageLabel: "公演日程・予約を見る",
    roleTags: ["プロデューサー", "B班：JET", "C班：早紀", "本番まであと3日"],
    photos: [
      {
        src: "/images/yukako-gojet-countdown-3days-2026-07-19-smile.jpg",
        alt: "リハーサル室で男性キャストと並び、笑顔でピースサインをする吉井優花子さん"
      },
      {
        src: "/images/yukako-gojet-countdown-3days-2026-07-19-b-jet.jpg",
        alt: "B班JET役としてリハーサルで大きく腕を広げて踊る吉井優花子さん"
      },
      {
        src: "/images/yukako-gojet-countdown-3days-2026-07-19-c-saki.jpg",
        alt: "C班早紀役としてキャストとともにダイナミックに動く吉井優花子さんのリハーサル写真"
      }
    ]
  },
  {
    date: "2026.7.19",
    label: "キャストのオフショット",
    title: "最終稽古で生まれた謎のノリ「ペロッ、青酸カリ、ガーハハハハ、バタッ」",
    body:
      "B班で早紀を演じる荒井映里乃さんが届けてくれた、最終稽古のオフショット。「ペロッ、青酸カリ、ガーハハハハ、バタッ」——謎のノリをそのまま収めた5枚で、本人いわく「本編とは全く関係ありません」。本番直前まで笑いの絶えない、#ゆかJETの稽古場です。",
    postUrl: "https://x.com/eri_no_a/status/2078858134647628147",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "荒井映里乃さんのX投稿を見る",
    homepageLabel: "公演の予約・応援ページを見る",
    roleTags: ["キャスト投稿", "B班", "稽古オフショット"],
    photos: [
      {
        src: "/images/yukako-yukajet-final-rehearsal-2026-07-19-pero.jpg",
        alt: "最終稽古の稽古場で指を口元に当ててポーズを取る#ゆかJETのキャスト"
      },
      {
        src: "/images/yukako-yukajet-final-rehearsal-2026-07-19-pointing.jpg",
        alt: "最終稽古の稽古場で床を指さして笑う#ゆかJETのキャスト"
      },
      {
        src: "/images/yukako-yukajet-final-rehearsal-2026-07-19-circle-pose.jpg",
        alt: "最終稽古の稽古場で輪になってポーズを取る#ゆかJETのキャスト"
      },
      {
        src: "/images/yukako-yukajet-final-rehearsal-2026-07-19-laugh.jpg",
        alt: "最終稽古の稽古場で手を広げて大笑いする#ゆかJETのキャスト"
      },
      {
        src: "/images/yukako-yukajet-final-rehearsal-2026-07-19-collapse.jpg",
        alt: "最終稽古の稽古場で円を描くように床へ倒れ込む#ゆかJETのキャスト"
      }
    ]
  },
  {
    date: "2026.7.18",
    label: "ペンライト応援カラー",
    title: "早紀はピンク、JETは赤。#ゆかJET応援カラー",
    body:
      "「早紀のときは、ピンクのペンライト振ってね🥹🩷」「JETのときは、赤色だよー！🫶❤️✨」——優花子さんの#ゆかJET応援カラー案内。ペンライトを振れるのは、ノリノリな曲・しっとりした曲のときだけ。公式の観劇案内では、基本はオフ、暗転中は消灯と案内されています。",
    postUrl: "https://x.com/mokoopy/status/2078467900470599986",
    homepageUrl: "https://x.com/yukako_produce/status/2078114663041208357",
    ctaLabel: "優花子さんのX投稿を見る",
    homepageLabel: "公式の観劇案内を確認する",
    supportColors: [
      { team: "C班", role: "早紀", color: "ピンク", emoji: "🩷", tone: "pink" },
      { team: "B班", role: "JET", color: "赤", emoji: "❤️", tone: "red" }
    ],
    roleTags: ["曲に合わせて使用"]
  },
  {
    date: "2026.7.18",
    label: "B班稽古",
    title: "笑いの絶えないB班稽古。女性だけのGO,JET!を劇場で",
    body:
      "#ゆかJET B班の稽古の様子。前日投稿した物販案内(早紀・JETの2パターン)を引用し、優花子さんは「写真で伝わるボケの渋滞🍈(毎回)」とコメント。女性のみでGO,JET!を演じるとどんな仕上がりになるのか、「想像以上に良いものが見られるはず」と、B班・C班・千秋楽LIVEへの来場・配信視聴を呼びかけています。",
    postUrl: "https://x.com/mokoopy/status/2078443764117639635",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子さんのX投稿を見る",
    homepageLabel: "B班・C班・LIVEの公演情報を見る",
    roleTags: ["B班：JET", "女性のみのB班", "引用投稿"],
    photos: [
      {
        src: "/images/yukako-yukajet-bban-rehearsal-2026-07-18-collage-face.jpg",
        alt: "#ゆかJETの稽古で、黄色い髪飾りをつけコミカルな表情を見せながら、キャストの集合写真を手に持つ吉井優花子さん"
      },
      {
        src: "/images/yukako-yukajet-bban-rehearsal-2026-07-18-floor-chat.jpg",
        alt: "#ゆかJETの稽古場で、床に座って談笑するB班キャストたちの写真"
      },
      {
        src: "/images/yukako-yukajet-bban-rehearsal-2026-07-18-group-pose.jpg",
        alt: "#ゆかJETのB班キャストが全員でエネルギッシュにポーズを決める集合写真"
      },
      {
        src: "/images/yukako-yukajet-bban-rehearsal-2026-07-18-lying-down.jpg",
        alt: "#ゆかJETの稽古場で、床に横たわりくつろぐB班キャストたちの写真"
      },
      {
        src: "/images/yukako-yukajet-bban-rehearsal-2026-07-18-floor-group.jpg",
        alt: "#ゆかJETの稽古後、床に放射状に横たわるB班キャスト全員の写真"
      }
    ]
  },
  {
    date: "2026.7.18",
    label: "C班ガールズ",
    title: "C班ガールズはまだまだ模索中。3人で目指す「絶対良いもの」",
    body:
      "#ゆかJETのC班で早紀を演じる優花子さんが、GO,JET! Girlsの3人で模索を重ねる稽古の現在を投稿。「ガールズもまだまだ模索中なのが新鮮」「絶対良いものになる」と、本番へ向けた期待を伝えています。優花子さん自身が「私にとっては最後のガールズ」と表現し、共演する二人と楽しく頑張る決意も綴りました。明るい3ショットとともに、C班を観てほしいと呼びかけています。",
    postUrl: "https://x.com/mokoopy/status/2078281074199982129",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子さんのX投稿を見る",
    homepageLabel: "C班の公演・予約情報を見る",
    roleTags: ["C班：早紀", "GO,JET! Girls", "C班"],
    photos: [
      {
        src: "/images/yukako-yukajet-cban-girls-2026-07-18-selfie.jpg",
        alt: "#ゆかJETのC班で、GO,JET! Girlsの3人がポーズを見せる自撮り写真"
      },
      {
        src: "/images/yukako-yukajet-cban-girls-2026-07-18-mirror.jpg",
        alt: "#ゆかJETの稽古場で、鏡越しに撮影されたC班のGO,JET! Girls3人の集合写真"
      }
    ]
  },
  {
    date: "2026.7.17",
    label: "本番まであと6日",
    title: "本番まであと6日。物販の郵送対応と稽古場の温かさ",
    body:
      "#ゆかJET本番まであと6日。公式から、残りの稽古で各班がさらに変化していきそうだという案内と、当日はペンライトを使えることが届きました。優花子さんは、物販の郵送対応を自身で行うことと、「早紀」「JET」の2パターンを案内。写真を撮ってくれた共演者や差し入れへ、「みんなの温かさに感謝」。笑顔のツーショットも添えられています。",
    postUrl: "https://x.com/mokoopy/status/2078124078461038650?s=12",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子さんのX投稿を見る",
    homepageLabel: "物販情報を見る",
    roleTags: ["B班：JET", "C班：早紀", "物販郵送対応"],
    photos: [
      {
        src: "/images/yukako-yukajet-countdown-goods-2026-07-17-lemon-drink.jpg",
        alt: "#ゆかJETの稽古場で、ドリンクを手に笑顔を見せる二人のツーショット"
      },
      {
        src: "/images/yukako-yukajet-countdown-goods-2026-07-17-snack.jpg",
        alt: "#ゆかJETの稽古場で、お菓子を手に笑顔を見せる二人のツーショット"
      }
    ]
  },
  {
    date: "2026.7.17",
    label: "公式ご来場案内",
    title: "本番まであと6日。ペンライト・物販などの公式案内",
    body:
      "#ゆかJET本番まであと6日。ご来場前に確認しておきたい公式案内がまとまりました。ペンライトは持ち込み・使用OK。基本はオフにし、ノリノリな曲やしっとりした曲で一緒に楽しむ案内です。当日の物販、ご来場時のお願い、相関図と公演日程、A・B・C班のキャスト紹介も4枚で確認できます。",
    postUrl: "https://x.com/yukako_produce/status/2078114663041208357?s=12",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "公式Xの投稿を見る",
    homepageLabel: "公演の予約・物販情報を見る",
    roleTags: ["公式案内", "ペンライトOK", "物販情報"],
    photos: [
      {
        src: "/images/yukako-yukajet-official-guide-2026-07-17-visitor-info.jpg",
        alt: "ご来場時の注意とペンライト・撮影・プレゼントなどの観劇マナー案内"
      },
      {
        src: "/images/yukako-yukajet-official-guide-2026-07-17-goods.jpg",
        alt: "#ゆかJETのブロマイド、チェキ、クリアファイルの物販案内"
      },
      {
        src: "/images/yukako-yukajet-official-guide-2026-07-17-schedule.jpg",
        alt: "#ゆかJETの相関図とA・B・C班の公演日程案内"
      },
      {
        src: "/images/yukako-yukajet-official-guide-2026-07-17-cast.jpg",
        alt: "#ゆかJETのA・B・C班キャスト紹介"
      }
    ]
  },
  {
    date: "2026.7.17",
    label: "稽古の舞台裏",
    title: "笑いをこらえるのも難関？B班稽古の楽しい舞台裏",
    body:
      "#ゆかJET B班の稽古で、優花子さん演じるJETが荒井映里乃さん演じる早紀に話しかけた場面。稽古前に整えてもらった髪型が通し稽古の激しい動きで崩れてしまったという荒井映里乃さんの投稿を引用し、「本当はめちゃくちゃ笑い堪えてた」と素直な裏話を明かしています。「耐えられない笑いが多くて、難関すぎるB班」——笑いのツボが多いB班ならではの、テンポの良い稽古場の空気が伝わってきます。本番でも、キャストが笑いをこらえながら磨き上げるB班のコメディにも注目です。",
    postUrl: "https://x.com/mokoopy/status/2077774797363429483?s=12",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子さんのX投稿を見る",
    homepageLabel: "公演の予約・応援ページを見る",
    roleTags: ["B班：JET", "稽古裏話"]
  },
  {
    date: "2026.7.16",
    label: "全班通し完了",
    title: "全班通し完了。優花子さんが語る手応えと本番への自信",
    body:
      "#ゆかJETで全班の通し稽古が完了。「早紀もJETもテンション高く激しくやってみました」「まずは上げて出して、後ほど落とすところ落として整理する」——初めての通しで得た手応えを、優花子さんが率直な言葉で共有しています。「絶対おもしろいから観に来てね」という呼びかけとともに、ミッツ役のくるめちゃんと「一緒にやれて嬉しいなあ」という一言にも、稽古場の温かさがにじみます。",
    postUrl: "https://x.com/mokoopy/status/2077746756226617527",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "本人のX投稿を見る",
    homepageLabel: "公演の予約・応援ページを見る",
    roleTags: ["B班：JET", "C班：早紀"],
    photo: {
      src: "/images/yukako-yukajet-all-team-run-2026-07-16-duo-selfie.jpg",
      alt: "#ゆかJETの通し稽古後に撮影された、吉井優花子さんと共演者のツーショット自撮り写真"
    }
  },
  {
    date: "2026.7.16",
    label: "合同稽古",
    title: "刺激の多い合同稽古！A・B・C班それぞれの個性に注目",
    body:
      "#ゆかJETのA・B・C班が集まり、合同稽古を実施。班ごとに雰囲気も個性も大きく異なり、同じ作品でも班ごとに違った魅力を楽しめそうです。全班の見比べはもちろん、千秋楽LIVEにも注目です。笑顔いっぱいの集合写真や、エネルギッシュな稽古風景も公開中。",
    postUrl: "https://x.com/yukako_produce/status/2077725000291975599",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "公式Xの投稿を見る",
    homepageLabel: "公演の予約・応援ページを見る",
    deadline: {
      at: "2026-07-16T23:59:59+09:00",
      beforeText: "キャストCM枠は7月16日（木）23:59まで",
      afterText: "キャストCM枠の受付は終了しました"
    },
    photos: [
      {
        src: "/images/yukako-yukajet-joint-rehearsal-2026-07-16-group.jpg",
        alt: "#ゆかJET合同稽古に参加したキャスト・スタッフの集合写真"
      },
      {
        src: "/images/yukako-yukajet-joint-rehearsal-2026-07-16-jump.jpg",
        alt: "A・B・C班合同稽古でエネルギッシュに演技するキャスト"
      },
      {
        src: "/images/yukako-yukajet-joint-rehearsal-2026-07-16-prop.jpg",
        alt: "赤い小道具を使って演技を確認する合同稽古の様子"
      },
      {
        src: "/images/yukako-yukajet-joint-rehearsal-2026-07-16-mic.jpg",
        alt: "マイクを前に歌や演技の稽古を行うキャスト"
      }
    ]
  },
  {
    date: "2026.7.16",
    label: "二役への想い",
    title: "B班はJET、C班は早紀。二役に挑む優花子さんの想い",
    body:
      "#ゆかJETで優花子さんが演じるのは、B班の主役「JET」とC班のガールズ「早紀」の二役。「二役でそれぞれの私が楽しめるから、どちらも絶対観てほしいです」「超研究してます。頑張ってます。良いもの届けます！！！」——本人の言葉です。B班は全員女性キャストならではの空気感、C班は「熱血大乱闘」というキャッチ通りのエネルギッシュさが対照的。二役で違う顔を見せる芝居にも注目です。",
    postUrl: "https://x.com/mokoopy/status/2077728068668739687",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "本人のX投稿を見る",
    homepageLabel: "公演の予約・応援ページを見る",
    roleTags: ["B班：JET", "C班：早紀"],
    photos: [
      {
        src: "/images/yukako-yukajet-dual-role-2026-07-16-cban-battle.jpg",
        alt: "「熱血大乱闘C班」の文字入りで、複数のキャストがダイナミックに動く稽古風景"
      },
      {
        src: "/images/yukako-yukajet-dual-role-2026-07-16-bban-scene.jpg",
        alt: "「全員女性キャストB班」の文字入りで、カウンター越しに会話する稽古シーン"
      }
    ]
  },
  {
    date: "2026.7.15",
    label: "B班を観てほしい",
    title: "B班の爆笑リハ公開。「主役JETも観てほしい」",
    body:
      "GO,JET!史上初、女性だけのB班。爆笑続きの稽古風景とともに「C早紀はもちろん、B主役JETも観てほしい❗️」とまっすぐな呼びかけ。24日(金)15:30は「私の一人目のお客に…🥺」——優花子さん自身の言葉で予約を待っています。",
    postUrl: "https://x.com/mokoopy/status/2077285768821911646?s=12",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子の投稿を見る",
    photos: [
      {
        src: "/images/yukako-yukajet-bban-rehearsal-2026-07-15-group-selfie.jpg",
        alt: "#ゆかJETの稽古場で、演出の多賀さんの紹介とともに笑顔でピースする吉井優花子さんとキャストの集合セルフィー写真"
      },
      {
        src: "/images/yukako-yukajet-bban-rehearsal-2026-07-15-cast-roles.jpg",
        alt: "#ゆかJET B班の大地役ももかさん、JET役ゆかこさん（プロデューサー・C班早紀）、マスター役くるめさん（C班美月・だおさん）を紹介する画像"
      },
      {
        src: "/images/yukako-yukajet-bban-rehearsal-2026-07-15-scene-1.jpg",
        alt: "#ゆかJETの稽古で、芝居の一場面を演じるB班キャストたちの写真"
      },
      {
        src: "/images/yukako-yukajet-bban-rehearsal-2026-07-15-scene-2.jpg",
        alt: "#ゆかJETの稽古で、床に座って笑い合うB班キャストたちの写真"
      }
    ]
  },
  {
    date: "2026.7.13",
    label: "B班も注目",
    title: "B班も見逃せない！男役3人の魅力✨",
    body:
      "「B班も観ないともったいないよ😭」——JETの親友・大地、主人公JET、バーマスターであるあかねの兄。個性豊かな男役3人が、B班の物語をさらに盛り上げます。「私の最初で最後のGO,JET!プロデュースです❗️三班素晴らしくなります‼️」",
    postUrl:
      "https://www.instagram.com/stories/yoppy_777/3941171832056937761?utm_source=ig_story_item_share&igsh=MWozY3Y4ZzFnYzAxNw==",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Instagramストーリーズを見る",
    photo: {
      src: "/images/yukako-yukajet-bban-male-cast-story-2026-07-15.jpg",
      alt: "吉井優花子さんのGO,JET!プロデュース公演で、B班の男役3人とそれぞれの役柄を紹介したInstagramストーリーズ画像"
    }
  },
  {
    date: "2026.7.13",
    label: "ワイワイC班",
    title: "最後の早紀、楽しんで演じます",
    body:
      "「ワイワイC班😆 バランス良く新しいものを作れる予感💭」——C班キャスト紹介に応えての一言。「絶対に観てほしい作品です！！！」CM枠は7/16（木）23:59まで、応援コンテンツもお待ちしています。",
    postUrl: "https://x.com/mokoopy/status/2076682572550267389",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子のポストを見る"
  },
  {
    date: "2026.7.11",
    label: "エールカード受付中",
    title: "「最後だから」優花子デザインのエールカードを届けてほしい",
    body:
      "今日も#ゆかJETの稽古へ。プロデューサーに加え、C班早紀・B班JETの二役を務める優花子さんが、「最後だから」と、自らデザインしたエールカードへの応援を呼びかけています。劇場に掲示されたカードは、公演後に本人からのメッセージ付きで返送。メッセージ動画もおすすめです。エールカード・メッセージ動画・応援チケットは7/25（土）23:59まで、キャストCMは7/16（木）23:59まで。",
    postUrl: "https://x.com/mokoopy/status/2075702367643910204",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "エールカードの投稿を見る"
  },
  {
    date: "2026.7.10",
    label: "本番まであと2週間",
    title: "「本当にとっても観てほしい舞台」",
    body:
      "本番まであと2週間。優花子さんは「みんなで楽しく頑張っています」と稽古の様子を届けつつ、C班早紀・B班JET・千秋楽LIVEそれぞれの見どころと、来場／配信チケットへの想いをまっすぐに呼びかけています。",
    postUrl: "https://x.com/mokoopy/status/2075595979160707420",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子のポストを見る"
  },
  {
    date: "2026.7.10",
    label: "芝居稽古初日",
    title: "まずはC班・B班",
    body:
      "歌ダンス稽古を終え、芝居稽古がスタート。「個性ありありだと再感しています🤭byプロデューサー」——班ごとに雰囲気の異なるおもしろい作品をお届けします、29秒の稽古映像つき。",
    postUrl: "https://x.com/yukako_produce/status/2075593021048193231",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで稽古動画を見る",
    video: {
      src: "/videos/yukajet-rehearsal-2026-07-10.mp4",
      poster: "/images/yukako-yukajet-rehearsal-video-poster-2026-07-10.jpg",
      label: "#ゆかJET 芝居稽古初日の様子(29秒・音声あり)"
    }
  },
  {
    date: "2026.7.8",
    label: "舞台裏の告白",
    title: "毎日、撮影と編集もしてるんだ",
    body:
      "「毎日、撮影と編集もしてるんだ」——稽古だけでなくプロモーション動画の撮影・編集も自分でこなしていたことを明かした引用ポスト。「会場で生でそのパワーを受けてほしい」、そして「#ゆかJET は新しいGO,JET!を届けます」。",
    postUrl: "https://x.com/mokoopy/status/2074877458520879482",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子のポストを見る"
  },
  {
    date: "2026.7.8",
    label: "本気の呼びかけ",
    title: "あと20人は来てほしい",
    body:
      "「今日も歌ダンス稽古🎶」プロデューサー・C班早紀・B班JETの三役をこなしながら「最後まで思いきり頑張りますよー！！✨」。「絶対みんなに観てほしい舞台です😢 あと20人は来てほしい、、、」——本気の呼びかけとともに50秒のリハーサル映像つき。",
    postUrl: "https://x.com/mokoopy/status/2074871931430736273",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子のポストを見る",
    video: {
      src: "/videos/yukajet-rehearsal-2026-07-08.mp4",
      poster: "/images/yukako-yukajet-rehearsal-video-poster-2026-07-08.jpg",
      label: "#ゆかJET 歌ダンス稽古の様子(50秒・音声あり)"
    }
  },
  {
    date: "2026.7.7",
    label: "稽古場より",
    title: "みんなにとっても思い入れと成長のある舞台に",
    body:
      "「睡魔と戦いながら毎日投稿しています😴笑」——プロデュース公式の稽古動画にハートポーズの集合写真を添えて引用。「みんなにとっても、思い入れと成長のある舞台になったら私は嬉しいです」。",
    postUrl: "https://x.com/mokoopy/status/2074506038041325580",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "優花子のポストを見る"
  },
  {
    date: "2026.7.7",
    label: "全役歌あり",
    title: "全役集合、なんと全役歌ありのゆかJET",
    body:
      "「なんと今回は…全役歌あり⁉️」オリジナル脚色で、歌ダンスたっぷりのゆかJET。みんなで本番に向けて練習中——全キャストが集合して歌う46秒の稽古動画つき。",
    postUrl: "https://x.com/yukako_produce/status/2074499839531044967",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで稽古動画を見る",
    video: {
      src: "/videos/yukajet-rehearsal-2026-07-07.mp4",
      poster: "/images/yukako-yukajet-rehearsal-video-poster-2026-07-07.jpg",
      label: "#ゆかJET 全役集合の歌ダンス稽古の様子(46秒・音声あり)"
    }
  },
  {
    date: "2026.7.6",
    label: "歌ダンス稽古",
    title: "美里もプロデューサーオリジナル楽曲",
    body:
      "今日はガールズ & JET & あかね & 美里。曲数の多いガールズも踊り慣れてきて、メグに続き美里の歌もオリジナル楽曲に。三班のJET×あかねの雰囲気の違いもお楽しみに——稽古場から57秒の動画つき。",
    postUrl: "https://x.com/yukako_produce/status/2074136760825885049",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで投稿を見る",
    video: {
      src: "/videos/yukajet-rehearsal-2026-07-06.mp4",
      poster: "/images/yukako-yukajet-rehearsal-video-poster-2026-07-06.jpg",
      label: "#ゆかJET 歌ダンス稽古の様子(57秒・音声あり)"
    }
  },
  {
    date: "2026.7.5",
    label: "稽古の熱量",
    title: "キャストが稽古を楽しむ現場づくり",
    body:
      "一生懸命で、優しくて、おもしろい——そんなキャストが稽古を楽しんでくれているのが何より嬉しい、みんなでちゃんと休んで頑張ろう、という稽古場からのメッセージ。",
    postUrl: "https://x.com/mokoopy/status/2073778000177594434",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで投稿を見る"
  },
  {
    date: "2026.7.5",
    label: "メグの歌",
    title: "優花子さんがメグの歌を制作",
    body:
      "メグが劇中で歌うオリジナル楽曲は、優花子さんの作。稽古場で初めて歌になった1曲、本番でどう響くかはお楽しみ。",
    postUrl: "https://x.com/mokoopy/status/2073772074964054080",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで投稿を見る"
  },
  {
    date: "2026.7.5",
    label: "歌ダンス稽古",
    title: "ガールズ & JET & あかね & メグの歌ダンス稽古動画が公開",
    body:
      "キャストがマイクに向かう歌ダンス稽古の動画が公開中。メグのオリジナル楽曲、LIVEコーナーでの披露の予告も。",
    postUrl: "https://x.com/yukako_produce/status/2073768826303631470",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで稽古動画を見る",
    video: {
      src: "/videos/yukajet-rehearsal-2026-07-05.mp4",
      poster: "/images/yukako-yukajet-rehearsal-video-poster-2026-07-05.jpg",
      label: "#ゆかJET 歌ダンス稽古の様子(43秒・音声あり)"
    }
  },
  {
    date: "2026.6.11",
    label: "プロデュース発表",
    title: "思い出の舞台を、今度はプロデューサーとして",
    body:
      "#ゆかJETの原点。2026年6月11日、吉井優花子さんが思い出の舞台『GO,JET!GO!GO!』をプロデュースすることを発表。歌×ダンス×コメディ、脚本の一部変更とオリジナル楽曲——出演者として挑んだ作品へ、今度はプロデューサーとして向き合う始まりの投稿です。投稿内の出演者募集は当時の案内です。",
    postUrl: "https://www.instagram.com/p/DZch0STFB0M/?igsh=MWt2amJ6djV3ZGZnaA==",
    homepageUrl: "/archive/2026-06-11-gojet-produce-announce",
    ctaLabel: "Instagramで元の投稿を見る",
    homepageLabel: "活動の軌跡で詳しく読む",
    roleTags: ["ゆかJETの始まり", "『GO,JET!GO!GO!』の原点"],
    photos: [
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
    ]
  }
];

export const gojetTeamUpdates: GojetTeamUpdate[] = [
  {
    id: "gojet-c-team-2026-07-13",
    team: "C",
    date: "2026.7.13",
    label: "優花子からのメッセージ",
    title: "とってもパワフルです。新しいGO,JET!を模索中",
    quote:
      "「とってもパワフルです😆💛 オシャレで大笑いできる新しいGO,JET!を模索中💭」——C班の魅力をひとことで伝える投稿。プロデューサー自身もC班で早紀役を演じます。",
    body:
      "早紀（吉井優花子）・夏代（中原楓歌）・美月（来瞳舞夢）・JET（宇佐美翔）・あかね（葉山椎菜）・メグ（沼尾麻由佳）・大地（矢口秀）・マスター（チップ青木）・美里（三村すみか）。約2分54秒のC班キャスト紹介動画つき。",
    yukakoPostUrl: "https://x.com/mokoopy/status/2076682572550267389",
    originalPostUrl: "https://x.com/yukako_produce/status/2076674254184263792",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    video: {
      src: "/videos/yukajet-cban-cast-2026-07-13.mp4",
      poster: "/images/yukako-yukajet-cban-cast-video-poster-2026-07-13.jpg",
      label: "#ゆかJET C班キャスト紹介動画(2分54秒・音声あり)"
    }
  },
  {
    id: "gojet-a-team-2026-07-13",
    team: "A",
    date: "2026.7.13",
    label: "優花子からのメッセージ",
    title: "混ざりたい🥺笑 A班への想い",
    quote:
      "「混ざりたい🥺笑」——共演しないA班にも、優花子さんから「プロデューサーとしてみんなのことをとっても大切に想っています」と温かいエール。芝居稽古初日を迎えたA班の紹介動画を引用しての投稿です。",
    body:
      "プロデュースアカウントが公開したA班キャスト紹介動画と、優花子さん自身が撮ったA班との集合セルフィーをあわせて掲載します。フレッシュでおもしろい雰囲気に注目です。",
    yukakoPostUrl: "https://x.com/mokoopy/status/2076341467841445980",
    originalPostUrl: "",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    photo: {
      src: "/images/yukako-yukajet-aban-cast-2026-07-13-selfie.jpg",
      alt: "#ゆかJET A班キャストと集合セルフィーを撮る吉井優花子さん"
    },
    video: {
      src: "/videos/yukajet-aban-cast-2026-07-13.mp4",
      poster: "/images/yukako-yukajet-aban-cast-video-poster-2026-07-13.jpg",
      label: "#ゆかJET A班キャスト紹介動画(2分3秒・音声あり)"
    }
  },
  {
    id: "gojet-b-team-2026-07-12",
    team: "B",
    date: "2026.7.12",
    label: "優花子からのメッセージ",
    title: "毎日撮影・編集。大笑いのB班を届けます",
    quote:
      "「毎日撮って編集しております🥺」「私が大爆笑すぎる」——優花子さん自身が、撮影・編集を続けながら届けているB班キャスト紹介。笑いの絶えない稽古場の空気と、最後までしっかり決まるオチにも注目です。",
    body:
      "GO,JET!史上初となる女性のみのB班。荒井映里乃さん、冬雪咲百夏さん、月島ほたるさん、吉井優花子さん、清水桃香さん、中城遥さんが笑顔で登場し、自己紹介から芝居・ダンス稽古まで約2分で紹介します。優花子さんは来場・拡散に加え、エールカードやメッセージ動画などの応援コンテンツも呼びかけています。",
    yukakoPostUrl: "https://x.com/mokoopy/status/2076121780398563659",
    originalPostUrl: "https://x.com/yukako_produce/status/2075952839856386054",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    video: {
      src: "/videos/yukajet-bban-cast-2026-07-12.mp4",
      poster: "/images/yukako-yukajet-bban-cast-video-poster-2026-07-12.jpg",
      label: "#ゆかJET B班キャスト紹介動画(約2分・音声あり)"
    }
  }
];

export const gojetPromoImages: PromoImage[] = [
  {
    src: "/images/yukako-yukajet-rehearsal-smile-2026-07-10.jpg",
    alt: "#ゆかJETの稽古場で笑顔を見せる吉井優花子さん。本番まであと2週間のリハーサル風景"
  },
  {
    src: "/images/yukako-yukajet-rehearsal-2026-07-07-group.jpg",
    alt: "#ゆかJETの稽古場でハートポーズをする吉井優花子さんとキャスト・スタッフ総勢の集合写真"
  },
  {
    src: "/images/yukako-yukajet-lyrics-card-2026-07-05.jpg",
    alt: "#ゆかJETの稽古でB4版の歌詞カードを掲げる吉井優花子さん"
  },
  {
    src: "/images/yukako-yukajet-megu-song-rehearsal-2026-07-05.jpg",
    alt: "#ゆかJETの稽古場でメグのオリジナル楽曲を確認している様子"
  },
  {
    src: "/images/yukako-yukajet-rehearsal-2026-07-04-selfie.jpg",
    alt: "#ゆかJETの稽古で笑顔を見せる吉井優花子さんとガールズキャストの自撮り写真"
  },
  {
    src: "/images/yukako-yukajet-rehearsal-2026-07-04-girls.jpg",
    alt: "#ゆかJETの稽古でハートポーズをする吉井優花子さんたちガールズキャストの集合写真"
  },
  {
    src: "/images/yukako-gojet-boost-2026-07-03-message.jpg",
    alt: "#ゆかJETへの想いと配信チケット案内を伝える吉井優花子さんの告知スライド"
  },
  {
    src: "/images/yukako-gojet-boost-2026-07-03-main-visual.jpg",
    alt: "GO,JET!GO!GO! vol.1 Premiumのキービジュアルとキャスト・チケット情報"
  },
  {
    src: "/images/yukako-gojet-boost-2026-07-03-chart-schedule.jpg",
    alt: "#ゆかJETの相関図とA班B班C班の公演日程をまとめた告知画像"
  },
  {
    src: "/images/yukako-gojet-boost-2026-07-03-schedule-theater.jpg",
    alt: "#ゆかJETの相関図、公演日程、Air studio両国の劇場情報をまとめた告知画像"
  },
  {
    src: "/images/yukako-gojet-boost-2026-07-03-ticket-info.jpg",
    alt: "#ゆかJETの来場チケットと配信チケットの案内画像"
  },
  {
    src: "/images/yukako-gojet-boost-2026-07-03-support-goods.jpg",
    alt: "#ゆかJETのエールカードやメッセージ動画などキャスト応援コンテンツの案内画像"
  }
];
