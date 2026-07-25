import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { workCredits } from "../data/workCredits";
import type { WorkCreditEntry } from "../data/workCredits";
import {
  deriveWorkCreditStatus,
  formatWorkCreditDate,
  workCreditCategoryLabel,
  workCreditSectionFor
} from "../lib/workCredits";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { InstagramReelEmbed } from "./InstagramReelEmbed";
import { ActHeader } from "./ActHeader";

// Instagram公式embed.jsは画面外のカードでも読み込まれるとページ全体のパフォーマンスを落とすため、
// 実際にビューポート付近へ入ってから初めてマウントする。
function LazyInstagramEmbed({ url, label }: { url: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "200px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldLoad ? (
        <InstagramReelEmbed url={url} label={label} />
      ) : (
        <div
          style={{ aspectRatio: "9 / 16" }}
          className="mx-auto flex w-full max-w-[420px] items-center justify-center border border-champagne/25 bg-porcelain text-xs font-bold text-ink/40"
        >
          読み込み中…
        </div>
      )}
    </div>
  );
}

function WorkCreditCard({ entry }: { entry: WorkCreditEntry }) {
  const status = deriveWorkCreditStatus(entry);

  return (
    <article className="yukako-card flex min-w-0 flex-col overflow-hidden border-rosefog/20 bg-white shadow-paper">
      <div className="flex flex-wrap items-center gap-2 border-b border-champagne/20 bg-porcelain px-4 py-3">
        {entry.isPr && (
          <span className="border border-rosefog bg-rosefog px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-white">
            PR
          </span>
        )}
        {!(entry.isPr && entry.category === "pr") && (
          <span className="border border-champagne/45 bg-white px-2.5 py-1 text-[11px] font-bold text-champagneInk">
            {workCreditCategoryLabel(entry.category)}
          </span>
        )}
        {status === "ended" && (
          <span className="border border-ink/25 bg-ink/8 px-2.5 py-1 text-[11px] font-bold text-ink/55">
            終了しました
          </span>
        )}
        <span className="ml-auto text-[11px] font-bold text-ink/45">
          {formatWorkCreditDate(entry.date)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-xl leading-tight text-ink">{entry.title}</h3>

        {entry.eventPeriod?.label && (
          <p className="mt-2 text-xs font-bold text-ink/55">{entry.eventPeriod.label}</p>
        )}

        <p className="mt-3 text-sm leading-7 text-ink/72">{entry.summary}</p>

        {entry.embedType === "instagram" && (
          <div className="mt-4">
            <LazyInstagramEmbed url={entry.sourceUrl} label={entry.title} />
          </div>
        )}

        {entry.embedType === "thumbnail" && entry.thumbnail && (
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={entry.alt ?? entry.title}
            className="mt-4 block overflow-hidden border border-champagne/25 bg-porcelain"
          >
            <img
              {...getResponsiveImageProps(entry.thumbnail, "(min-width: 1024px) 33vw, 100vw")}
              alt={entry.alt ?? entry.title}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain"
            />
          </a>
        )}

        {entry.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 border border-rosefog/35 bg-porcelain px-3 py-1.5 text-xs font-bold text-ink transition hover:border-champagne hover:bg-white"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

type WorkCreditGroupProps = {
  id: string;
  act: number;
  eyebrow: string;
  title: string;
  copy: string;
  entries: WorkCreditEntry[];
};

// お仕事実績・活動レポートは、同じデータ構造とカードを使い回し、
// category による振り分け先（work / report）だけが異なるセクション。
function WorkCreditGroup({ id, act, eyebrow, title, copy, entries }: WorkCreditGroupProps): ReactNode {
  if (entries.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-32 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ActHeader act={act} eyebrow={eyebrow} title={title} copy={copy} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <WorkCreditCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkCreditsSection() {
  const publishedEntries = [...workCredits]
    .filter((entry) => entry.published)
    .sort((a, b) => b.date.localeCompare(a.date));

  const workEntries = publishedEntries.filter(
    (entry) => workCreditSectionFor(entry.category) === "work",
  );
  const reportEntries = publishedEntries.filter(
    (entry) => workCreditSectionFor(entry.category) === "report",
  );

  if (workEntries.length === 0 && reportEntries.length === 0) return null;

  return (
    <>
      <WorkCreditGroup
        id="work-credits"
        act={9}
        eyebrow="Work Credits"
        title="お仕事実績"
        copy="PR案件・出演・メディア掲載などのお仕事を、新しい順にまとめています。"
        entries={workEntries}
      />
      <WorkCreditGroup
        id="activity-reports"
        act={10}
        eyebrow="Activity Reports"
        title="活動レポート"
        copy="日々の活動から、Instagramなどで公開されている投稿をまとめています。"
        entries={reportEntries}
      />
    </>
  );
}
