import { Clock3, Ticket } from "lucide-react";
import { categoryMeta } from "../lib/eventMeta";
import type { ScheduleEvent } from "../types";
import { Badge } from "./Badge";
import { ExternalButton } from "./ExternalButton";
import { Photo } from "./Photo";
import { SectionHeader } from "./SectionHeader";

type NextEventProps = {
  event?: ScheduleEvent;
};

export function NextEvent({ event }: NextEventProps) {
  if (!event) {
    return null;
  }

  const meta = categoryMeta[event.category];
  const Icon = meta.Icon;
  const ticketLink =
    event.links.find((link) => link.kind === "ticket") ?? event.links[0];

  return (
    <section id="next" className="bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Next Appearance"
          title="次に見るべき出演情報"
          copy="ファンが最初に迷わないよう、直近の予定と予約導線を大きくまとめています。"
        />

        <article className="grid overflow-hidden border border-champagne/70 bg-white shadow-paper lg:grid-cols-[1.05fr_0.95fr]">
          <Photo src={event.image} alt={event.title} className="min-h-[360px] lg:min-h-[560px]" />

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge strong>NEXT</Badge>
                <Badge category={event.category}>{meta.label}</Badge>
                {event.badges
                  .filter((badge) => badge !== "NEXT" && badge !== meta.label)
                  .map((badge) => (
                    <Badge key={badge}>{badge}</Badge>
                  ))}
              </div>

              <div className="mb-6 flex items-start gap-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center border ${meta.tone}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                    {event.title}
                  </h3>
                  <p className="mt-4 flex gap-2 text-sm font-bold text-champagne">
                    <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {event.displayDate}
                  </p>
                </div>
              </div>

              <p className="text-lg leading-9 text-ink/72">{event.summary}</p>
              {event.venue && (
                <p className="mt-5 border-l-2 border-champagne pl-4 text-sm font-bold text-ink/70">
                  会場：{event.venue}
                </p>
              )}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              {ticketLink && (
                <ExternalButton href={ticketLink.url} variant="gold" className="w-full sm:w-auto">
                  <span className="inline-flex items-center gap-2">
                    <Ticket className="h-4 w-4" aria-hidden="true" />
                    {ticketLink.label}
                  </span>
                </ExternalButton>
              )}
              <a
                href="#schedule"
                className="inline-flex min-h-12 items-center justify-center border border-rosefog/40 bg-porcelain px-4 py-3 text-sm font-bold text-ink transition hover:bg-white"
              >
                ほかの予定も見る
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
