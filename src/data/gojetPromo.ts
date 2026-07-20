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
  postUrl: string;
  homepageUrl: string;
  ctaLabel: string;
  // 2つ目のボタン（予約・応援ページ）のラベル。未指定時は「公演ホームページへ」
  homepageLabel?: string;
  // 告知画像・ストーリーズのスクリーンショットなどを自己ホストできた場合に表示する
  photo?: PromoImage;
  // 稽古写真を複数枚まとめて見せたい場合はこちら（photoと併用しない）
  photos?: PromoImage[];
  // 稽古動画などを手元にホストできた場合はカード内で直接再生する
  video?: {
    src: string;
    poster: string;
    label: string;
  };
  deadline?: GojetDeadline;
  // 役ごとのペンライトカラーなど、色名も文字で伝える短い実用情報
  supportColors?: GojetSupportColor[];
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
    date: "2026.7.20",
    label: "本番まであと3日",
    title: "本番まであと3日――制作・二役で駆け抜ける #ゆかJET",
    body:
      "本番まであと3日。プロデューサー、制作、B班JET・C班早紀の二役を担う吉井優花子さん。「いつでもお客様とキャストとスタッフに親切に」を胸に、最後まで走ります。吉井優花子プロデュース公演アカウントの投稿を引用した、ラストGO,JET!への呼びかけです。",
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
