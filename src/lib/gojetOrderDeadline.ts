import { gojetStreamingTicketUrl } from "../data/gojetTimetable";
import { isPastDeadline } from "./date";

// 配信チケット申込の〆切と、締切後の案内をここに集約する。
// カードごとにフラグを足していく方式だと必ず付け忘れが出るため、
// 「締切を持つ申込導線」を自動で判定してCTAを閉じる。

/** 配信チケット申込の〆切（ISO8601・JST） */
export const gojetStreamingOrderDeadlineAt = "2026-08-03T23:59:59+09:00";

/** 締切後も残す視聴期限の案内 */
export const gojetStreamingClosedNotice =
  "配信チケットの申し込みは終了。視聴は8月10日（月）まで";

/** アーカイブ視聴期間が終了する時刻（8/10の終了直後） */
export const gojetStreamingViewingDeadlineAt = "2026-08-11T00:00:00+09:00";

/** 8/11以降に表示する現在状態 */
export const gojetStreamingViewingClosedNotice =
  "配信視聴は2026年8月10日をもって終了しました";

/** 配信チケットの申し込みが締め切られたか */
export const isGojetStreamingOrderClosed = (now: Date) =>
  isPastDeadline(gojetStreamingOrderDeadlineAt, now);

/** アーカイブ視聴期間が終了したか */
export const isGojetStreamingViewingClosed = (now: Date) =>
  isPastDeadline(gojetStreamingViewingDeadlineAt, now);

/** 申込フォームへの導線か（Googleフォーム or 配信チケットURL） */
export const isGojetOrderFormUrl = (url: string) =>
  url === gojetStreamingTicketUrl ||
  url.startsWith("https://docs.google.com/forms/");

/** 「申し込む」「申込」を含むラベルか（フォーム以外の申込導線の保険） */
const hasOrderLabel = (label?: string) =>
  Boolean(label && /申込|申し込/.test(label));

type OrderCtaInput = {
  url: string;
  /** カードが持つ締切（ISO8601）。無い導線は締切判定の対象外 */
  deadlineAt?: string;
  label?: string;
  /** URL・ラベルから判定できない申込導線のための明示指定 */
  force?: boolean;
};

/**
 * 締切を過ぎた申込導線かどうか。true なら申込ボタンを出さない。
 * 本人投稿・引用元投稿・Instagram などの導線は締切を持たないため影響しない。
 */
export const isClosedOrderCta = (
  { url, deadlineAt, label, force }: OrderCtaInput,
  now: Date
) => {
  if (!deadlineAt) return false;
  if (!force && !isGojetOrderFormUrl(url) && !hasOrderLabel(label)) return false;
  return isPastDeadline(deadlineAt, now);
};
