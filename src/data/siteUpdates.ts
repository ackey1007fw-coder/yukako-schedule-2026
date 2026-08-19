import { gojetFeatureUpdates } from "./gojetFeatureUpdates";
import { news } from "./news";
import { galleryUpdate } from "./photos";
import siteContent from "./siteContent.json";

// トップの「最新情報」セクション用に、各所へ散らばった更新情報を1本の時系列リストへ集約する。
// 元データ（news / gojetFeatureUpdates など）は書き換えず、ここで読み取って変換するだけ。
export type SiteUpdate = {
  id: string;
  date: string; // "2026.7.15" 形式（newsには "2026.6" のような日なしもある）
  category: string;
  title: string;
  summary?: string;
  image?: { src: string; alt: string };
  imageLayout?: "portrait-preview" | "contain";
  // 元投稿（X / Instagram など）への外部リンク
  sourceUrl?: string;
  // サイト内で詳しく読めるセクションへのアンカー
  anchor?: string;
  // 同じ話題の別投稿へ、カード内だけ小さな導線を出すとき使う。featured判定には使わない。
  relatedId?: string;
  // relatedId のブロックに出す見出しとリンク文言。引用投稿など関係が違うときだけ変える。
  relatedLabel?: string;
  relatedLinkLabel?: string;
  // 他カードの relatedId から参照されたとき、誰の投稿かを示す。カード本体では使わない。
  author?: string;
};

const parseDate = (date: string) => {
  const [datePart = "", timePart = ""] = date.split(" ");
  const [year = 0, month = 0, day = 0] = datePart.split(".").map(Number);
  const timeMatch = timePart.match(/^(\d{1,2}):(\d{2})$/);
  const hour = timeMatch ? Number(timeMatch[1]) : 0;
  const minute = timeMatch ? Number(timeMatch[2]) : 0;
  return (((year * 100 + month) * 100 + day) * 100 + hour) * 100 + minute;
};

// 並び替え用の parseDate と違い、日数差を測れる実時刻（ミリ秒）を返す。
// "2026.6" のように日がない表記はその月の1日として扱い、解釈できないものは undefined。
export const updateTimestamp = (date: string): number | undefined => {
  const [datePart = "", timePart = ""] = date.split(" ");
  const [year, month, day] = datePart.split(".").map(Number);
  if (!year || !month) return undefined;
  const timeMatch = timePart.match(/^(\d{1,2}):(\d{2})$/);
  return Date.UTC(
    year,
    month - 1,
    day || 1,
    timeMatch ? Number(timeMatch[1]) : 0,
    timeMatch ? Number(timeMatch[2]) : 0
  );
};

const normalizeUrl = (url: string) => url.split("?")[0].replace(/\/$/, "");

const sourcePlatform = (url: string) => {
  if (url.includes("x.com") || url.includes("twitter.com")) return "X";
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("showroom-live.com")) return "SHOWROOM";
  return "リンク先";
};

