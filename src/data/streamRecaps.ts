export type StreamRecapImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  downloadName: string;
};

export type StreamRecapHighlight = { timestamp: string; title: string; body: string };
export type StreamRecapSong = {
  title: string;
  artist: string;
  timestamp: string;
  originalUrl?: string;
};

type RecapBase = {
  id: string;
  date: string;
  title: string;
  summary: string;
  platform: "SHOWROOM";
  /** Recording metadata, not a claim about the whole broadcast. */
  recording?: { startedAt: string; durationSeconds: number };
  sourceLabel: string;
  verifiedAt: string;
};

export type PublishedStreamRecap = RecapBase & {
  status: "published";
  highlights?: readonly StreamRecapHighlight[];
  songs?: readonly StreamRecapSong[];
  gallery?: readonly StreamRecapImage[];
  galleryZip?: { src: string; filename: string };
  timeline?: readonly { timestamp: string; label: string }[];
  nextNote?: string;
};

// A date-only entry cannot accidentally render unreviewed content or photos.
export type StreamRecap = PublishedStreamRecap | (RecapBase & { status: "preparing" });

export const streamRecaps: readonly StreamRecap[] = [
  {
    id: "2026-09-16-night",
    date: "2026-09-16",
    title: "夜のSHOWROOM",
    summary: "9月16日の夜配信。詳しい配信メモは準備中です。",
    platform: "SHOWROOM",
    status: "preparing",
    recording: { startedAt: "2026-09-16T20:43:59+09:00", durationSeconds: 1659.96 },
    sourceLabel: "2026年9月16日夜の配信（録画の日時・長さを確認）",
    verifiedAt: "2026-09-16",
  },
];
