import { useEffect, useRef, useState } from "react";
import { InstagramReelEmbed } from "./InstagramReelEmbed";

// Instagram公式embed.jsは画面外のカードでも読み込まれるとページ全体のパフォーマンスを落とすため、
// 実際にビューポート付近へ入ってから初めてマウントする。
export function LazyInstagramEmbed({ url, label }: { url: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "200px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldLoad ? (
        <InstagramReelEmbed url={url} label={label} />
      ) : (
        <div
          style={{ aspectRatio: "9 / 16" }}
          className="mx-auto flex w-full max-w-[420px] items-center justify-center border border-champagne/25 bg-porcelain text-xs font-bold text-ink/40"
        >
          読み込み中…
        </div>
      )}
    </div>
  );
}
