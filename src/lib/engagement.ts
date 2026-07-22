export type RelatedGojetUpdate = {
  anchorId?: string;
  date: string;
  title: string;
  postUrl: string;
  roleTags?: string[];
};

const PORTAL_URL = "https://yukako-schedule-2026.vercel.app/";

const parseUpdateDate = (date: string) => {
  const [datePart = "", timePart = ""] = date.split(" ");
  const [year = 0, month = 0, day = 0] = datePart.split(".").map(Number);
  const [hour = 0, minute = 0] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute).getTime();
};

const stableHash = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
};

export const getStableGojetAnchorId = (update: RelatedGojetUpdate) => {
  if (update.anchorId) return update.anchorId;

  const statusId = update.postUrl.match(/\/status\/(\d+)/)?.[1];
  if (statusId) return `gojet-post-${statusId}`;

  try {
    const url = new URL(update.postUrl);
    const instagramId = url.pathname.match(/\/(?:p|reel)\/([^/]+)/)?.[1];
    if (instagramId) {
      return `gojet-instagram-${instagramId.toLowerCase().replace(/[^a-z0-9_-]/g, "")}`;
    }
  } catch {
    // URLで特定できない場合は日付・タイトル・元の値から安定IDを作る。
  }

  const datePart = update.date.split(" ")[0].replace(/\D/g, "-").replace(/-+$/g, "");
  return `gojet-update-${datePart}-${stableHash(`${update.postUrl}|${update.title}`)}`;
};

export const getRelatedGojetUpdates = <T extends RelatedGojetUpdate>(
  current: T,
  updates: T[],
  limit = 3,
) => {
  const currentTags = new Set(current.roleTags ?? []);
  const seen = new Set<string>();

  return updates
    .filter((candidate) => getStableGojetAnchorId(candidate) !== getStableGojetAnchorId(current))
    .map((candidate) => ({
      candidate,
      sharedTags: (candidate.roleTags ?? []).filter((tag) => currentTags.has(tag)),
    }))
    .filter(({ sharedTags }) => sharedTags.length > 0)
    .sort(
      (a, b) =>
        b.sharedTags.length - a.sharedTags.length ||
        parseUpdateDate(b.candidate.date) - parseUpdateDate(a.candidate.date),
    )
    .filter(({ candidate }) => {
      const key = getStableGojetAnchorId(candidate);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, Math.max(0, limit));
};

export const addShareUtm = (
  value: string,
  content: string,
  source = "x",
) => {
  const isAbsolute = /^[a-z][a-z\d+.-]*:/i.test(value);
  const url = new URL(value, PORTAL_URL);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", "social");
  url.searchParams.set("utm_campaign", "yukako_portal");
  url.searchParams.set("utm_content", content);
  return isAbsolute ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
};
