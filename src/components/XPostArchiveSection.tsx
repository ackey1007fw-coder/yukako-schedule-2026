import { useMemo, useState } from "react";
import { ArrowUpRight, Camera, ChevronDown, Search } from "lucide-react";
import {
  xArchivePosts,
  type XArchiveAccount,
  type XArchiveImage
} from "../data/xPostArchive";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { PhotoLightbox } from "./PhotoLightbox";
import { SectionHeader } from "./SectionHeader";
import { XPostEmbed } from "./XPostEmbed";

type AccountFilter = "all" | XArchiveAccount;

const PAGE_SIZE = 12;
const accountFilters: { label: string; value: AccountFilter }[] = [
  { label: "すべて", value: "all" },
  { label: "優花子さん @mokoopy", value: "mokoopy" },
  { label: "プロデュース @yukako_produce", value: "yukako_produce" }
];

const accountLabel: Record<XArchiveAccount, string> = {
  mokoopy: "@mokoopy",
  yukako_produce: "@yukako_produce"
};

type Viewer = { images: XArchiveImage[]; index: number; label: string };

export function XPostArchiveSection() {
  const [account, setAccount] = useState<AccountFilter>("all");
  const [photosOnly, setPhotosOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [embeddedPosts, setEmbeddedPosts] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("ja");
    return xArchivePosts.filter((post) => {
      if (account !== "all" && post.account !== account) return false;
      if (photosOnly && post.images.length === 0) return false;
      return !term || [
        post.title, post.summary ?? "", post.category,
        post.date, accountLabel[post.account]
      ].some((value) => value.toLocaleLowerCase("ja").includes(term));
    });
  }, [account, photosOnly, query]);

  const visible = filtered.slice(0, limit);

  const changeAccount = (next: AccountFilter) => {
    setAccount(next);
    setLimit(PAGE_SIZE);
  };

  return (
    <section id="x-posts" className="scroll-mt-32 bg-[#fff8f4] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="X Post Archive"
          title="優花子さんのX投稿をたどる"
          copy="舞台の稽古も、秋田での一枚も。優花子さんとプロデュース公演の投稿を、写真といっしょに振り返れます。"
        />
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-ink/70">
          <span className="font-bold text-champagneInk">
            収録 {xArchivePosts.length}件
          </span>
          <span className="h-4 w-px bg-champagne/40" aria-hidden="true" />
          <span>サイトに出典を登録済みのX投稿</span>
        </div>

        <div className="mb-7 rounded-xl border border-rosefog/20 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Xアカウントで絞り込む">
            {accountFilters.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={account === option.value}
                onClick={() => changeAccount(option.value)}
                className={`min-h-11 max-w-full break-words rounded-full border px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
                  account === option.value
                    ? "border-rosefog bg-rosefog text-white"
                    : "border-rosefog/20 bg-porcelain text-ink/80 hover:border-rosefog"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block w-full max-w-md">
              <span className="sr-only">投稿のキーワード検索</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/55" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setLimit(PAGE_SIZE); }}
                placeholder="作品名・キーワード・年月で探す"
                className="min-h-11 w-full rounded-lg border border-champagne/35 bg-porcelain pl-10 pr-3 text-sm text-ink outline-none focus-visible:border-rosefog focus-visible:ring-2 focus-visible:ring-rosefog/25"
              />
            </label>
            <button
              type="button"
              aria-pressed={photosOnly}
              onClick={() => { setPhotosOnly((current) => !current); setLimit(PAGE_SIZE); }}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-bold transition ${
                photosOnly
                  ? "border-champagneInk bg-[#fff1d6] text-ink"
                  : "border-champagne/35 bg-white text-ink/75 hover:border-champagneInk"
              }`}
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              写真・画像付きのみ
            </button>
          </div>
        </div>

        <p className="mb-4 text-sm text-ink/65" role="status">
          {filtered.length}件中 {visible.length}件を表示
        </p>

        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <article key={post.id} className="yukako-card flex min-w-0 flex-col overflow-hidden border-rosefog/20 bg-white">
                {post.images.length > 0 ? (
                  <div className={`grid gap-1 border-b border-rosefog/15 bg-porcelain p-1 ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {post.images.slice(0, 4).map((photo, index) => (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setViewer({
                          images: post.images,
                          index,
                          label: `${post.title} の写真`
                        })}
                        aria-label={`${post.title} の画像${index + 1}を拡大`}
                        className="flex h-44 min-w-0 items-center justify-center overflow-hidden bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-rosefog sm:h-48"
                      >
                        <img
                          {...getResponsiveImageProps(
                            photo.src,
                            "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 94vw"
                          )}
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                          className="block max-h-full max-w-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-16 items-center justify-between border-b border-rosefog/10 bg-rosefog/5 px-5">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-rosefog">X POST</span>
                    <span className="text-xs text-ink/50">元投稿へのリンクあり</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-champagneInk">{post.date}</span>
                    <span className="rounded-full bg-rosefog/10 px-2 py-1 font-bold text-rosefog">
                      {accountLabel[post.account]}
                    </span>
                    {post.images.length > 0 && (
                      <span className="inline-flex items-center gap-1 text-ink/60">
                        <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.images.length}枚
                      </span>
                    )}
                  </div>
                  <h3 className={`${post.embedXPost ? "" : "line-clamp-3 "}break-words text-base font-bold leading-7 text-ink`}>
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-ink/70">
                      {post.summary}
                    </p>
                  )}
                  {post.embedXPost && (
                    <div className="mt-4 min-w-0 [&_iframe]:max-w-full">
                      {embeddedPosts.has(post.id) ? (
                        <XPostEmbed url={post.sourceUrl} label={`${post.date} ${accountLabel[post.account]}の投稿`} />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEmbeddedPosts((current) => new Set([...current, post.id]))}
                          className="min-h-11 w-full rounded-lg border border-rosefog/30 bg-porcelain px-3 py-2 text-sm font-bold text-rosefog hover:bg-rosefog/5"
                        >
                          元投稿を表示（X）
                        </button>
                      )}
                    </div>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-5 text-sm font-bold">
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1 text-rosefog underline underline-offset-4 hover:text-ink"
                    >
                      Xで元投稿を見る
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    {post.detailAnchor && (
                      <a className="inline-flex min-h-11 items-center text-champagneInk underline underline-offset-4" href={post.detailAnchor}>
                        サイト内の記録
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-rosefog/20 bg-white px-5 py-8 text-center text-sm text-ink/65">
            この条件に合う投稿はまだありません。検索語や絞り込みを変えてみてね。
          </p>
        )}

        {visible.length < filtered.length && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setLimit((current) => current + PAGE_SIZE)}
              className="yukako-button inline-flex min-h-12 items-center gap-2 rounded-full border border-rosefog px-7 text-sm font-bold text-rosefog transition hover:bg-white"
            >
              過去の投稿をもっと見る
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <p className="mt-6 max-w-3xl text-xs leading-6 text-ink/60">
          ここにあるのは、この応援サイトで元投稿URLと内容を記録できた分です。
          Xの全投稿を自動収集した一覧ではありません。写真は元投稿と対応が確認できた既存画像だけを掲載しています。
          投稿の原文や動画は「Xで元投稿を見る」からどうぞ。
        </p>
      </div>
      {viewer && (
        <PhotoLightbox
          photos={viewer.images}
          index={viewer.index}
          label={viewer.label}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
