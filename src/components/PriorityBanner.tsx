import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarClock, ChevronDown, Megaphone, PartyPopper, Radio, Ticket } from "lucide-react";
import { profile } from "../data/profile";
import { siteUpdates } from "../data/siteUpdates";
import { specialStream, streamSchedule } from "../data/streamSchedule";
import { gojetStreamingTicketUrl, gojetTicketUrl } from "../data/gojetTimetable";
import { getGojetStatus, summarizeGojetDayLiveStatus } from "../lib/gojetStatus";
import { trackPortalEvent } from "../lib/analytics";

type Announcement = {
  id: string;
  label: string;
  text: string;
  href: string;
  tone: string;
  Icon: typeof Radio;
  tracking?: "stream_click" | "ticket_click" | "sns_click";
};

const isInternalHref = (href: string) => href.startsWith("#");

const POLL_MS = 60000;
const todayKey = (now: Date = new Date()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(now);

const todayTimeFromNextShow = (nextShow?: string) => {
  if (!nextShow) return null;
  const match = nextShow.match(/(\d{1,2})\/(\d{1,2}).*?(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Tokyo", month: "numeric", day: "numeric" })
    .formatToParts(new Date()).reduce<Record<string, string>>((all, part) => ({ ...all, [part.type]: part.value }), {});
  return Number(match[1]) === Number(parts.month) && Number(match[2]) === Number(parts.day)
    ? `${match[3].padStart(2, "0")}:${match[4]}`
    : null;
};

const todayTimeFromNextShowAt = (nextShowAt: string | undefined, now: Date) => {
  if (!nextShowAt) return null;
  const start = new Date(nextShowAt);
  if (Number.isNaN(start.getTime()) || todayKey(start) !== todayKey(now)) return null;
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(start);
};

type PriorityBannerProps = {
  now?: Date;
};

export function PriorityBanner({ now: nowProp }: PriorityBannerProps = {}) {
  const [isLive, setIsLive] = useState(false);
  const [nextShow, setNextShow] = useState<string>();
  const [nextShowAt, setNextShowAt] = useState<string>();
  const [now, setNow] = useState(() => nowProp ?? new Date());

  useEffect(() => {
    if (nowProp) {
      setNow(nowProp);
      return undefined;
    }

    let active = true;
    const check = () => {
      setNow(new Date());
      return fetch(`/api/showroom?ts=${Date.now()}`, { cache: "no-store" })
        .then((response) => response.ok ? response.json() : null)
        .then((data: { isLive?: boolean; nextShow?: string; nextShowAt?: string } | null) => {
          if (active && data) {
            setIsLive(Boolean(data.isLive));
            setNextShow(data.nextShow);
            setNextShowAt(data.nextShowAt);
          }
        }).catch(() => undefined);
    };
    check();
    const timer = window.setInterval(check, POLL_MS);
    return () => { active = false; window.clearInterval(timer); };
  }, [nowProp]);

  const announcements = useMemo<Announcement[]>(() => {
    const today = todayKey(now);
    const scheduled = [
      ...streamSchedule.filter((slot) => slot.date === today),
      ...(specialStream?.date === today ? [{ date: specialStream.date, time: specialStream.time, note: specialStream.title }] : [])
    ].sort((a, b) => a.time.localeCompare(b.time))[0];
    const todayTime = scheduled?.time
      ?? todayTimeFromNextShowAt(nextShowAt, now)
      ?? todayTimeFromNextShow(nextShow);
    const gojet = getGojetStatus(now);
    const items: Announcement[] = [];
    if (gojet.phase === "today") {
      // 「上演中」「次の公演」は開演時刻と想定上演時間（durationMinutes）から算出した
      // 目安であり、外部から実際の進行状況を取得しているわけではない。
      const daySummary = summarizeGojetDayLiveStatus(now, gojet.day);
      const gojetText = daySummary.live
        ? daySummary.next
          ? `${daySummary.live.team}ただいま上演中！ 次回${daySummary.next.time}〜${daySummary.next.team}`
          : `ただいま #ゆかJET ${daySummary.live.team} 上演中！`
        : daySummary.next
          ? `次回は${daySummary.next.time}〜 ${daySummary.next.team}公演`
          : "本日の #ゆかJET 公演は終了しました";
      items.push({
        id: "gojet-today",
        label: "本日の #ゆかJET",
        text: gojetText,
        href: gojetTicketUrl,
        tone: "bg-gradient-to-r from-[#fbeef0] to-[#faf3e2] text-ink",
        Icon: PartyPopper,
        tracking: "ticket_click"
      });
    }
    if (isLive) items.push({ id: "live", label: "配信中", text: "ただいまSHOWROOMで配信中。いますぐ見る", href: profile.showroom.url, tone: "bg-[#e0245e] text-white", Icon: Radio, tracking: "stream_click" });
    if (todayTime) items.push({ id: "stream", label: "今日の配信", text: `${todayTime}〜 予定${scheduled?.note ? `・${scheduled.note}` : ""}`, href: profile.showroom.url, tone: "bg-[#fbeef0] text-ink", Icon: CalendarClock, tracking: "stream_click" });
    if (gojet.phase === "before") items.push({ id: "gojet-countdown", label: "#ゆかJET", text: `公演まであと${gojet.daysLeft}日・チケット／配信を確認`, href: gojetTicketUrl, tone: "bg-gradient-to-r from-[#fbeef0] to-[#faf3e2] text-ink", Icon: Ticket, tracking: "ticket_click" });
    if (gojet.phase === "archive") items.push({ id: "gojet-archive", label: "#ゆかJET 配信", text: "アーカイブ配信は8/6（木）まで・配信チケット 3,700円", href: gojetStreamingTicketUrl, tone: "bg-gradient-to-r from-[#fbeef0] to-[#faf3e2] text-ink", Icon: Radio, tracking: "ticket_click" });
    const latestUpdate = siteUpdates[0];
    const latestHref = latestUpdate?.anchor || latestUpdate?.sourceUrl;
    if (latestUpdate && latestHref) {
      items.push({
        id: "news",
        label: "最新ニュース",
        text: `${latestUpdate.date}　${latestUpdate.category}　${latestUpdate.title}`,
        href: latestHref,
        tone: "bg-white text-ink",
        Icon: Megaphone,
        tracking: "sns_click"
      });
    }
    return items;
  }, [isLive, nextShow, nextShowAt, now]);

  const primary = announcements[0];
  if (!primary) return null;
  const rest = announcements.slice(1);
  const renderLink = (item: Announcement, compact = false) => {
    const internal = isInternalHref(item.href);
    return (
      <a
        key={item.id}
        href={item.href}
        {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        onClick={() => item.tracking && trackPortalEvent(item.tracking, { placement: "priority_banner", item: item.id })}
        className={`flex min-w-0 items-center gap-3 ${compact ? "border-t border-rosefog/15 px-4 py-3 text-sm" : `px-4 py-2.5 sm:px-6 ${item.tone}`}`}
      >
        <item.Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="shrink-0 text-xs font-black uppercase tracking-wide">{item.label}</span>
        <span className="min-w-0 flex-1 font-bold leading-snug">{item.text}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </a>
    );
  };

  return (
    <aside aria-label="優先のお知らせ" className="border-b border-champagne/30">
      <div className={primary.tone}><div className="mx-auto max-w-7xl">{renderLink(primary)}</div></div>
      {rest.length > 0 && (
        <details className="group bg-porcelain">
          <summary className="mx-auto flex max-w-7xl cursor-pointer list-none items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-ink/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne">
            その他のお知らせ {rest.length}件
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
          </summary>
          <div className="mx-auto max-w-7xl">{rest.map((item) => renderLink(item, true))}</div>
        </details>
      )}
    </aside>
  );
}
