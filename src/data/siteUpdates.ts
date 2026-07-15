import { gojetFeatureUpdates } from "./gojetPromo";
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
  // 元投稿（X / Instagram など）への外部リンク
  sourceUrl?: string;
  // サイト内で詳しく読めるセクションへのアンカー
  anchor?: string;
};

const parseDate = (date: string) => {
  const [year = 0, month = 0, day = 0] = date.split(".").map(Number);
  return year * 10000 + month * 100 + day;
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
  id: `gojet-feature-${index}`,
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
  sourceUrl: update.postUrl,
  anchor: "#next"
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
