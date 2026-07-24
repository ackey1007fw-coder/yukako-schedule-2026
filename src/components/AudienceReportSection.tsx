import { ArrowUpRight } from "lucide-react";
import { audienceReports } from "../data/audienceReports";
import { getResponsiveImageProps } from "../lib/responsiveImage";

export function AudienceReportSection() {
  const entries = audienceReports.filter((entry) => entry.published);

  if (entries.length === 0) return null;

  return (
    <section
      id="audience-reports"
      aria-labelledby="audience-reports-title"
      className="scroll-mt-24 bg-gradient-to-br from-porcelain via-white to-blush/20 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
          <span className="border border-champagne/45 bg-porcelain px-2.5 py-1">#ゆかJET</span>
          <span className="border border-rosefog/35 bg-rosefog/10 px-2.5 py-1 text-rosefog">観劇レポート</span>
        </p>
        <h2
          id="audience-reports-title"
          className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl"
        >
          ご来場、ありがとうございます
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
          観劇に来てくれたお客さんの投稿に、優花子さんがInstagramストーリーズで返したコメントです。
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="yukako-card min-w-0 overflow-hidden border-rosefog/25 bg-white shadow-paper"
            >
              <figure className="m-0">
                <img
                  {...getResponsiveImageProps(
                    entry.image.src,
                    "(min-width: 640px) 480px, 100vw",
                  )}
                  alt={entry.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain"
                />
                <figcaption className="border-t border-champagne/20 bg-porcelain px-3 py-2 text-xs font-bold text-champagneInk">
                  Photo:{" "}
                  <a
                    href={entry.posterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-rosefog"
                  >
                    {entry.posterHandle}
                  </a>
                </figcaption>
              </figure>
              <div className="p-5">
                <blockquote className="space-y-1 border-l-2 border-rosefog/60 bg-rosefog/5 px-4 py-3 text-sm font-semibold leading-7 text-ink/85">
                  {entry.yukakoComment.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </blockquote>
                <p className="mt-3 text-xs font-bold text-ink/45">{entry.dateLabel}・優花子さんのコメント</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7">
          <a href="#next" className="yukako-button yukako-button-soft min-h-12 px-5 py-3 text-sm">
            <ArrowUpRight className="h-4 w-4 text-champagneInk" aria-hidden="true" />
            #ゆかJET の公演情報を見る
          </a>
        </div>
      </div>
    </section>
  );
}
