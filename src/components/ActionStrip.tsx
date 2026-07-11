import { ArrowUpRight, CalendarDays, MessageCircleHeart, Ticket } from "lucide-react";
import { trackPortalEvent } from "../lib/analytics";
import type { ScheduleEvent, SocialLink } from "../types";

type ActionStripProps = { nextEvent?: ScheduleEvent; upcomingEvents: ScheduleEvent[]; socialLinks: SocialLink[] };
const dateKey = (date: Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
const addDays = (date: Date, days: number) => { const next = new Date(date); next.setDate(next.getDate() + days); return next; };
const eventDates = (event: ScheduleEvent) => event.dates?.length ? event.dates : [event.startAt.slice(0, 10), (event.endAt ?? event.startAt).slice(0, 10)];

export function ActionStrip({ nextEvent, upcomingEvents, socialLinks }: ActionStripProps) {
  const primaryLink = nextEvent?.links.find((link) => link.kind === "ticket" || link.kind === "stream") ?? nextEvent?.links.find((link) => link.kind === "info");
  const social = socialLinks.find((link) => link.kind === "x") ?? socialLinks[0];
  const today = dateKey(new Date());
  const weekEnd = dateKey(addDays(new Date(), 6));
  const month = today.slice(0, 7);
  const counts = {
    today: upcomingEvents.filter((event) => eventDates(event).some((date) => date === today)).length,
    week: upcomingEvents.filter((event) => eventDates(event).some((date) => date >= today && date <= weekEnd)).length,
    month: upcomingEvents.filter((event) => eventDates(event).some((date) => date.startsWith(month))).length
  };
  const actions = [
    { label: "次の予定", title: nextEvent?.shortTitle ?? "予定を見る", href: "#schedule", Icon: CalendarDays, external: false },
    { label: "チケット／配信／詳細", title: primaryLink?.label ?? "公演情報を見る", href: primaryLink?.url ?? "#next", Icon: Ticket, external: Boolean(primaryLink), track: primaryLink?.kind === "stream" ? "stream_click" as const : "ticket_click" as const },
    { label: "SNSで応援", title: social?.handle ?? "公式SNSを見る", href: social?.url ?? "#links", Icon: MessageCircleHeart, external: Boolean(social), track: "sns_click" as const }
  ];

  return (
    <section id="support-actions" className="bg-porcelain px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold text-ink/62" aria-label="予定件数">
          <span className="border border-rosefog/25 bg-white px-3 py-1.5">今日 {counts.today}件</span>
          <span className="border border-rosefog/25 bg-white px-3 py-1.5">今週 {counts.week}件</span>
          <span className="border border-rosefog/25 bg-white px-3 py-1.5">今月 {counts.month}件</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {actions.map((action) => {
            const className = "yukako-card yukako-lift flex min-w-0 items-center gap-3 border-rosefog/25 bg-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne";
            const content = <><span className="grid h-10 w-10 shrink-0 place-items-center border border-champagne/45 bg-porcelain text-champagne"><action.Icon className="h-5 w-5" aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className="block text-[11px] font-black uppercase tracking-wide text-champagneInk">{action.label}</span><span className="mt-1 block truncate font-bold text-ink">{action.title}</span></span><ArrowUpRight className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" /></>;
            return action.external ? <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => action.track && trackPortalEvent(action.track, { placement: "action_strip" })}>{content}</a> : <a key={action.label} href={action.href} className={className}>{content}</a>;
          })}
        </div>
      </div>
    </section>
  );
}
