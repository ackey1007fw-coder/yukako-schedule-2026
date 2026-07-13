import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";

type ArchivePhoto = {
  src: string;
  alt: string;
};

type CollapsiblePhotoArchiveProps = {
  id: string;
  photos: ArchivePhoto[];
  initialVisible?: number;
};

const DEFAULT_INITIAL_VISIBLE = 12;

export function CollapsiblePhotoArchive({
  id,
  photos,
  initialVisible = DEFAULT_INITIAL_VISIBLE
}: CollapsiblePhotoArchiveProps) {
  const [showAll, setShowAll] = useState(false);
  const visiblePhotos = showAll ? photos : photos.slice(0, initialVisible);
  const remainingPhotos = Math.max(photos.length - initialVisible, 0);
  const gridId = `${id}-grid`;

  return (
    <>
      <div
        id={gridId}
        className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>figure]:mb-4 [&>figure]:break-inside-avoid"
      >
        {visiblePhotos.map((photo) => (
          <figure
            key={photo.src}
            className="yukako-card overflow-hidden border-rosefog/15 bg-porcelain"
          >
            <img
              {...getResponsiveImageProps(
                photo.src,
                "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              )}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain"
            />
          </figure>
        ))}
      </div>

      {remainingPhotos > 0 && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="yukako-button min-h-12 border border-rosefog/35 bg-porcelain px-5 py-3 text-sm font-black text-ink transition hover:border-champagne hover:bg-white"
            aria-expanded={showAll}
            aria-controls={gridId}
          >
            {showAll ? (
              <ChevronUp className="h-4 w-4 text-champagne" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 text-champagne" aria-hidden="true" />
            )}
            {showAll
              ? `最初の${initialVisible}枚だけ表示`
              : `残り${remainingPhotos}枚を見る`}
          </button>
        </div>
      )}
    </>
  );
}
