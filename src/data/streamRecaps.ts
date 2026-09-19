import { streamRecap20260918Radio } from "./streamRecap20260918Radio";
import { streamRecap20260917Night } from "./streamRecap20260917Night";
import { streamRecap20260916Night } from "./streamRecap20260916Night";

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
  recording?: { startedAt: string; durationSeconds: number; segmentCount?: number };
  sourceLabel: string;
  verifiedAt: string;
};

export type PublishedStreamRecap = RecapBase & {
  status: "published";
  verificationNote?: string;
  timestampNote?: string;
  mode?: "radio";
  /** A single nominated broadcast still; not duplicated as a gallery. */
  image?: StreamRecapImage;
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
  streamRecap20260918Radio,
  streamRecap20260917Night,
  streamRecap20260916Night,
];
