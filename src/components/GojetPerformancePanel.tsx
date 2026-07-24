import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, Radio, Ticket } from "lucide-react";
import {
  gojetInPersonTicketUrl,
  gojetStreamingTicketUrl
} from "../data/gojetTimetable";
import {
  getGojetStatus,
  getPerformanceLiveStatus,
  gojetPerformanceLiveStatusLabel,
  summarizeGojetDayLiveStatus,
  type GojetPerformanceLiveStatus
} from "../lib/gojetStatus";
import { trackPortalEvent } from "../lib/analytics";

type GojetPerformancePanelProps = {
  now?: Date;
};

const CLOCK_UPDATE_MS = 60000;

// 「上演中」は開演時刻＋想定上演時間から算出した目安であり、外部から実際の
// 進行状況を取得しているわけではない。控えめなpulseはprefers-reduced-motionで停止する。
function PerformanceStatusBadge({
  status
}: {
  status: GojetPerformanceLiveStatus;
}) {
  const label = gojetPerformanceLiveStatusLabel[status];

  if (status === "live") {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-rosefog/50 bg-rosefog/10 px-2.5 py-1 text-xs font-black text-rosefog">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rosefog opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rosefog" />
        </span>
        {label}
      </span>
    );
  }

  if (status === "soon") {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-champagne/50 bg-champagne/10 px-2.5 py-1 text-xs font-black text-champagneInk">
        <span className="h-2 w-2 shrink-0 rounded-full bg-champagne" aria-hidden="true" />
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink/12 bg-white px-2.5 py-1 text-xs font-bold text-ink/55">
      <span className="h-2 w-2 shrink-0 rounded-full bg-ink/25" aria-hidden="true" />
      {label}
    </span>
  );
}

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
    data-ticket-tone={tone}
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

  const allPerformancesStarted = status.remainingPerformances === 0;
  const daySummary = summarizeGojetDayLiveStatus(currentTime, status.day);

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
            {daySummary.live ? (
              <p className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-rosefog/50 bg-rosefog/10 px-3 py-1.5 text-sm font-black text-rosefog">
                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rosefog opacity-70 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rosefog" />
                </span>
                現在、{daySummary.live.time} {daySummary.live.team}を上演中
              </p>
            ) : (
              daySummary.next && (
                <p className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-champagne/45 bg-white px-3 py-1.5 text-sm font-bold text-champagneInk">
                  次の公演　{daySummary.next.time} {daySummary.next.team}
                </p>
              )
            )}
            <div className="mt-4 flex flex-wrap gap-2" aria-label="本日の開演時刻・班・上演ステータス">
              {status.day.performances.map((performance) => (
                <div
                  key={`${performance.time}-${performance.team}`}
                  className="flex min-w-[9.5rem] flex-col gap-2 border border-rosefog/25 bg-white px-4 py-3 shadow-sm"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <strong className="font-display text-2xl text-rosefog">
                      {performance.time}
                    </strong>
                    <span className="text-sm font-black text-ink">{performance.team}</span>
                  </div>
                  <PerformanceStatusBadge
                    status={getPerformanceLiveStatus(
                      currentTime,
                      status.day.date,
                      performance.time,
                      performance.durationMinutes
                    )}
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] font-semibold text-ink/40">
              公演時間をもとにした目安表示です
            </p>
            {status.day.note && (
              <p className="mt-3 max-w-2xl text-xs font-semibold leading-5 text-ink/65">
                {status.day.note}
              </p>
            )}
            {allPerformancesStarted && (
              <p className="mt-3 max-w-2xl text-sm font-bold text-rosefog">
                本日の全公演は開演済みです
              </p>
            )}
          </div>
          <div className="grid w-full shrink-0 gap-2 sm:grid-cols-2 lg:w-[34rem]">
            <TicketLink
              href={gojetInPersonTicketUrl}
              label="来場チケット"
              detail="一般席 4,700円〜"
              tone={allPerformancesStarted ? "secondary" : "primary"}
            />
            <TicketLink
              href={gojetStreamingTicketUrl}
              label="配信チケット"
              detail="3,700円・8/6まで視聴可"
              tone={allPerformancesStarted ? "primary" : "secondary"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
