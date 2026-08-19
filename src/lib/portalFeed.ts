import { archiveItems } from "../data/archive";
import { events } from "../data/events";
import { news } from "../data/news";
import { profile } from "../data/profile";
import { siteUpdates } from "../data/siteUpdates";

const PERSON_ID = "yukako" as const;
const SITE_URL = "https://yukako-schedule-2026.vercel.app/";
const SITE_ORIGIN = new URL(SITE_URL).origin;
const MAX_ITEMS = 20;
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const OFFSET_ISO_DATETIME =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export type PortalFeed = {
  version: 1;
  personId: typeof PERSON_ID;
  siteName: string;
  siteUrl: string;
  generatedAt: string;
  items: PortalFeedItem[];
};

export type PortalFeedItem = {
  id: string;
  personId: typeof PERSON_ID;
  type: "news" | "story" | "schedule" | "event" | "update";
  title: string;
  summary?: string;
  url: string;
  sourceUrl?: string;
  publishedAt: string;
  updatedAt?: string;
  startsAt?: string;
  endsAt?: string;
  image?: string;
};

type SourceDataset = "siteUpdates" | "news" | "events" | "archive";

export type PortalFeedCandidate = {
  dataset: SourceDataset;
  dedupeKeys: string[];
  item: PortalFeedItem;
};

// 上限は重複排除より前に効くため、news の枠が「専用カードと同じ元投稿」だけで
// 埋まると、news 単独の項目がフィードから消える。少し余裕を持たせておく。
const sourceLimits: Record<SourceDataset, number> = {
  siteUpdates: 8,
  news: 6,
  events: 4,
  archive: 3
};

const sourcePriority: Record<SourceDataset, number> = {
  events: 0,
  archive: 1,
  siteUpdates: 2,
  news: 3
};

const pad = (value: number) => String(value).padStart(2, "0");

