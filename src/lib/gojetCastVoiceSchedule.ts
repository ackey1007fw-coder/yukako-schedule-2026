import { gojetTimetable, type GojetPerformance } from "../data/gojetTimetable";
import { getPerformanceLiveStatus, type GojetPerformanceLiveStatus } from "./gojetStatus";

export type GojetCastVoicePerformance = GojetPerformance & {
  date: string;
  dateLabel: string;
  status: GojetPerformanceLiveStatus;
};

// 「キャストの声」内の残り公演カード用。タイムテーブルの最終2日分（現在は7/26・7/27）を
// 対象に、公演ごとの上演ステータスを算出する。対象日をハードコードせず、
// gojetTimetable の末尾から動的に取り出す。
const CAST_VOICE_SCHEDULE_DAY_COUNT = 2;

export function getGojetCastVoiceSchedule(
  now: Date,
  timetable = gojetTimetable
): { performances: GojetCastVoicePerformance[]; allEnded: boolean } {
  const targetDays = timetable.slice(-CAST_VOICE_SCHEDULE_DAY_COUNT);

  const performances = targetDays.flatMap((day) =>
    day.performances.map((performance) => ({
      ...performance,
      date: day.date,
      dateLabel: day.label,
      status: getPerformanceLiveStatus(
        now,
        day.date,
        performance.time,
        performance.durationMinutes
      )
    }))
  );

  const allEnded =
    performances.length > 0 &&
    performances.every((performance) => performance.status === "ended");

  return { performances, allEnded };
}
