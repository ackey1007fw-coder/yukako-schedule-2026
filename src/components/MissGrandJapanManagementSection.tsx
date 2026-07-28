import { ArrowUpRight, Clapperboard, Music, ShieldCheck } from "lucide-react";
import {
  missGrandJapanManagement,
  missGrandJapanSeries
} from "../data/missGrandJapanManagement";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { trackPortalEvent } from "../lib/analytics";
import { ActHeader } from "./ActHeader";
import { LazyInstagramEmbed } from "./LazyInstagramEmbed";

function MissGrandJapanSeriesBlock() {
  const series = missGrandJapanSeries;
  if (series.reels.length === 0) return null;

  return (
    <div id="miss-grand-japan-series" className="mt-14 scroll-mt-32 sm:mt-20">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-champagne/30 pt-10">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
          {series.eyebrow}
        </p>
        <h3 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
          {series.title}
        </h3>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/70 sm:text-base sm:leading-8">
        {series.copy}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {series.reels.map((reel) => (
          <article
            key={reel.id}
            className="yukako-card flex min-w-0 flex-col overflow-hidden border-champagne/35 bg-white shadow-paper"
          >
            <div className="flex flex-wrap items-center gap-2 border-b border-champagne/20 bg-porcelain px-4 py-3">
              <span className="inline-flex items-center gap-1 border border-champagne/45 bg-white px-2.5 py-1 text-[11px] font-bold text-champagneInk">
                <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" />
                リール
              </span>
              <span className="ml-auto text-[11px] font-bold text-ink/45">{reel.dateLabel}</span>
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h4 className="font-display text-xl leading-tight text-ink">{reel.title}</h4>

              {reel.postedBy && (
                <p className="mt-2 text-xs font-bold text-ink/55">
                  投稿{" "}
                  <a
                    href={reel.postedBy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-champagneInk underline underline-offset-2 hover:text-rosefog"
                  >
                    {reel.postedBy.handle}
                  </a>
                  {reel.postedBy.note && <span className="ml-1">（{reel.postedBy.note}）</span>}
                </p>
              )}

              {reel.note && <p className="mt-3 text-sm leading-7 text-ink/70">{reel.note}</p>}

              {reel.bgm && (
                <p className="mt-2 inline-flex items-center gap-1.5 self-start text-xs font-bold text-ink/55">
                  <Music className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
                  {reel.bgm}
                </p>
              )}

              <div className="mt-4">
                <LazyInstagramEmbed url={reel.url} label={reel.title} />
              </div>

              <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-xs font-bold text-champagneInk">
                {reel.hashtags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </p>

              <a
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("sns_click", {
                    placement: "miss_grand_japan_series",
                    item: reel.id
                  })
                }
                className="mt-4 inline-flex items-center gap-1 self-start border border-rosefog/35 bg-porcelain px-3 py-1.5 text-xs font-bold text-ink transition hover:border-champagne hover:bg-white"
              >
                Instagramでリールを見る
                <ArrowUpRight className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function MissGrandJapanManagementSection() {
  const data = missGrandJapanManagement;

  return (
    <section
      id="miss-grand-japan-management"
      aria-labelledby="miss-grand-japan-management-title"
      className="scroll-mt-32 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <ActHeader
              act={8}
              eyebrow={data.eyebrow}
              title={data.title}
              copy="2026年度より、大会運営全体のマネジメントを担う新たな役割です。"
              tone="light"
            />

            <div className="yukako-card overflow-hidden border-champagne/35 bg-porcelain shadow-paper">
              <img
                {...getResponsiveImageProps(
                  data.images.main.src,
                  "(min-width: 1024px) 40vw, 100vw",
                )}
                alt={data.images.main.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-contain"
              />
              <img
                {...getResponsiveImageProps(
                  data.images.sub.src,
                  "(min-width: 1024px) 40vw, 100vw",
                )}
                alt={data.images.sub.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full border-t border-champagne/25 object-contain"
              />
              <p className="border-t border-champagne/25 bg-white px-4 py-2.5 text-[11px] font-bold text-ink/45">
                Photo by {data.photoCredit}
              </p>
            </div>
          </div>

          <div className="yukako-card border-champagne/35 bg-white p-6 shadow-paper sm:p-8">
            <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
              <span className="border border-champagne bg-champagne/15 px-2.5 py-1 text-[#8f6826]">
                {data.badge}
              </span>
              <span className="border border-champagne/40 bg-porcelain px-2.5 py-1">
                運営・マネジメント
              </span>
              <span className="text-ink/45">{data.dateLabel} 発表</span>
            </p>

            <h3
              id="miss-grand-japan-management-title"
              className="mt-4 font-display text-2xl leading-tight text-ink sm:text-3xl"
            >
              {data.subtitle}
            </h3>

            <div className="mt-5 space-y-4 text-sm leading-7 text-ink/70 sm:text-base sm:leading-8">
              {data.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="mt-6 border-l-2 border-champagne/70 bg-porcelain px-5 py-4 text-sm font-semibold leading-8 text-ink/85 sm:text-base">
              <p>
                「{data.quote[0]}
                <br />
                {data.quote[1]}」
              </p>
            </blockquote>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={data.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("sns_click", {
                    placement: "miss_grand_japan_management",
                    item: data.ctaLabel
                  })
                }
                className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {data.ctaLabel}
              </a>
              <a
                href="#highlights"
                className="yukako-button yukako-button-soft min-h-12 px-5 py-3 text-sm"
              >
                <ArrowUpRight className="h-4 w-4 text-champagneInk" aria-hidden="true" />
                これまでの歩みを見る
              </a>
            </div>
          </div>
        </div>

        <MissGrandJapanSeriesBlock />
      </div>
    </section>
  );
}
