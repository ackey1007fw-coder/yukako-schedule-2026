import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { highlights } from "../data/highlights";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { ActHeader } from "./ActHeader";

const sortedHighlights = [...highlights].sort((a, b) =>
  a.year === b.year ? 0 : Number(b.year) - Number(a.year),
);

const years = [...new Set(sortedHighlights.map((item) => item.year))];

const isProduceItem = (title: string, description: string) =>
  title.includes("#ゆかJET") || description.includes("プロデュース");

export function HighlightsSection() {
  const [showPastYears, setShowPastYears] = useState(false);

  if (sortedHighlights.length === 0) {
    return null;
  }

  const visibleYears = showPastYears ? years : years.slice(0, 1);
  const remainingYears = Math.max(years.length - 1, 0);

  return (
    <section id="highlights" className="scroll-mt-32 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ActHeader
          act={3}
          eyebrow="Highlights"
          title="これまでの歩み"
          copy="女優・舞台人・プロデューサーとしての歩みを、年ごとのタイムラインで振り返ります。"
        />

        <div
          id="highlights-timeline"
          className="relative border-l-2 border-champagne/40 pl-7 sm:pl-10"
        >
          {visibleYears.map((year) => {
            const items = sortedHighlights.filter((item) => item.year === year);

            return (
              <div key={year} className="mb-12 last:mb-0">
                <p className="relative mb-6 font-display text-4xl leading-none text-ink sm:text-5xl">
                  <span
                    className="absolute -left-[39px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-champagne bg-porcelain sm:-left-[49px]"
                    aria-hidden="true"
                  />
                  {year}
                </p>

                <div className="space-y-6">
                  {items.map((item) => {
                    const links = item.links ?? (item.link ? [item.link] : []);
                    const images =
                      item.images ??
                      (item.image ? [{ src: item.image, alt: item.title }] : []);
                    const hasImageGallery = images.length > 1;
                    const isProduce = isProduceItem(item.title, item.description);

                    return (
                      <article key={item.id} className="relative">
                        <span
                          className="absolute -left-[34px] top-2 h-2 w-2 rounded-full bg-rosefog sm:-left-[44px]"
                          aria-hidden="true"
                        />
                        <div
                          className={`yukako-card yukako-card-interactive flex flex-col gap-4 border-rosefog/20 bg-white p-5 ${
                            hasImageGallery ? "" : "sm:flex-row"
                          }`}
                        >
                          {images.length > 0 && (
                            <div
                              className={
                                hasImageGallery
                                  ? "grid w-full gap-3 sm:grid-cols-2"
                                  : "flex w-full shrink-0 items-center justify-center border border-champagne/30 bg-porcelain sm:w-32"
                              }
                            >
                              {images.map((image) => (
                                <figure
                                  key={image.src}
                                  className={
                                    hasImageGallery
                                      ? "overflow-hidden border border-champagne/30 bg-porcelain"
                                      : "contents"
                                  }
                                >
                                  <img
                                    {...getResponsiveImageProps(
                                      image.src,
                                      hasImageGallery
                                        ? "(min-width: 640px) 40vw, 100vw"
                                        : "(min-width: 640px) 160px, 100vw",
                                    )}
                                    alt={image.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="block h-auto max-h-none w-full object-contain"
                                  />
                                </figure>
                              ))}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="flex flex-wrap items-center gap-2 text-xs font-bold text-champagneInk">
                              <span className="border border-champagne/40 bg-porcelain px-2 py-0.5">
                                {item.date}
                              </span>
                              <span>{item.category}</span>
                              {isProduce && (
                                <span className="border border-rosefog/40 bg-[#fff1f6] px-2 py-0.5 text-[#8d4260]">
                                  プロデュース
                                </span>
                              )}
                              {item.badge && (
                                <span className="border border-champagne bg-champagne/15 px-2 py-0.5 text-[#8f6826]">
                                  {item.badge}
                                </span>
                              )}
                            </p>
                            <h3 className="mt-2 font-display text-2xl leading-tight text-ink">
                              {item.title}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-ink/70">
                              {item.description}
                            </p>

                            {links.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {links.map((link) => {
                                  const isInternal = link.url.startsWith("/");
                                  return (
                                    <a
                                      key={link.url}
                                      href={link.url}
                                      {...(isInternal
                                        ? {}
                                        : { target: "_blank", rel: "noopener noreferrer" })}
                                      className={`inline-flex items-center gap-1 border px-3 py-1.5 text-xs font-bold transition ${
                                        isInternal
                                          ? "border-champagne bg-champagne/15 text-[#8f6826] hover:bg-champagne/25"
                                          : "border-rosefog/40 bg-porcelain text-ink hover:border-champagne hover:bg-white"
                                      }`}
                                    >
                                      {link.label}
                                      <ArrowUpRight className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
                                    </a>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {remainingYears > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowPastYears((current) => !current)}
              className="yukako-button min-h-12 border border-rosefog/35 bg-white px-5 py-3 text-sm font-black text-ink transition hover:border-champagne"
              aria-expanded={showPastYears}
              aria-controls="highlights-timeline"
            >
              {showPastYears ? (
                <ChevronUp className="h-4 w-4 text-champagne" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4 text-champagne" aria-hidden="true" />
              )}
              {showPastYears
                ? "最新年だけ表示"
                : `過去の年を見る（残り${remainingYears}年）`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
