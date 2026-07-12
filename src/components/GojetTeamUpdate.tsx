import { ExternalLink, PlayCircle, Ticket, Users } from "lucide-react";
import type { GojetTeamUpdate as GojetTeamUpdateData } from "../data/gojetPromo";
import { getResponsiveImageProps } from "../lib/responsiveImage";

type GojetTeamUpdateProps = {
  update: GojetTeamUpdateData;
};

export function GojetTeamUpdate({ update }: GojetTeamUpdateProps) {
  const titleId = `gojet-${update.team.toLowerCase()}-team-title`;

  return (
    <section aria-labelledby={titleId} className="bg-ink pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="border border-champagne/35 bg-white/[0.07] p-6 shadow-paper sm:p-8 lg:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">
                New ・ {update.date} ・ {update.label}
              </p>
              <h3
                id={titleId}
                className="mt-2 font-display text-3xl leading-tight text-white sm:text-4xl"
              >
                {update.title}
              </h3>
            </div>
            <span className="inline-flex w-fit items-center gap-2 border border-champagne/40 bg-champagne/10 px-3 py-2 text-xs font-black text-champagne">
              <Users className="h-4 w-4" aria-hidden="true" />
              #ゆかJET
            </span>
          </div>

          <div className="mt-5 max-w-4xl border-l-2 border-champagne/60 bg-black/20 px-4 py-3 text-sm font-semibold leading-7 text-white/85 sm:text-base sm:leading-8">
            {update.quote}
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            {update.body}
          </p>

          <div className={`mt-6 grid gap-4 ${update.photo ? "sm:grid-cols-2" : ""}`}>
            {update.photo && (
              <div className="overflow-hidden border border-white/12 bg-black shadow-paper">
                <img
                  {...getResponsiveImageProps(
                    update.photo.src,
                    "(min-width: 640px) 45vw, 100vw",
                  )}
                  alt={update.photo.alt}
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
                poster={update.video.poster}
                aria-label={update.video.label}
                className="block h-full max-h-[420px] w-full object-contain"
              >
                <source src={update.video.src} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={update.yukakoPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-button yukako-button-gold min-h-12 px-4 py-3 text-sm"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              優花子のポストを見る
            </a>
            {update.originalPostUrl && (
              <a
                href={update.originalPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
              >
                <ExternalLink className="h-4 w-4 text-champagne" aria-hidden="true" />
                {update.team}班紹介を見る
              </a>
            )}
            <a
              href={update.homepageUrl}
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
