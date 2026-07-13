import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, Radio, Ticket } from "lucide-react";
import {
  gojetInPersonTicketUrl,
  gojetStreamingTicketUrl
} from "../data/gojetTimetable";
import { getGojetStatus } from "../lib/gojetStatus";
import { trackPortalEvent } from "../lib/analytics";

type GojetPerformancePanelProps = {
  now?: Date;
};

const CLOCK_UPDATE_MS = 60000;

const TicketLink = ({
  href,
  label,
  detail,
  tone
}: {
  href: string;
  label: string;
  detail: string;
  tone: "primary" | "secondary";
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() =>
      trackPortalEvent("ticket_click", {
        placement: "gojet_performance_panel",
        item: label
      })
    }
    className={`group flex min-w-0 items-center justify-between gap-3 border px-4 py-3.5 font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
      tone === "primary"
        ? "border-rosefog bg-rosefog text-white hover:bg-rosefog/90"
        : "border-champagne/50 bg-white text-ink hover:border-champagne"
    }`}
  >
    <span className="min-w-0">
      <span className="block text-sm font-black">{label}</span>
      <span
        className={`mt-0.5 block text-xs ${
          tone === "primary" ? "text-white/80" : "text-ink/60"
        }`}
      >
        {detail}
      </span>
    </span>
    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
  </a>
);

export function GojetPerformancePanel({ now }: GojetPerformancePanelProps) {
  const [currentTime, setCurrentTime] = useState(() => now ?? new Date());

  useEffect(() => {
    if (now) {
      setCurrentTime(now);
      return undefined;
    }

    const timer = window.setInterval(() => setCurrentTime(new Date()), CLOCK_UPDATE_MS);
    return () => window.clearInterval(timer);
  }, [now]);

  const status = getGojetStatus(currentTime);

  if (status.phase === "before" || status.phase === "ended") return null;

  if (status.phase === "archive") {
    return (
      <section
        id="gojet-live-panel"
        aria-labelledby="gojet-archive-title"
        className="scroll-mt-32 border-b border-champagne/30 bg-gradient-to-br from-ink via-[#3a2d32] to-[#552b37] px-4 py-5 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagne">
              <Radio className="h-4 w-4" aria-hidden="true" />
              #ゆかJET 配信
            </p>
            <h2
              id="gojet-archive-title"
              className="mt-2 font-display text-2xl font-black leading-tight sm:text-3xl"
            >
              アーカイブ配信は8/6（木）まで
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              A班・B班は7/26公演、C班・LIVEは7/27公演。配信チケットは3,700円です。
            </p>
          </div>
          <div className="w-full shrink-0 sm:w-72">
            <TicketLink
              href={gojetStreamingTicketUrl}
              label="配信チケット"
              detail="3,700円・8/6まで視聴可"
              tone="primary"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gojet-live-panel"
      aria-labelledby="gojet-today-title"
      className="scroll-mt-32 border-b border-champagne/30 bg-gradient-to-br from-[#fff8f3] via-porcelain to-[#faf3e2] px-4 py-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-rosefog">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                {status.day.label}
              </p>
              <span className="border border-champagne/45 bg-white px-2.5 py-1 text-xs font-black text-champagneInk">
                残り{status.remainingPerformances}公演
              </span>
            </div>
            <h2
              id="gojet-today-title"
              className="mt-2 font-display text-3xl font-black leading-tight text-ink sm:text-4xl"
            >
              本日の公演
            </h2>
            <div className="mt-4 flex flex-wrap gap-2" aria-label="本日の開演時刻と班">
              {status.day.performances.map((performance) => (
                <div
                  key={`${performance.time}-${performance.team}`}
                  className="flex min-w-[9rem] items-baseline justify-between gap-3 border border-rosefog/25 bg-white px-4 py-3 shadow-sm"
                >
                  <strong className="font-display text-2xl text-rosefog">
                    {performance.time}
                  </strong>
                  <span className="text-sm font-black text-ink">{performance.team}</span>
                </div>
              ))}
            </div>
            {status.day.note && (
              <p className="mt-3 max-w-2xl text-xs font-semibold leading-5 text-ink/65">
                {status.day.note}
              </p>
            )}
          </div>
          <div className="grid w-full shrink-0 gap-2 sm:grid-cols-2 lg:w-[34rem]">
            <TicketLink
              href={gojetInPersonTicketUrl}
              label="来場チケット"
              detail="一般席 4,700円〜"
              tone="primary"
            />
            <TicketLink
              href={gojetStreamingTicketUrl}
              label="配信チケット"
              detail="3,700円・8/6まで視聴可"
              tone="secondary"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
