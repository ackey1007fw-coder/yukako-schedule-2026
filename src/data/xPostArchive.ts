import { gojetFeatureUpdates } from "./gojetFeatureUpdates";
import { siteUpdates, updateTimestamp, type SiteUpdate } from "./siteUpdates";

export type XArchiveAccount = "mokoopy" | "yukako_produce";

export type XArchiveImage = {
  src: string;
  alt: string;
};

export type XArchivePost = {
  id: string;
  date: string;
  title: string;
  summary?: string;
  category: string;
  account: XArchiveAccount;
  sourceUrl: string;
  embedXPost?: boolean;
  detailAnchor?: string;
  images: XArchiveImage[];
};

// Xのタイムラインをスクレイピングせず、サイトで出典・投稿日を確認済みの記録だけを集約する。
// プロフィールURL、検索結果、引用元の他人の投稿などは混ぜない。
const X_STATUS_URL = /^https:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/(mokoopy|yukako_produce)\/status\/(\d+)(?:[/?#].*)?$/i;

export function getXArchiveIdentity(url?: string) {
  if (!url) return null;
  const match = X_STATUS_URL.exec(url);
  if (!match) return null;
  const account = match[1].toLowerCase() as XArchiveAccount;
  const id = match[2];
  return { account, id, sourceUrl: `https://x.com/${account}/status/${id}` };
}

// 本人のX投稿に紐付けて、すでにサイト内で自己ホストしている実写真のみ。
// 別の日の似た写真を自動で流用しない。新しい画像は元投稿との照合後に追加する。
const verifiedXPostPhotos: Record<string, XArchiveImage[]> = {
  "2105673651819598269": [{
    src: "/images/yukako-october-portrait-2026-10-01.jpg",
    alt: "2026年10月1日のX投稿。夕暮れの海辺で髪に手を添える吉井優花子さん"
  }],
  "2103488688424644773": [{
    src: "/images/yukako-summer-portrait-2026-09-25.jpg",
    alt: "2026年9月25日のX投稿。海辺で振り返る吉井優花子さん"
  }],
  "2098071506643480765": [{
    src: "/images/yukako-mgj-miss-peace-reflection-2026-09-11.jpg",
    alt: "2026年9月11日のX投稿。MISS GRAND JAPAN 2025でのステージ写真"
  }],
  "2095128310351385016": [{
    src: "/images/yukako-akita-inu-shinchan-2026-09-02.jpg",
    alt: "2026年9月2日のX投稿。秋田犬の被り物でしんちゃん像と並ぶ吉井優花子さん"
  }],
  "2093618569678574046": [{
    src: "/images/yukako-omagari-hanabi-komachi-megenai-2026-08-29.jpg",
    alt: "2026年8月29日のX投稿。こまちめげないTシャツを指さす吉井優花子さん"
  }],
  "2090064677728661996": [{
    src: "/images/yukako-seaside-2026-08-19.jpg",
    alt: "2026年8月19日のX投稿。秋田の海辺での吉井優花子さんの自撮り"
  }],
  "2089676553542312218": [{
    src: "/images/yukako-omoriyama-zoo-kangaroo-2026-08-18.jpg",
    alt: "2026年8月18日のX投稿。大森山動物園でカンガルーを指さす吉井優花子さん"
  }],
  "2072459071773708413": [{
    src: "/images/yukako-selfie-2026-07-01.jpg",
    alt: "2026年7月1日のX投稿。白いTシャツとピンクのベスト姿の吉井優花子さん"
  }]
};

const uniqueImages = (images: XArchiveImage[]): XArchiveImage[] => {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (!image.src.startsWith("/images/") || seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
};

// #ゆかJET は複数枚の元画像が保存されているため、最新情報の代表画像1枚だけでなく
// 同じ投稿に紐付くすべての画像を使う。配信の未承認スクリーンショットは追加しない。
const gojetImagesByPost = new Map<string, XArchiveImage[]>();
for (const update of gojetFeatureUpdates) {
  const identity = getXArchiveIdentity(update.postUrl);
  if (!identity) continue;
  const images =
    update.photos ??
    (update.photo ? [update.photo] :
      update.video ? [{ src: update.video.poster, alt: update.video.label }] : []);
  const key = `${identity.account}:${identity.id}`;
  gojetImagesByPost.set(
    key,
    uniqueImages([...(gojetImagesByPost.get(key) ?? []), ...images])
  );
}

export function collectXArchivePosts(updates: SiteUpdate[]): XArchivePost[] {
  const posts = new Map<string, XArchivePost>();

  for (const update of updates) {
    const identity = getXArchiveIdentity(update.sourceUrl);
    if (!identity) continue;
    const key = `${identity.account}:${identity.id}`;
    const images = uniqueImages([
      ...(gojetImagesByPost.get(key) ?? []),
      ...(update.image ? [update.image] : []),
      ...(verifiedXPostPhotos[identity.id] ?? [])
    ]);

    const existing = posts.get(key);
    if (existing) {
      existing.images = uniqueImages([...existing.images, ...images]);
      existing.embedXPost ||= update.embedXPost;
      continue;
    }

    posts.set(key, {
      id: key,
      date: update.date,
      title: update.title,
      summary: update.summary,
      category: update.category,
      account: identity.account,
      sourceUrl: identity.sourceUrl,
      embedXPost: update.embedXPost,
      detailAnchor: update.detailAnchor ?? update.anchor,
      images
    });
  }

  // 元投稿の日付を正とする。XのIDやサイトへの追加日では並べ替えない。
  return Array.from(posts.values()).sort(
    (a, b) => (updateTimestamp(b.date) ?? 0) - (updateTimestamp(a.date) ?? 0)
  );
}

export const xArchivePosts = collectXArchivePosts(siteUpdates);
