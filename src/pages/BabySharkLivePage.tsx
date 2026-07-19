import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  Fish,
  Sparkles,
  Waves
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { Footer } from "../components/Footer";
import { PhotoLightbox } from "../components/PhotoLightbox";
import { ScrollToTop } from "../components/ScrollToTop";
import { ExternalButton } from "../components/ExternalButton";
import {
  babySharkGalleryImages,
  babySharkLive
} from "../data/babySharkLive";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { useSchedule } from "../lib/useSchedule";

const work = babySharkLive;

export function BabySharkLivePage() {
  const { schedule } = useSchedule();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = work.seoTitle;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content ?? null;
    if (description) {
      description.content = work.seoDescription;
    }

    return () => {
      if (description && previousDescription !== null) {
        description.content = previousDescription;
      }
    };
  }, []);

  const firstUpdate = work.updates[0];

  return (
    <div className="min-h-screen bg-porcelain text-ink">
      <SiteHeader socialLinks={schedule.socialLinks} />
      <main>
        {/* 1. ヒーロー */}
        <section className="relative overflow-hidden bg-[#0b3a52] text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 80% 10%, rgba(194,154,74,0.25), transparent 35%)"
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:px-8 lg:py-20">
            <div>
              <nav
                aria-label="パンくずリスト"
                className="mb-6 flex flex-wrap items-center gap-x-2 text-xs font-bold text-white/60"
              >
                <a href="/" className="hover:text-champagne">
                  ホーム
                </a>
                <span aria-hidden="true">/</span>
                <span className="text-white/80">ベイビーシャークライブ</span>
              </nav>

              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-champagne/50 bg-white/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-champagne">
                  {work.label}
                </span>
                <span className="border border-white/25 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-white/85">
                  {work.workStatus}
                </span>
              </div>

              <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {work.title}
              </h1>
              <p className="mt-2 font-display text-2xl text-champagne sm:text-3xl">{work.subtitle}</p>
              <p className="mt-2 text-sm font-bold text-white/70">{work.titleJa}</p>
              <p className="mt-5 text-sm font-bold text-white/85">
                役：ヤドカリのヘッティー／海賊のパール
              </p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">{work.appearanceNote}</p>
            </div>

            <figure className="mx-auto w-full max-w-md overflow-hidden border border-white/15 bg-[#124a66] shadow-paper lg:max-w-none">
              <img
                {...getResponsiveImageProps(work.heroImage, "(min-width: 1024px) 42vw, 100vw")}
                alt={work.heroAlt}
                className="block h-auto max-h-[420px] w-full object-contain object-center sm:max-h-[480px] lg:max-h-[520px]"
                style={{ objectPosition: work.heroObjectPosition }}
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          {/* 2. 作品紹介 */}
          <section aria-labelledby="baby-shark-intro">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
              About the Show
            </p>
            <h2 id="baby-shark-intro" className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              作品紹介
            </h2>
            <div className="mt-6 space-y-4">
              {work.summary.map((paragraph) => (
                <p key={paragraph} className="font-display text-xl leading-relaxed text-ink/85 sm:text-2xl">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              {work.body.map((paragraph) => (
                <p key={paragraph} className="leading-8 text-ink/75">
                  {paragraph}
                </p>
              ))}
            </div>
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="border border-[#7aa8c4]/30 bg-[#f3f8fb] p-4">
                <dt className="text-xs font-black uppercase tracking-[0.14em] text-[#2f5f78]">カテゴリー</dt>
                <dd className="mt-2 text-sm font-bold text-ink">{work.category}</dd>
              </div>
              <div className="border border-[#7aa8c4]/30 bg-[#f3f8fb] p-4">
                <dt className="text-xs font-black uppercase tracking-[0.14em] text-[#2f5f78]">初日</dt>
                <dd className="mt-2 text-sm font-bold text-ink">{work.firstPerformanceLabel}</dd>
              </div>
            </dl>
          </section>

          {/* 3. 役紹介（並列・上下なし） */}
          <section aria-labelledby="baby-shark-roles" className="mt-16">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">Roles</p>
            <h2 id="baby-shark-roles" className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              優花子さんが演じた役
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              二つの役はどちらも大切な出演記録。並び順に優劣はありません。
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {work.roles.map((role) => (
                <article
                  key={role.id}
                  className="overflow-hidden border border-rosefog/15 bg-white shadow-paper"
                >
                  <img
                    {...getResponsiveImageProps(role.image, "(min-width: 640px) 40vw, 100vw")}
                    alt={role.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto max-h-[360px] w-full object-contain object-center sm:max-h-[400px]"
                    style={{ objectPosition: role.objectPosition }}
                  />
                  <div className="p-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#2f5f78]">
                      {role.nameEn}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ink">{role.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink/70">{role.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 4. 活動記録 */}
          {firstUpdate && (
            <section aria-labelledby="baby-shark-record" className="mt-16">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
                Activity Record
              </p>
              <h2 id="baby-shark-record" className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                {firstUpdate.dateLabel}の活動記録
              </h2>
              <article className="mt-6 border border-champagne/30 bg-white p-5 shadow-paper sm:p-7">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-champagneInk">
                  <Sparkles className="h-4 w-4 text-champagne" aria-hidden="true" />
                  {firstUpdate.title}
                </p>
                <div className="mt-4 space-y-3">
                  {firstUpdate.body.map((paragraph) => (
                    <p key={paragraph} className="leading-8 text-ink/75">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {firstUpdate.sourceUrl && (
                  <a
                    href={firstUpdate.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-12 items-center gap-2 border border-rosefog/35 bg-porcelain px-4 py-3 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
                  >
                    {firstUpdate.sourceLabel ?? "元投稿を見る"}
                    <ExternalLink className="h-4 w-4 text-champagne" aria-hidden="true" />
                  </a>
                )}
                <p className="mt-4 text-xs text-ink/50">
                  投稿者：吉井優花子さん（Instagram {work.sourceHandle}）
                </p>
              </article>
            </section>
          )}

          {/* 5. フォトギャラリー */}
          <section aria-labelledby="baby-shark-gallery" className="mt-16">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
              Photo Gallery
            </p>
            <h2 id="baby-shark-gallery" className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              フォトギャラリー
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">画像をタップ／クリックで拡大できます。</p>
            <div className="mt-6 min-w-0">
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
                {babySharkGalleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="w-[78%] shrink-0 snap-center overflow-hidden border border-[#7aa8c4]/25 bg-white text-left shadow-paper transition hover:border-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne sm:w-auto"
                  >
                    <img
                      {...getResponsiveImageProps(
                        image.src,
                        "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 78vw"
                      )}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto max-h-[320px] w-full object-contain object-center sm:max-h-[280px]"
                      style={
                        image.objectPosition
                          ? { objectPosition: image.objectPosition }
                          : undefined
                      }
                    />
                    {image.caption && (
                      <span className="block px-3 py-2 text-xs font-bold text-ink/65">
                        {image.caption}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 6. 2024年当時の公演日程 */}
          <section aria-labelledby="baby-shark-schedule" className="mt-16">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
              <CalendarDays className="h-4 w-4 text-champagne" aria-hidden="true" />
              Archive Schedule
            </p>
            <h2 id="baby-shark-schedule" className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              2024年当時の公演日程
            </h2>
            <div
              className="mt-4 border-2 border-[#c29a4a]/55 bg-[#fff8e8] px-4 py-4 text-sm leading-7 text-ink/85"
              role="note"
            >
              <p className="text-base font-bold text-ink">{work.archiveScheduleNote}</p>
              <p className="mt-2 text-ink/65">
                ※ 掲載の日程は作品の公演スケジュール（アーカイブ）であり、優花子さん個人の出演確定日ではありません。
              </p>
            </div>

            {work.archiveScheduleImage.available ? (
              <figure className="mt-6 overflow-hidden border border-[#7aa8c4]/30 bg-white p-3">
                <img
                  {...getResponsiveImageProps(work.archiveScheduleImage.src, "100vw")}
                  alt={work.archiveScheduleImage.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain"
                />
                <figcaption className="mt-2 text-center text-xs text-ink/55">
                  2024年当時の公演日程（アーカイブ）
                </figcaption>
              </figure>
            ) : null}

            <ul className="mt-6 grid gap-3">
              {work.archiveDates.map((item) => (
                <li
                  key={`${item.region}-${item.dateLabel}`}
                  className="grid gap-1 border border-[#7aa8c4]/25 bg-white px-4 py-3 sm:grid-cols-[5rem_1fr]"
                >
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-[#2f5f78]">
                    {item.region}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{item.dateLabel}</p>
                    <p className="mt-1 text-sm text-ink/70">
                      {item.times}　{item.venue}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink/65">
              現在の公演情報は
              <a
                href={work.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 font-bold text-champagneInk underline decoration-champagne/50 underline-offset-2 hover:text-ink"
              >
                公式サイト
              </a>
              でご確認ください。
            </p>
          </section>

          {/* 7. 外部リンク */}
          <section aria-labelledby="baby-shark-links" className="mt-16">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">Links</p>
            <h2 id="baby-shark-links" className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              外部リンク
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ExternalButton href={work.officialUrl} variant="gold">
                公式サイトを見る
              </ExternalButton>
              <ExternalButton href={work.sourceUrl} variant="light">
                Instagramの元投稿を見る
              </ExternalButton>
            </div>
          </section>

          {/* 8. 今後の更新 */}
          <section
            aria-labelledby="baby-shark-future"
            className="mt-16 border border-[#7aa8c4]/30 bg-[#f3f8fb] p-5 sm:p-7"
          >
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#2f5f78]">
              <Waves className="h-4 w-4" aria-hidden="true" />
              Coming Updates
            </p>
            <h2 id="baby-shark-future" className="mt-3 font-display text-3xl text-ink">
              今後の更新
            </h2>
            <p className="mt-4 leading-8 text-ink/75">{work.futureUpdateNote}</p>
            {work.upcomingAppearances.length === 0 ? (
              <p className="mt-4 flex items-start gap-2 text-sm leading-7 text-ink/60">
                <Fish className="mt-0.5 h-4 w-4 shrink-0 text-[#7aa8c4]" aria-hidden="true" />
                現時点でサイトに掲載できる、優花子さん個人の出演予定は未確認です。
              </p>
            ) : (
              <ul className="mt-4 grid gap-2">
                {work.upcomingAppearances.map((item) => (
                  <li
                    key={item.id}
                    className="border border-white bg-white px-3 py-2 text-sm font-bold text-ink/80"
                  >
                    {item.dateLabel}
                    {item.venue ? ` / ${item.venue}` : ""}
                    {item.note ? ` — ${item.note}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <a
            href="/#baby-shark-live"
            className="mt-12 inline-flex items-center gap-1.5 text-sm font-bold text-ink/60 hover:text-champagneInk"
          >
            <ArrowLeft className="h-4 w-4 text-champagne" aria-hidden="true" />
            ホームの代表出演作品へ戻る
          </a>
        </div>
      </main>
      <Footer
        socialLinks={schedule.socialLinks}
        source={schedule.source}
        updatedAt={schedule.updatedAt}
      />
      <ScrollToTop />
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={babySharkGalleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          label="ベイビーシャークライブ フォトギャラリー"
        />
      )}
    </div>
  );
}