// 専用セクションを持つ単発トピック。本文は各セクションが持つため、ここは見出しと導線のみ。
const standaloneUpdates: SiteUpdate[] = [
  {
    id: "omoriyama-zoo-2026-08-18",
    date: "2026.8.18 20:31",
    category: "X",
    title: "秋田と言ったらここも〜🦘 大森山動物園から",
    summary:
      "推しに挙がったのはカワウソ、プレーリードッグ、ペンギン、カンガルー、トラ。「あ、キリがないな」で締めた、アカカンガルー舎の前からの一枚。",
    image: {
      src: "/images/yukako-omoriyama-zoo-kangaroo-2026-08-18.jpg",
      alt: "大森山動物園のアカカンガルー舎で、ガラス越しのカンガルーを指さす吉井優花子さん"
    },
    author: "吉井 優花子（@mokoopy）",
    sourceUrl: "https://x.com/mokoopy/status/2089676553542312218",
    // この投稿自体が8/17のいぶりがっこポップコーン投稿を引用している。
    relatedId: "iburigakko-popcorn-homecoming-2026-08-17",
    relatedLabel: "引用元投稿",
    relatedLinkLabel: "引用元の投稿をXで見る"
  },
  {
    id: "iburigakko-popcorn-homecoming-2026-08-17",
    date: "2026.8.17",
    category: "X",
    title: "秋田帰省で、あの『いぶりがっこポップコーン』を再び🍿",
    summary:
      "以前大きな反響を呼んだあのポップコーンを、帰省中に。取り上げてくれた記事は、本人のリプ欄へ。",
    image: {
      src: "/images/yukako-iburigakko-popcorn-2026-08-17.jpg",
      alt: "AL☆VEシアターのポップコーン紙袋を持って微笑む吉井優花子さん"
    },
    imageLayout: "contain",
    author: "吉井 優花子（@mokoopy）",
    sourceUrl: "https://x.com/mokoopy/status/2089283468576608643",
    relatedId: "iburigakko-popcorn-original-2026-01-18"
  },
  {
    id: "iburigakko-popcorn-original-2026-01-18",
    date: "2026.1.18",
    category: "X",
    title: "秋田の映画館には『いぶりがっこ味のポップコーン』があるんです🍿",
    summary:
      "メニュー表に並ぶ“いぶりがっこ”。大きな反響を呼んだ話題の出発点で、8/17の『再び食べた』投稿につながる元投稿。",
    image: {
      src: "/images/yukako-iburigakko-popcorn-menu-2026-01-18.jpg",
      alt: "109 CINEMASのポップコーンメニュー。フレーバーに塩、キャラメル、ハーフ＆ハーフ、いぶりがっこが並び、価格は300円"
    },
    imageLayout: "contain",
    sourceUrl: "https://x.com/mokoopy/status/2012824363620331966"
  },
  {
    id: "miss-grand-japan-final-mc-2026-08-08",
    date: "2026.8.8",
    category: "Miss Grand Japan",
    title: "8/10、日本代表が決まるステージへ——吉井優花子さんがMC",
    summary:
      "MISS GRAND JAPAN / MR GAY JAPAN 2026 FINAL。8月10日（月）16:00、ヒューリックホール東京で司会を務めます。",
    image: {
      src: "/images/miss-grand-japan/yukako-mgj-2026-final-members-2026-08-08.jpg",
      alt: "MISS GRAND JAPANとMR GAY JAPANの2025年日本代表、OB・OG会代表と写る吉井優花子さん。画像内に「司会を務めます」「大会は8月10日」の文字"
    },
    imageLayout: "contain",
    sourceUrl: "https://x.com/mokoopy/status/2086075435927138676",
    anchor: "#miss-grand-japan-final"
  },
  {
    id: "gojet-finale-report-2026-08-02",
    date: "2026.8.2",
    category: "#ゆかJET",
    title: "A・B・C班、そしてLIVEまで——初プロデュース #ゆかJET 完走",
    summary:
      "全班と千秋楽LIVEまで無事に完走。3班の集合写真と3本の動画、約20曲を披露したLIVEの熱気、配信情報をまとめました。",
    image: {
      src: "/images/yukajet/2026-08-02-finale-c-team.jpg",
      alt: "アメリカンダイナー風のセットの前で三角形のポーズを取る#ゆかJET C班の集合写真。下部に「ゆかJET」のロゴと「C班ではガールズの早紀 歌ダンスがたくさん♪」の文字が入っている"
    },
    sourceUrl:
      "https://www.instagram.com/p/DbiZ7_MlKIt/?img_index=5&igsh=MW91b25wN2o3dW92Yg==",
    anchor: "#gojet-finale-report"
  },
  {
    id: "miss-grand-japan-management-2026-06-07",
    date: "2026.6.7",
    category: "Miss Grand Japan",
    title: "ミス・グランド・ジャパン「代表補佐／運営マネジメント」に就任",
    summary:
      "2026年度より、大会運営全体のマネジメントと体制強化を担当。参加者一人ひとりの挑戦に寄り添いながら、大会のさらなるレベルアップを支えます。",
    image: {
      src: "/images/miss-grand-japan/yukako-miss-grand-japan-management-2026-01.jpg",
      alt: "白い衣装を着た吉井優花子さんの宣材写真。ミス・グランド・ジャパン代表補佐／運営マネジメント就任発表"
    },
    imageLayout: "portrait-preview",
    sourceUrl: "https://www.instagram.com/p/DZSK68wgVm4/?igsh=ZDY4YTQ3a2M5bHcz",
    anchor: "#miss-grand-japan-management"
  },
  {
    id: "gojet-shiina-message-2026-07-19",
    date: "2026.7.19",
    category: "#ゆかJET",
    title: "最後まで一緒に、楽しく誠実に——仲間と育てる #ゆかJET",
    summary:
      "C班・あかね役のしいなさんから寄せられた尊敬の言葉と、優花子さんからの感謝。集合動画には、最後の『GO,JET!』出演へ向かうカンパニーの温かな空気も。",
    image: {
      src: "/images/yukako-yukajet-shiina-message-story-2026-07-19-web.jpg",
      alt: "C班・あかね役のしいなさんが寄せたメッセージと、吉井優花子さんが感謝を添えたInstagramストーリーズ"
    },
    imageLayout: "portrait-preview",
    anchor: "#gojet-shiina-message"
  },
  {
    id: "gojet-hair-2026-07-15",
    date: "2026.7.15",
    category: "#ゆかJET",
    title: "#ゆかJETのためにピンクブラウンへ！早紀役に寄せた新ヘア",
    summary:
      "#ゆかJETの早紀役に合わせて、髪色をピンクブラウンへ。役作りへの想いと、公演を見届けてほしいというメッセージが届けられました。",
    image: {
      src: "/images/yukako-pink-brown-hair-2026-07-15.jpg",
      alt: "#ゆかJETの早紀役に合わせたピンクブラウンの髪色を披露する吉井優花子さん"
    },
    sourceUrl: "https://x.com/mokoopy/status/2077393070140821844",
    anchor: "#gojet-hair-update"
  },
  {
    id: "gojet-yell-card-2026-07-14",
    date: "2026.7.14",
    category: "#ゆかJET",
    title: "エールカードで優花子さんに応援を届けよう💌",
    summary:
      "劇場に掲示されるエールカードは、公演後にキャストからのメッセージ付きで返送。購入期限は7/25（土）23:59。",
    sourceUrl: "https://x.com/mokoopy/status/2076998431831433567",
    anchor: "#gojet-yell-card"
  },
  {
    id: "latest-instagram-reel",
    date: siteContent.latestInstagram.publishedAt,
    category: "Instagram",
    title: siteContent.latestInstagram.title,
    summary:
      "母の日のプレゼントとして贈った、特別なクルーズ旅行のリール動画が公開されました。",
    sourceUrl: siteContent.latestInstagram.reelUrl,
    anchor: "#latest-reel"
  },
  {
    id: "gallery-update",
    date: galleryUpdate.date,
    category: "フォト",
    title: galleryUpdate.note,
    anchor: galleryUpdate.url.startsWith("#") ? galleryUpdate.url : undefined,
    sourceUrl: galleryUpdate.url.startsWith("#") ? undefined : galleryUpdate.url
  }
];

