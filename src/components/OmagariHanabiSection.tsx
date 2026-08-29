import { ExternalLink } from "lucide-react";
import { getOptimizedImageUrl, getResponsiveImageProps } from "../lib/responsiveImage";
import { trackPortalEvent } from "../lib/analytics";
import { SectionHeader } from "./SectionHeader";

const PHOTO_SRC = "/images/yukako-omagari-hanabi-komachi-megenai-2026-08-29.jpg";
const VIDEO_SRC = "/videos/instagram-omagari-hanabi-hiruhanabi-2026-08-29.mp4";
const VIDEO_POSTER = "/images/yukako-omagari-hanabi-hiruhanabi-poster-2026-08-29.jpg";
const X_POST_URL = "https://x.com/mokoopy/status/2093618569678574046";
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/yoppy_777";

export function OmagariHanabiSection() {
  return (
    <section id="omagari-hanabi" className="scroll-mt-32 bg-porcelain py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Akita / Omagari"
          title="「しったげめんけべ？✨」"
          copy="しったげ＝とっても、めんけ＝可愛い。#大曲の花火 の昼花火と、こまちめげないTシャツ。"
        />

        <article className="yukako-card overflow-hidden border-rosefog/25 bg-white shadow-paper">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="min-w-0 border-b border-rosefog/15 bg-porcelain lg:border-b-0 lg:border-r">
              <img
                {...getResponsiveImageProps(PHOTO_SRC, "(min-width: 1024px) 50vw, 100vw")}
                alt="ピンクの『こまちめげない』Tシャツの文字を指さして微笑む吉井優花子さん"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full bg-porcelain object-contain"
              />
            </div>

            <div className="flex min-w-0 items-center justify-center bg-ink p-4 sm:p-6">
              <div className="aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-sm border border-white/15 bg-black">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={getOptimizedImageUrl(VIDEO_POSTER)}
                  aria-label="大曲の花火の昼花火（Instagram @yoppy_777）"
                  className="h-full w-full bg-black object-contain"
                >
                  <source src={VIDEO_SRC} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="border-t border-rosefog/15 p-6 sm:p-8">
            <p className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-champagneInk">
              <span className="border border-rosefog/40 bg-[#fff1f6] px-2 py-0.5 text-[#8d4260]">
                New
              </span>
              <span className="border border-champagne/45 bg-porcelain px-2 py-0.5">X</span>
              <span className="text-ink/45">2026.8.29 17:35</span>
            </p>

            <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
              こまちめげないTシャツを指さして。
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/70">
              シャツには「こまちめげない / AKITA-MON」。昼花火の動画は Instagram @yoppy_777 から。
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={X_POST_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("sns_click", {
                    kind: "x",
                    placement: "omagari_hanabi"
                  })
                }
                className="yukako-button yukako-button-gold inline-flex min-h-12 items-center justify-center gap-1.5 px-5 py-3 text-sm"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Xでこの投稿を見る
              </a>
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("sns_click", {
                    kind: "instagram",
                    placement: "omagari_hanabi_instagram"
                  })
                }
                className="yukako-button inline-flex min-h-12 items-center justify-center border border-champagne bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"
              >
                Instagram @yoppy_777
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
