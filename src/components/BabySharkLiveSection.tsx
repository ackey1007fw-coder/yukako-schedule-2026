import { ArrowRight, Waves } from "lucide-react";
import { babySharkLive } from "../data/babySharkLive";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { ActHeader } from "./ActHeader";

const work = babySharkLive;

export function BabySharkLiveSection() {
  return (
    <section id="baby-shark-live" className="scroll-mt-24 bg-[#f3f8fb] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActHeader
          act={4}
          eyebrow="Featured Stage"
          title="代表出演作品"
          copy="全国で公演が続くファミリーミュージカルと、優花子さんの出演記録を分けてまとめています。"
        />

        <a
          href={work.path}
          className="group yukako-card yukako-card-interactive relative grid overflow-hidden border-rosefog/15 bg-white shadow-paper transition hover:border-champagne/50 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="relative overflow-hidden bg-[#dceef5]">
            <img
              {...getResponsiveImageProps(work.heroImage, "(min-width: 1024px) 46vw, 100vw")}
              alt={work.heroAlt}
              loading="lazy"
              decoding="async"
              className="block h-auto max-h-[360px] w-full object-contain object-center sm:max-h-[420px] lg:max-h-none lg:h-full lg:min-h-[320px] lg:object-cover"
              style={{ objectPosition: work.heroObjectPosition }}
            />
          </div>

          <div className="flex min-w-0 flex-col justify-between gap-6 p-5 sm:p-7">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 border border-[#7aa8c4]/45 bg-[#eef7fb] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#2f5f78]">
                  <Waves className="h-3.5 w-3.5" aria-hidden="true" />
                  {work.label}
                </span>
                <span className="border border-champagne/40 bg-porcelain px-2.5 py-1 text-[11px] font-bold text-champagneInk">
                  {work.workStatus}
                </span>
              </div>

              <h3 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                {work.title}
              </h3>
              <p className="mt-1 font-display text-lg text-[#2f5f78] sm:text-xl">{work.subtitle}</p>
              <p className="mt-1 text-sm font-bold text-ink/55">{work.titleJa}</p>

              <p className="mt-4 text-sm font-bold text-ink/80">
                役：ヤドカリのヘッティー／海賊のパール
              </p>
              <p className="mt-3 text-sm leading-7 text-ink/70">{work.cardSummary}</p>
              <p className="mt-3 text-xs leading-6 text-ink/55">{work.appearanceNote}</p>
            </div>

            <span className="inline-flex min-h-12 w-fit items-center gap-2 border border-rosefog/35 bg-porcelain px-4 py-3 text-sm font-bold text-ink transition group-hover:border-champagne group-hover:bg-white">
              出演の記録を見る
              <ArrowRight
                className="h-4 w-4 text-champagne transition group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
