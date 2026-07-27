import { useState } from "react";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { PhotoLightbox, type LightboxPhoto } from "./PhotoLightbox";
import type { RyomaKunPhoto } from "../data/ryomaKun";

type RyomaKunLookbackGalleryProps = {
  photos: RyomaKunPhoto[];
  initialVisible?: number;
};

const DEFAULT_INITIAL_VISIBLE = 8;

/**
 * 振り返り投稿の20枚。文章パネルが含まれるので、タップで拡大できるようにライトボックスを付ける
 * （グリッドのままだと本人の書いた文字が読めない）。
 */
export function RyomaKunLookbackGallery({
  photos,
  initialVisible = DEFAULT_INITIAL_VISIBLE
}: RyomaKunLookbackGalleryProps) {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos = showAll ? photos : photos.slice(0, initialVisible);
  const remainingPhotos = Math.max(photos.length - initialVisible, 0);
  const lightboxPhotos: LightboxPhoto[] = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption
  }));

  return (
    <>
      <ul
        id="ryoma-kun-lookback-grid"
        className="grid min-w-0 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {visiblePhotos.map((photo, index) => (
          <li key={photo.src} className="min-w-0">
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="yukako-card block w-full min-w-0 overflow-hidden border-rosefog/15 bg-porcelain text-left transition hover:border-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagneInk"
              aria-label={`${photo.alt}を拡大表示`}
            >
              <img
                {...getResponsiveImageProps(
                  photo.src,
                  "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                )}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full max-w-full object-contain"
              />
            </button>
            {photo.caption && (
              <p className="mt-2 text-xs leading-6 text-ink/55">{photo.caption}</p>
            )}
          </li>
        ))}
      </ul>

      {remainingPhotos > 0 && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="yukako-button min-h-12 border border-rosefog/35 bg-porcelain px-5 py-3 text-sm font-black text-ink transition hover:border-champagne hover:bg-white"
            aria-expanded={showAll}
            aria-controls="ryoma-kun-lookback-grid"
          >
            {showAll ? `最初の${initialVisible}枚だけ表示` : `残り${remainingPhotos}枚を見る`}
          </button>
        </div>
      )}

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={lightboxPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          label="『かわええのう、龍馬くん』振り返り"
        />
      )}
    </>
  );
}
