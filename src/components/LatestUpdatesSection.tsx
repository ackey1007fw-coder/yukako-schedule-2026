import { useMemo, useState } from "react";
import { ArrowDownRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import {
  siteUpdates,
  sourceLinkLabel,
  updateTimestamp,
  type SiteUpdate
} from "../data/siteUpdates";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

const FEATURED_COUNT = 3;
const ALL_CATEGORIES = "すべて";
// 最新の更新から何日前までをカードの候補にするか。
// これを超えて古いものは、カテゴリが空いていても繰り上げない。
const FEATURED_MAX_AGE_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;

const detailAnchorOf = (update: SiteUpdate) => update.detailAnchor ?? update.anchor;

// カードは1カテゴリ1枚まで。公演期間中は #ゆかJET が上位を占め、3枚とも同じ話題に
// なっていた。すぐ下に #ゆかJET の特集があるので、ここは横断で見せる。
// ただし他カテゴリの更新が止まっていると、3週間前の投稿がカードに残り続けてしまう。
// 最新から FEATURED_MAX_AGE_DAYS 以上離れた候補は繰り上げず、新しい順で埋める。
function pickFeatured(updates: SiteUpdate[], count: number) {
  const picked: SiteUpdate[] = [];
  const usedCategories = new Set<string>();
  const newest = updates[0] ? updateTimestamp(updates[0].date) : undefined;
  const isFresh = (update: SiteUpdate) => {
    if (newest === undefined) return true;
    const timestamp = updateTimestamp(update.date);
    if (timestamp === undefined) return true;
    return newest - timestamp <= FEATURED_MAX_AGE_DAYS * DAY_MS;
  };

  for (const update of updates) {
    if (picked.length >= count) break;
    if (usedCategories.has(update.category)) continue;
    if (!isFresh(update)) continue;
    picked.push(update);
    usedCategories.add(update.category);
  }
  // カテゴリ数が枠に足りないときは、新しい順で埋める。
  for (const update of updates) {
    if (picked.length >= count) break;
    if (!picked.includes(update)) picked.push(update);
  }
  return picked;
}

// トップページ上部の「最新情報」。散らばった更新を新しい順に集約して見せる。
// 先頭3件をカードで、それ以降は「すべて見る」トグルの一覧で表示する（ルーターがないためページは増やさない）。
export function LatestUpdatesSection() {
  const [showAll, setShowAll] = useState(false);
  const [category, setCategory] = useState(ALL_CATEGORIES);

  const featured = useMemo(() => pickFeatured(siteUpdates, FEATURED_COUNT), []);
  const rest = useMemo(() => {
    const featuredIds = new Set(featured.map((update) => update.id));
    return siteUpdates.filter((update) => !featuredIds.has(update.id));
  }, [featured]);
  const categories = useMemo(
    () => [ALL_CATEGORIES, ...new Set(rest.map((update) => update.category))],
    [rest],
  );
  const filteredRest =
    category === ALL_CATEGORIES
      ? rest
      : rest.filter((update) => update.category === category);

  return (
    <section id="updates" className="scroll-mt-32 bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Latest Updates"
          title="最新情報"
          copy="SNS投稿・写真・お知らせを新しい順に。これからの出演はすぐ下のスケジュールへ。#ゆかJET の記録は特集にまとめています。"
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {featured.map((update, index) => {
            const related = update.relatedId
              ? siteUpdates.find((item) => item.id === update.relatedId)
              : undefined;
            const detailAnchor = detailAnchorOf(update);

            return (
            <article
              key={update.id}
              className="yukako-card flex flex-col overflow-hidden border-rosefog/15 bg-porcelain"
            >
              {update.image && (
                <a
                  href={detailAnchor ?? update.sourceUrl}
                  target={detailAnchor ? undefined : "_blank"}
                  rel={detailAnchor ? undefined : "noopener noreferrer"}
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
                        : update.imageLayout === "contain"
                          ? "block h-auto w-full sm:aspect-[4/3] sm:bg-ink sm:object-contain"
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
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/70">
                    {update.summary}
                  </p>
                )}
                {related?.sourceUrl && (
                  <a
                    href={related.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex min-w-0 items-center gap-2.5 border border-rosefog/15 bg-white px-2 py-1.5"
                  >
                    {related.image && (
                      <img
                        {...getResponsiveImageProps(related.image.src, "48px")}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-11 w-11 shrink-0 bg-ink/5 object-contain"
                      />
                    )}
                    <span className="min-w-0">
                      <span className="block text-[10px] font-black tracking-[0.08em] text-champagneInk">
                        話題のはじまり
                        <span className="ml-1.5 font-bold tracking-normal text-ink/45">
                          {related.date}
                        </span>
                      </span>
                      <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-bold text-ink/65 underline underline-offset-4">
                        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                        元投稿をXで見る
                      </span>
                    </span>
                  </a>
                )}
                <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm font-bold">
                  {detailAnchor && (
                    <a
                      href={detailAnchor}
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
            );
          })}
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
              <>
                {/* #ゆかJET だけで50件を超えるため、絞り込みがないと他の更新が埋もれる */}
                <div
                  role="group"
                  aria-label="カテゴリで絞り込む"
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {categories.map((item) => {
                    const isActive = item === category;
                    const count =
                      item === ALL_CATEGORIES
                        ? rest.length
                        : rest.filter((update) => update.category === item).length;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCategory(item)}
                        aria-pressed={isActive}
                        className={`inline-flex min-h-11 items-center gap-1.5 border px-3.5 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
                          isActive
                            ? "border-champagne bg-champagne text-ink"
                            : "border-champagne/40 bg-white text-champagneInk hover:border-champagne hover:bg-porcelain"
                        }`}
                      >
                        {item}
                        <span className={isActive ? "text-ink/60" : "text-ink/45"}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <ol
                  id="all-updates-list"
                  className="mt-4 divide-y divide-rosefog/10 border border-rosefog/15 bg-porcelain"
                >
                  {filteredRest.map((update) => {
                    const detailAnchor = detailAnchorOf(update);
                    return (
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
                      {detailAnchor && (
                        <a
                          href={detailAnchor}
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
                    );
                  })}
                </ol>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}