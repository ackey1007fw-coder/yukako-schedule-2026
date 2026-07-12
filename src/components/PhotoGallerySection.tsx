import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Images,
  Instagram,
  MessageCircle,
  Pause,
  Play,
  Sparkles,
  X
} from "lucide-react";
import { galleryPhotos, galleryUpdate } from "../data/photos";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { ActHeader } from "./ActHeader";

const wrapIndex = (index: number) =>
  (index + galleryPhotos.length) % galleryPhotos.length;

const INITIAL_VISIBLE_PHOTOS = 24;
const LOAD_MORE_PHOTOS = 24;
const SPOTLIGHT_PHOTOS = 10;

function shufflePhotos<T>(items: readonly T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function useSwipe(onLeft: () => void, onRight: () => void) {
  const startX = useRef(0);
  const startY = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX.current;
      const dy = e.changedTouches[0].clientY - startY.current;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) onLeft();
        else onRight();
      }
    },
    [onLeft, onRight],
  );

  return { onTouchStart, onTouchEnd };
}

export function PhotoGallerySection() {
  const [photoOrder] = useState(() => shufflePhotos(galleryPhotos));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_PHOTOS);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const visiblePhotos = photoOrder.slice(0, visibleCount);
  const spotlightPhotos = photoOrder.slice(0, SPOTLIGHT_PHOTOS);
  const spotlightPhoto = spotlightPhotos[spotlightIndex];
  const remainingPhotos = Math.max(photoOrder.length - visiblePhotos.length, 0);

  const selectedPhoto =
    selectedIndex === null ? null : photoOrder[selectedIndex];
  const GalleryUpdateIcon =
    galleryUpdate.platform === "Instagram"
      ? Instagram
      : galleryUpdate.platform === "Archive"
        ? Images
        : MessageCircle;
  const updateLinkIsInternal = galleryUpdate.url.startsWith("#");
  const updateLinkLabel =
    galleryUpdate.platform === "Archive"
      ? "写真を見る"
      : `${galleryUpdate.platform}で見る`;

  const openPhoto = (index: number) => {
    setSelectedIndex(index);
    setIsPlaying(true);
  };

  const closePhoto = useCallback(() => {
    setSelectedIndex(null);
    setIsPlaying(false);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? current : wrapIndex(current - 1),
    );
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? current : wrapIndex(current + 1),
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePhoto, selectedIndex, showNext, showPrevious]);

  useEffect(() => {
    if (selectedIndex === null || !isPlaying) return;

    const timer = window.setInterval(showNext, 3800);
    return () => window.clearInterval(timer);
  }, [isPlaying, selectedIndex, showNext]);

  useEffect(() => {
    if (spotlightPhotos.length <= 1) return;

    const timer = window.setInterval(() => {
      setSpotlightIndex((current) => (current + 1) % spotlightPhotos.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [spotlightPhotos.length]);

  const swipeHandlers = useSwipe(showNext, showPrevious);

  useEffect(() => {
    document.body.style.overflow = selectedIndex === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <ActHeader
            act={5}
            eyebrow="Photo Gallery"
            title="写真で見る 優花子"
            copy="舞台に立つ姿から、配信や日常のふとした表情まで。優花子さんのいろんな瞬間をどうぞ。"
          />
          <div className="flex flex-col gap-3 border-y border-champagne/30 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm font-bold text-ink/70">
              <Images className="h-5 w-5 text-champagne" aria-hidden="true" />
              <span>
                Photo Selection・{photoOrder.length}枚
                <span className="ml-2 text-xs text-ink/45">
                  {visiblePhotos.length}枚表示中
                </span>
              </span>
            </div>
            <a
              href="#profile"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-rosefog/40 bg-porcelain px-5 py-3 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
            >
              <Sparkles className="h-4 w-4 text-champagne" aria-hidden="true" />
              プロフィールへ
            </a>
          </div>
        </div>

        <a
          href={galleryUpdate.url}
          target={updateLinkIsInternal ? undefined : "_blank"}
          rel={updateLinkIsInternal ? undefined : "noopener noreferrer"}
          className="yukako-lift mt-6 flex items-center gap-3 border border-champagne/40 bg-white px-4 py-3 text-sm font-bold text-ink hover:border-champagne hover:bg-porcelain"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center border border-champagne/50 bg-porcelain text-champagne">
            <GalleryUpdateIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-black uppercase tracking-wide text-champagneInk">
              New ・ {galleryUpdate.date}
            </span>
            <span className="block leading-snug">
              {galleryUpdate.note} — {updateLinkLabel}
            </span>
          </span>
        </a>

        {spotlightPhoto && (
          <div className="mt-8 grid gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <button
              type="button"
              onClick={() => openPhoto(spotlightIndex)}
              className="group overflow-hidden border border-rosefog/15 bg-porcelain text-left shadow-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-champagne"
              aria-label={`${spotlightPhoto.alt}を大きく表示`}
            >
              <img
                {...getResponsiveImageProps(
                  spotlightPhoto.src,
                  "(min-width: 1024px) 45vw, 100vw",
                )}
                alt={spotlightPhoto.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto max-h-[520px] w-full bg-ink/5 object-contain transition duration-700 group-hover:scale-[1.01]"
              />
            </button>
            {/* min-w-0 必須: 中の w-max サムネイル帯が grid item の最小幅を
                押し広げ、モバイルで横スクロールが発生する(既知の不具合)。 */}
            <div className="flex min-h-full min-w-0 flex-col justify-center border border-champagne/30 bg-white p-5 shadow-paper sm:p-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
                <Play className="h-4 w-4 text-champagne" aria-hidden="true" />
                Random Slideshow
              </div>
              <p className="mt-3 text-2xl font-black leading-tight text-ink sm:text-3xl">
                開くたびに、違う並びで。
              </p>
              <p className="mt-3 text-sm leading-7 text-ink/68">
                大きな写真は自動で切り替わります。気になる1枚はタップで拡大。
              </p>
              <div className="mt-5 overflow-hidden border-y border-rosefog/10 py-3">
                <div className="yukako-photo-flow flex w-max gap-3">
                  {[...spotlightPhotos, ...spotlightPhotos].map((photo, index) => (
                    <button
                      key={`${photo.src}-${index}`}
                      type="button"
                      onClick={() => openPhoto(index % spotlightPhotos.length)}
                      className="h-20 w-20 shrink-0 overflow-hidden border border-rosefog/15 bg-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-champagne sm:h-24 sm:w-24"
                      aria-label={`${photo.alt}を大きく表示`}
                    >
                      <img
                        {...getResponsiveImageProps(photo.src, "96px")}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          id="photo-selection"
          className="mt-6 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>figure]:mb-4 [&>figure]:break-inside-avoid"
        >
          {visiblePhotos.map((photo, index) => (
            <figure
              key={photo.src}
              className={`photo-gallery-card yukako-card overflow-hidden border-rosefog/15 bg-porcelain ${
                loaded[photo.src] ? "" : "yukako-skeleton"
              }`}
            >
              <button
                type="button"
                onClick={() => openPhoto(index)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-champagne"
                aria-label={`${photo.alt}を大きく表示`}
              >
                <img
                  {...getResponsiveImageProps(
                    photo.src,
                    "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
                  )}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  onLoad={() =>
                    setLoaded((current) =>
                      current[photo.src] ? current : { ...current, [photo.src]: true },
                    )
                  }
                  className="photo-gallery-image block w-full"
                />
              </button>
            </figure>
          ))}
        </div>
        {photoOrder.length > INITIAL_VISIBLE_PHOTOS && (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() =>
                remainingPhotos > 0
                  ? setVisibleCount((current) =>
                      Math.min(current + LOAD_MORE_PHOTOS, photoOrder.length),
                    )
                  : setVisibleCount(INITIAL_VISIBLE_PHOTOS)
              }
              className="yukako-button yukako-button-soft min-h-12 px-5 py-3 text-sm"
              aria-expanded={remainingPhotos === 0}
              aria-controls="photo-selection"
            >
              {remainingPhotos === 0 ? (
                <ChevronUp className="h-4 w-4 text-champagne" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4 text-champagne" aria-hidden="true" />
              )}
              {remainingPhotos === 0
                ? "先頭の写真に戻す"
                : `さらに${Math.min(LOAD_MORE_PHOTOS, remainingPhotos)}枚見る`}
            </button>
          </div>
        )}
      </div>

      {selectedPhoto && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[999] h-[100dvh] overscroll-contain bg-ink px-3 py-4 text-white sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="写真スライドショー"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne">
                  Yukako Photo
                </p>
                <p className="truncate text-sm font-semibold text-white/75">
                  {selectedPhoto.alt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((current) => !current)}
                  className="grid min-h-12 min-w-12 place-items-center border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label={isPlaying ? "自動再生を止める" : "自動再生する"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Play className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={closePhoto}
                  className="grid min-h-12 min-w-12 place-items-center border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="閉じる"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className="relative mt-4 grid min-h-0 flex-1 place-items-center"
              onTouchStart={swipeHandlers.onTouchStart}
              onTouchEnd={swipeHandlers.onTouchEnd}
            >
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-0 z-10 grid min-h-12 min-w-12 place-items-center border border-white/15 bg-ink/70 text-white transition hover:bg-ink sm:left-4"
                aria-label="前の写真"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <img
                {...getResponsiveImageProps(selectedPhoto.src, "100vw")}
                alt={selectedPhoto.alt}
                className="max-h-[74vh] w-auto max-w-full object-contain shadow-paper"
              />
              <button
                type="button"
                onClick={showNext}
                className="absolute right-0 z-10 grid min-h-12 min-w-12 place-items-center border border-white/15 bg-ink/70 text-white transition hover:bg-ink sm:right-4"
                aria-label="次の写真"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              <span>
                {selectedIndex + 1} / {photoOrder.length}
              </span>
              <span>{isPlaying ? "Auto Play" : "Paused"}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
