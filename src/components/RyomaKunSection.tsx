import { ArrowUpRight, CalendarDays, ClipboardList, Heart, Quote, Sparkles, Swords } from "lucide-react";
import {
  ryomaKunFavoriteLines,
  ryomaKunLookbackPhotos,
  ryomaKunLookbackSource,
  ryomaKunMoments,
  ryomaKunPhotos,
  ryomaKunProducerAnswer,
  ryomaKunProducerDuties,
  ryomaKunProducerPrinciples,
  ryomaKunRoles,
  ryomaKunSchedule
} from "../data/ryomaKun";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { ActHeader } from "./ActHeader";
import { CollapsiblePhotoArchive } from "./CollapsiblePhotoArchive";
import { RyomaKunLookbackGallery } from "./RyomaKunLookbackGallery";
import { RyomaKunPromoVideos } from "./RyomaKunPromoVideos";

const featuredPhoto = {
  src: "/images/ryoma-kun-2026/yukako-ryoma-kun-2026-main-visual.jpg",
  alt: "舞台『かわええのう、龍馬くん』メインビジュアル"
};

export function RyomaKunSection() {
  return (
    <section id="ryoma-kun" className="scroll-mt-32 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <ActHeader
              act={4}
              eyebrow="Stage Archive"
              title="かわええのう、龍馬くん"
              copy="2026年4月、A-root赤坂にて上演。B班・坂本龍馬役、C班・おりょう役の二役で出演した舞台のアーカイブ。"
            />

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {ryomaKunMoments.map((moment) => (
                <div key={moment.label} className="border border-champagne/30 bg-porcelain p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
                    <Sparkles className="h-4 w-4 text-champagne" aria-hidden="true" />
                    {moment.label}
                  </p>
                  <p className="text-sm leading-7 text-ink/70">{moment.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="yukako-card overflow-hidden border-rosefog/20 bg-porcelain shadow-paper">
            <img
              {...getResponsiveImageProps(featuredPhoto.src, "(min-width: 1024px) 46vw, 100vw")}
              alt={featuredPhoto.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain"
            />
            <div className="grid gap-4 border-t border-champagne/30 bg-white p-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
                  B班 坂本龍馬役 / C班 おりょう役
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight text-ink">
                  幕末の群像劇、二役で駆け抜けた舞台
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink/70">
                  班によって異なる役に挑み、アソシエイトプロデューサーとしても支えた一作です。
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#ryoma-kun-promo"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-rosefog/40 bg-porcelain px-4 py-3 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
                >
                  動画を見る
                  <ArrowUpRight className="h-4 w-4 text-champagne" aria-hidden="true" />
                </a>
                <a
                  href="#ryoma-kun-photos"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-rosefog/40 bg-porcelain px-4 py-3 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
                >
                  写真を見る
                  <ArrowUpRight className="h-4 w-4 text-champagne" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border border-champagne/30 bg-[#2a1418] p-6 shadow-paper sm:p-8">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-champagne">
            <Quote className="h-4 w-4 text-champagne" aria-hidden="true" />
            Ryoma&apos;s Words
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-porcelain">
            大量の龍馬のセリフから、好きな3選
          </h3>
          <p className="mt-3 text-sm leading-7 text-porcelain/70">
            演じた本人が選んだ3つ。
          </p>

          <ol className="mt-6 grid gap-4 lg:grid-cols-3">
            {ryomaKunFavoriteLines.map((line, index) => (
              <li
                key={line}
                className="flex flex-col gap-3 border border-champagne/30 bg-[#351a20] p-5"
              >
                <span className="font-display text-2xl leading-none text-champagne">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-8 text-porcelain">「{line}」</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {ryomaKunRoles.map((role) => (
            <div
              key={role.group}
              className="border border-rosefog/15 bg-porcelain p-5 shadow-paper sm:p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
                {role.group}
              </p>
              <h3 className="mt-2 font-display text-3xl leading-tight text-ink">{role.role}</h3>
              <p className="mt-4 text-sm leading-7 text-ink/70">{role.body}</p>
              {role.quote && (
                <p className="mt-4 border-l-2 border-champagne bg-white px-4 py-3 font-display text-lg leading-8 text-rosefog">
                  「{role.quote}」
                </p>
              )}
              <p className="mt-4 text-sm leading-7 text-ink/60">{role.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border border-rosefog/15 bg-porcelain p-5 shadow-paper sm:p-6">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
              <Swords className="h-4 w-4 text-champagne" aria-hidden="true" />
              Performance
            </p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
              上演スケジュール
            </h3>
            <div className="mt-5 grid gap-2">
              {ryomaKunSchedule.map((item) => (
                <div key={item} className="flex items-center gap-3 border border-champagne/25 bg-white px-3 py-2 text-sm font-bold text-ink/75">
                  <CalendarDays className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-rosefog/15 bg-[#fff8f2] p-5 shadow-paper sm:p-6">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
              <Heart className="h-4 w-4 text-rosefog" aria-hidden="true" />
              Fan Memory
            </p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
              写真で残す、龍馬くんの記録
            </h3>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              公演後に公開された記録写真から。衣装姿も舞台の空気も、ここでいつでも見返せます。
            </p>
          </div>
        </div>

        <div className="mt-4 border border-rosefog/15 bg-porcelain p-5 shadow-paper sm:p-6">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
            <ClipboardList className="h-4 w-4 text-champagne" aria-hidden="true" />
            Associate Producer
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
            初のアソシエイト・プロデューサー
          </h3>
          <p className="mt-3 text-sm leading-7 text-ink/70">
            方言指導（土佐弁・関西弁）と殺陣指導・踊り指導の導入も、本人からの提案。
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {ryomaKunProducerDuties.map((duty) => (
              <li
                key={duty}
                className="border border-champagne/35 bg-white px-3 py-1.5 text-xs font-bold text-ink/70"
              >
                {duty}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm font-black text-champagneInk">
            プロデュースを行う上で大切にしたこと
          </p>
          <ol className="mt-3 grid gap-3 lg:grid-cols-3">
            {ryomaKunProducerPrinciples.map((principle) => (
              <li
                key={principle.number}
                className="border border-champagne/25 bg-white p-4"
              >
                <span className="font-display text-xl text-champagneInk">{principle.number}</span>
                <p className="mt-2 text-sm leading-7 text-ink/75">{principle.text}</p>
                {principle.note && (
                  <p className="mt-2 text-xs leading-6 text-ink/55">※{principle.note}</p>
                )}
              </li>
            ))}
          </ol>

          <p className="mt-6 border-l-2 border-champagne bg-white px-4 py-3 font-display text-lg leading-8 text-rosefog">
            「{ryomaKunProducerAnswer}」
          </p>
        </div>

        <RyomaKunPromoVideos />

        <div id="ryoma-kun-lookback" className="mt-8">
          <div className="mb-4 flex flex-col gap-2 border-y border-champagne/30 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
                Look Back
              </p>
              <p className="mt-1 text-sm font-bold text-ink/70">
                本人の振り返り投稿から・{ryomaKunLookbackPhotos.length}枚
              </p>
            </div>
            <a
              href={ryomaKunLookbackSource.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-rosefog/35 bg-porcelain px-4 py-2 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
            >
              {ryomaKunLookbackSource.label}
              <ArrowUpRight className="h-4 w-4 text-champagne" aria-hidden="true" />
            </a>
          </div>

          <RyomaKunLookbackGallery photos={ryomaKunLookbackPhotos} />
        </div>

        <div id="ryoma-kun-photos" className="mt-8">
          <div className="mb-4 flex flex-col gap-2 border-y border-champagne/30 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
                Ryoma-kun Photo Archive
              </p>
              <p className="mt-1 text-sm font-bold text-ink/70">
                坂本龍馬役・おりょう役の記録写真・{ryomaKunPhotos.length}枚
              </p>
            </div>
            <a
              href="#highlights"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-rosefog/35 bg-porcelain px-4 py-2 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
            >
              これまでの歩みへ
              <ArrowUpRight className="h-4 w-4 text-champagne" aria-hidden="true" />
            </a>
          </div>

          <CollapsiblePhotoArchive id="ryoma-kun-photos" photos={ryomaKunPhotos} />
        </div>
      </div>
    </section>
  );
}
