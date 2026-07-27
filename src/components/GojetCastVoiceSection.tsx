import { useEffect, useState } from "react";
import { Clock3, Instagram, MapPin, Ticket } from "lucide-react";
import { gojetStreamingTicketUrl } from "../data/gojetTimetable";
import { getGojetCastVoiceSchedule } from "../lib/gojetCastVoiceSchedule";
import { gojetPerformanceLiveStatusLabel } from "../lib/gojetStatus";
import { trackPortalEvent } from "../lib/analytics";
import { FinaleBadge } from "./FinaleBadge";
import { XPostEmbed } from "./XPostEmbed";

const CLOCK_UPDATE_MS = 60000;

const castName = "葉山椎菜";
const castHandle = "@shiina_style222";
const castPostUrl = "https://x.com/shiina_style222/status/2081178147815563421";
const castXUrl = "https://x.com/shiina_style222";
const castInstagramUrl = "https://www.instagram.com/shiina_style222/";

// Xの公式ロゴ（lucide-reactには未収録のため、公式ブランドガイドのパスをインラインSVGで使用）。
function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const snsCards = [
  {
    key: "x",
    label: "X",
    handle: castHandle,
    url: castXUrl,
    Icon: XLogo
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "@shiina_style222",
    url: castInstagramUrl,
    Icon: Instagram
  }
];

type GojetCastVoiceSectionProps = {
  now?: Date;
};

export function GojetCastVoiceSection({ now }: GojetCastVoiceSectionProps) {
  const [currentTime, setCurrentTime] = useState(() => now ?? new Date());

  useEffect(() => {
    if (now) {
      setCurrentTime(now);
      return undefined;
    }

    const timer = window.setInterval(() => setCurrentTime(new Date()), CLOCK_UPDATE_MS);
    return () => window.clearInterval(timer);
  }, [now]);

  const { performances, allEnded } = getGojetCastVoiceSchedule(currentTime);
  type DateGroup = { date: string; dateLabel: string; items: typeof performances };
  const dateGroups = performances.reduce<DateGroup[]>((groups, performance) => {
    const current = groups[groups.length - 1];
    if (current && current.date === performance.date) {
      current.items.push(performance);
    } else {
      groups.push({ date: performance.date, dateLabel: performance.dateLabel, items: [performance] });
    }
    return groups;
  }, []);

  return (
    <section
      id="gojet-cast-voice"
      aria-labelledby="gojet-cast-voice-title"
      className="scroll-mt-32 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="yukako-card overflow-hidden border-rosefog/25 bg-white shadow-paper">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
              <span className="border border-champagne/45 bg-porcelain px-2.5 py-1">#ゆかJET</span>
              <span className="border border-rosefog/35 bg-rosefog/10 px-2.5 py-1 text-rosefog">
                キャストの声
              </span>
            </p>

            <h2
              id="gojet-cast-voice-title"
              className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl"
            >
              A班あかね役・葉山椎菜さんからの投稿
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              7/25公演でA班あかね役を務めた葉山椎菜さん（{castHandle}）の投稿を、Xの埋め込みでそのままご紹介します。
            </p>

            <div className="mt-6">
              <XPostEmbed url={castPostUrl} label={`${castName}さんのポスト`} />
            </div>

            <div className="mt-8 border-t border-champagne/20 pt-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
                {castName}さんをフォローする
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {snsCards.map(({ key, label, handle, url, Icon }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${castName}さんの${label}（新しいタブで開く）`}
                    onClick={() =>
                      trackPortalEvent("sns_click", {
                        kind: key,
                        placement: "gojet_cast_voice"
                      })
                    }
                    className="yukako-card yukako-lift group flex min-h-20 items-center gap-3 border-rosefog/25 bg-porcelain p-4 hover:border-champagne hover:bg-white"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/50 bg-white text-champagneInk">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xl text-ink">{label}</span>
                      <span className="mt-0.5 block truncate text-sm font-bold text-champagneInk">
                        {handle}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-champagne/20 pt-6">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
                <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
                GO,JET!GO!GO! vol.1 Premium 残りの公演
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-ink/55">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Air studio 両国
              </p>

              {allEnded ? (
                <p className="mt-4 border border-champagne/40 bg-porcelain p-5 text-sm font-bold leading-7 text-ink/80 sm:text-base">
                  公演は全日程終了しました。ご来場・ご視聴ありがとうございました
                </p>
              ) : (
                <>
                  <div className="mt-4 space-y-4">
                    {dateGroups.map((group) => (
                      <div key={group.date}>
                        <p className="text-sm font-black text-rosefog">{group.dateLabel}</p>
                        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                          {group.items.map((performance) => {
                            const isEnded = performance.status === "ended";
                            return (
                              <li
                                key={`${performance.date}-${performance.time}-${performance.team}`}
                                className={`flex min-w-0 items-start justify-between gap-3 border px-4 py-3 transition ${
                                  isEnded
                                    ? "border-ink/10 bg-white/60 opacity-70 saturate-[0.55]"
                                    : "border-champagne/40 bg-white shadow-sm"
                                }`}
                              >
                                <span className="min-w-0">
                                  <span className="flex items-baseline gap-2">
                                    <strong
                                      className={`font-display text-xl ${
                                        isEnded ? "text-ink/50" : "text-rosefog"
                                      }`}
                                    >
                                      {performance.time}
                                    </strong>
                                    <span
                                      className={`text-sm font-black ${
                                        isEnded ? "text-ink/45" : "text-ink"
                                      }`}
                                    >
                                      {performance.team}
                                    </span>
                                  </span>
                                  {performance.yukakoRole && (
                                    <span className="mt-1 block text-xs font-bold text-champagneInk">
                                      優花子さん：{performance.yukakoRole}
                                    </span>
                                  )}
                                  {performance.isFinale && (
                                    <FinaleBadge className="mt-1.5" />
                                  )}
                                </span>
                                <span
                                  className={`shrink-0 text-xs font-bold ${
                                    isEnded ? "text-ink/40" : "text-ink/60"
                                  }`}
                                >
                                  {gojetPerformanceLiveStatusLabel[performance.status]}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] font-semibold text-ink/40">
                    開演時刻をもとにした目安表示です
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <a
                      href={gojetStreamingTicketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackPortalEvent("ticket_click", {
                          placement: "gojet_cast_voice",
                          item: "配信チケット申込"
                        })
                      }
                      className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
                    >
                      <Ticket className="h-4 w-4" aria-hidden="true" />
                      配信チケット申込
                    </a>
                    <p className="text-xs font-semibold leading-5 text-ink/60">
                      当日券あり
                      <br />
                      物販：オリジナルフライヤー（ステッカー付き）・ブロマイド
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
