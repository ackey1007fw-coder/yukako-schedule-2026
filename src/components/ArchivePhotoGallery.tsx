import { useState } from "react";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { PhotoLightbox, type LightboxPhoto } from "./PhotoLightbox";
import type { ArchiveImage } from "../data/archive";

type ArchivePhotoGalleryProps = {
  images: ArchiveImage[];
  label?: string;
};

/**
 * アーカイブ記事向けフォトギャラリー。
 * galleryLayout: "responsive-grid" のときだけ使う。
 * 既存の縦一列表示（stacked）は ArchiveDetailPage 側の従来実装を維持する。
 */
export function ArchivePhotoGallery({
  images,
  label = "フォトギャラリー"
}: ArchivePhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos: LightboxPhoto[] = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    caption: image.caption
  }));

  return (
    <>
      <ul className="mt-10 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {images.map((image, index) => {
          const props = getResponsiveImageProps(
            image.src,
            "(min-width: 640px) calc((min(48rem, 100vw) - 3rem) / 2), calc(100vw - 2rem)"
          );

          return (
            <li key={image.src} className="min-w-0">
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="block w-full min-w-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagneInk"
                aria-label={`${image.alt}を拡大表示`}
              >
                <img
                  {...props}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full max-w-full bg-porcelain object-contain"
                />
              </button>
              {image.caption && (
                <p className="mt-2 text-center text-xs leading-6 text-ink/55">{image.caption}</p>
              )}
            </li>
          );
        })}
      </ul>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          label={label}
        />
      )}
    </>
  );
}
