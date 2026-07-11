import { CalendarDays, CalendarPlus, ChevronDown, MapPin, Share2 } from "lucide-react";
import { categoryMeta } from "../lib/eventMeta";
import { isEventPast } from "../lib/date";
import { googleCalendarUrl, SITE_URL, xShareUrl } from "../lib/share";
import { trackPortalEvent } from "../lib/analytics";
import type { ScheduleEvent } from "../types";
import { Badge } from "./Badge";
import { ExternalButton } from "./ExternalButton";

type EventCardProps = { event: ScheduleEvent; isNext?: boolean; compact?: boolean };
const ticketDateFormatter = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", month: "numeric", day: "numeric", weekday: "short" });
const formatTicketDate = (isoDate: string) => {
  const parts = ticketDateFormatter.formatToParts(new Date(isoDate));
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return { monthDay: `${value("month")}.${value("day")}`, weekday: value("weekday") };
};

export function EventCard({ event, isNext = false, compact = false }: EventCardProps) {
  const meta = categoryMeta[event.category];
  const Icon = meta.Icon;
  const upcoming = !isEventPast(event);
  const ticketDate = formatTicketDate(event.startAt);
  const uniqueLinks = event.links.filter((link, index, links) => links.findIndex((candidate) => candidate.url === link.url) === index);
  const primaryLink = uniqueLinks.find((link) => link.kind === "ticket") ?? uniqueLinks.find((link) => link.kind === "stream");
  const infoLink = uniqueLinks.find((link) => link.kind === "info" && link.url !== primaryLink?.url);
  const shareText = upcoming ? `${event.title}を応援しています！` : `${event.title}の活動記録を見ました`;

  return (
    <article className={`yukako-ticket-card yukako-card yukako-card-interactive group relative grid overflow-hidden bg-white ${event.isImportant || isNext ? "border-champagne/70" : "border-rosefog/25"} ${compact ? "sm:grid-cols-[112px_1fr]" : "sm:grid-cols-[132px_1fr]"}`}>
      <div className="yukako-ticket-date relative flex items-center gap-4 border-b border-dashed border-champagne/45 bg-ink px-5 py-4 text-white sm:block sm:border-b-0 sm:border-r sm:px-4 sm:py-5">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-champagne">Date</span>
        <strong className="font-display text-4xl leading-none text-white sm:mt-3 sm:block">{ticketDate.monthDay}</strong>
        <span className="text-xs font-bold text-white/68 sm:mt-2 sm:block">{ticketDate.weekday}</span>
        <span className="ml-auto grid h-10 w-10 shrink-0 place-items-center border border-champagne/45 bg-white/8 text-champagne sm:ml-0 sm:mt-6"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      </div>
      <div className={`${compact ? "p-5" : "p-6"} flex min-w-0 flex-col`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {isNext && <Badge strong>NEXT</Badge>}<Badge category={event.category}>{meta.label}</Badge>
          {event.badges.filter((badge) => badge !== "NEXT" && badge !== meta.label).slice(0, compact ? 3 : 5).map((badge) => <Badge key={badge}>{badge}</Badge>)}
        </div>
        <div className="flex min-w-0 items-start gap-3">
          <span className={`mt-1 grid h-9 w-9 shrink-0 place-items-center border ${meta.tone}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
          <div className="min-w-0"><h3 className={`font-display leading-tight text-ink ${compact ? "text-xl" : "text-2xl"}`}>{event.title}</h3>
            <div className="mt-3 grid gap-2 text-sm text-ink/62"><p className="flex gap-2"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" /><span>{event.displayDate}</span></p>
              {event.venue && <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" /><span>{event.venue}</span></p>}
            </div>
          </div>
        </div>
        <p className={`${compact ? "mt-4 line-clamp-4" : "mt-5"} leading-8 text-ink/72`}>{event.summary}</p>
        {(primaryLink || infoLink) && <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {primaryLink && <ExternalButton href={primaryLink.url} variant="gold" onClick={() => trackPortalEvent(primaryLink.kind === "stream" ? "stream_click" : "ticket_click", { event_id: event.id, placement: "event_card" })}>{primaryLink.kind === "stream" ? "配信を見る" : "チケット予約"}</ExternalButton>}
          {infoLink && <ExternalButton href={infoLink.url} variant="light">詳細を見る</ExternalButton>}
        </div>}
        {upcoming && <details className="group mt-5 border-t border-rosefog/15 pt-4">
          <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 text-xs font-bold text-ink/60 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne">その他の操作<ChevronDown className="h-4 w-4 transition group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></summary>
          <div className="mt-2 flex flex-wrap gap-2">
            <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" onClick={() => trackPortalEvent("calendar_add", { event_id: event.id })} className="inline-flex min-h-10 items-center border border-rosefog/25 bg-porcelain px-3 py-2 text-xs font-bold text-ink/72"><CalendarPlus className="mr-1.5 h-4 w-4 text-champagne" aria-hidden="true" />カレンダー追加</a>
            <a href={xShareUrl(shareText, `${SITE_URL}#event-${event.id}`)} target="_blank" rel="noopener noreferrer" onClick={() => trackPortalEvent("x_share", { event_id: event.id })} className="inline-flex min-h-10 items-center border border-rosefog/25 bg-porcelain px-3 py-2 text-xs font-bold text-ink/72"><Share2 className="mr-1.5 h-4 w-4 text-champagne" aria-hidden="true" />Xで共有</a>
          </div>
        </details>}
      </div>
    </article>
  );
}
