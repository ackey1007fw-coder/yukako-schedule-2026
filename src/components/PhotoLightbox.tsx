import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";

export type LightboxPhoto = {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
};

type PhotoLightboxProps = {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  label?: string;
};

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export function PhotoLightbox({
  photos,
  index,
  onClose,
  label = "フォトギャラリー"
}: PhotoLightboxProps) {
  const [current, setCurrent] = useState(index);
  const photo = photos[current];

  useEffect(() => {
    setCurrent(index);
  }, [index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") setCurrent((value) => wrapIndex(value - 1, photos.length));
      if (event.key === "ArrowRight") setCurrent((value) => wrapIndex(value + 1, photos.length));
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, photos.length]);

  if (!photo) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex h-[100dvh] flex-col overscroll-contain bg-ink/97 px-3 py-4 text-white sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-champagne">
          {current + 1} / {photos.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center border border-white/20 bg-white/10 transition hover:bg-white/20"
          aria-label="閉じる"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden py-4">
        <img
          {...getResponsiveImageProps(photo.src, "90vw")}
          alt={photo.alt}
          className="max-h-full max-w-full object-contain"
          style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setCurrent((value) => wrapIndex(value - 1, photos.length))}
              className="absolute left-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-ink/70 text-white transition hover:bg-ink"
              aria-label="前の画像"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setCurrent((value) => wrapIndex(value + 1, photos.length))}
              className="absolute right-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-ink/70 text-white transition hover:bg-ink"
              aria-label="次の画像"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      <p className="mx-auto w-full max-w-5xl text-center text-sm leading-6 text-white/75">
        {photo.caption ?? photo.alt}
      </p>
    </div>,
    document.body
  );
}
