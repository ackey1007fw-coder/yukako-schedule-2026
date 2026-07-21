import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { Footer } from "../components/Footer";
import { ArchiveMasthead } from "../components/ArchiveMasthead";
import { ArchivePhotoFrame } from "../components/ArchivePhotoFrame";
import { ScrollToTop } from "../components/ScrollToTop";
import { sortedArchiveItems } from "../data/archive";
import { useSchedule } from "../lib/useSchedule";

const LIST_TITLE = "YUKAKO STORY ARCHIVE｜活動の軌跡 | 吉井優花子 応援ポータル";

export function ArchiveListPage() {
  const { schedule } = useSchedule();
  const categories = [...new Set(sortedArchiveItems.map((item) => item.category))];

  useEffect(() => {
    document.title = LIST_TITLE;
  }, []);

  return (
    <div className="min-h-screen bg-porcelain text-ink">
      <SiteHeader socialLinks={schedule.socialLinks} />
      <main>
        <section className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="パンくずリスト" className="mb-8 text-xs font-bold text-ink/50">
              <a href="/" className="hover:text-champagneInk">
                ホーム
              </a>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span className="text-ink/70">YUKAKO STORY ARCHIVE</span>
            </nav>

            <ArchiveMasthead
              title="活動の軌跡"
              copy="舞台、映像、モデル、ミスコン、配信。吉井優花子さんが重ねてきた挑戦を、SNS投稿とともに振り返る活動アーカイブです。"
            />

            {categories.length > 1 && (
              <ul className="mb-8 flex flex-wrap gap-2" aria-label="カテゴリー一覧">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="border border-champagne/45 bg-white px-3 py-1.5 text-xs font-bold text-champagneInk"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedArchiveItems.map((item) => (
                <a
                  key={item.slug}
                  href={`/archive/${item.slug}`}
                  className={`yukako-card yukako-card-interactive group block overflow-hidden border-rosefog/20 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
                    item.featured ? "sm:col-span-2 sm:grid sm:grid-cols-2" : ""
                  }`}
                >
                  <ArchivePhotoFrame
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    sizes={
                      item.featured
                        ? "(min-width: 640px) 50vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                  />
                  <div className="flex flex-col justify-center p-6">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-champagneInk">
                      {item.featured && (
                        <span className="border border-champagne bg-champagne/15 px-2 py-1 text-[#8f6826]">
                          Featured
                        </span>
                      )}
                      <span className="border border-champagne/45 bg-porcelain px-2 py-1">
                        {item.category}
                      </span>
                      {item.attributionLabel && (
                        <span className="border border-rosefog/45 bg-rosefog/10 px-2 py-1 text-rosefog">
                          {item.attributionLabel}
                        </span>
                      )}
                      <span className="text-ink/45">{item.platform}</span>
                      <span className="text-ink/45">{item.date}</span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl leading-tight text-ink">
                      {item.shortTitle}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-ink/70">
                      {item.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-rosefog">
                      詳細を見る
                      <ArrowUpRight
                        className="h-4 w-4 text-champagne transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
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
