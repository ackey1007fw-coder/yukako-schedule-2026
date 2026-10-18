import type { StreamRecap } from "../data/streamRecaps";

export const recapAnchor = (id: string) => `stream-${id}`;

export function sortStreamRecaps(recaps: readonly StreamRecap[]): StreamRecap[] {
  return [...recaps].sort((a, b) =>
    b.date.localeCompare(a.date) ||
    (Date.parse(b.recording?.startedAt ?? `${b.date}T00:00:00+09:00`) -
      Date.parse(a.recording?.startedAt ?? `${a.date}T00:00:00+09:00`)) ||
    a.id.localeCompare(b.id)
  );
}

export function recapDateLabel(date: string): string {
  const day = new Date(`${date}T00:00:00+09:00`);
  const weekday = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", weekday: "short" }).format(day);
  return `${date.replace(/-/g, ".")}（${weekday}）`;
}

export function recordingLabel(recording: NonNullable<StreamRecap["recording"]>): string {
  const time = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo", hour: "numeric", minute: "2-digit", hourCycle: "h23",
  }).format(new Date(recording.startedAt));
  const duration = Math.round(recording.durationSeconds / 60);
  return recording.segmentCount && recording.segmentCount > 1
    ? `記録：${time}頃から・${recording.segmentCount}区間の保存分計約${duration}分`
    : `記録：${time}頃から・約${duration}分`;
}
