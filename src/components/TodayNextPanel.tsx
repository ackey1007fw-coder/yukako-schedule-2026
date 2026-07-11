import { CalendarClock, CalendarDays, MapPin } from "lucide-react";
import type { ScheduleEvent } from "../types";

type TodayNextPanelProps = {
  todayEvents: ScheduleEvent[];
  nextEvent?: ScheduleEvent;
};

const Panel = ({
  eyebrow,
  event,
  empty,
  Icon
}: {
  eyebrow: string;
  event?: ScheduleEvent;
  empty: string;
  Icon: typeof CalendarDays;
}) => (
  <a
    href={event ? `#event-${event.id}` : "#schedule"}
    className="yukako-card yukako-lift flex min-w-0 gap-4 border-rosefog/25 bg-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:p-5"
  >
    <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/45 bg-porcelain text-champagne">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
    <span className="min-w-0">
      <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-champagneInk">
        {eyebrow}
      </span>
      <strong className="mt-1 block font-display text-xl leading-tight text-ink">
        {event?.shortTitle ?? empty}
      </strong>
      {event && (
        <>
          <span className="mt-2 block text-sm font-bold text-ink/72">{event.displayDate}</span>
          {event.venue && (
            <span className="mt-1 flex min-w-0 items-start gap-1.5 text-xs text-ink/55">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="line-clamp-2">{event.venue}</span>
            </span>
          )}
        </>
      )}
    </span>
  </a>
);

export function TodayNextPanel({ todayEvents, nextEvent }: TodayNextPanelProps) {
  return (
    <section id="today" className="bg-porcelain px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2">
        <Panel
          eyebrow={todayEvents.length > 1 ? `今日の予定 ${todayEvents.length}件` : "今日の予定"}
          event={todayEvents[0]}
          empty="今日は予定なし"
          Icon={CalendarClock}
        />
        <Panel eyebrow="次の予定" event={nextEvent} empty="次回予定を確認中" Icon={CalendarDays} />
      </div>
    </section>
  );
}