const toJstIso = (value: string | undefined): string | undefined => {
  if (!value) return undefined;

  if (value.includes("T")) {
    return OFFSET_ISO_DATETIME.test(value) && !Number.isNaN(Date.parse(value))
      ? value
      : undefined;
  }

  const match = value.match(
    /^(\d{4})[.-](\d{1,2})[.-](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/
  );
  if (!match) return undefined;

  const [, yearText, monthText, dayText, hourText, minuteText, secondText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText ?? 0);
  const minute = Number(minuteText ?? 0);
  const second = Number(secondText ?? 0);
  const check = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day ||
    hour > 23 ||
    minute > 59 ||
    second > 59
  ) {
    return undefined;
  }

  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}+09:00`;
};

const absoluteSiteUrl = (path: string) => new URL(path, SITE_URL).toString();

export const toPortalImageUrl = (path: string | undefined) => {
  if (!path) return undefined;
  try {
    const url = new URL(path, SITE_URL);
    return url.origin === SITE_ORIGIN ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

const normalizedUrl = (value: string | undefined) => {
  if (!value) return undefined;
  try {
    const url = new URL(value, SITE_URL);
    url.hash = "";
    url.search = "";
    url.hostname = url.hostname.toLowerCase();
    url.pathname = url.pathname.replace(/\/$/, "") || "/";
    return url.toString();
  } catch {
    return undefined;
  }
};

const stableHash = (value: string) => {
  let hash = 0xcbf29ce484222325n;
  for (const character of value) {
    hash ^= BigInt(character.codePointAt(0) ?? 0);
    hash = BigInt.asUintN(64, hash * 0x100000001b3n);
  }
  return hash.toString(16).padStart(16, "0");
};

const topicKey = (stableValue: string) =>
  stableValue
    .toLowerCase()
    .replace(/(?:19|20)\d{2}/g, "-")
    .replace(/(^|-)\d{1,2}(?=-|$)/g, "-")
    .replace(/(^|-)(?:news|story|event|update)(?=-|$)/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

const publishedNewestFirst = (a: PortalFeedCandidate, b: PortalFeedCandidate) =>
  Date.parse(b.item.publishedAt) - Date.parse(a.item.publishedAt) ||
  a.item.id.localeCompare(b.item.id);

const sourceKey = (value: string | undefined) => {
  const normalized = normalizedUrl(value);
  return normalized ? `source:${normalized}` : undefined;
};

const isSyntheticNewsUpdate = (update: (typeof siteUpdates)[number]) =>
  news.some(
    (item) =>
      item.date === update.date &&
      item.text === update.title &&
      normalizedUrl(item.url) === normalizedUrl(update.sourceUrl)
  );

const newsCandidates: PortalFeedCandidate[] = news.flatMap((item) => {
  const publishedAt = toJstIso(item.listedAt ?? item.date);
  if (!publishedAt) return [];

  const sourceUrl = item.url.startsWith("#") ? undefined : item.url;
  const stableMaterial = normalizedUrl(sourceUrl) ?? `${item.url}|${item.date}|${item.text}`;
  const dedupeKey = sourceKey(sourceUrl);

  return [
    {
      dataset: "news",
      dedupeKeys: dedupeKey ? [dedupeKey] : [`news:${stableHash(stableMaterial)}`],
      item: {
        id: `yukako:news:${stableHash(stableMaterial)}`,
        personId: PERSON_ID,
        type: "news",
        title: item.text,
        url: absoluteSiteUrl(item.url.startsWith("#") ? item.url : "#updates"),
        sourceUrl,
        publishedAt
      }
    }
  ];
});

const siteUpdateCandidates: PortalFeedCandidate[] = siteUpdates.flatMap((update) => {
  if (isSyntheticNewsUpdate(update)) return [];

  const matchingNews = news.find(
    (item) => normalizedUrl(item.url) === normalizedUrl(update.sourceUrl)
  );
  // 専用カードとnewsが同じ元投稿を指す場合も、news側の掲載日を失わない。
  const publishedAt = toJstIso(matchingNews?.listedAt ?? matchingNews?.date ?? update.date);
  if (!publishedAt) return [];

  const anchor = update.anchor?.startsWith("#") ? update.anchor : "#updates";
  const hasIndexId = /^(?:news|gojet-feature)-\d+$/.test(update.id);
  const stableLocalId = hasIndexId
    ? `generated-${stableHash(
        normalizedUrl(update.sourceUrl) ?? `${anchor}|${update.date}|${update.title}`
      )}`
    : update.id;
  const dedupeKeys = [`topic:${topicKey(stableLocalId)}`];
  const externalKey = sourceKey(update.sourceUrl);
  if (externalKey) dedupeKeys.push(externalKey);

  return [
    {
      dataset: "siteUpdates",
      dedupeKeys,
      item: {
        id: `yukako:update:${stableLocalId}`,
        personId: PERSON_ID,
        type: "update",
        title: update.title,
        summary: update.summary,
        url: absoluteSiteUrl(anchor),
        sourceUrl: update.sourceUrl,
        publishedAt,
        image: toPortalImageUrl(update.image?.src)
      }
    }
  ];
});

const archiveCandidates: PortalFeedCandidate[] = archiveItems.flatMap((archive) => {
  if (!archive.featured) return [];

  // archive.ts では dateModified が「サイトに記事を掲載した日」を表す。
  const publishedAt = toJstIso(archive.dateModified);
  if (!publishedAt) return [];

  const dedupeKeys = [`topic:${topicKey(archive.slug)}`];
  const externalKey = sourceKey(archive.sourceUrl.url);
  if (externalKey) dedupeKeys.push(externalKey);

  return [
    {
      dataset: "archive",
      dedupeKeys,
      item: {
        id: `yukako:story:${archive.slug}`,
        personId: PERSON_ID,
        type: "story",
        title: archive.title,
        summary: archive.summary,
        url: absoluteSiteUrl(`/archive/${archive.slug}`),
        sourceUrl: archive.sourceUrl.url,
        publishedAt,
        image: toPortalImageUrl(archive.ogImage ?? archive.images[0]?.src)
      }
    }
  ];
});

const eventTopicCounts = new Map<string, number>();
for (const event of events) {
  const key = topicKey(event.id);
  eventTopicCounts.set(key, (eventTopicCounts.get(key) ?? 0) + 1);
}

const eventCandidates: PortalFeedCandidate[] = events.flatMap((event) => {
  const publishedAt = toJstIso(event.listedAt);
  const startsAt = toJstIso(event.startAt);
  if (!publishedAt || !startsAt) return [];

  const source =
    event.links.find((link) => link.kind === "sns") ??
    event.links.find((link) => link.kind === "info") ??
    event.links.find((link) => link.kind === "ticket");
  const eventTopic = topicKey(event.id);
  const dedupeKeys = [`event:${event.id}`];
  if (eventTopicCounts.get(eventTopic) === 1) {
    dedupeKeys.push(`topic:${eventTopic}`);
  }

  return [
    {
      dataset: "events",
      dedupeKeys,
      item: {
        id: `yukako:event:${event.id}`,
        personId: PERSON_ID,
        type: event.category === "event" || event.category === "birthday" ? "event" : "schedule",
        title: event.title,
        summary: event.summary,
        url: absoluteSiteUrl(`#event-${event.id}`),
        sourceUrl: source?.url,
        publishedAt,
        startsAt,
        // events.endAt には表示境界や最終回の開始時刻も含まれるため、
        // 確認済みの終了時刻を表す専用フィールドができるまでは公開しない。
        image: toPortalImageUrl(event.image)
      }
    }
  ];
});

