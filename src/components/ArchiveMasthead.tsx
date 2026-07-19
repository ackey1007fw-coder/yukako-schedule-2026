import type { ReactNode } from "react";

type ArchiveMastheadProps = {
  title: ReactNode;
  copy?: string;
  tone?: "light" | "dark";
};

// アーカイブ一覧・個別記事ページ共通のマストヘッド。
// ホームの ACT ヘッダーと同じ文字組み（Playfair Display + 金の罫線）だが、
// 単体ページなので「ACT NN」の演目番号は付けない。
export function ArchiveMasthead({ title, copy, tone = "light" }: ArchiveMastheadProps) {
  const isDark = tone === "dark";

  return (
    <div className="mb-10 max-w-3xl">
      <p
        className={`mb-4 text-xs font-black uppercase tracking-[0.32em] ${
          isDark ? "text-champagne" : "text-champagneInk"
        }`}
      >
        YUKAKO STORY ARCHIVE
      </p>
      <h1
        className={`font-display text-4xl leading-tight sm:text-5xl ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h1>
      <div
        className="mt-5 h-px w-24 bg-gradient-to-r from-champagne to-transparent"
        aria-hidden="true"
      />
      {copy && (
        <p className={`mt-5 leading-8 ${isDark ? "text-white/75" : "text-ink/70"}`}>{copy}</p>
      )}
    </div>
  );
}
