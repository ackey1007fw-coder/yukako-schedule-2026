import { useState } from "react";
import type { ArchiveVideo } from "../data/archive";
import { getOptimizedImageUrl } from "../lib/responsiveImage";

type ArchiveVideoBlockProps = {
  video: ArchiveVideo;
};

export function ArchiveVideoBlock({ video }: ArchiveVideoBlockProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="my-10 border border-champagne/30 bg-ink p-5 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-champagne">
        {video.heading}
      </p>
      <h2 className="mt-2 font-display text-2xl leading-tight text-white sm:text-3xl">
        {video.subheading}
      </h2>
      <p className="mt-4 leading-8 text-white/75">{video.description}</p>

      <div className="mx-auto mt-6 max-w-[360px]">
        {hasError ? (
          <div className="flex aspect-[3/4] flex-col items-center justify-center gap-2 border border-white/12 bg-black/40 p-6 text-center">
            <p className="text-sm font-bold text-white/80">動画を再生できませんでした</p>
            <p className="text-xs text-white/55">下のリンクから元の投稿をご覧ください。</p>
          </div>
        ) : (
          <div className="aspect-[3/4] overflow-hidden border border-white/12 bg-black">
            {/* videoのsrcは<source>子要素ではなく本体属性で指定する。<source>だと読み込み失敗の
                errorイベントがsource側で発火し、onErrorフォールバックが動かない */}
            {video.type === "drive" ? (
              <iframe
                src={video.src}
                title={video.label}
                loading="lazy"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <video
                src={video.src}
                controls
                playsInline
                preload="none"
                poster={getOptimizedImageUrl(video.poster)}
                aria-label={video.label}
                className="block h-full w-full object-contain"
                onError={() => setHasError(true)}
              />
            )}
          </div>
        )}
      </div>

      <p className="mt-5 text-center text-xs leading-6 text-white/50">
        動画が再生できない場合は
        <a
          href={video.fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1 font-bold text-champagne underline underline-offset-2 hover:text-white"
        >
          元の投稿
        </a>
        からご覧ください。
      </p>
    </div>
  );
}
