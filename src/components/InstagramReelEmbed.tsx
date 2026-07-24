import { useEffect } from "react";
import { loadInstagramEmbedScript } from "../lib/instagramEmbed";

type InstagramReelEmbedProps = {
  url: string;
  label: string;
};

export function InstagramReelEmbed({ url, label }: InstagramReelEmbedProps) {
  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript()
      .then(() => {
        if (!cancelled) window.instgrm?.Embeds.process();
      })
      .catch(() => {
        // 読み込み失敗時はblockquote内のフォールバックリンク・下の元投稿リンクで代替する
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div style={{ aspectRatio: "9 / 16" }}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ margin: "0 auto", width: "100%" }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        </blockquote>
      </div>
      <p className="mt-3 text-center text-xs leading-6 text-ink/50">
        埋め込みが表示されない場合は
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1 font-bold text-champagneInk underline underline-offset-2 hover:text-rosefog"
        >
          Instagramの投稿
        </a>
        からご覧ください。
      </p>
    </div>
  );
}
