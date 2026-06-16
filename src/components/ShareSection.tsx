import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { profile } from "../data/profile";
import { SITE_URL, lineShareUrl, xShareUrl } from "../lib/share";

export function ShareSection() {
  const [copied, setCopied] = useState(false);
  const url = SITE_URL;
  const text = `${profile.name}（${profile.kana}）さんの応援スケジュール`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* クリップボード非対応時は何もしない */
    }
  };

  return (
    <section className="bg-porcelain px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-y border-champagne/30 py-10 text-center">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase text-champagne">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </p>
        <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          このページをシェア
        </h2>
        <p className="mt-3 leading-8 text-ink/65">
          友達にも教えて、一緒に里季ちゃんを応援しよう。
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={xShareUrl(text, url)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-ink bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-[#4a3942] sm:w-auto"
          >
            Xでシェア
          </a>
          <a
            href={lineShareUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#06c755] bg-[#06c755] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 sm:w-auto"
          >
            LINEで送る
          </a>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-rosefog/40 bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-champagne sm:w-auto"
          >
            {copied ? (
              <Check className="h-4 w-4 text-champagne" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4 text-champagne" aria-hidden="true" />
            )}
            {copied ? "コピーしました" : "リンクをコピー"}
          </button>
        </div>
      </div>
    </section>
  );
}
