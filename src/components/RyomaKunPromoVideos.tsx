import { ArrowUpRight, Clapperboard } from "lucide-react";
import {
  ryomaKunPromoSource,
  ryomaKunPromoVideos
} from "../data/ryomaKun";
import { getOptimizedImageUrl } from "../lib/responsiveImage";

export function RyomaKunPromoVideos() {
  return (
    <div id="ryoma-kun-promo" className="mt-8 border border-champagne/30 bg-[#2a1418] p-6 shadow-paper sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-champagne">
            <Clapperboard className="h-4 w-4 text-champagne" aria-hidden="true" />
            Promo Movie
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-porcelain">
            宣伝用に、本人がつくった稽古場ムービー
          </h3>
          <p className="mt-3 text-sm leading-7 text-porcelain/70">
            {ryomaKunPromoSource.note}。B班・C班それぞれ1本ずつ、稽古場のままの2本。
          </p>
        </div>
        <a
          href={ryomaKunPromoSource.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-champagne/40 bg-[#351a20] px-4 py-2 text-sm font-bold text-porcelain transition hover:border-champagne hover:bg-[#3f2027]"
        >
          {ryomaKunPromoSource.label}
          <ArrowUpRight className="h-4 w-4 text-champagne" aria-hidden="true" />
        </a>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {ryomaKunPromoVideos.map((video) => (
          <li
            key={video.src}
            className="flex flex-col border border-champagne/30 bg-[#351a20] p-4 sm:p-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl leading-none text-champagne">
                {video.group}
              </span>
              <span className="text-xs font-black uppercase tracking-[0.14em] text-porcelain/70">
                {video.role}
              </span>
              <span className="ml-auto text-xs font-bold text-porcelain/50">
                {video.duration}
              </span>
            </div>

            <div className="mt-4 overflow-hidden border border-white/10 bg-black">
              <video
                src={video.src}
                controls
                playsInline
                preload="none"
                poster={getOptimizedImageUrl(video.poster)}
                aria-label={video.label}
                className="block aspect-[3/4] w-full object-contain"
              />
            </div>

            <p className="mt-4 text-sm leading-7 text-porcelain/75">{video.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
