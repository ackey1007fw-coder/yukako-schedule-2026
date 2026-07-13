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
