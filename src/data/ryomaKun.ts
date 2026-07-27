export type RyomaKunPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export const ryomaKunPhotos: RyomaKunPhoto[] = Array.from({ length: 49 }, (_, index) => {
  const number = index + 1;
  const fileNumber = String(number).padStart(2, "0");
  return {
    src: `/images/ryoma-kun-2026/yukako-ryoma-kun-2026-archive-${fileNumber}.jpg`,
    alt: `舞台『かわええのう、龍馬くん』B班坂本龍馬役・C班おりょう役の吉井優花子さん 記録写真 ${number}`
  };
});

export const ryomaKunSchedule = [
  "2026年4月7日(火) 20:00",
  "2026年4月9日(木) 16:00",
  "2026年4月10日(金) 12:00",
  "2026年4月11日(土) 20:00",
  "2026年4月12日(日) 16:00"
];

export const ryomaKunMoments = [
  {
    label: "役柄",
    text: "B班で主演の坂本龍馬、C班で妻のおりょう。初の男役、初の土佐弁、そして初のアソシエイト・プロデューサー。"
  },
  {
    label: "見どころ",
    text: "B班は全員女性というキャスティング。同じ脚本を班ごとに違う色で立ち上げた幕末の群像劇。"
  },
  {
    label: "記録",
    text: "A-root赤坂での上演記録写真49枚、本人による振り返り投稿の20枚、そしてSNS宣伝用の稽古場ムービー2本をこのページに収蔵。"
  }
];

/**
 * 本人が振り返り投稿で挙げた、龍馬のセリフ好きな3選。
 * カギ括弧の中は投稿の原文どおり。改変しない。
 */
export const ryomaKunFavoriteLines = [
  "夜が明ける前が一番暗い。けんど、その闇にも夢の形が見えるきに。",
  "世の人は我をなんとも言わば言え。我のなすことは我のみぞ知る。",
  "波に流されても、手を離さんもんは、ちゃんと戻る。"
];

/** おりょうが夢の中で龍馬に伝える一言（振り返り投稿の原文どおり）。 */
export const ryomaKunOryoLine = "言葉は灯、夢は風。消えんうちに次を照らして。";

export type RyomaKunRole = {
  group: string;
  role: string;
  body: string;
  detail: string;
  /** 劇中の一言。原文どおりのときだけ入れる。 */
  quote?: string;
};

export const ryomaKunRoles: RyomaKunRole[] = [
  {
    group: "B班",
    role: "坂本龍馬（主演）",
    body: "全員女性というキャスティングでの主演。脚本の半分以上のセリフがあり、ほぼ出ずっぱりの役。土佐弁で、男性で、勢いがあって荒くて——本人いわく「私とはほとんど真逆のような、とにかく演じづらい役」。だからこそ演じ切れたときに感じたのは、楽しさと自身の成長。",
    detail: "ラストでおりょうと再会する場面は、やっと帰って来られたことを噛み締める龍馬が、おりょうと拾った貝殻を握りしめる演出。"
  },
  {
    group: "C班",
    role: "妻・おりょう",
    body: "大千穐楽を飾るC班は“王道”を意識したキャスティング。おりょうでは、彼女の紡ぐ言葉の美しさと儚さ、そして龍馬を強く愛しく想う心を大切にしたとのこと。",
    quote: ryomaKunOryoLine,
    detail: "龍馬と会えた夢の中で伝えたかった渾身の言葉が、この一文。いつも死と隣り合わせの龍馬を想う、切ないおりょうの心が今もずっと残っている——と本人。"
  }
];

/** 「プロデュースを行う上で大切にしたこと」①〜③（振り返り投稿の原文どおり）。 */
export const ryomaKunProducerPrinciples = [
  {
    number: "①",
    text: "自分のセンスを信じて挑戦し、クオリティの高い舞台を届けること",
    note: "多角的視点を持ち、妥協せずに突き詰める"
  },
  {
    number: "②",
    text: "キャストにとって、成長の多い舞台にすること"
  },
  {
    number: "③",
    text: "キャストが、自分らしくのびのびと表現できる環境を作ること"
  }
];

export const ryomaKunProducerDuties = [
  "B班・C班キャスティング",
  "SNS宣伝担当",
  "方言・殺陣・踊り指導管轄",
  "フライヤー・ブロマイド作成"
];

/** プロデュースの手応えとして綴られた一文（2026年5月16日の投稿の原文どおり）。 */
export const ryomaKunProducerAnswer =
  "お客様にもキャストにも楽しんでもらえた舞台になったことが、今回の答えだと思っています。";

export type RyomaKunPromoVideo = {
  group: string;
  role: string;
  src: string;
  poster: string;
  /** スクリーンリーダー用の事実描写。見出し・キャプションに流用しない。 */
  label: string;
  duration: string;
  body: string;
};

/**
 * SNS宣伝担当として本人が編集した、班ごとの稽古場ムービー2本。
 * 2026年5月16日の投稿（Instagram @yoppy_777）で改めて公開されたもの。
 */
