import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { akitaInuTour } from "../data/akitaInuTour";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { trackPortalEvent } from "../lib/analytics";
import { PhotoLightbox, type LightboxPhoto } from "./PhotoLightbox";
import { SectionHeader } from "./SectionHeader";

const lightboxPhotos: LightboxPhoto[] = akitaInuTour.photos.map((photo) => ({
  src: photo.src,
  alt: photo.alt,
  caption: photo.caption
}));

export function AkitaInuTourSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroIndex = akitaInuTour.photos.findIndex(
    (photo) => photo.src === akitaInuTour.heroSrc
  );

  return (
    <section id="akita-inu" className="scroll-mt-32 bg-porcelain py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker={akitaInuTour.eyebrow}
          title={akitaInuTour.title}
          copy={akitaInuTour.copy}
        />

        <article className="yukako-card overflow-hidden border-rosefog/25 bg-white shadow-paper">
          <button
            type="button"
            onClick={() => setLightboxIndex(heroIndex >= 0 ? heroIndex : 0)}
            className="block w-full min-w-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagneInk"
            aria-label={`${akitaInuTour.photos[heroIndex >= 0 ? heroIndex : 0]?.alt ?? "写真"}を拡大表示`}
          >
            <img
              {...getResponsiveImageProps(akitaInuTour.heroSrc, "100vw")}
              alt={
                akitaInuTour.photos.find((photo) => photo.src === akitaInuTour.heroSrc)
                  ?.alt ?? "秋田犬の被り物でしんちゃんの像と並ぶ吉井優花子さん"
              }
              loading="lazy"
              decoding="async"
              className="block h-auto w-full bg-porcelain object-contain"
            />
          </button>

          <div className="border-t border-rosefog/15 p-6 sm:p-8">
            <p className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-champagneInk">
              <span className="border border-rosefog/40 bg-[#fff1f6] px-2 py-0.5 text-[#8d4260]">
                New
              </span>
              <span className="border border-champagne/45 bg-porcelain px-2 py-0.5">
                Instagram
              </span>
              <span className="text-ink/45">
                {akitaInuTour.dateLabel} {akitaInuTour.weekdayLabel}
              </span>
            </p>

            <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
              秋田犬の被り物で、しんちゃんと。
            </p>
            {akitaInuTour.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 max-w-3xl text-sm leading-7 text-ink/70">
                {paragraph}
              </p>
            ))}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={akitaInuTour.instagramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("sns_click", {
                    kind: "instagram",
                    placement: "akita_inu_tour"
                  })
                }
                className="yukako-button yukako-button-gold inline-flex min-h-12 items-center justify-center gap-1.5 px-5 py-3 text-sm"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Instagramで見る
              </a>
              <a
                href={akitaInuTour.xPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("sns_click", {
                    kind: "x",
                    placement: "akita_inu_tour"
                  })
                }
                className="yukako-button inline-flex min-h-12 items-center justify-center border border-champagne bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"
              >
                Xで見る
              </a>
              <a
                href={akitaInuTour.missGrandJapanUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("sns_click", {
                    kind: "instagram",
                    placement: "akita_inu_tour_mgj"
                  })
                }
                className="yukako-button inline-flex min-h-12 items-center justify-center border border-champagne bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"
              >
                @missgrandjapan
              </a>
            </div>
          </div>

          <ul className="grid min-w-0 grid-cols-3 gap-px border-t border-rosefog/15 bg-rosefog/15">
            {akitaInuTour.photos.map((photo, index) => (
              <li key={photo.src} className="min-w-0 bg-white">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="block w-full min-w-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagneInk"
                  aria-label={`${photo.alt}を拡大表示`}
                >
                  <img
                    {...getResponsiveImageProps(
                      photo.src,
                      "(min-width: 640px) 33vw, 33vw"
                    )}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[3/4] h-auto w-full bg-porcelain object-contain"
                  />
                </button>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={lightboxPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          label="秋田犬・しんちゃん"
        />
      )}
    </section>
  );
}
