import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarClock, ChevronDown, Megaphone, PartyPopper, Radio, Ticket } from "lucide-react";
import { news } from "../data/news";
import { profile } from "../data/profile";
import { specialStream, streamSchedule } from "../data/streamSchedule";
import { gojetTicketUrl } from "../data/gojetTimetable";
import { getGojetStatus } from "../lib/gojetStatus";
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

const POLL_MS = 60000;
const todayKey = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());

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

export function PriorityBanner() {
  const [isLive, setIsLive] = useState(false);
  const [nextShow, setNextShow] = useState<string>();

  useEffect(() => {
    let active = true;
    const check = () => fetch("/api/showroom")
      .then((response) => response.ok ? response.json() : null)
      .then((data: { isLive?: boolean; nextShow?: string } | null) => {
        if (active && data) { setIsLive(Boolean(data.isLive)); setNextShow(data.nextShow); }
      }).catch(() => undefined);
    check();
    const timer = window.setInterval(check, POLL_MS);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  const announcements = useMemo<Announcement[]>(() => {
    const today = todayKey();
    const scheduled = [
      ...streamSchedule.filter((slot) => slot.date === today),
      ...(specialStream?.date === today ? [{ date: specialStream.date, time: specialStream.time, note: specialStream.title }] : [])
    ].sort((a, b) => a.time.localeCompare(b.time))[0];
    const todayTime = scheduled?.time ?? todayTimeFromNextShow(nextShow);
    const gojet = getGojetStatus(today);
    const items: Announcement[] = [];
    if (isLive) items.push({ id: "live", label: "配信中", text: "ただいまSHOWROOMで配信中。いますぐ見る", href: profile.showroom.url, tone: "bg-[#e0245e] text-white", Icon: Radio, tracking: "stream_click" });
    if (todayTime) items.push({ id: "stream", label: "今日の配信", text: `${todayTime}〜 予定${scheduled?.note ? `・${scheduled.note}` : ""}`, href: profile.showroom.url, tone: "bg-[#fbeef0] text-ink", Icon: CalendarClock, tracking: "stream_click" });
    if (gojet.phase === "today") items.push({ id: "gojet-today", label: "本日の #ゆかJET", text: gojet.day.performances.map((show) => `${show.time}〜 ${show.team}`).join(" / "), href: gojetTicketUrl, tone: "bg-gradient-to-r from-[#fbeef0] to-[#faf3e2] text-ink", Icon: PartyPopper, tracking: "ticket_click" });
    if (gojet.phase === "before") items.push({ id: "gojet-countdown", label: "#ゆかJET", text: `公演まであと${gojet.daysLeft}日・チケット／配信を確認`, href: gojetTicketUrl, tone: "bg-gradient-to-r from-[#fbeef0] to-[#faf3e2] text-ink", Icon: Ticket, tracking: "ticket_click" });
    if (news[0]) items.push({ id: "news", label: "最新ニュース", text: `${news[0].date}　${news[0].text}`, href: news[0].url, tone: "bg-white text-ink", Icon: Megaphone, tracking: "sns_click" });
    return items;
  }, [isLive, nextShow]);

  const primary = announcements[0];
  if (!primary) return null;
  const rest = announcements.slice(1);
  const renderLink = (item: Announcement, compact = false) => (
    <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer"
      onClick={() => item.tracking && trackPortalEvent(item.tracking, { placement: "priority_banner", item: item.id })}
      className={`flex min-w-0 items-center gap-3 ${compact ? "border-t border-rosefog/15 px-4 py-3 text-sm" : `px-4 py-2.5 sm:px-6 ${item.tone}`}`}>
      <item.Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="shrink-0 text-xs font-black uppercase tracking-wide">{item.label}</span>
      <span className="min-w-0 flex-1 truncate font-bold">{item.text}</span>
      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </a>
  );

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