export const ryomaKunPromoVideos: RyomaKunPromoVideo[] = [
  {
    group: "B班",
    role: "坂本龍馬役",
    src: "/videos/ryoma-kun-promo-bban-2026-05-16.mp4",
    poster: "/images/ryoma-kun-2026/yukako-ryoma-kun-2026-promo-bban-poster.jpg",
    label:
      "『かわええのう、龍馬くん』B班の稽古場ムービー。紅い着物に刀を差した坂本龍馬役の吉井優花子さんと、全員女性のキャストによる稽古風景（約29秒・音声あり）",
    duration: "約29秒",
    body: "紅い着物に刀、腕を組んでカメラを見る龍馬から。殺陣も踊りも、全員女性のB班が稽古場でつくっていく過程がそのまま入っています。"
  },
  {
    group: "C班",
    role: "おりょう役",
    src: "/videos/ryoma-kun-promo-cban-2026-05-16.mp4",
    poster: "/images/ryoma-kun-2026/yukako-ryoma-kun-2026-promo-cban-poster.jpg",
    label:
      "『かわええのう、龍馬くん』C班の稽古場ムービー。淡い桜色の着物のおりょう役・吉井優花子さんと、キャストによる稽古風景（約28秒・音声あり）",
    duration: "約28秒",
    body: "大千穐楽を飾ったC班から。淡い桜色の着物のおりょうが龍馬と手を取り合う場面は、稽古場の段階でもう涙。"
  }
];

export const ryomaKunPromoSource = {
  label: "2026年5月16日の投稿",
  url: "https://www.instagram.com/p/DYZwPx1mQ2e/",
  /** 投稿本文の表現（原文どおり）。 */
  note: "SNS宣伝投稿の際に作った動画"
};

type LookbackEntry = {
  alt: string;
  caption?: string;
};

/** 2026年5月18日の振り返り投稿（Instagram @yoppy_777）の20枚。並び順は投稿と同じ。 */
const lookbackEntries: LookbackEntry[] = [
  {
    alt: "『かわええのう、龍馬くん』二役出演・アソシエイト・プロデューサーと記された扉絵と、紅い着物姿の吉井優花子さん",
    caption: "二役出演＋アソシエイト・プロデューサー"
  },
  {
    alt: "舞台『かわええのう、龍馬くん』のフライヤー。キャスト一覧と4月7日から12日までの公演スケジュール、劇場A-root赤坂の情報",
    caption: "フライヤー（A-root赤坂／2026年4月7日〜12日）"
  },
  {
    alt: "観劇と応援へのお礼、アソシエイト・プロデューサーとしての担当と手応えを綴った吉井優花子さんの文章パネル",
    caption: "ご観劇・応援へのお礼"
  },
  {
    alt: "「プロデュースを行う上で大切にしたこと」として3つの方針を挙げた文章パネル",
    caption: "プロデュースを行う上で大切にしたこと"
  },
  {
    alt: "B班で主演の坂本龍馬を演じた役づくりについて綴った文章パネル",
    caption: "B班・坂本龍馬について"
  },
  {
    alt: "C班で妻のおりょうを演じた役づくりについて綴った文章パネル",
    caption: "C班・おりょうについて"
  },
  {
    alt: "紅い着物に茶色の袴、片手を高く上げて笑う坂本龍馬役の吉井優花子さん"
  },
  {
    alt: "舞台上の和室で、共演者と並んで両手を上げてポーズをとる龍馬役の吉井優花子さん"
  },
  {
    alt: "淡い桜色の着物に身を包んだ、おりょう役の吉井優花子さん"
  },
  {
    alt: "着物姿の共演者2人と並んで立つ、紅い着物の吉井優花子さん"
  },
  {
    alt: "『かわええのう、龍馬くん』のキャスト全員が着物姿で並んだ集合写真"
  },
  {
    alt: "舞台の和室セットに集まった着物姿のキャストによる集合写真"
  },
  {
    alt: "公演を終えたキャストとスタッフによる集合セルフィー"
  },
  {
    alt: "B班のキャストと撮ったオフショット・セルフィーを並べたコラージュ",
    caption: "B班のみんなと"
  },
  {
    alt: "C班のキャストと撮ったオフショット・セルフィーを並べたコラージュ",
    caption: "C班のみんなと"
  },
  {
    alt: "龍馬とおりょうのイラストが入った公演オリジナルTシャツを共演者と2人で広げて見せる吉井優花子さん"
  },
  {
    alt: "ファンから届いたメッセージカードと、桜色の着物姿の吉井優花子さん",
    caption: "「日々の力になっていました “言葉は灯”」"
  },
  {
    alt: "エールカードを届けた人へのお礼が記された、紅い着物姿の吉井優花子さんの写真",
    caption: "エールカードへのお礼"
  },
  {
    alt: "公演中に届いた差し入れや花束を持つ吉井優花子さんの写真を並べたコラージュ",
    caption: "差し入れへのお礼"
  },
  {
    alt: "配信チケット・応援チケットの購入者へCM動画をプレゼントしたことへのお礼が記された吉井優花子さんの写真",
    caption: "配信・応援チケットへのお礼"
  }
];

export const ryomaKunLookbackPhotos: RyomaKunPhoto[] = lookbackEntries.map((entry, index) => ({
  src: `/images/ryoma-kun-2026/yukako-ryoma-kun-2026-lookback-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: entry.alt,
  caption: entry.caption
}));

export const ryomaKunLookbackSource = {
  label: "2026年5月18日の振り返り投稿",
  url: "https://www.instagram.com/p/DYeSf_aGe1T/"
};
