import { getCalendarCells, getEventsForDay, formatMonthTitle } from "../lib/date";
import { categoryMeta } from "../lib/eventMeta";
import type { ScheduleEvent } from "../types";

type CalendarViewProps = {
  events: ScheduleEvent[];
  monthKeys: string[];
};

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

export function CalendarView({ events, monthKeys }: CalendarViewProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {monthKeys.map((monthKey) => (
        <section key={monthKey} className="border border-rosefog/25 bg-white">
          <div className="border-b border-rosefog/20 bg-porcelain px-4 py-4">
            <h3 className="font-display text-2xl text-ink">
              {formatMonthTitle(monthKey)}
            </h3>
          </div>
          <div className="grid grid-cols-7 border-b border-rosefog/20 bg-white text-center text-xs font-bold text-ink/55">
            {weekDays.map((day) => (
              <div key={day} className="py-3">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {getCalendarCells(monthKey).map((day, index) => {
              const dayEvents = day ? getEventsForDay(events, monthKey, day) : [];

              return (
                <div
                  key={`${monthKey}-${index}`}
                  className={`min-h-[74px] border-b border-r border-rosefog/15 p-1.5 sm:min-h-[92px] ${
                    dayEvents.length ? "bg-porcelain" : "bg-white"
                  }`}
                >
                  {day && (
                    <>
                      <div className="mb-1 text-xs font-bold text-ink/60">{day}</div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => {
                          const meta = categoryMeta[event.category];
                          return (
                            <a
                              key={event.id}
                              href={`#event-${event.id}`}
                              className={`block truncate border px-1.5 py-1 text-[10px] font-bold leading-tight ${meta.tone}`}
                              title={event.title}
                            >
                              {event.shortTitle}
                            </a>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <span className="block text-[10px] font-bold text-champagne">
                            +{dayEvents.length - 2}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