const allCandidates: PortalFeedCandidate[] = [
  ...siteUpdateCandidates,
  ...newsCandidates,
  ...eventCandidates,
  ...archiveCandidates
];

const jstDateOf = (value: string) => {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return undefined;
  return new Date(timestamp + JST_OFFSET_MS).toISOString().slice(0, 10);
};

const isTodayOrFutureEvent = (candidate: PortalFeedCandidate, referenceJstDate: string) => {
  if (candidate.dataset !== "events" || !candidate.item.startsAt) return false;
  const startsJstDate = jstDateOf(candidate.item.startsAt);
  return Boolean(startsJstDate && startsJstDate >= referenceJstDate);
};

const dedupeCandidates = (
  candidates: readonly PortalFeedCandidate[],
  protectedIds = new Set<string>()
) => {
  const seen = new Set<string>();
  const kept: PortalFeedCandidate[] = [];

  const prioritized = [...candidates].sort(
    (a, b) =>
      Number(protectedIds.has(b.item.id)) - Number(protectedIds.has(a.item.id)) ||
      sourcePriority[a.dataset] - sourcePriority[b.dataset] ||
      publishedNewestFirst(a, b)
  );

  for (const candidate of prioritized) {
    const duplicate = candidate.dedupeKeys.some((key) => seen.has(key));
    // 重複候補の別キーも記録し、event -> update -> news のような連鎖重複を止める。
    candidate.dedupeKeys.forEach((key) => seen.add(key));
    if (!duplicate) kept.push(candidate);
  }

  return kept;
};

export const selectFeedCandidates = (
  candidates: readonly PortalFeedCandidate[],
  generatedAt: string,
  maxItems = MAX_ITEMS
) => {
  const referenceJstDate = jstDateOf(generatedAt);
  if (!referenceJstDate) throw new Error(`Invalid selection reference: ${generatedAt}`);
  if (maxItems <= 0) return [];

  const protectedEvents = candidates.filter((candidate) =>
    isTodayOrFutureEvent(candidate, referenceJstDate)
  );
  const protectedIds = new Set(protectedEvents.map(({ item }) => item.id));

  // sourceLimits.events は過去予定の補充上限。今日・未来予定は上限を迂回して全て候補へ入れる。
  const fallbackCandidates = (Object.keys(sourceLimits) as SourceDataset[]).flatMap(
    (dataset) =>
      candidates
        .filter(
          (candidate) =>
            candidate.dataset === dataset &&
            (dataset !== "events" || !protectedIds.has(candidate.item.id))
        )
        .sort(publishedNewestFirst)
        .slice(0, sourceLimits[dataset])
  );

  const deduped = dedupeCandidates([...protectedEvents, ...fallbackCandidates], protectedIds);
  const dedupedProtectedEvents = deduped
    .filter(({ item }) => protectedIds.has(item.id))
    .sort(
      (a, b) =>
        Date.parse(a.item.startsAt as string) - Date.parse(b.item.startsAt as string) ||
        publishedNewestFirst(a, b)
    )
    .slice(0, maxItems);
  const remainingSlots = maxItems - dedupedProtectedEvents.length;
  const fillers = deduped
    .filter(({ item }) => !protectedIds.has(item.id))
    .sort(publishedNewestFirst)
    .slice(0, remainingSlots);

  // 選択時は今日・未来予定を保護するが、公開配列はcontractどおりpublishedAt降順に戻す。
  return [...dedupedProtectedEvents, ...fillers].sort(publishedNewestFirst);
};

export const createPortalFeed = (generatedAt = new Date().toISOString()): PortalFeed => {
  const normalizedGeneratedAt = new Date(generatedAt);
  if (Number.isNaN(normalizedGeneratedAt.getTime())) {
    throw new Error(`Invalid generatedAt: ${generatedAt}`);
  }

  const items = selectFeedCandidates(
    allCandidates,
    normalizedGeneratedAt.toISOString()
  ).map(({ item }) => item);

  return {
    version: 1,
    personId: PERSON_ID,
    siteName: profile.theme,
    siteUrl: SITE_URL,
    generatedAt: normalizedGeneratedAt.toISOString(),
    items
  };
};
