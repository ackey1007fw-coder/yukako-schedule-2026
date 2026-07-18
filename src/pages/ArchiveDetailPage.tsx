import { useEffect } from "react";
import { ArrowLeft, ExternalLink, Trophy } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { Footer } from "../components/Footer";
import { ArchivePhotoFrame } from "../components/ArchivePhotoFrame";
import { ArchiveVideoBlock } from "../components/ArchiveVideoBlock";
import { ScrollToTop } from "../components/ScrollToTop";
import { getArchiveItemBySlug } from "../data/archive";
import { useSchedule } from "../lib/useSchedule";

type ArchiveDetailPageProps = {
  slug: string;
};

export function ArchiveDetailPage({ slug }: ArchiveDetailPageProps) {
  const { schedule } = useSchedule();
  const item = getArchiveItemBySlug(slug);

  useEffect(() => {
    if (item) {
      document.title = item.seoTitle;
    }
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen bg-porcelain text-ink">
        <SiteHeader socialLinks={schedule.socialLinks} />
        <main>
          <section className="scroll-mt-24 bg-porcelain py-24">
            <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
              <h1 className="font-display text-3xl text-ink">記事が見つかりませんでした</h1>
              <p className="mt-4 leading-8 text-ink/70">
                お探しのページは移動または削除された可能性があります。
              </p>
              <a
                href="/archive"
                className="yukako-button yukako-button-gold mt-8 inline-flex min-h-12 px-5 py-3 text-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                YUKAKO STORY ARCHIVE へ戻る
              </a>
            </div>
          </section>
        </main>
        <Footer
          socialLinks={schedule.socialLinks}
          source={schedule.source}
          updatedAt={schedule.updatedAt}
        />
      </div>
    );
  }

  const leadQuotes = item.quotes.filter((quote) => quote.afterSectionIndex === undefined);

  return (
    <div className="min-h-screen bg-porcelain text-ink">
      <SiteHeader socialLinks={schedule.socialLinks} />
      <main>
        <article className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="パンくずリスト" className="mb-8 flex flex-wrap items-center gap-x-2 text-xs font-bold text-ink/50">
              <a href="/" className="hover:text-champagneInk">
                ホーム
              </a>
              <span aria-hidden="true">/</span>
              <a href="/archive" className="hover:text-champagneInk">
                YUKAKO STORY ARCHIVE
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-ink/70">{item.shortTitle}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-champagneInk">
              <span className="border border-champagne/45 bg-white px-2.5 py-1">{item.category}</span>
              <span className="text-ink/45">{item.platform}</span>
              <time dateTime={item.datePublished} className="text-ink/45">
                {item.date}
              </time>
            </div>

            <h1 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              {item.title}
            </h1>

            {item.award && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Trophy className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                {[item.award.event, item.award.title, item.award.yearLabel].map((label) => (
                  <span
                    key={label}
                    className="border border-champagne bg-champagne/15 px-2.5 py-1 text-xs font-bold text-[#8f6826]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-4">
              {item.lead.map((paragraph) => (
                <p key={paragraph} className="font-display text-xl leading-relaxed text-ink/85 sm:text-2xl">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-sm">
              <ArchivePhotoFrame
                src={item.images[0].src}
                alt={item.images[0].alt}
                sizes="(min-width: 640px) 384px, 100vw"
              />
            </div>

            {leadQuotes.map((quote) => (
              <ArchiveQuoteBlock key={quote.text} text={quote.text} />
            ))}

            <div className="mt-2">
              {item.sections.map((section, index) => (
                <div key={section.heading}>
                  <h2 className="mt-10 font-display text-2xl leading-tight text-ink sm:text-3xl">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="mt-4 leading-8 text-ink/75">
                      {paragraph}
                    </p>
                  ))}
                  {item.quotes
                    .filter((quote) => quote.afterSectionIndex === index)
                    .map((quote) => (
                      <ArchiveQuoteBlock key={quote.text} text={quote.text} />
                    ))}
                  {item.video && item.videoAfterSectionIndex === index && (
                    <ArchiveVideoBlock video={item.video} />
                  )}
                </div>
              ))}
            </div>

            {item.video && item.videoAfterSectionIndex === undefined && (
              <ArchiveVideoBlock video={item.video} />
            )}

            <div className="mt-12 border-t border-rosefog/20 pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/45">
                元投稿・関連リンク
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={item.sourceUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
                >
                  {item.sourceUrl.label}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                {item.relatedUrls.map((related) => (
                  <a
                    key={related.url}
                    href={related.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yukako-button min-h-12 border border-champagne bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"
                  >
                    {related.label}
                    <ExternalLink className="h-4 w-4 text-champagne" aria-hidden="true" />
                  </a>
                ))}
              </div>
              {item.credit && (
                <p className="mt-6 text-xs text-ink/45">{item.credit}</p>
              )}
            </div>

            <a
              href="/archive"
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-bold text-ink/60 hover:text-champagneInk"
            >
              <ArrowLeft className="h-4 w-4 text-champagne" aria-hidden="true" />
              YUKAKO STORY ARCHIVE へ戻る
            </a>
          </div>
        </article>
      </main>
      <Footer
        socialLinks={schedule.socialLinks}
        source={schedule.source}
        updatedAt={schedule.updatedAt}
      />
      <ScrollToTop />
    </div>
  );
}

function ArchiveQuoteBlock({ text }: { text: string }) {
  return (
    <blockquote className="my-8 border-l-4 border-champagne bg-white px-6 py-5 shadow-paper">
      <p className="font-display text-xl leading-relaxed text-champagneInk sm:text-2xl">
        「{text}」
      </p>
    </blockquote>
  );
}
