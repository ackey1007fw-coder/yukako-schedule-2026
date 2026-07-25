import type { WorkCreditEntry, WorkCreditStatus } from "../data/workCredits";

const todayKeyJST = (now: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(now);

/** entry.status が明示されていれば優先し、なければ eventPeriod と現在日時(JST)から自動判定する。 */
export function deriveWorkCreditStatus(
  entry: WorkCreditEntry,
  now: Date = new Date(),
): WorkCreditStatus {
  if (entry.status) return entry.status;
  if (!entry.eventPeriod) return "none";

  const endKey = entry.eventPeriod.end.slice(0, 10);
  return todayKeyJST(now) > endKey ? "ended" : "ongoing";
}

const categoryLabels: Record<WorkCreditEntry["category"], string> = {
  pr: "PR",
  stage: "舞台",
  media: "メディア",
  report: "レポート",
  other: "その他"
};

export const workCreditCategoryLabel = (category: WorkCreditEntry["category"]) =>
  categoryLabels[category];

export type WorkCreditSectionKey = "work" | "report";

const sectionByCategory: Record<WorkCreditEntry["category"], WorkCreditSectionKey> = {
  pr: "work",
  stage: "work",
  media: "work",
  report: "report",
  other: "report"
};

/** category から掲載先セクションを判定する（'pr'/'stage'/'media' → お仕事実績、'report'/'other' → 活動レポート）。 */
export const workCreditSectionFor = (category: WorkCreditEntry["category"]) =>
  sectionByCategory[category];

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "long",
  day: "numeric"
});

export const formatWorkCreditDate = (iso: string) => dateFormatter.format(new Date(iso));
