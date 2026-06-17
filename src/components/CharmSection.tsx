import { Camera, Heart, Sparkles } from "lucide-react";
import { charmPhotos, charmPoints } from "../data/charms";

const icons = [Heart, Sparkles, Camera];

export function CharmSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#fffafc,#fff4f8_48%,#ffffff)] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="mb-3 inline-flex border border-champagne/45 bg-white/70 px-3 py-2 text-xs font-bold uppercase text-champagne backdrop-blur">
              Riri Mood
            </p>
            <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
              かわいい、でも芯がある。
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-ink/68">
              はじめて見た人にも、里季ちゃんらしい透明感とまっすぐさが伝わるように。
              写真と短い言葉で、応援したくなる理由を整理しました。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {charmPhotos.map((photo, index) => (
              <figure
                key={photo.src}
                className={`overflow-hidden border border-white bg-white p-1 shadow-sm ${
                  index === 1 ? "translate-y-5" : ""
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="block aspect-[3/4] w-full object-cover object-top"
                />
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {charmPoints.map((point, index) => {
            const Icon = icons[index] ?? Sparkles;

            return (
              <article
                key={point.title}
                className="border border-rosefog/25 bg-white/88 p-5 shadow-sm backdrop-blur transition hover:border-champagne hover:bg-white"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-champagne">
                    {point.label}
                  </span>
                  <span className="grid h-10 w-10 place-items-center border border-rosefog/30 bg-porcelain text-champagne">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="font-display text-2xl leading-tight text-ink">
                  {point.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink/66">{point.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
