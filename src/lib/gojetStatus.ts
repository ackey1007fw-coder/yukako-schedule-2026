import {
  gojetArchiveEndDate,
  gojetArchiveStartDate,
  gojetClosingDate,
  gojetOpeningDate,
  gojetTimetable,
  type GojetTimetableDay
} from "../data/gojetTimetable";

export const gojetTodayKey = (now: Date = new Date()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(now);

export const gojetDaysUntil = (fromKey: string, toKey: string) => {
  const [fy, fm, fd] = fromKey.split("-").map(Number);
  const [ty, tm, td] = toKey.split("-").map(Number);
  return Math.round(
    (Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86400000
  );
};

export type GojetStatus =
  | { phase: "before"; daysLeft: number }
  | {
      phase: "today";
      day: GojetTimetableDay;
      remainingPerformances: number;
    }
  | { phase: "archive"; archiveEndDate: string }
  | { phase: "ended" };

const performanceStart = (date: string, time: string) =>
  new Date(`${date}T${time}:00+09:00`).getTime();

// 開演30分前を「まもなく開演」の目安として使う。
const SOON_BEFORE_MINUTES = 30;

export type GojetPerformanceLiveStatus = "before" | "soon" | "live" | "ended";

export const gojetPerformanceLiveStatusLabel: Record<
  GojetPerformanceLiveStatus,
  string
> = {
  before: "開演前",
  soon: "まもなく開演",
  live: "上演中",
  ended: "終演"
};

// 開演時刻・上演時間（durationMinutes）と現在時刻から、公演のライブ状況を判定する。
// ・開演30分より前　　　　　　　　　　　→ before（開演前）
// ・開演30分前〜開演時刻の直前まで　　　→ soon（まもなく開演）
// ・開演時刻〜開演からdurationMinutes後まで → live（上演中）
// ・それ以降　　　　　　　　　　　　　　→ ended（終演）
// あくまで開演時刻と想定上演時間から算出した目安であり、実際の進行状況を
// 外部から取得しているわけではない。
export const getPerformanceLiveStatus = (
  now: Date,
  date: string,
  time: string,
  durationMinutes: number
): GojetPerformanceLiveStatus => {
  const elapsedMinutes =
    (now.getTime() - performanceStart(date, time)) / 60000;

  if (elapsedMinutes < -SOON_BEFORE_MINUTES) return "before";
  if (elapsedMinutes < 0) return "soon";
  if (elapsedMinutes <= durationMinutes) return "live";
  return "ended";
};

export type GojetDayLiveSummary = {
  live: GojetTimetableDay["performances"][number] | null;
  next: GojetTimetableDay["performances"][number] | null;
  allEnded: boolean;
};

// 本日の公演一覧から、現在上演中の回・次に控えている回をまとめて返す。
// GojetPerformancePanel（本日の公演カード）・PriorityBanner（トップのお知らせバー）で共用する。
export const summarizeGojetDayLiveStatus = (
  now: Date,
  day: GojetTimetableDay
): GojetDayLiveSummary => {
  let live: GojetDayLiveSummary["live"] = null;
  let next: GojetDayLiveSummary["next"] = null;
  let endedCount = 0;

  for (const performance of day.performances) {
    const status = getPerformanceLiveStatus(
      now,
      day.date,
      performance.time,
      performance.durationMinutes
    );
    if (status === "live" && !live) live = performance;
    if ((status === "before" || status === "soon") && !next) next = performance;
    if (status === "ended") endedCount += 1;
  }

  return { live, next, allEnded: endedCount === day.performances.length };
};

export const countRemainingGojetPerformances = (
  now: Date,
  timetable: GojetTimetableDay[] = gojetTimetable
) => {
  const nowMs = now.getTime();

  return timetable.reduce(
    (count, entry) =>
      count +
      entry.performances.filter(
        (performance) => performanceStart(entry.date, performance.time) >= nowMs
      ).length,
    0
  );
};

// #ゆかJET『GO,JET!GO!GO! vol.1 Premium』の公演フェーズを判定する。
// ・公演前：あと何日か（before）
// ・公演期間中（7/23〜27）：本日の回（today）
// ・終演翌日〜8/6：アーカイブ配信（archive）
// ・8/7以降：終了（ended）
export const getGojetStatus = (
  now: Date = new Date(),
  timetable: GojetTimetableDay[] = gojetTimetable
): GojetStatus => {
  const today = gojetTodayKey(now);

  if (today > gojetArchiveEndDate) return { phase: "ended" };
  if (today >= gojetArchiveStartDate) {
    return { phase: "archive", archiveEndDate: gojetArchiveEndDate };
  }

  const day = timetable.find((entry) => entry.date === today);
  if (day) {
    return {
      phase: "today",
      day,
      remainingPerformances: countRemainingGojetPerformances(now, timetable)
    };
  }

  if (today > gojetClosingDate) {
    return { phase: "archive", archiveEndDate: gojetArchiveEndDate };
  }

  return { phase: "before", daysLeft: gojetDaysUntil(today, gojetOpeningDate) };
};