const gojetUpdates: SiteUpdate[] = gojetFeatureUpdates.map((update, index) => ({
  id: update.anchorId ?? `gojet-feature-${index}`,
  date: update.date,
  category: "#ゆかJET",
  title: update.title,
  summary: update.body,
  image:
    update.photo ??
    update.photos?.[0] ??
    (update.video
      ? { src: update.video.poster, alt: update.video.label }
      : undefined),
  // 歌詞カードなど、切り抜くと読めない画像だけ元データ側で contain を指定する。
  imageLayout: update.imageLayout,
  sourceUrl: update.postUrl,
  // NowProducingSection側でハッシュ対象を自動展開するため、固有アンカーを維持する。
  anchor: update.anchorId ? `#${update.anchorId}` : "#next"
}));

// news はトピックが gojetFeatureUpdates や単発セクションと重なるものがあるため、同じ元投稿URLは除外する
const knownUrls = new Set(
  [...standaloneUpdates, ...gojetUpdates]
    .map((update) => update.sourceUrl)
    .filter((url): url is string => Boolean(url))
    .map(normalizeUrl)
);

const newsUpdates: SiteUpdate[] = news
  .filter((item) => !knownUrls.has(normalizeUrl(item.url)))
  .map((item, index) => ({
    id: `news-${index}`,
    date: item.date,
    category: item.label,
    title: item.text,
    sourceUrl: item.url.startsWith("#") ? undefined : item.url,
    anchor: item.url.startsWith("#") ? item.url : undefined
  }));

// concat順（単発 → gojet → news）を保ったまま日付降順に安定ソート。
// 同日の場合は専用セクション持ちのトピックが先に来る。
export const siteUpdates: SiteUpdate[] = [
  ...standaloneUpdates,
  ...gojetUpdates,
  ...newsUpdates
].sort((a, b) => parseDate(b.date) - parseDate(a.date));

export const sourceLinkLabel = (url: string) => `${sourcePlatform(url)}で見る`;
