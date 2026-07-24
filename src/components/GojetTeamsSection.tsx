import { useState } from "react";
import { ExternalLink, PlayCircle, Ticket, Users } from "lucide-react";
import {
  gojetTeamUpdates,
  type GojetTeamUpdate
} from "../data/gojetPromo";
import { getResponsiveImageProps } from "../lib/responsiveImage";

const teamOrder: GojetTeamUpdate["team"][] = ["A", "B", "C"];

export function GojetTeamsSection() {
  const [activeTeam, setActiveTeam] = useState<GojetTeamUpdate["team"]>(
    gojetTeamUpdates[0]?.team ?? "A"
  );
  const activeUpdate =
    gojetTeamUpdates.find((update) => update.team === activeTeam) ??
    gojetTeamUpdates[0];

  if (!activeUpdate) return null;

  return (
    <section
      id="gojet-teams"
      aria-labelledby="gojet-teams-title"
      className="bg-ink pb-16 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-2 border-t border-white/10 pt-8 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-champagne">
              #ゆかJET Team Guide
            </p>
            <h2
              id="gojet-teams-title"
              className="mt-2 font-display text-3xl leading-tight text-white sm:text-4xl"
            >
              A/B/C班 キャスト紹介
            </h2>
          </div>
          <p className="text-sm font-semibold text-white/65">
            3班の紹介動画と、優花子さんのひとこと。
          </p>
        </div>

        <div
          className="grid grid-cols-3 gap-2"
          aria-label="#ゆかJETの班を切り替える"
        >
          {teamOrder.map((team) => {
            const update = gojetTeamUpdates.find((item) => item.team === team);
            if (!update) return null;
            const isActive = team === activeUpdate.team;

            return (
              <button
                key={team}
                type="button"
                onClick={() => setActiveTeam(team)}
                aria-pressed={isActive}
                aria-controls="gojet-team-panel"
                className={`min-h-14 border px-3 py-3 text-center text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
                  isActive
                    ? "border-champagne bg-champagne text-ink"
                    : "border-white/20 bg-white/[0.06] text-white hover:border-champagne/70 hover:bg-white/10"
                }`}
              >
                {team}班
              </button>
            );
          })}
        </div>

        <article
          id="gojet-team-panel"
          key={activeUpdate.id}
          className="mt-3 border border-champagne/35 bg-white/[0.07] p-6 shadow-paper sm:p-8 lg:p-10"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">
                {activeUpdate.date} ・ {activeUpdate.label}
              </p>
              <h3 className="mt-2 break-words font-display text-3xl leading-tight text-white [overflow-wrap:anywhere] sm:text-4xl">
                {activeUpdate.title}
              </h3>
            </div>
            <span className="inline-flex w-fit items-center gap-2 border border-champagne/40 bg-champagne/10 px-3 py-2 text-xs font-black text-champagne">
              <Users className="h-4 w-4" aria-hidden="true" />
              {activeUpdate.team}班
            </span>
          </div>

          <div className="mt-5 max-w-4xl border-l-2 border-champagne/60 bg-black/20 px-4 py-3 text-sm font-semibold leading-7 text-white/85 sm:text-base sm:leading-8">
            {activeUpdate.quote}
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            {activeUpdate.body}
          </p>

          <div
            className={`mt-6 grid gap-4 ${activeUpdate.photo ? "sm:grid-cols-2" : ""}`}
          >
            {activeUpdate.photo && (
              <div className="overflow-hidden border border-white/12 bg-black shadow-paper">
                <img
                  {...getResponsiveImageProps(
                    activeUpdate.photo.src,
                    "(min-width: 640px) 45vw, 100vw"
                  )}
                  alt={activeUpdate.photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain"
                />
              </div>
            )}
            <div className="overflow-hidden border border-white/12 bg-black shadow-paper">
              <video
                controls
                playsInline
                preload="none"
                poster={activeUpdate.video.poster}
                aria-label={activeUpdate.video.label}
                className="block h-full max-h-[420px] w-full object-contain"
              >
                <source src={activeUpdate.video.src} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={activeUpdate.yukakoPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-button yukako-button-gold min-h-12 px-4 py-3 text-sm"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              優花子のポストを見る
            </a>
            {activeUpdate.originalPostUrl && (
              <a
                href={activeUpdate.originalPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
              >
                <ExternalLink className="h-4 w-4 text-champagne" aria-hidden="true" />
                {activeUpdate.team}班紹介を見る
              </a>
            )}
            <a
              href={activeUpdate.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
            >
              <Ticket className="h-4 w-4 text-champagne" aria-hidden="true" />
              予約・応援はこちら
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
