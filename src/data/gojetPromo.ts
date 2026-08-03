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
  // 優花子さん本人からのリプライが確認できた場合に、控えめな引用欄として表示する
  yukakoReply?: {
    body: string;
    // 返信についての短い補足文
    note?: string;
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
  // 複数の演者さんの投稿を1枚のカードにまとめるときに使う。
  // 個別カードを立てるほどではないが、名前・役・言葉・動線は残したい場合向け。
  castVoices?: {
    heading: string;
    note?: string;
    items: {
      name: string;
      // Xのハンドル（"@" 込み）。プロフィールへの動線をここから組み立てる。
      handle: string;
      // 役どころ（例: "C班：JET役"）
      role?: string;
      // 投稿からの引用。原文どおりのときだけ載せる。
      quote: string;
      // 元投稿のURL。確認できたものだけ設定する（未確認ならプロフィールのみ表示）。
      postUrl?: string;
    }[];
  };
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
    date: "2026.8.3 20:40",
    label: "沼尾麻由佳さん（@mayuka_pinkcha）・C班メグ役",
    title: "何をしても良いリアクション｜メグから見た早紀とC班ガールズ",
    body:
      "「今日はC班ガールズ❗️🩷💛🩵」——C班でメグを演じた沼尾麻由佳さんが、早紀・ナッツ・ミッツとのツーショットを公開。\n\nメグとしては罵声を浴びせ、睨みつけていた3人。それでも役を離れれば、みんながワイワイしている姿が大好き。\n\n早紀役の優花子さんへは、一緒に歌おうと誘われる場面が「ほんとーーーに毎回新鮮にムカついてました」。その一方で、何をしても良いリアクションを返してくれるから、安心してふっかけられた——舞台上の信頼がにじむ振り返りです。\n\n「P優花子さんのお話はまたまた後ほど」と、プロデューサーとしての言葉も予告されています。",
    postUrl: "https://x.com/mayuka_pinkcha/status/2084243063141179760",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "沼尾麻由佳さんの投稿とスレッドを見る",
    homepageLabel: "#ゆかJET 公演ページを見る",
    roleTags: [
      "#ゆかJET",
      "キャスト投稿",
      "C班：メグ役",
      "C班：早紀役",
      "C班ガールズ",
      "吉井優花子さん",
      "沼尾麻由佳さん",
      "終演後"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-08-03-numao-mayuka-c-girls-yukako-saki.jpg",
        alt: "アメリカンダイナー風の舞台セットで、ピンクの衣装と大きなリボンを着けた早紀役の吉井優花子さんが、水色のシャツと三つ編み姿のメグ役・沼尾麻由佳さんの頬を指さし、寄り添って写るツーショット"
      },
      {
        src: "/images/yukajet/2026-08-03-numao-mayuka-c-girls-kae-nuts.jpg",
        alt: "アメリカンダイナー風の舞台セットで、黄色のリボンと星の髪飾りを着けた夏代（ナッツ）役の中原楓歌さんと、水色のシャツ姿のメグ役・沼尾麻由佳さんがピースをするツーショット"
      },
      {
        src: "/images/yukajet/2026-08-03-numao-mayuka-c-girls-maimu-mitts.jpg",
        alt: "アメリカンダイナー風の舞台セットで、大きな水色のリボンと黒・水色の衣装を着けた美月（ミッツ）役の来瞳舞夢さんと、水色のシャツ姿のメグ役・沼尾麻由佳さんが顔を寄せるツーショット"
      }
    ]
  },
  {
    date: "2026.8.2 12:54",
    label: "吉井優花子プロデュース公演（@yukako_produce）・C班",
    title: "消えていたC班キャスト紹介を再投稿｜幽霊ガールズの仕業？",
    body:
      "「なぜか消えているC班の動画。。。幽霊ガールズの仕業👻⁉️」——C班キャスト紹介が、このタイミングで再登場✨\n\n相関図から一人ずつの紹介、稽古や本番の映像までを約2分54秒に凝縮。A班・B班の紹介も遡って楽しめます。\n\n配信チケットは8月3日〆切、8月10日まで視聴できます（¥3,700/本）。",
    caption:
      "【#ゆかJET C班キャスト紹介🎙️】\n\nなぜか消えているC班の動画。。。\n幽霊ガールズの仕業👻⁉️\n\nせっかくなのでこのタイミングで再投稿✨\nA.B班も遡ってみてください♪\n\n＼🎟️『配信チケット』大好評販売中／\n新たなGO,JET!ここにあり❤️‍🔥\n10日まで視聴可能◎\n⬇️",
    postUrl: "https://x.com/yukako_produce/status/2083763241877217706",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで再投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "公演アカウント",
      "C班",
      "キャスト紹介",
      "幽霊ガールズ",
      "再投稿",
      "配信チケット"
    ],
    video: {
      src: "/videos/yukajet-cban-cast-2026-07-13.mp4",
      poster: "/images/yukako-yukajet-cban-cast-video-poster-2026-07-13.jpg",
      label: "#ゆかJET C班キャスト紹介動画（約2分54秒・音声あり）"
    },
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演",
      handle: "@yukako_produce",
      body:
        "7月12日に公開されたA班キャスト紹介動画。今回のC班再投稿は、このA班投稿を引用し、A班・B班の紹介もあわせて遡って見るよう呼びかけています。",
      url: "https://x.com/yukako_produce/status/2076313322421690497",
      urlLabel: "引用元（A班キャスト紹介）を見る"
    }
  },
  {
    date: "2026.8.1 23:50",
    label: "吉井優花子さん（@mokoopy）× 中原楓歌さん（@fuchan_O315）",
    title: "偶然のご縁から、また一緒に良い仕事を",
    body:
      "#ゆかJETで夏代（ナッツ）役を演じた中原楓歌さんから、「ゆかこpのプロデュースでよかったです」の言葉。優花子さんは、多賀さんが繋いだ偶然のご縁と、一緒にできたガールズへ感謝を返しました。\n\n「また一緒に良い仕事しよう〜！！」——終演後も続いていく、次の仕事への約束です。",
    caption:
      "へへ、嬉しい( ⸝⸝•ᴗ•⸝⸝ )✨\n#ゆかJET 参加してくれてありがとう\n多賀さんが繋いでくれた偶然のご縁 そして一緒にできたガールズ💛🩷🩵\nまた一緒に良い仕事しよう〜！！",
    postUrl: "https://x.com/mokoopy/status/2083565988352790714",
    homepageUrl:
      "https://x.com/fuchan_o315/status/2083522880323863017",
    ctaLabel: "優花子さんの投稿を見る",
    homepageLabel: "中原楓歌さんの投稿を見る",
    roleTags: [
      "#ゆかJET",
      "キャストのご縁",
      "吉井優花子さん",
      "中原楓歌さん",
      "夏代（ナッツ）役",
      "終演後"
    ],
    photo: {
      src: "/images/yukajet/2026-08-01-fuchan-nuts-popcorn.jpg",
      alt: "赤い壁とオレンジ色のテーブルがある店内で、黄色の髪飾りをつけた中原楓歌さんが両手を頬に添え、キャラメルポップコーンの大きな瓶の隣で微笑んでいる"
    },
    quotedPost: {
      author: "中原楓歌",
      handle: "@fuchan_O315",
      body:
        "物販が届き始めてるそうで嬉しい✨\nナッツがあなたのお家にこんにちはしますよ➖🏠✨\n#ゆかJET はお楽しみいただけたでしょうか?配信もあるのでまだまだ一緒だよ。\nきっと人生最初で最後のgo! jet\nゆかこpのプロデュースでよかったです。\nデカくなるのでついてきてね👊🏻🐼"
    }
  },
  {
    date: "2026.8.1 23:33",
    label: "吉井優花子プロデュース公演（@yukako_produce）・C班",
    title: "キャラ紹介ナレーションをチラ見せ｜ラストはC班",
    body:
      "「キャラ紹介ナレーションをチラ見せ👀」——三班連続のラストはC班💛\n\n約2分53秒の舞台映像で、キャラクター紹介にあわせて歌・ダンス・掛け合いを少しずつ。A班・B班とはまた違う組み合わせを、配信でもう一度。\n\n配信チケットは8月3日〆切、8月10日まで視聴できます（¥3,700/本）。",
    caption:
      "#ゆかJET\n＼キャラ紹介ナレーションをチラ見せ👀／\n\n三班続けて投稿✨\nラストはC班！！💛\n\n【配信チケット🎟️】\n大好評です😳‼️\n劇場で観た方も、ぜひご覧ください🎶\n※8月3日〆切〜10日まで視聴可能✨",
    postUrl: "https://x.com/yukako_produce/status/2083561783437279522",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "公演アカウント",
      "C班",
      "キャラクター紹介",
      "舞台映像",
      "三班連続投稿",
      "配信チケット"
    ],
    video: {
      src: "/videos/yukajet-c-team-character-intro-2026-08-01.mp4",
      poster: "/images/yukajet/2026-08-01-c-team-character-intro-poster.jpg",
      label: "『GO,JET!GO!GO! vol.1 Premium』C班のキャラクター紹介ナレーション映像"
    },
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演",
      handle: "@yukako_produce",
      body:
        "三班連続の第2弾、女性キャストのみのB班キャラクター紹介ナレーション映像。C班はこの投稿を引用し、三班のリレーを締めくくっています。",
      url: "https://x.com/yukako_produce/status/2083560994169889115",
      urlLabel: "引用元（B班のキャラ紹介）を見る"
    }
  },
  {
    date: "2026.8.1 23:30",
    label: "吉井優花子プロデュース公演（@yukako_produce）・B班",
    title: "キャラ紹介ナレーションをチラ見せ｜続いてB班",
    body:
      "「キャラ紹介ナレーションをチラ見せ👀」——三班連続の第2弾は、女性キャストのみのB班💙\n\n約3分01秒の舞台映像で、キャラクター紹介にあわせて歌・ダンス・掛け合いを少しずつ。A班とは違う組み合わせを、配信でもう一度。\n\n配信チケットは8月3日〆切、8月10日まで視聴できます（¥3,700/本）。",
    caption:
      "#ゆかJET\n＼キャラ紹介ナレーションをチラ見せ👀／\n\n三班続けて投稿✨\n続いてB班💙\n女性キャストのみ！\n\n【配信チケット🎟️】\n大好評です😳‼️\n劇場で観た方も、ぜひご覧ください🎶\n※8月3日〆切〜10日まで視聴可能✨",
    postUrl: "https://x.com/yukako_produce/status/2083560994169889115",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "公演アカウント",
      "B班",
      "女性キャストのみ",
      "キャラクター紹介",
      "舞台映像",
      "配信チケット"
    ],
    video: {
      src: "/videos/yukajet-b-team-character-intro-2026-08-01.mp4",
      poster: "/images/yukajet/2026-08-01-b-team-character-intro-poster.jpg",
      label: "『GO,JET!GO!GO! vol.1 Premium』B班のキャラクター紹介ナレーション映像"
    },
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演",
      handle: "@yukako_produce",
      body:
        "三班連続の第1弾、A班のキャラクター紹介ナレーション映像。B班はこの投稿を引用して続いています。",
      url: "https://x.com/yukako_produce/status/2083560056470323653",
      urlLabel: "引用元（A班のキャラ紹介）を見る"
    }
  },
  {
    date: "2026.8.1 23:26",
    label: "吉井優花子プロデュース公演（@yukako_produce）・A班",
    title: "キャラ紹介ナレーションをチラ見せ｜まずはA班から",
    body:
      "「キャラ紹介ナレーションをチラ見せ👀」——三班連続の第1弾はA班❤️\n\n約2分52秒の舞台映像で、キャラクター紹介にあわせて歌・ダンス・掛け合いを少しずつ。劇場で観た方にも、配信でもう一度。\n\n配信チケットは8月3日〆切、8月10日まで視聴できます（¥3,700/本）。",
    caption:
      "#ゆかJET\n＼キャラ紹介ナレーションをチラ見せ👀／\n\n三班続けて投稿します！✨\nまずはA班から❤️\n\n【配信チケット🎟️】\n大好評です😳‼️\n劇場で観た方も、ぜひご覧ください🎶\n※8月3日〆切〜10日まで視聴可能✨",
    postUrl: "https://x.com/yukako_produce/status/2083560056470323653",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "公演アカウント",
      "A班",
      "キャラクター紹介",
      "舞台映像",
      "配信チケット"
    ],
    video: {
      src: "/videos/yukajet-a-team-character-intro-2026-08-01.mp4",
      poster: "/images/yukajet/2026-08-01-a-team-character-intro-poster.jpg",
      label: "『GO,JET!GO!GO! vol.1 Premium』A班のキャラクター紹介ナレーション映像"
    },
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演",
      handle: "@yukako_produce",
      body:
        "前日の配信チケット案内。本編は歌・ダンスたっぷりの約100分、A・B・C班の見比べと全キャスト参加LIVE約20曲を紹介しています。",
      url: "https://x.com/yukako_produce/status/2083165443876081719",
      urlLabel: "引用元（配信チケット案内）を見る"
    }
  },
  {
    date: "2026.8.1 14:52",
    label: "秋乃蒼依さん（@akino_aoinari）・A班早紀役",
    title: "早紀3人で🩷｜三者三様の早紀を見比べて",
    body:
      "A班で早紀を演じた秋乃蒼依さんから、3人の早紀が揃った終演後の一枚。「2人ともいなりとは全然違う素敵な早紀だった！ぜひ配信で観て確かめてみてね👀✨」\n\n秋乃さんの見立てでは、荒井映里乃さんが「女子校の頂点ゆるギャル」、優花子さんが「母性強めがんばりやお姉さん」。そして「いなりはどうだったかな！？」\n\n早紀はA班が秋乃蒼依さん、B班が荒井映里乃さん、C班が優花子さん。配信チケットは8月3日〆切、8月10日まで視聴できます。",
    caption:
      "#ゆかJET 早紀3人で🩷\n2人ともいなりとは全然違う素敵な早紀だった！ぜひ配信で観て確かめてみてね👀✨\n\nちなみにいなり的には、えりのちゃんは女子校の頂点ゆるギャル、ゆかちゃまは母性強めがんばりやお姉さんって感じだった…💭\n\nいなりはどうだったかな！？",
    postUrl: "https://x.com/akino_aoinari/status/2083430725815247136",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "秋乃蒼依さんの投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "キャスト投稿",
      "秋乃蒼依さん",
      "A班：早紀役",
      "三者三様の早紀",
      "配信チケット"
    ],
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    photo: {
      src: "/images/yukajet/2026-08-01-saki-trio-selfie.jpg",
      alt: "「GO,JET!go!go!」のロゴが掲げられたアメリカンダイナー風のセットの前で、ピンクに黒襟の制服と大きなピンクのリボンを身につけた早紀役の3人が顔を寄せて撮った自撮り。中央の吉井優花子さんが淡いピンクの花束を抱え、3人とも目もとにきらきらしたシールをつけて笑顔を見せている"
    }
  },
  {
    date: "2026.8.1 12:27",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "稽古1カ月弱であのクオリティ｜次はもう少し長めに",
    body:
      "5月に出したキャスト募集の告知を引用しての振り返り。「もう懐かしいけど、まだ約1カ月前、、、」\n\n「稽古期間1カ月弱で、あそこまでのクオリティになったのはすごい」——そのうえで「次は稽古期間もう少し長めに取ろう。。💭」。プロデューサーとしての次への一手。\n\n配信は約100分。A・B・C班とLIVEを「予想を超えて楽しめます！」。購入は8月3日まで、視聴は8月10日までです。",
    caption:
      "もう懐かしいけど、まだ約1カ月前、、、\n稽古期間1カ月弱で、あそこまでのクオリティになったのはすごい\n\n次は稽古期間もう少し長めに取ろう。。💭\n\n⬇️#ゆかJET なんと約100分😳🎶✨\nA.B.C班&LIVE、予想を超えて楽しめます！\n配信チケットでぜひ観てほしい‼️",
    postUrl: "https://x.com/mokoopy/status/2083394253787644060",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "振り返り",
      "プロデューサー",
      "稽古期間",
      "配信チケット",
      "8月3日〆切"
    ],
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    }
  },
  {
    date: "2026.7.31 23:11",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "「龍馬とJET違いすぎ〜楽しい〜」｜大切な舞台が一つまた一つ",
    body:
      "#ゆかJET と並行して頭に浮かんでくるのは #龍馬くん2026。B班では坂本龍馬役、B・C班のキャスティングも担当した4月の舞台です。\n\n「大切な舞台が一つまた一つと増えていく。」「龍馬とJET違いすぎ〜楽しい〜(つづく)」——対になる22:55の投稿では、男女二役の楽しさについて。\n\n引用元はTEAMマルナゲーズの4月の配信案内で、B班のプロモーション映像つき。「引用元の動画見てね🌟」\n\n最後に一言、「🐚B班では龍馬のあのセリフも…？」。ゆかJETの配信チケットは8月3日〆切、8月10日まで視聴できます。",
    caption:
      "#ゆかJET と並行して #龍馬くん2026 が頭に浮かんでくる💭\nB.C班のキャスティングをしました\n(引用元の動画見てね🌟)\n\n大切な舞台が一つまた一つと増えていく。\n\nB班では坂本龍馬役でした。\n龍馬とJET違いすぎ〜楽しい〜(つづく)\n\n〈ゆかJET 配信チケット🎟️〉\n※8月3日〆切〜10日まで視聴可能\n🐚B班では龍馬のあのセリフも…？",
    postUrl: "https://x.com/mokoopy/status/2083193878006620507",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "#龍馬くん2026",
      "B班：坂本龍馬役",
      "キャスティング担当",
      "配信チケット"
    ],
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    photo: {
      src: "/images/yukajet/2026-07-31-ryoma-gojet-castmates.jpg",
      alt: "8枚の写真を並べたコラージュ。左側は#ゆかJETのアメリカンダイナー風セットで撮られた共演者とのツーショットや3ショットで、赤い制服に黒縁メガネの出演者が中心。右側は『かわええのう、龍馬くん』の和装・日本髪での自撮り4枚で、赤い着物姿の出演者が共演者と顔を寄せて笑顔を見せている"
    },
    videoGuide: {
      url: "https://x.com/TEAMmarunage/status/2044864575804449102",
      buttonLabel: "Xで #龍馬くん2026 B班の映像を見る",
      alt: "舞台『かわええのう、龍馬くん』B班のプロモーション映像",
      note: "引用元の投稿に付いている約30秒のB班プロモーション映像"
    },
    quotedPost: {
      author: "TEAMマルナゲーズ",
      handle: "@TEAMmarunage",
      body:
        "4月16日の舞台『かわええのう、龍馬くん』配信チケットの案内。B班のプロモーション映像が添えられています。",
      url: "https://x.com/TEAMmarunage/status/2044864575804449102",
      urlLabel: "引用元（#龍馬くん2026 の配信案内）を見る"
    }
  },
  {
    date: "2026.7.31 22:55",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "男女二役の振り幅｜龍馬とおりょう、JETと早紀",
    body:
      "4月の『かわええのう、龍馬くん』ではB班で龍馬、C班で妻のおりょう。#ゆかJET でもB班JET、C班早紀。\n\n「やっぱり男女二役やるって楽しいなと思う 振り幅が活かせる」。そして——自信を持って言えるのは「両班観ていただきたい！😆」\n\n引用元は4月の #龍馬くん2026 配信チケット案内（TEAMマルナゲーズ）。ゆかJETの配信は8月3日〆切、8月10日まで視聴できます。\n\n写真は#ゆかJETのダイナーセットでのオフショットと、和装・舞台メイクのツーショットを並べたコラージュ。",
    caption:
      "(つづき) \n#龍馬くん2026 \nB班では龍馬、C班では妻のおりょう役\n\n#ゆかJET でもJET&早紀役\n\nやっぱり男女二役やるって楽しいなと思う\n振り幅が活かせる\n\n自信を持って言えるのは\n「両班観ていただきたい！😆」\n\n⬇️\n〈ゆかJET 配信チケット🎟️〉\n※8月3日〆切〜10日まで視聴可能",
    postUrl: "https://x.com/mokoopy/status/2083189908970348909",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "#龍馬くん2026",
      "男女二役",
      "B班：JET役",
      "C班：早紀役",
      "配信チケット"
    ],
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    photo: {
      src: "/images/yukajet/2026-07-31-ryoma-gojet-dual-roles.jpg",
      alt: "6枚の写真を並べたコラージュ。左側は#ゆかJETのアメリカンダイナー風セットで撮られた共演者とのツーショットや、3人が手で三角形をつくる集合写真。右側は『かわええのう、龍馬くん』の和装と日本髪、赤いアイラインの舞台メイクで、共演者と顔を寄せてピースサインを向けるツーショット3枚"
    },
    quotedPost: {
      author: "TEAMマルナゲーズ",
      handle: "@TEAMmarunage",
      body:
        "4月16日の舞台『かわええのう、龍馬くん』配信チケットの案内。三班の宣伝動画を添えて、班ごとの違いを楽しんでほしいと呼びかけています。",
      url: "https://x.com/TEAMmarunage/status/2044864575804449102",
      urlLabel: "引用元（#龍馬くん2026 の配信案内）を見る"
    }
  },
  {
    date: "2026.7.31 21:18",
    label: "吉井優花子プロデュース公演公式（@yukako_produce）",
    title: "【配信チケットの購入は3日まで‼️】｜A・B・C班を見比べて",
    body:
      "本編は歌ダンスたっぷりの約100分。A班・B班・C班を見比べてお楽しみください、と公演アカウントから。\n\n全キャスト参加の「LIVE」は、様々な組み合わせで約20曲。\n\n購入は8月3日まで、視聴は8月10日まで。¥3,700/本です。\n\n画像はA・B・C班それぞれの集合写真を縦に並べた3枚組。",
    caption:
      "#ゆかJET \n【配信チケットの購入は3日まで‼️】\n\n歌ダンスたっぷりの約100分😳✨\nA.B.C班を見比べてお楽しみください👀\n\nまた、全キャスト参加の「LIVE」も、\n様々な組み合わせで約20曲をお届け🎶\n\n※8月10日まで視聴可能◎\n※¥3,700/本",
    postUrl: "https://x.com/yukako_produce/status/2083165443876081719",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "公演アカウント",
      "配信チケット",
      "8月3日〆切",
      "A班",
      "B班",
      "C班",
      "全キャストLIVE"
    ],
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    photo: {
      src: "/images/yukajet/2026-07-31-abc-teams-collage.jpg",
      alt: "#ゆかJETのA班・B班・C班それぞれの集合写真を縦に3枚並べたコラージュ。各班ともRoute 66の看板やクラシックカーが描かれたアメリカンダイナー風のセットの前で、出演者が両手を合わせて三角形をつくるポーズを取っている。各写真の左下に「A」「B」「C」のラベルが入っている"
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演",
      handle: "@yukako_produce",
      body:
        "7月29日の終演報告。C班大千秋楽と全キャストLIVEへの御礼と、配信チケット（8月3日〆切・8月10日まで視聴可）の案内。",
      url: "https://x.com/yukako_produce/status/2082402006891888959",
      urlLabel: "引用元（終演報告）を見る"
    }
  },
  {
    date: "2026.7.31 18:45",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "三者三様「JET」爆誕💣✨｜緻密・のび太・不器用",
    body:
      "A班は矢口秀さん、B班は優花子さん、C班は宇佐美翔さん。班ごとに違うJETを、優花子さん本人が「緻密JET・のび太JET・不器用JET⁉️」と紹介しています。\n\nさらに、矢口さんはC班で大地、優花子さんはC班で早紀。「C班にはJETが３人いました😂笑」\n\n三人のJETが並んだセルフィーはこちら。見比べるなら配信チケットで——8月3日〆切、8月10日まで視聴可、1本¥3,700です。",
    caption:
      "#ゆかJET \n三者三様「JET」爆誕💣✨\n緻密JET・のび太JET・不器用JET⁉️\n\nA班は矢口秀くん=C班では大地\nB班は私=C班では早紀\nC班は宇佐美翔くん\n\nC班にはJETが３人いました😂笑\n\n〈配信チケットでぜひご覧ください🎟️〉\n※8月3日〆切〜10日まで視聴可能✨\n※¥3,700/本",
    postUrl: "https://x.com/mokoopy/status/2083127016010944516",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "三者三様のJET",
      "A班：矢口秀さん",
      "B班：JET役",
      "C班：宇佐美翔さん",
      "配信チケット"
    ],
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    photo: {
      src: "/images/yukajet/2026-07-31-three-jets-selfie.jpg",
      alt: "「GO,JET!go!go!」のロゴが掲げられたアメリカンダイナー風のセットの前で顔を寄せ合う3人のセルフィー。中央にピンクの制服と黒縁メガネ、ピンクのリボンを付けた吉井優花子さんがピースサインを向け、左に赤いシャツの男性、右に白いタオルを頭に巻いた水色の上着の男性が並んでいる"
    },
    quotedPost: {
      author: "吉井優花子",
      handle: "@mokoopy",
      body:
        "7月29日の配信チケットの案内。A班・B班・C班の本編と全キャストLIVEが8月10日まで視聴可、購入は8月3日〆切。",
      url: "https://x.com/mokoopy/status/2082456710611128358",
      urlLabel: "引用元（配信チケットの案内）を見る"
    }
  },
  {
    date: "2026.7.31 2:42",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "「#ゆかJET の次は何をしようか💭」｜密度と、作品の質",
    body:
      "終演から数日おいて、優花子さん本人から。「何かを成し遂げるには人生の時間が少なすぎる」——だから「やっぱり一つ一つの舞台の密度(質)は重要だ」。\n\n「#ゆかJET の次は何をしようか💭」。また観たい・また出たいと思ってもらえる「質の良い舞台」を作り続けたいな、と続きます。\n\n「推しの演技を観て楽しいのは別に普通なこと いつもその上を届けたい」。締めくくりは「私は\"魂で芝居すること\"と\"作品の質\"にこだわり続けます」。\n\n写真はダイナーのセットに全キャスト・スタッフが並んだ終演後の一枚。引用元は、7月27日の終演報告です。",
    caption:
      "何かを成し遂げるには人生の時間が少なすぎる\nやっぱり一つ一つの舞台の密度(質)は重要だ\n\n#ゆかJET の次は何をしようか💭\n\nまた観たい・また出たいと思ってもらえる「質の良い舞台」を作り続けたいな\n\n推しの演技を観て楽しいのは別に普通なこと\nいつもその上を届けたい\n\n私は\"魂で芝居すること\"と\"作品の質\"にこだわり続けます",
    postUrl: "https://x.com/mokoopy/status/2082884478134079637",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切）",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "終演後のつぶやき",
      "作品の質",
      "プロデューサー",
      "B班：JET役",
      "C班：早紀役"
    ],
    photo: {
      src: "/images/yukajet/2026-07-29-produce-final-group.jpg",
      alt: "赤い壁とチェック柄の床のアメリカンダイナー風セットの前に3列で並んだ#ゆかJET全キャスト・スタッフの集合写真。前列中央でピンクの制服と黒地にピンクの水玉スカート姿の吉井優花子さんが花束を抱え、周囲の出演者が水玉のスカートでピースや手のポーズを取っている。左下に「ゆかJET」のロゴ"
    },
    quotedPost: {
      author: "吉井優花子",
      handle: "@mokoopy",
      body:
        "7月27日の終演報告。「#ゆかJET 無事に終わりました💐」——プロデューサー・B班JET・C班早紀として走り切った5日間への感謝と、Premiumに詰め込んだこだわりについて。",
      url: "https://x.com/mokoopy/status/2081797457068130391",
      urlLabel: "引用元（終演報告）を見る"
    }
  },
  {
    date: "2026.7.30 13:48",
    label: "吉井優花子プロデュース公演公式（@yukako_produce）",
    title: "応援コンテンツの発送完了と、順次送付のお知らせ",
    body:
      "終演後の#ゆかJET公演アカウントから、応援コンテンツの発送状況が案内されました。\n\n発送が完了したのは「キャストCM（DVD）」「エールカード」「応援チケット（チェキ）」の3点。「たくさんの応援を誠にありがとうございました✨」と感謝を伝えています。\n\n「メッセージ動画」と「配信チケット」は順次送付中です。対象の方へ、もうしばらく待ってほしいとの案内です。\n\nこの投稿が引用しているのは、前日のC班大千秋楽・全キャストLIVE終演報告。配信チケットはA班・B班・C班の本編と全キャストLIVEが対象で、申し込みは8月3日〆切、視聴は8月10日までです。",
    caption:
      "#ゆかJET 💐\n【応援コンテンツにつきまして】\n\n・キャストCM(DVD)\n・エールカード\n・応援チケット(チェキ)\n上記発送が完了しました。\n\nたくさんの応援を誠にありがとうございました✨\n\n『メッセージ動画』『配信チケット』の送付も順次行っておりますので、もう暫くお待ち下さい🙇‍♀️",
    postUrl:
      "https://x.com/yukako_produce/status/2082689806270947683",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切）",
    roleTags: [
      "#ゆかJET",
      "公演アカウント",
      "応援コンテンツ",
      "発送完了",
      "順次送付中",
      "配信チケット"
    ],
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText:
        "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで",
      afterText:
        "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    photo: {
      src: "/images/yukajet/2026-07-29-produce-final-group.jpg",
      alt: "引用元の終演報告に添えられた集合写真。赤い壁とチェック柄の床のアメリカンダイナー風セットの前に#ゆかJET全キャスト・スタッフが並び、前列中央でピンクの制服姿の吉井優花子さんが花束を抱えている"
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演",
      handle: "@yukako_produce",
      body:
        "前日7月29日のC班大千秋楽・全キャストLIVE終演報告。来場者への御礼と、配信チケット（A班・B班・C班・LIVE／8月3日〆切・8月10日まで視聴可）を案内しています。",
      url: "https://x.com/yukako_produce/status/2082402006891888959",
      urlLabel: "引用元（終演報告）を見る"
    }
  },
  {
    date: "2026.7.29 23:48",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "振り返りつぶやき📝①｜声と、初プロデュースの学び",
    body:
      "千秋楽から二日。優花子さんの振り返りが始まりました。まずは①。\n\n「声出なくなる直前でJET役も早紀役もLIVEも乗り切りました。。🥹」——120%の声でやり終えたかった心残りはありつつ、「なにか惜しいことや反省があるから次もまた頑張れるとも思う。」\n\n学びとして挙げているのは、声量をカバーするより「みんなで声出す方向にするのが正解だったなとも学び💭」。次への備えは喉ケアと睡眠、そして「”制作陣”を増やす」こと。「(一人で10人分はやってる)(プロデュース１回目すぎる)」\n\n引用しているのは、自身の配信チケット告知。写真は終演後のバックステージで、キャストが集まった集合セルフィーです。",
    caption:
      "#ゆかJET 振り返りつぶやき📝①\n\n声出なくなる直前でJET役も早紀役もLIVEも乗り切りました。。🥹\n\n声も120%の実力でやり終えたかったから\n心残りだけど、、なにか惜しいことや反省があるから次もまた頑張れるとも思う。\n\n声量をカバーする前に、みんなで声出す方向にするのが正解だったなとも学び💭\n\n次は喉ケアと睡眠をしっかりとる😴🌟\n\nあと\"制作陣\"を増やす(一人で10人分はやってる)(プロデュース１回目すぎる)",
    postUrl: "https://x.com/mokoopy/status/2082478266989113425",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切）",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "振り返り①",
      "プロデューサー",
      "B班：JET役",
      "C班：早紀役",
      "全キャストLIVE"
    ],
    photo: {
      src: "/images/yukajet/2026-07-29-yukako-backstage-selfie.jpg",
      alt: "配管がむき出しの天井の下、終演後のバックステージに集まった#ゆかJET出演者の集合セルフィー。手前左でピンクと黒のダイナー制服を着た吉井優花子さんが顎の横でピースサインをして笑い、その隣に黄色い星形の髪飾りをつけた出演者、後方にも水玉やチェック、水色の衣装のキャストが並んでピースをしている"
    },
    quotedPost: {
      author: "吉井優花子",
      handle: "@mokoopy",
      body:
        "同じ日の22:22に出た配信チケットの案内。A班・B班・C班の本編と全キャストLIVEが8月10日まで視聴可、購入は8月3日〆切。",
      url: "https://x.com/mokoopy/status/2082456710611128358",
      urlLabel: "引用元（配信チケットの案内）を見る"
    }
  },
  {
    date: "2026.7.29 22:22",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "熱はまだまだ冷めません❤️‍🔥｜配信チケットは8月3日〆切",
    body:
      "A班・B班・C班の本編と、全キャストLIVE。『配信チケット』で8月10日まで視聴できます。購入は8月3日〆切。\n\n初プロデュースで、演者としては最後のGO,JET!。こだわりのキャスティングと脚色で歌も多め、新曲も作った——「絶対観てほしい☺️💖」\n\n写真はRoute 66の路線図が並ぶダイナーのセット前で、全員が両手で三角形をつくった一枚。「C班では早紀 B班ではJET！（Bはみんな女性です）」の文字入りです。",
    caption:
      "#ゆかJET 熱はまだまだ冷めません❤️‍🔥\n\n大好評のA.B.C班の本編と\n大盛り上がりだった”全キャストLIVE”が\n『配信チケット』で8月10日まで視聴可能です😳✨\n\n初プロデュース＆最後のGO,JET!💐😭\nこだわりのキャスティング・脚色で歌も多めです！新曲も作りました✌️\n絶対観てほしい☺️💖\n\n⬇️8月3日 購入〆切",
    postUrl: "https://x.com/mokoopy/status/2082456710611128358",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切）",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "配信チケット",
      "8月3日〆切",
      "全キャストLIVE",
      "B班：JET役",
      "C班：早紀役"
    ],
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText: "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    photo: {
      src: "/images/yukajet/2026-07-29-yukako-streaming-ticket-cast.jpg",
      alt: "アメリカの路線図やRoute 66の看板が描かれたダイナー風の舞台セットの前で、両手で三角形をつくるポーズを取る#ゆかJET出演者9人の集合写真。前列中央がピンクのシャツと黒地にピンクの水玉スカート姿の吉井優花子さん。画像下部に「C班では早紀 B班ではJET！（Bはみんな女性です）」の文字が入っている"
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演",
      handle: "@yukako_produce",
      body:
        "同じ日の18:45に出た終演報告。C班大千秋楽と全キャストLIVEへの御礼と、配信チケット（8月3日〆切・8月10日まで視聴可）の案内。",
      url: "https://x.com/yukako_produce/status/2082402006891888959",
      urlLabel: "引用元（公演アカウントの終演報告）を見る"
    }
  },
  {
    date: "2026.7.29 21:56",
    label: "沼尾麻由佳さん（@mayuka_pinkcha）・C班メグ役",
    title: "三者三様のメグ、3人揃って｜沼尾麻由佳さんの千秋楽オフショット",
    body:
      "C班でメグを演じた沼尾麻由佳さんから、千秋楽後のお気に入りショット。1枚目から3枚目は、A班・B班・C班それぞれのメグが揃った「3つ子メグ」。\n\n「3人揃うとめっちゃカワイイ💖 3人でメグが出来て嬉しかったです！三者三様のメグ、本当に全然違くてとっても面白かった！😍」\n\n続く投稿では、B班ミッツ役の月島ほたるさんと優花子さんについても。「優花子さんのわんぱくで元気いっぱいな早紀やヘタレなJETも大好きです！🤩」——プロデューサーとしての優花子さんへの言葉は「また後ほど💌」とのこと。\n\n下の写真は投稿の4枚目。花束を抱えた優花子さんを、メグ3人が囲んだ千秋楽の記念ショットです。",
    caption:
      "千秋楽後なぜか筋肉痛で動けずにいましたがたくさん寝て復活✨\n\nお気に入りの写真をいくつかご紹介！\nまずは3つ子メグ🥹🩷🩵💛（＋α）\n\n3人揃うとめっちゃカワイイ💖\n3人でメグが出来て嬉しかったです！\n三者三様のメグ、本当に全然違くてとっても面白かった！😍　#ゆかJET",
    postUrl: "https://x.com/mayuka_pinkcha/status/2082450093261861085",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "沼尾麻由佳さんの投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切）",
    roleTags: [
      "#ゆかJET",
      "キャスト投稿",
      "C班：メグ役",
      "3つ子メグ",
      "千秋楽オフショット",
      "B班：JET役",
      "C班：早紀役"
    ],
    photo: {
      src: "/images/yukajet/2026-07-29-yukako-bouquet-with-cast.jpg",
      alt: "「Go Jet! Go! Go!」のロゴ看板やRoute 66の装飾が並ぶアメリカンダイナー風のセットの前で、ピンクの衣装に大きなピンクのリボンを付け、目もとにハートのメイクをして花束を抱えた吉井優花子さんを、水色のシャツと紺チェックのスカート姿のメグ役3人が囲み、全員が笑顔でカメラを見ている"
    }
  },
  {
    date: "2026.7.29 18:45",
    label: "吉井優花子プロデュース公演公式（@yukako_produce）",
    title: "#ゆかJET【終演💐】｜C班大千秋楽と全キャストLIVEで幕",
    body:
      "7月23日からのAir studio 両国。最終日はC班の大千秋楽と全キャストLIVEで、『GO,JET!GO!GO! vol.1 Premium』の全日程が終わりました。\n\n「たくさんの温かい拍手に包まれて幕を閉じることができました✨」——ご来場いただいた皆様へ、公演アカウントからの御礼。\n\n配信チケットはA班・B班・C班の本編と全キャストLIVEが対象。申し込みは8月3日〆切、視聴は8月10日まで。「まだまだお楽しみください！」\n\n添えられているのは、ダイナーのセットに全キャスト・スタッフが勢ぞろいした一枚。前列中央で花束を抱えているのが優花子さん。",
    caption:
      "#ゆかJET 【終演💐】\n\nC班大千穐楽／全キャストLIVEも\nたくさんの温かい拍手に包まれて幕を閉じることができました✨\n\nご来場いただいた皆様、\n本当にありがとうございました🙇‍♀️✨\n\n🎥配信チケット🎟️(A.B.C班、LIVE)\n※8月3日〆切〜10日まで視聴可\nまだまだお楽しみください！",
    postUrl: "https://x.com/yukako_produce/status/2082402006891888959",
    homepageUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "配信チケットを申し込む（8/3〆切）",
    roleTags: [
      "#ゆかJET",
      "公演アカウント",
      "終演",
      "大千秋楽",
      "全キャストLIVE",
      "配信チケット"
    ],
    deadline: {
      at: "2026-08-03T23:59:59+09:00",
      beforeText: "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで",
      afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
    },
    photo: {
      src: "/images/yukajet/2026-07-29-produce-final-group.jpg",
      alt: "赤い壁とチェック柄の床のアメリカンダイナー風セットの前に3列で並んだ#ゆかJET全キャスト・スタッフの集合写真。前列中央でピンクの制服と黒地にピンクの水玉スカート姿の吉井優花子さんが花束を抱え、周囲の出演者が水玉のスカートでピースや手のポーズを取っている。左下に「Yuka JET」のロゴ"
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演",
      handle: "@yukako_produce",
      body:
        "26日のC班／A班千秋楽／B班千秋楽への御礼と、27日最終日のスケジュール（18:00〜C班大千秋楽、20:15〜全キャストLIVE）の案内。"
    }
  },
  {
    date: "2026.7.27〜28",
    label: "#ゆかJET キャストの千秋楽投稿",
    title: "初舞台も、初主演も。キャスト15人の千秋楽投稿",
    body:
      "7月23日から27日までのAir studio 両国。26日にA班とB班が千秋楽、27日はC班の大千秋楽と全キャストLIVEで、全日程が終わりました。\n\n初舞台の人、初ミュージカルの人、久しぶりの舞台で初主演だった人、最終日はLIVEだけの出演だった人。立ち位置はばらばらでも、終演後のXにはそれぞれの5日間が残っています。\n\n終演直後の速報から一日おいて、7月28日には役や座組についてじっくり書いた振り返りが続きました。下のリストから、15人それぞれの元投稿とXプロフィールへ。プロデューサー兼B班JET・C班早紀の優花子さんの投稿は、すぐ上のカードに。\n\n配信チケットはまだ購入できる、という案内も複数出ています。",
    postUrl: "https://x.com/hashtag/%E3%82%86%E3%81%8BJET?f=live",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで #ゆかJET の投稿を見る",
    homepageLabel: "公演ホームページを見る",
    roleTags: [
      "#ゆかJET",
      "キャスト投稿まとめ",
      "大千秋楽",
      "全キャストLIVE",
      "A班",
      "B班",
      "C班"
    ],
    castVoices: {
      heading: "キャストの千秋楽投稿（敬称略・投稿順ではありません）",
      note: "名前をタップするとXのプロフィールへ、その下のリンクが元投稿です。",
      items: [
        {
          name: "宇佐美翔",
          handle: "@sho_usami0419",
          role: "C班：JET役",
          quote:
            "取り急ぎ！！！ #ゆかJET 全公演無事終了することが出来ました‼️‼️ ご来場下さった方々、本当にありがとうございました！",
          postUrl: "https://x.com/sho_usami0419/status/2081759935168463318"
        },
        {
          name: "三村すみか",
          handle: "@smk_mmr",
          role: "C班：美里役",
          quote:
            "初めてのミュージカルでしたが、観てくれた皆様…1回しかない初ミュージカルを見届けてくれてありがとうございました✨",
          postUrl: "https://x.com/smk_mmr/status/2081758125921845506"
        },
        {
          name: "沼尾麻由佳",
          handle: "@mayuka_pinkcha",
          role: "C班：メグ役",
          quote: "ゆかJETが初舞台で幸せでした！！！",
          postUrl: "https://x.com/mayuka_pinkcha/status/2081770991752270183"
        },
        {
          name: "中原楓歌",
          handle: "@fuchan_O315",
          role: "夏代（ナッツ）役",
          quote:
            "思いやりがあって、のんびりしていて、アホなナッツ。私なりの夏代が届けられたら嬉しいな。",
          postUrl: "https://x.com/fuchan_O315/status/2081755873412886679"
        },
        {
          name: "来瞳舞夢",
          handle: "@maimu_htk",
          role: "B班：マスター役／C班：美月役",
          quote: "C班千秋楽とLIVE公演 ありがとうございました！",
          postUrl: "https://x.com/maimu_htk/status/2081856438880907679"
        },
        {
          name: "矢口秀",
          handle: "@syu_martin68Y",
          role: "初主演・2役",
          quote:
            "久しぶりの舞台、初主演、2役！ たくさんの挑戦をたくさんの方の支えで無事千秋楽を迎えることが出来ました!!",
          postUrl: "https://x.com/syu_martin68Y/status/2081848008820601301"
        },
        {
          name: "荒井映里乃",
          handle: "@eri_no_a",
          role: "最終日はLIVEのみ出演",
          quote:
            "最終日はライブのみの出演でした！ 大盛り上がりのライブ！楽しんでいただけていたら嬉しいです☺️",
          postUrl: "https://x.com/eri_no_a/status/2081863795107115314"
        },
        {
          name: "Caroline",
          handle: "@Hanatarebeen",
          role: "初舞台",
          quote:
            "私にとっての初舞台で一生忘れる事のない思い出になりました🕯 もう終わったのが本当に信じられん。",
          postUrl: "https://x.com/Hanatarebeen/status/2081763298723471659"
        },
        {
          name: "青木杏奈",
          handle: "@anna_aoki0906",
          role: "B班：あかね役",
          quote:
            "座組の皆さんと出会えて、B班でお芝居ができて、相手役がゆかちゃんでよかったです！ 悩み、もがいた期間でしたが、やっぱりお芝居が好きだなと心から思いました",
          postUrl: "https://x.com/anna_aoki0906/status/2081924916753191210"
        },
        {
          name: "秋乃蒼依",
          handle: "@akino_aoinari",
          role: "A班出演",
          quote:
            "#ゆかJET Liveまで終了しました！ ここまで駆け抜けられてよかった〜！ 関わる方々が素敵な方ばかりで、とにかく楽しい公演期間でした✨ そしてゆかちゃま卒業おめでとう💐",
          postUrl: "https://x.com/akino_aoinari/status/2081978279121277142"
        },
        {
          name: "葉山椎菜",
          handle: "@shiina_style222",
          role: "全班＆LIVE公演",
          quote:
            "吉井優花子プロデュース公演　#ゆかJET 全班&LIVE公演、無事終演しました💐✨ ご観劇、配信ご視聴の皆さま ゆかJETメンバー、関係者さま 演出:多賀さん、P:優花ちゃん 本当にありがとうございました✨",
          postUrl: "https://x.com/shiina_style222/status/2081977928896966859"
        },
        {
          name: "清水桃香",
          handle: "@momo0227butai",
          role: "B班：大地役",
          quote:
            "舞台を始めたばかりの頃の自分にはGO,JETに出演できるなんて想像もつかなかったなと…本当に貴重な時間でした！",
          postUrl: "https://x.com/momo0227butai/status/2081958768024383736"
        },
        {
          name: "浅井つぐみ",
          handle: "@Tsugumi_Asai",
          role: "A班：あかね役",
          quote:
            "#ゆかJET 全公演無事に終演しました！ 応援してくださった皆さん、キャストの皆さん、スタッフの皆さん…ありがとうございました🌸 あかねをこのタイミングで挑戦できてよかったなと思います😌",
          postUrl: "https://x.com/Tsugumi_Asai/status/2081911009837732327"
        },
        {
          name: "曽原加絵",
          handle: "@kaenomusic",
          role: "B班：美里役",
          quote:
            "B班だけでなく、A班もC班も素敵な方ばかりで、本当に楽しい座組でした☺️ また改めて、美里についても書こうと思います🌼",
          postUrl: "https://x.com/kaenomusic/status/2082007291096920162"
        },
        {
          name: "月島ほたる",
          handle: "@hotaru_0930",
          role: "B班：美月役",
          quote:
            "全班でのラストライブ🎤✨ 全員集合でにぎやかで楽しいライブになりました！！ ゆかこちゃんと龍馬くんの曲も歌ったよ🥰 毎日賑やかだったから寂しくもあったけど、みんなと一緒にこの作品をつくることができて良かったです🫶",
          postUrl: "https://x.com/hotaru_0930/status/2082083060787659212"
        }
      ]
    },
    photos: [
      {
        src: "/images/yukajet/2026-07-27-final-company-bouquet.jpg",
        alt: "アメリカンダイナー風の舞台セットの前に3列で並んだ#ゆかJET全キャストの集合写真。前列中央でピンクの制服と黒地にピンクの水玉スカート姿の吉井優花子さんが花束を持ち、周囲の出演者が手でハートやピースを作っている"
      },
      {
        src: "/images/yukajet/2026-07-27-final-cban-yukajet-sign.jpg",
        alt: "「ゆかJET」のネオン風ロゴパネルを背に、全員が両手で三角形をつくるポーズを取るC班9人の集合写真。前列中央がピンクの制服に赤いリボン姿の吉井優花子さん"
      },
      {
        src: "/images/yukajet/2026-07-27-final-cast-selfie.jpg",
        alt: "終演後の舞台セットで顔を寄せ合うC班キャストの自撮り。手前中央でピンクの衣装に赤いリボンを付けた吉井優花子さんが笑顔でカメラを向けている"
      },
      {
        src: "/images/yukajet/2026-07-27-final-curtain-call.jpg",
        alt: "客席側から撮影したカーテンコール。赤い壁のダイナーセットの舞台上で9人の出演者が一列に並んで深くお辞儀をし、客席の観客が拍手を送っている"
      },
      {
        src: "/images/yukajet/2026-07-28-cast-afterglow-girls-trio.jpg",
        alt: "黄色・ピンク・水色の水玉衣装を着たGO,JET! Girlsの3人が、ダイナーセットの前で並んでピースサインを向けている自撮り"
      },
      {
        src: "/images/yukajet/2026-07-28-cast-afterglow-mic-trio.jpg",
        alt: "ヴィンテージマイクを囲むように顔を寄せた出演者3人の自撮り。黄色いリボン、赤いリボン、水色のリボンをそれぞれ髪につけている"
      },
      {
        src: "/images/yukajet/2026-07-28-cast-afterglow-yellow-hug.jpg",
        alt: "「GO,JET!go!go!」のロゴパネルの前で、黄色い水玉衣装のGO,JET! Girls2人が抱き合って笑顔を見せている"
      },
      {
        src: "/images/yukajet/2026-07-28-cast-afterglow-yellow-mic.jpg",
        alt: "黄色い水玉衣装のGO,JET! Girlsの一人が、レトロなポスターが並ぶ壁の前でヴィンテージマイクのスタンドを両手で持ち微笑んでいる"
      },
      {
        src: "/images/yukajet/2026-07-28-cast-afterglow-heart.jpg",
        alt: "ピンクの壁にコカ・コーラの看板やダイヤル式電話が並ぶセットの前で、白いカチューシャとチェック柄の衣装をつけた出演者が両手で小さなハートを作っている"
      }
    ]
  },
  {
    date: "2026.7.28 2:42",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "#ゆかJET 無事に終わりました💐｜全公演終了",
    body:
      "『GO,JET!GO!GO! vol.1 Premium』全公演終了。プロデューサーとして、そしてB班JET・C班早紀として走り切った5日間でした。\n\n「終わってしまったなあ、、、考えると寂しさが込み上げてしまう」。参加してくれたみんな、支えてくださった方々、観にきてくださったお客様へ——感謝が三度続きます。\n\nそもそも素敵なお話であるGO,JET!を、一人一人の魅せ場を作るなど自分のこだわりを詰め込んだPremiumへ。「その分楽しんでもらえてよかったな🥲」\n\nお客様からは好評、キャストはみんな仲良し、そして学びもあったみたい——「本当に良かった。。！！」。「また後ほど書きます😭」とあるので、振り返りの続きも。\n\n写真は、キャストから贈られた花束を抱えた一枚。「キャストのみんなからもらったよ💐 最後まで優しくてありがとう😭」",
    caption:
      "#ゆかJET 無事に終わりました💐\n終わってしまったなあ、、、\n考えると寂しさが込み上げてしまう\n参加してくれたみんなに感謝、\n支えてくださった方々に感謝、\nそして観にきてくださったお客様に感謝\n\nそもそも素敵なお話であるGO,JET!を私のこだわりを詰め込んだPremiumにしました(一人一人の魅せ場を作る等々💭)\nその分楽しんでもらえてよかったな🥲\n\nまた後ほど書きます😭\nとにかくお客様から好評で良かったし、\nみんな仲良しで、そして学びもあったみたいで本当に良かった。。！！\nありがとうございました✨\n\nプロデューサー・B班JET・C班早紀",
    postUrl: "https://x.com/mokoopy/status/2081797457068130391",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "公演ホームページを見る",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "全公演終了",
      "大千秋楽",
      "プロデューサー",
      "B班：JET役",
      "C班：早紀役"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-27-yukako-final-bouquet.jpg",
        alt: "「go!JET!」のロゴが掲げられたアメリカンダイナー風の舞台セットの前で、ピンクの制服に赤いリボンを付け、淡いピンクの花束を抱えて微笑む吉井優花子さん。画像には「キャストのみんなからもらったよ 最後まで優しくてありがとう」の文字が入っている"
      },
      {
        src: "/images/yukajet/2026-07-27-yukako-final-bouquet-story.jpg",
        alt: "同じ花束の写真に「#ゆかJET 無事に終演しました 終わってしまった」「キャストのみんな、きてくださったお客様、関係者の皆様、本当にありがとうございました」「私のこだわりのつまったGO,JET!PREMIUM公演、大好評でよかった…」の文字を重ねたストーリーズ画像"
      }
    ],
    quotedPost: {
      author: "吉井優花子",
      handle: "@mokoopy",
      body:
        "喉の不調を抱えたままB班JET・C班早紀を演じた最終日前夜の投稿。「私らしく優しく愛のあるかっこいいおもっしろい早紀をやり切ります‼️」",
      url: "https://x.com/mokoopy/status/2081421564504097269",
      urlLabel: "引用元（最終日前夜の投稿）を見る"
    }
  },
  {
    date: "2026.7.27 1:49",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "喉と向き合いながら、私らしい早紀をやり切る",
    body:
      "「喉が本当に本当に、ねえ、、、」——この2日、B班のJETもC班の早紀も深い声。声の良さがウリなのに、と本人。\n\nアゲアゲ200%ができない悔しさはありつつ、「私らしく優しく愛のあるかっこいいおもっしろい早紀をやり切ります‼️」。最終日・C班大千秋楽へ向けて。\n\n写真は、壁一面のエールカードを背にしたポーズ。「エールカード ありがとう」の文字入りです。",
    caption:
      "#ゆかJET \n\n喉が本当に本当に、ねえ、、、\nこの2日来てくださった方はわかると思うけど\n深い声出してますBJET&C早紀💭\n声の良さがウリなのに、、😭\n\nアゲアゲ200%ができない悔しさはありますが、\n私らしく優しく愛のあるかっこいいおもっしろい早紀をやり切ります‼️\n\n⬇️応援ありがとう🥹とても嬉しい🩷",
    postUrl: "https://x.com/mokoopy/status/2081421564504097269",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "最終日の予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "B班：JET役",
      "C班：早紀役",
      "大千秋楽",
      "最終日案内"
    ],
    photo: {
      src: "/images/yukajet/2026-07-27-yukako-yell-cards.jpg",
      alt: "壁一面に貼られた応援メッセージのエールカードを背に、ピンクのシャツと黒地にピンクの水玉模様のスカート姿で両手を広げる吉井優花子さん"
    },
    quotedPost: {
      author: "吉井優花子",
      handle: "@mokoopy",
      body:
        "4日目、A班とB班の千秋楽。最終日は27日18:00〜C班の大千秋楽、20:15〜全キャストのLIVE（20:00開場）。飛び入り来場も歓迎。",
      url: "https://x.com/mokoopy/status/2081417317918155013",
      urlLabel: "引用元（4日目のレポート）を見る"
    }
  },
  {
    date: "2026.7.27 1:32",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "A班・B班千秋楽を見送って。4日目終演、そして最終日へ",
    body:
      "#ゆかJET 4日目。26日はA班とB班の千秋楽でした。\n\n外側から見ていた〈A班〉は「緻密に作られていて、みんなの真面目な性格が良く出ていたのが印象的だった」。「個々の頑張りが見えた素敵な千秋楽でした！」——そのあとに「……一緒にやりたかったー！」。\n\n共演した〈B班〉は女性キャストのみの編成。「新たな歴史を刻んだなあと。」仲の良さと笑いの絶えない関係性が舞台上でも出ていた、と。「みんなとのゆかJET(役)楽しかったよ」\n\n27日（月）はいよいよ最終日。18:00〜C班の大千秋楽、20:15〜全キャストのLIVE（20:00開場）。「最後まで会場にいるみんなで楽しみましょう」——飛び入り来場も歓迎、記念ブロマイドやステッカーもあります。",
    caption:
      "#ゆかJET 4日目❣️\nご来場ありがとうございました🙇‍♀️✨\n\n今日は、A班とB班の千秋楽💐\nおめでとう&ありがとう&とても素敵だった\nお客様からの温かい拍手やご感想も、心から嬉しく思います😭\n\n外側から見ていた〈A班〉✨\n緻密に作られていて、みんなの真面目な性格が良く出ていたのが印象的だった\n個々の頑張りが見えた素敵な千秋楽でした！\n……一緒にやりたかったー！\n\n共演 女性キャストのみの〈B班〉✨\n新たな歴史を刻んだなあと。\nすんごく仲良しで、笑いの絶えない関係性が舞台上でも出ていたなと感じた\n寂しいね\nみんなとのゆかJET(役)楽しかったよ\n\n⬇️27日(月)いよいよ最終日‼️\n18:00〜C班💛大千秋楽💐\n20:15〜全キャスト”LIVE”(20:00開場)\n\n終わってしまう😭\n最後まで会場にいるみんなで楽しみましょう✨\n(私の喉も持ってくれ！🏃‍♀️)\n\n飛び入り来場も大歓迎です！！お待ちしています🫶\n記念ブロマイドやステッカーも枯らしてね〜😏✨",
    postUrl: "https://x.com/mokoopy/status/2081417317918155013",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "最終日の予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "公演レポート",
      "公演4日目",
      "A班千秋楽",
      "B班千秋楽",
      "C班：早紀役",
      "最終日案内"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-26-day4-aban-cast.jpg",
        alt: "「A班」のラベルが入った、アメリカンダイナー風のセットでピースや笑顔のポーズを取るA班千秋楽の集合写真。前列中央にクリーム色のTシャツ姿の吉井優花子さん"
      },
      {
        src: "/images/yukajet/2026-07-26-day4-bban-cast.jpg",
        alt: "「B班」のラベルが入った、女性キャストのみで並ぶB班千秋楽の集合写真。中央付近に青いシャツ姿の吉井優花子さん"
      },
      {
        src: "/images/yukajet/2026-07-26-day4-cban-cast.jpg",
        alt: "「C班27日18:00〜大千秋楽」のラベルが入った、全員が両手でハートを作るC班の集合写真。前列中央にピンクの水玉衣装の吉井優花子さん"
      }
    ],
    schedule: {
      heading: "最終日公演スケジュール（2026年7月27日）",
      note: "会場：Air studio 両国。優花子さんはC班で早紀役、20:15のLIVEにも出演します。",
      items: [
        {
          time: "18:00〜",
          label: "C班・イエロー（大千秋楽／優花子さん出演：早紀役）"
        },
        { time: "20:15〜", label: "全キャストLIVE（20:00開場）" }
      ]
    },
    quotedPost: {
      author: "吉井優花子",
      handle: "@mokoopy",
      body: "前日（25日）の公演3日目のレポート投稿を引用しています。",
      url: "https://x.com/mokoopy/status/2081033107919229302",
      urlLabel: "引用元（3日目のレポート）を見る"
    }
  },
  {
    date: "2026.7.26 23:29",
    label: "吉井優花子さん本人（@mokoopy）・スケジュール変更",
    title: "最終日LIVEは開場20:00・開演20:15へ｜15分繰り下げ",
    body:
      "7月27日（月）のLIVE公演は、開場20:00・開演20:15。当初の20:00開演から15分繰り下がりました。理由は「公演時間が1時間40分前後であることと客入り状況から考え」と、優花子さん本人から。\n\nC班公演は18:00〜19:45予定のまま。公演後の面会＆チェキタイムは19:45〜19:55の10分間で、チェキにサインはなし。購入と購入カードへのサインも19:55まで、退場も19:55です。ツーショットチェキは事前購入のみ。\n\n物販の購入はLIVE後のみ。「この後のC班もLIVEも、皆様に楽しんでいただけるよう精一杯努めさせていただきます！」——最終日へ。",
    caption:
      "#ゆかJET (引用をご確認ください)\n\n公演時間が1時間40分前後であることと客入り状況から考え、\nLIVEの開始時刻を15分遅く変更いたしました🙇‍♀️\n\nご案内後の変更となり、大変申し訳ありません。\n\nご理解・ご協力のほど、よろしくお願いいたします🙇‍♀️\n\nこの後のC班もLIVEも、皆様に楽しんでいただけるよう精一杯努めさせていただきます！",
    postUrl: "https://x.com/mokoopy/status/2081386441725071564",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "最終日の予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "スケジュール変更",
      "最終日案内",
      "吉井優花子さん本人",
      "LIVE開演20:15",
      "C班：早紀役",
      "引用投稿"
    ],
    photo: {
      src: "/images/yukajet/2026-07-26-schedule-change-notice.jpg",
      alt: "「お客様へ変更のご案内」と題された#ゆかJET最終日の案内画像。C班公演18:00〜19:45、公演後の面会＆チェキタイム19:45〜19:55、19:55退場、LIVE公演は開場20:00・開演20:15〜21:35予定と記載されている"
    },
    schedule: {
      heading: "最終日スケジュール（2026年7月27日・変更後）",
      note: "会場：Air studio 両国。優花子さんはC班で早紀役、LIVEにも出演します。面会＆チェキタイムは10分間、ツーショットチェキは事前購入のみ、物販の購入はLIVE後のみです。",
      items: [
        {
          time: "18:00〜19:45",
          label: "C班公演（優花子さん出演：早紀役・千秋楽）"
        },
        {
          time: "19:45〜19:55",
          label: "公演後の面会＆チェキタイム（チェキにサインなし）"
        },
        { time: "19:55", label: "退場（購入・購入カードへのサインも19:55まで）" },
        { time: "20:00", label: "LIVE公演 開場（15分繰り下げ）" },
        {
          time: "20:15〜21:35",
          label: "LIVE公演 開演（全キャスト／当初20:00開演から変更）"
        }
      ]
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演公式",
      handle: "@yukako_produce",
      body:
        "7月27日（月）のスケジュール変更案内。LIVE公演は開場20:00・開演20:15、C班公演と面会時間の詳細は案内画像のとおりです。"
    }
  },
  {
    date: "2026.7.26 22:34",
    label: "来瞳舞夢さん（@maimu_htk）・B班マスター役／C班美月役",
    title: "B班千秋楽、無事に駆け抜けられました｜来瞳舞夢さん",
    body:
      "B班マスター役の来瞳舞夢さんから、B班千秋楽の完走報告。「無事に駆け抜けられました！！」\n\n詳しい感想は、翌27日のC班千秋楽とライブ公演を終えてから。来瞳さんはB班でマスター役、C班で美月役。優花子さんはB班でJET役、C班で早紀役です。\n\n写真は「ご観劇 ゆかJET ありがとうございました♡」のボードを囲んだ、千秋楽直後の集合ショット。",
    caption:
      "ハロー💋➰💕\n\n取り急ぎ、B班千秋楽🍻\n無事に駆け抜けられました！！\nご来場ありがとうございました‼️\n\n詳しい感想などは明日に控えている\nC班千秋楽とライブ公演を終えてから⭕️\n\n#ゆかJET",
    postUrl: "https://x.com/maimu_htk/status/2081372480959307913",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "来瞳舞夢さんの投稿を見る",
    homepageLabel: "最終日の予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "公演レポート",
      "キャスト投稿",
      "B班：マスター",
      "C班：美月",
      "B班千秋楽",
      "最終日案内"
    ],
    photo: {
      src: "/images/yukajet/2026-07-26-kurume-maimu-bban-finale.jpg",
      alt: "「ご観劇 ゆかJET ありがとうございました♡」と書かれたボードを中央で掲げ、レトロなアメリカンダイナー風のセットに集まったB班千秋楽の出演者集合写真"
    },
    schedule: {
      heading: "最終日公演スケジュール（2026年7月27日）",
      note: "会場：Air studio 両国。優花子さんはC班で早紀役、LIVEにも出演します。来瞳さんはC班で美月役。LIVEは開場20:00・開演20:15（当初の20:00開演から15分繰り下げ）。",
      items: [
        { time: "18:00〜", label: "C班・イエロー（千秋楽）" },
        { time: "20:15〜", label: "全班合同LIVE（開場20:00）" }
      ]
    }
  },
  {
    date: "2026.7.26 10:32",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "歌で全員が輝く舞台へ──脚色・楽曲制作への想い",
    body:
      "『GO,JET!GO!GO! vol.1 Premium』で優花子さんが担うのは出演だけではない。脚色・楽曲制作にも携わり、「みんなに輝いてほしくて」全キャストが歌える構成へ組み直した。\n\n本番を経て、「歌を増やして本当に良かった」。演出の多賀さんからは、歌が加わったことで『GO,JET!GO!GO! vol.1』に新しい演出が生まれたとの声。\n\n観劇したファンからは「歌盛りだくさんで面白かった」「世界観が好き」「千秋楽LIVEも楽しみ」の声も。",
    postUrl: "https://x.com/mokoopy/status/2081190994415083734",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "公演情報を見る",
    roleTags: ["#ゆかJET", "吉井優花子さん本人", "脚色・楽曲制作", "演出家コメント"]
  },
  {
    date: "2026.7.26 1:30",
    label: "矢口秀さん（@syu_martin68Y）・共演者投稿",
    title: "3日目、楽しさと寂しさが深まる #ゆかJET",
    body:
      "『GO,JET!GO!GO! vol.1 Premium』公演3日目を終えた、矢口秀さんから。「3日目どんどん楽しくなってるし終わっちゃうのが淋しくなってます」というほど、公演に没頭している様子がつづられています。色々な方からの嬉しい言葉を糧に、さらに自分を上げていきたいとのこと。\n\n写真は、優花子さんとのハートポーズの2ショットと、キャスト全員の笑顔の集合セルフィー。あと2日、「皆さんとイイ笑顔で終われますように」。",
    caption:
      "#ゆかJET\n3日目どんどん楽しくなってるし終わっちゃうのが淋しくなってます！\nそのくらい没頭してます\n色々な方に嬉しい言葉をいただけてさらに自分を上げようと思ってます😁\n\nあと2日、皆さんとイイ笑顔で終われますように",
    postUrl: "https://x.com/syu_martin68y/status/2081054397170372677",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "矢口秀さんの投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: ["#ゆかJET", "共演者投稿", "公演3日目", "キャスト交流"],
    photos: [
      {
        src: "/images/yukajet/2026-07-25-yaguchi-shu-yukako-heart.jpg",
        alt: "アメリカンダイナー風の舞台セットでハートポーズを作る吉井優花子さんと矢口秀さん"
      },
      {
        src: "/images/yukajet/2026-07-25-day3-cast-02.jpg",
        alt: "アメリカンダイナー風の舞台セットで笑顔を見せるゆかJET出演者の集合写真"
      }
    ],
    yukakoReply: {
      body: "そう思ってもらえててとても嬉しい\n明日！！C班のときJET３人で撮ろう😏📸✨",
      note: "出演者同士の信頼関係と、公演を楽しむ雰囲気が感じられるやり取りです。"
    }
  },
  {
    date: "2026.7.26 0:05",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "3日目終演。感謝と責任を胸に、最終日へ",
    body:
      "#ゆかJET公演3日目、ご観劇ありがとうございました。\n\n〈B班〉ではお待たせしてしまい、責任者としても役者としても申し訳ない思い。特別トークショーや本編で、少しでもお返しできていたら——という言葉も添えられています。\n\n〈C班〉はハスキー声の早紀役でしたが、気持ちも表現もめいっぱい届けきりました。\n\n「あと2公演走り切るぞ！！」——優花子さんが出演する、最終日のC班・B班の2公演に向けて。",
    caption:
      "#ゆかJET 3日目❣️\nご観劇ありがとうございました🙇‍♀️\n\n〈B班〉ではお待たせしてしまい、責任者としても役者としても申し訳ない思いです。。\n\n特別トークショーや本編でお返しできていたら嬉しいです😭\n（あかね大好きJET🤓）\n\n〈C班〉は、ハスキー声早紀でしたが、\n気持ちも表現もめいっぱいお届けいたしました❤️‍🔥\n\nあと2公演走り切るぞ！！\n\n⬇️明日26日（日）\n12:00〜 C班💛\n15:30〜 A班❤️ 千秋楽！\n19:00〜 B班💙 千秋楽！\n\nとってもとってもお待ちしてます🫶\nブロマイドやステッカーもGETしてね✨",
    postUrl: "https://x.com/mokoopy/status/2081033107919229302",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "公演情報を見る",
    roleTags: [
      "#ゆかJET",
      "公演レポート",
      "吉井優花子さん本人",
      "B班：JET役",
      "C班：早紀役",
      "3日目終演",
      "最終日案内"
    ],
    photos: [
      {
        src: "/images/yukajet/2026-07-25-day3-cast-01.jpg",
        alt: "#ゆかJET公演3日目終了後、ご観劇ありがとうございましたのボードを囲む出演者集合写真"
      },
      {
        src: "/images/yukajet/2026-07-25-day3-cast-02.jpg",
        alt: "#ゆかJET公演3日目終了後、舞台セットで笑顔を見せる出演者の集合セルフィー"
      }
    ],
    schedule: {
      heading: "最終日公演スケジュール（2026年7月26日）",
      note: "会場：Air studio 両国。優花子さんはC班で早紀役、B班でJET役を務めます。",
      items: [
        { time: "12:00〜", label: "C班・イエロー（優花子さん出演：早紀役）" },
        { time: "15:30〜", label: "A班・レッド（千秋楽）" },
        { time: "19:00〜", label: "B班・ブルー（優花子さん出演：JET役・千秋楽）" }
      ]
    },
    quotedPost: {
      author: "吉井優花子プロデュース公演公式",
      handle: "@yukako_produce",
      body: "公式アカウントの公演3日目終了報告を引用しています。"
    }
  },
  {
    date: "2026.7.25 23:49",
    label: "吉井優花子さん本人（@mokoopy）",
    title: "お客様目標まであと3名！残り公演への呼びかけ",
    body:
      "「私のお客様目標まであと3名…🥹」——優花子さん本人から、残り公演への呼びかけです。\n\nB班ではJET役、C班では早紀役、そして千秋楽のLIVEまで。「BもCもLIVEも必ず楽しませます」——A班の回も、優花子さん扱いでの観劇でOKとのことです。\n\n「最後の特別なGO,JET!、観に来てね」——ラストスパートへ向けた、まっすぐな呼びかけです。",
    caption:
      "は！！！！！！ #ゆかJET \n\n私のお客様目標まであと３名…🥹\n\nぜひどなたか、、リピートでも、、、\n観に来てくださいませんか⁉️😭\nBもCもLIVEも必ず楽しませます✨\nAも私扱いで観劇🉑です！\n最後の特別なGO,JET!、観に来てね✨\n\n【残りの公演】\n26日(日)12:00〜B班(JET役)\n26日(日)19:00〜C班(早紀役)\n27日(月)18:00〜C班(早紀役)\n27日(月)20:00〜LIVE(全キャストで🪩)",
    postUrl: "https://x.com/mokoopy/status/2081165030729654285",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: [
      "#ゆかJET",
      "吉井優花子さん本人",
      "公演告知",
      "残り公演案内",
      "B班：JET役",
      "C班：早紀役",
      "観劇呼びかけ"
    ],
    photo: {
      src: "/images/yukajet/2026-07-25-yukako-remaining-shows.jpg",
      alt: "GO,JET!の舞台セット前で笑顔を見せる吉井優花子さん"
    },
    schedule: {
      heading: "残りの公演スケジュール",
      note: "会場：Air studio 両国。優花子さんはB班でJET役、C班で早紀役を務めます。27日のLIVEはキャスト全員で。※この投稿のあと、LIVEは開場20:00・開演20:15へ15分繰り下げになりました。",
      items: [
        { time: "26日(日) 12:00〜", label: "B班（JET役）" },
        { time: "26日(日) 19:00〜", label: "C班（早紀役）" },
        { time: "27日(月) 18:00〜", label: "C班（早紀役）" },
        { time: "27日(月) 20:15〜", label: "LIVE（全キャストで🪩・開場20:00）" }
      ]
    }
  },
  {
    date: "2026.7.25 22:43",
    label: "三村すみかさん（@smk_mmr）・C班美里役",
    title:
      "C班2日目ありがとうございました！美里役・三村すみかさんと優花子さんの2ショット",
    body:
      "『GO,JET!GO!GO! vol.1 Premium 〜I LOVE YOUが言えなくて〜』C班2日目を終え、美里役の三村すみかさんが、来場への感謝と残り2公演へ向けた意気込みを投稿しました。\n\n写真は、プロデューサー兼C班・早紀役の吉井優花子さんとのツーショット。「本当にすごい方です！！」という言葉から、共演者としての敬意と、一緒に撮影できた喜びが伝わる一枚です。\n\n※出演者の公開投稿をもとにした、非公式の応援まとめです。",
    caption:
      "#ゆかJET\nC班2日目！\nありがとうございました！\n\n美里ちゃんお届けできたかな？💓\n\nあと2回！\n全力で頑張ります！\n\n↓プロデューサー&C班では早紀役のゆかこさんと撮っていただきました！\n嬉し過ぎて絶妙な顔しちゃってますが！本当にすごい方です！！",
    postUrl: "https://x.com/smk_mmr/status/2081012385842860371",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "三村すみかさんのX投稿を見る",
    homepageLabel: "公演情報を見る",
    roleTags: [
      "#ゆかJET",
      "公演レポート",
      "キャスト投稿",
      "C班",
      "美里役",
      "早紀役",
      "プロデューサー"
    ],
    photo: {
      src: "/images/yukajet/2026-07-25-mimura-sumika-yukako.jpg",
      alt: "#ゆかJETの舞台セットを背景に、ピンクの衣装と白いブラウス姿の出演者2人がポーズを取る縦長のツーショット"
    }
  },
  {
    date: "2026.7.25 11:31",
    label: "秋乃蒼依さん（@akino_aoinari）・A班出演",
    title: "「どのチームも盛り上がっていくよ✨」秋乃蒼依さんが7月25日の公演を案内",
    body:
      "7月25日はB班12:00・A班15:30・C班19:00の3公演。A班に出演する秋乃蒼依さんから「われら！」の呼びかけ。\n\nプロデューサーとしてC班早紀・B班JETを務める吉井優花子さんへは、「大変な中素敵なお芝居届けてくれる」と労いのひとこと。",
    caption:
      "#ゆかJET 今日はB班から！どのチームも盛り上がっていくよ✨\n\n✴︎B班 12:00\n✴︎A班 15:30 ←われら！\n✴︎C班 19:00\n\nプロデューサー＆C班早紀＆B班JETで大変な中素敵なお芝居届けてくれるゆかちゃまと！（いなり私服でごめんご）",
    postUrl: "https://x.com/akino_aoinari/status/2080843278480818262",
    homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "公演予約・応援案内を見る",
    roleTags: ["#ゆかJET", "キャスト投稿", "A班", "本日の公演案内"],
    photo: {
      src: "/images/yukajet/2026-07-25-akino-aoinari-yukako.jpg",
      alt: "レトロな舞台セットを背景に、笑顔でポーズを取る吉井優花子さんと秋乃蒼依さん"
    },
    schedule: {
      heading: "本日の公演スケジュール（2026年7月25日）",
      note: "会場：Air studio 両国。秋乃蒼依さんはA班に出演。優花子さんはB班でJET役、C班で早紀役を務めます。",
      items: [
        { time: "12:00〜", label: "B班" },
        { time: "15:30〜", label: "A班（秋乃蒼依さん出演）" },
        { time: "19:00〜", label: "C班" }
      ]
    }
  },
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
      "7月24日、C班初日とB班2日目が終演。来瞳舞夢さんから、来場した皆さんへの感謝と、翌日以降の公演への呼びかけ。\n\n来瞳舞夢さんはB班でマスター役、C班で美月役。吉井優花子さんはB班でJET役、C班で早紀役です。\n\n投稿時点では公演公式HPに不具合があり、チケット購入用の直接リンクが案内されました。\n\n各種応援メニューの詳細は元のX投稿から。\n\n【来場チケット】\nhttps://torioki.confetti-web.com/form/4827\n\n【元投稿】\nhttps://x.com/maimu_htk/status/2080595354442137931",
    postUrl: "https://x.com/maimu_htk/status/2080595354442137931",
    homepageUrl: "https://torioki.confetti-web.com/form/4827",
    ctaLabel: "Xで元の投稿を見る",
    homepageLabel: "来場チケットを予約する",
    roleTags: [
      "#ゆかJET",
      "公演レポート",
      "キャスト投稿",
      "チケット案内",
      "B班：マスター",
      "C班：美月"
    ],
    photo: {
      src: "/images/yukajet/2026-07-24-kurume-maimu-cast.jpg",
      alt: "赤いダイナー風の舞台セットで、レトロなマイクを囲んでポーズを取る#ゆかJETの女性キャスト3名"
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
