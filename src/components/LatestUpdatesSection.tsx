import { useState } from "react";
import { ArrowDownRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { siteUpdates, sourceLinkLabel } from "../data/siteUpdates";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

const FEATURED_COUNT = 3;

// トップページ上部の「最新情報」。散らばった更新を新しい順に集約して見せる。
// 先頭3件をカードで、それ以降は「すべて見る」トグルの一覧で表示する（ルーターがないためページは増やさない）。
export function LatestUpdatesSection() {
  const [showAll, setShowAll] = useState(false);
  const featured = siteUpdates.slice(0, FEATURED_COUNT);
  const rest = siteUpdates.slice(FEATURED_COUNT);

  return (
    <section id="updates" className="scroll-mt-24 bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Latest Updates"
          title="最新情報"
          copy="優花子さんのSNS投稿や#ゆかJETの稽古場だよりを、新しい順にまとめています。"
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {featured.map((update, index) => (
            <article
              key={update.id}
              className="yukako-card flex flex-col overflow-hidden border-rosefog/15 bg-porcelain"
            >
              {update.image && (
                <a
                  href={update.anchor ?? update.sourceUrl}
                  target={update.anchor ? undefined : "_blank"}
                  rel={update.anchor ? undefined : "noopener noreferrer"}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="block overflow-hidden border-b border-rosefog/15 bg-white"
                >
                  <img
                    {...getResponsiveImageProps(
                      update.image.src,
                      "(min-width: 640px) 33vw, 100vw",
                    )}
                    alt={update.image.alt}
                    loading="lazy"
                    decoding="async"
                    className={
                      update.imageLayout === "portrait-preview"
                        ? "block aspect-[4/3] w-full object-cover object-top"
                        : "block h-auto w-full sm:aspect-[4/3] sm:object-cover sm:object-top"
                    }
                  />
                </a>
              )}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-champagneInk">
                  {index === 0 && (
                    <span className="border border-rosefog/40 bg-[#fff1f6] px-2 py-0.5 text-[#8d4260]">
                      New
                    </span>
                  )}
                  <span className="border border-champagne/45 bg-white px-2 py-0.5">
                    {update.category}
                  </span>
                  <span className="text-ink/45">{update.date}</span>
                </p>
                <h3 className="mt-2.5 text-base font-black leading-snug text-ink">
                  {update.title}
                </h3>
                {update.summary && (
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/68">
                    {update.summary}
                  </p>
                )}
                <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm font-bold">
                  {update.anchor && (
                    <a
                      href={update.anchor}
                      className="inline-flex items-center gap-1 text-champagneInk underline underline-offset-4 transition hover:text-rosefog"
                    >
                      <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                      詳しく見る
                    </a>
                  )}
                  {update.sourceUrl && (
                    <a
                      href={update.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-ink/60 underline underline-offset-4 transition hover:text-rosefog"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      {sourceLinkLabel(update.sourceUrl)}
                    </a>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                aria-expanded={showAll}
                aria-controls="all-updates-list"
                className="yukako-button yukako-button-soft min-h-12 px-5 py-3 text-sm"
              >
                {showAll ? (
                  <ChevronUp className="h-4 w-4 text-champagneInk" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-champagneInk" aria-hidden="true" />
                )}
                {showAll
                  ? "一覧を閉じる"
                  : `過去の更新をすべて見る（残り${rest.length}件）`}
              </button>
            </div>
            {showAll && (
              <ol
                id="all-updates-list"
                className="mt-6 divide-y divide-rosefog/12 border border-rosefog/15 bg-porcelain"
              >
                {rest.map((update) => (
                  <li key={update.id} className="p-4 sm:px-5">
                    <p className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-champagneInk">
                      <span className="border border-champagne/45 bg-white px-2 py-0.5">
                        {update.category}
                      </span>
                      <span className="text-ink/45">{update.date}</span>
                    </p>
                    <p className="mt-1.5 text-sm font-bold leading-snug text-ink">
                      {update.title}
                    </p>
                    <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold">
                      {update.anchor && (
                        <a
                          href={update.anchor}
                          className="inline-flex items-center gap-1 text-champagneInk underline underline-offset-4 transition hover:text-rosefog"
                        >
                          <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                          詳しく見る
                        </a>
                      )}
                      {update.sourceUrl && (
                        <a
                          href={update.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-ink/60 underline underline-offset-4 transition hover:text-rosefog"
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          {sourceLinkLabel(update.sourceUrl)}
                        </a>
                      )}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}
      </div>
    </section>
  );
}
