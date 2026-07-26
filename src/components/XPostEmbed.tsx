import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { loadXEmbedScript } from "../lib/xEmbed";

type XPostEmbedProps = {
  url: string;
  label: string;
};

type EmbedStatus = "loading" | "loaded" | "failed";

// widgets.jsの読み込み・変換が極端に遅い/失敗する環境向けのタイムアウト。
// これを超えたらスケルトンを消し、フォールバックのリンクカードへ切り替える。
const EMBED_TIMEOUT_MS = 6000;

export function XPostEmbed({ url, label }: XPostEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<EmbedStatus>("loading");

  useEffect(() => {
    let cancelled = false;
    // タイムアウト後にフォールバックカードへ切り替えたら、それより遅れて届く
    // widgets.load()の結果は無視する。そうしないと、既にアンマウントされた
    // blockquoteをXが処理した結果が届いた際に、未処理のblockquoteを再マウント
    // してしまい、埋め込みにもフォールバックにもならない状態になる。
    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      if (!cancelled) setStatus((current) => (current === "loading" ? "failed" : current));
    }, EMBED_TIMEOUT_MS);

    loadXEmbedScript()
      .then(() => {
        if (cancelled || !window.twttr) throw new Error("twttr widgets unavailable");
        return window.twttr.widgets.load(containerRef.current ?? undefined);
      })
      .then((elements) => {
        if (cancelled || timedOut) return;
        window.clearTimeout(timeoutId);
        setStatus(elements.length > 0 ? "loaded" : "failed");
      })
      .catch(() => {
        if (!cancelled && !timedOut) setStatus("failed");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [url]);

  return (
    <div className="mx-auto w-full max-w-[550px]">
      {status !== "failed" && (
        <div ref={containerRef} className="relative min-h-[300px]">
          <blockquote className="twitter-tweet" data-lang="ja" data-dnt="true">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </blockquote>
          {status === "loading" && (
            <div
              className="yukako-skeleton absolute inset-0 border border-champagne/30"
              aria-hidden="true"
            />
          )}
        </div>
      )}
      {status === "failed" && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label}（Xで開く）`}
          className="flex min-h-[120px] items-center gap-3 border border-champagne/40 bg-porcelain p-4 transition hover:border-champagne hover:bg-white"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-champagne/50 bg-white text-champagneInk">
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-ink">Xで投稿を見る</span>
            <span className="mt-1 block break-all text-xs font-semibold text-champagneInk">
              {url}
            </span>
          </span>
        </a>
      )}
    </div>
  );
}
