import { ArrowUpRight, CalendarDays, Heart, Music2, Sparkles } from "lucide-react";
import {
  ojosamaBandMoments,
  ojosamaBandPhotos,
  ojosamaBandSchedule
} from "../data/ojosamaBand";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { ActHeader } from "./ActHeader";
import { CollapsiblePhotoArchive } from "./CollapsiblePhotoArchive";

const featuredPhoto = ojosamaBandPhotos[0];

export function OjosamaBandSection() {
  return (
    <section id="ojosama-band" className="scroll-mt-32 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <ActHeader
              act={4}
              eyebrow="Stage Archive"
              title="お嬢様はバンドがやりたい"
              copy="2026年5月、劇団ココアのミュージカル。A班・黒白院雲雀役で出演した舞台のアーカイブ。"
            />

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {ojosamaBandMoments.map((moment) => (
                <div key={moment.label} className="border border-champagne/30 bg-porcelain p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
                    <Sparkles className="h-4 w-4 text-champagne" aria-hidden="true" />
                    {moment.label}
                  </p>
                  <p className="text-sm leading-7 text-ink/72">{moment.text}</p>
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
                  A班 黒白院雲雀役
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight text-ink">
                  母として見守る、深く大きな愛の役
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink/70">
                  すずめの夢をただ止めるのではなく、選択を尊重しながら支える存在として描かれた雲雀。歌の多い大役です。
                </p>
              </div>
              <a
                href="#ojosama-band-photos"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-rosefog/40 bg-porcelain px-4 py-3 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
              >
                写真を見る
                <ArrowUpRight className="h-4 w-4 text-champagne" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border border-rosefog/15 bg-porcelain p-5 shadow-paper sm:p-6">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
              <Music2 className="h-4 w-4 text-champagne" aria-hidden="true" />
              Performance
            </p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
              A班出演スケジュール
            </h3>
            <div className="mt-5 grid gap-2">
              {ojosamaBandSchedule.map((item) => (
                <div key={item} className="flex items-center gap-3 border border-champagne/25 bg-white px-3 py-2 text-sm font-bold text-ink/76">
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
              写真で残す、黒白院雲雀の記録
            </h3>
            <p className="mt-4 text-sm leading-7 text-ink/72">
              公演後に公開された記録写真から。衣装姿も舞台の空気も、ここでいつでも見返せます。
            </p>
          </div>
        </div>

        <div id="ojosama-band-photos" className="mt-8">
          <div className="mb-4 flex flex-col gap-2 border-y border-champagne/30 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
                Hibari Photo Archive
              </p>
              <p className="mt-1 text-sm font-bold text-ink/70">
                黒白院雲雀役の記録写真・{ojosamaBandPhotos.length}枚
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

          <CollapsiblePhotoArchive
            id="ojosama-band-photos"
            photos={ojosamaBandPhotos}
          />
        </div>
      </div>
    </section>
  );
}
