import { ArrowUpRight, Sparkles, Trophy } from "lucide-react";
import { highlights } from "../data/highlights";
import { SectionHeader } from "./SectionHeader";

// 年の降順 → 同年内は配列の並び順を維持
const sortedHighlights = [...highlights].sort((a, b) =>
  a.year === b.year ? 0 : Number(b.year) - Number(a.year),
);

export function HighlightsSection() {
  if (sortedHighlights.length === 0) {
    return null;
  }

  return (
    <section id="highlights" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Highlights"
          title="これまでの歩み"
          copy="2025年やそれ以前の出演・受賞・メディア掲載など、これまでの活動をまとめています。"
        />

        <div className="grid gap-3 md:grid-cols-2">
          {sortedHighlights.map((item) => {
            const body = (
              <>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="mb-4 block w-full border border-white"
                  />
                )}
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-champagne/50 bg-porcelain text-champagne">
                    {item.category === "受賞" ? (
                      <Trophy className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Sparkles className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-xs font-bold text-champagne">
                      <span className="border border-champagne/40 bg-porcelain px-2 py-0.5">
                        {item.date}
                      </span>
                      <span>{item.category}</span>
                    </p>
                    <h3 className="mt-2 flex items-center gap-2 font-display text-2xl leading-tight text-ink">
                      {item.title}
                      {item.link && (
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-champagne"
                          aria-hidden="true"
                        />
                      )}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-ink/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </>
            );

            const className =
              "flex min-h-36 flex-col border border-champagne/40 bg-white p-5 transition";

            return item.link ? (
              <a
                key={item.id}
                href={item.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${className} hover:-translate-y-1 hover:shadow-paper`}
              >
                {body}
              </a>
            ) : (
              <div key={item.id} className={className}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
