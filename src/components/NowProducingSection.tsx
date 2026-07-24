import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CalendarPlus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock3,
  ExternalLink,
  Images,
  Instagram,
  MapPin,
  Music,
  PenLine,
  Palette,
  PlayCircle,
  Share2,
  Sparkles,
  Ticket,
  Users,
  X
} from "lucide-react";
import {
  gojetFeatureUpdates,
  gojetOriginUpdate,
  type DisplayGojetFeatureUpdate
} from "../data/gojetFeatureUpdates";
import { gojetPromoImages, type PromoImage } from "../data/gojetPromo";
import { isPastDeadline } from "../lib/date";
import { getRelatedGojetUpdates } from "../lib/engagement";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { googleCalendarUrl, SITE_URL, xShareUrl } from "../lib/share";
import type { ScheduleEvent } from "../types";
import { ActHeader } from "./ActHeader";
import { ExternalButton } from "./ExternalButton";

type NowProducingSectionProps = {
  event?: ScheduleEvent;
  now?: Date;
};

const INITIAL_VISIBLE_UPDATES = 2;
const CLOCK_UPDATE_MS = 60000;

const roles = [
  { label: "プロデュース", Icon: Sparkles },
  { label: "脚色", Icon: PenLine },
  { label: "楽曲", Icon: Music },
  { label: "デザイン", Icon: Palette },
  { label: "出演（B班JET / C班早紀）", Icon: Users }
];

const wrapIndex = (index: number, length: number) => (index + length) % length;

function PostSourceIcon({ url, className }: { url: string; className?: string }) {
  if (url.includes("instagram.com")) {
    return <Instagram className={className} aria-hidden="true" />;
  }

  return <ExternalLink className={className} aria-hidden="true" />;
}

function isInternalHref(url: string) {
  return url.startsWith("/") || url.startsWith("#");
}

function LinkedBodyText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(https?:\/\/[^\s]+)/g).map((part, index) =>
        part.startsWith("http") ? (
          <a
            key={`${part}-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-champagne underline underline-offset-4 transition hover:text-white"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

function UpdateLinkButtons({ update }: { update: DisplayGojetFeatureUpdate }) {
  const homepageIsPrimary = update.primaryCta === "homepage";
  const postIsInternal = isInternalHref(update.postUrl);
  const homepageIsInternal = isInternalHref(update.homepageUrl);
  const postButton = (
    <a
      href={update.postUrl}
      {...(postIsInternal
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      className={`yukako-button min-h-12 px-4 py-3 text-sm ${
        homepageIsPrimary ? "yukako-button-ghost" : "yukako-button-gold"
      }`}
    >
      <PostSourceIcon
        url={update.postUrl}
        className={`h-4 w-4 ${homepageIsPrimary ? "text-champagne" : ""}`}
      />
      {update.ctaLabel}
    </a>
  );
  const homepageButton = (
    <a
      href={update.homepageUrl}
      {...(homepageIsInternal
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      className={`yukako-button min-h-12 px-4 py-3 text-sm ${
        homepageIsPrimary ? "yukako-button-gold" : "yukako-button-ghost"
      }`}
    >
      {!homepageIsInternal && (
        <ExternalLink
          className={`h-4 w-4 ${homepageIsPrimary ? "" : "text-champagne"}`}
          aria-hidden="true"
        />
      )}
      {update.homepageLabel ?? "公演ホームページへ"}
    </a>
  );
  const shareButton = update.anchorId ? (
    <a
      href={xShareUrl(
        `${update.title}｜#ゆかJET の活動記録`,
        `${SITE_URL}#${update.anchorId}`,
        "yukajet_share",
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
    >
      <Share2 className="h-4 w-4 text-champagne" aria-hidden="true" />
      Xで共有
    </a>
  ) : null;

  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {homepageIsPrimary ? (
        <>
          {homepageButton}
          {postButton}
        </>
      ) : (
        <>
          {postButton}
          {homepageButton}
        </>
      )}
      {shareButton}
    </div>
  );
}

type VenueAccessInfo = NonNullable<
  NonNullable<DisplayGojetFeatureUpdate["videoGuide"]>["venue"]
>;

// 投稿紹介カードの補足として、会場アクセス（住所・最寄り・目印・地図導線）を表示する。
// 埋め込み地図は使わず、住所とGoogleマップの外部リンクだけで軽量に案内する。
function VenueAccess({
  venue,
  steps
}: {
  venue: VenueAccessInfo;
  steps?: string[];
}) {
  const query = encodeURIComponent(
    venue.mapQuery ?? `${venue.name} ${venue.address}`
  );
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <section
      className="mt-3 border border-champagne/30 bg-black/20 p-4"
      aria-label="会場アクセス"
    >
      <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-champagne">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
        会場アクセス
      </p>
      <p className="mt-2 text-sm font-black leading-6 text-white">
        {venue.name}
        {venue.floorNote && (
          <span className="ml-2 inline-flex items-center border border-champagne/40 bg-champagne/10 px-2 py-0.5 align-middle text-[11px] font-black text-champagne">
            {venue.floorNote}
          </span>
        )}
      </p>
      <p className="mt-1 text-sm leading-6 text-white/72">{venue.address}</p>
      {venue.nearestStation && (
        <p className="mt-1 text-sm leading-6 text-white/72">
          最寄り：
          <span className="font-bold text-white/85">{venue.nearestStation}</span>
        </p>
      )}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`現在地から${venue.name}への経路案内を開始する`}
          className="yukako-button yukako-button-gold min-h-12 px-4 py-3 text-sm"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          経路案内を開始する
        </a>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${venue.name}の地図をGoogleマップで開く`}
          className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
        >
          <ExternalLink className="h-4 w-4 text-champagne" aria-hidden="true" />
          Googleマップで開く
        </a>
      </div>
      {steps && steps.length > 0 && (
        <details className="mt-3 border border-white/12 bg-black/15 p-3">
          <summary className="cursor-pointer text-sm font-bold text-champagne">
            道順の目印を見る（初めての方向け）
          </summary>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-white/72 sm:leading-7">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </details>
      )}
    </section>
  );
}

function RelatedGojetLinks({ current }: { current: DisplayGojetFeatureUpdate }) {
  const related = getRelatedGojetUpdates(current, gojetFeatureUpdates);
  if (related.length === 0) return null;

  return (
    <aside className="mt-5 border-t border-white/12 pt-4" aria-label="関連する #ゆかJET の記録">
      <h5 className="text-sm font-black text-white">関連する #ゆかJET の記録</h5>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {related.map(({ candidate, sharedTags }) => (
          <li key={candidate.anchorId} className="min-w-0">
            <a
              href={`#${candidate.anchorId}`}
              className="flex min-h-24 flex-col border border-white/12 bg-black/15 p-3 text-left transition hover:border-champagne/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            >
              <span className="text-[11px] font-bold text-champagne">
                {candidate.date} ・ {sharedTags[0]}
              </span>
              <span className="mt-1.5 line-clamp-2 text-sm font-bold leading-5 text-white/85">
                {candidate.title}
              </span>
              <span className="mt-auto pt-2 text-xs font-bold text-champagne">
                この記録へ移動
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// 稽古写真・告知資料（相関図・タイムテーブル・チケット案内など）を拡大表示するための軽量ライトボックス。
// フォトギャラリーの本人スナップとは分け、#ゆかJET特集内だけで完結させる。
function PromoLightbox({
  photos,
  index,
  onClose,
  label
}: {
  photos: PromoImage[];
  index: number;
  onClose: () => void;
  label: string;
}) {
  const [current, setCurrent] = useState(index);
  const photo = photos[current];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((i) => wrapIndex(i - 1, photos.length));
      if (e.key === "ArrowRight") setCurrent((i) => wrapIndex(i + 1, photos.length));
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, photos.length]);

  // section-reveal の transform が containing block を作ってしまい、通常の
  // position:fixed だとビューポート基準からズレるため、body直下にPortalで描画する。
  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex h-[100dvh] flex-col overscroll-contain bg-[#312a2e]/[0.97] px-3 py-4 text-white sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-champagne">
          {current + 1} / {photos.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center border border-white/20 bg-white/10 transition hover:bg-white/20"
          aria-label="閉じる"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden py-4">
        <img
          {...getResponsiveImageProps(photo.src, "90vw")}
          alt={photo.alt}
          className="max-h-full max-w-full object-contain"
        />
        <button
          type="button"
          onClick={() => setCurrent((i) => wrapIndex(i - 1, photos.length))}
          className="absolute left-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-ink/70 text-white transition hover:bg-ink"
          aria-label="前の画像"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setCurrent((i) => wrapIndex(i + 1, photos.length))}
          className="absolute right-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-ink/70 text-white transition hover:bg-ink"
          aria-label="次の画像"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <p className="mx-auto w-full max-w-5xl text-center text-sm leading-6 text-white/75">
        {photo.alt}
      </p>
    </div>,
    document.body,
  );
}

// ヒーロー直下の #ゆかJET 特設ブロック（Now Producing billboard）。
// ポスター + カウントダウン + 役割リスト + 予約CTA + 特集ギャラリーを、舞台看板風の1枚にまとめる。
export function NowProducingSection({ event, now }: NowProducingSectionProps) {
  const [lightbox, setLightbox] = useState<{
    photos: PromoImage[];
    index: number;
    label: string;
  } | null>(null);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const [hashTarget, setHashTarget] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(() => now ?? new Date());

  useEffect(() => {
    if (now) {
      setCurrentTime(now);
      return undefined;
    }

    const timer = window.setInterval(() => setCurrentTime(new Date()), CLOCK_UPDATE_MS);
    return () => window.clearInterval(timer);
  }, [now]);

  useEffect(() => {
    const revealHashTarget = () => {
      const anchorId = window.location.hash.slice(1);
      if (!anchorId) return;

      const targetIndex = gojetFeatureUpdates.findIndex(
        (update) => update.anchorId === anchorId,
      );
      if (targetIndex < 0) return;

      if (targetIndex >= INITIAL_VISIBLE_UPDATES) {
        setShowAllUpdates(true);
      }
      setHashTarget(anchorId);
    };

    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);
    return () => window.removeEventListener("hashchange", revealHashTarget);
  }, []);

  useEffect(() => {
    if (!hashTarget) return undefined;

    // 一覧展開後に対象カードがDOMへ入ってからスクロールする。
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(hashTarget);
      if (!target) return;

      target.scrollIntoView({ behavior: "instant", block: "start" });
      setHashTarget(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hashTarget, showAllUpdates]);

  const visibleUpdates = showAllUpdates
    ? gojetFeatureUpdates
    : gojetFeatureUpdates.slice(0, INITIAL_VISIBLE_UPDATES);
  const remainingUpdates = Math.max(
    gojetFeatureUpdates.length - INITIAL_VISIBLE_UPDATES,
    0,
  );

  if (!event) {
    return (
      <section id="next" className="scroll-mt-24 bg-ink py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ActHeader
            act={1}
            eyebrow="Now Producing"
            title="#ゆかJET 公演情報"
            tone="dark"
            copy="新しい公演情報が決まり次第、ここに掲載します。"
          />
        </div>
      </section>
    );
  }

  const ticketLink =
    event.links.find((link) => link.kind === "ticket") ?? event.links[0];
  const infoLinks = event.links.filter((link) => link.kind === "info");

  return (
    <section id="next" className="scroll-mt-24 bg-ink py-8 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActHeader
          act={1}
          eyebrow="Now Producing"
          title="#ゆかJET 公演情報"
          tone="dark"
          copy="吉井優花子が企画・脚色から出演まで手がけるプロデュース公演。次の舞台をここでチェック。"
        />

        <article className="yukako-billboard border border-champagne/30">
          <span className="yukako-billboard-spotlight" aria-hidden="true" />
          <div className="relative z-10 grid gap-6 p-4 sm:gap-8 sm:p-10 lg:grid-cols-[0.86fr_1.14fr] lg:p-14">
            <div className="relative overflow-hidden border border-champagne/40 bg-black/20">
              {event.image ? (
                <img
                  {...getResponsiveImageProps(
                    event.image,
                    "(min-width: 1024px) 40vw, 100vw",
                  )}
                  alt={event.title}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center">
                  <p className="font-display text-5xl text-white/20">
                    {event.shortTitle}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between text-white">
              <div>
                <h3 className="font-display text-3xl leading-tight sm:text-4xl">
                  {event.title}
                </h3>
                <p className="mt-4 flex items-center gap-2 text-sm font-bold text-champagne">
                  <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {event.displayDate}
                </p>
                {event.venue && (
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white/72">
                    <MapPin className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                    {event.venue}
                  </p>
                )}

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {roles.map((role) => (
                    <li
                      key={role.label}
                      className="flex items-center gap-2.5 border border-white/12 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white/85"
                    >
                      <role.Icon className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                      {role.label}
                    </li>
                  ))}
                </ul>

                {gojetOriginUpdate && (
                  <aside
                    id="gojet-produce-announce-2026-06-11"
                    className="mt-5 scroll-mt-28 border border-champagne/45 bg-champagne/10 p-3 shadow-paper sm:mt-6 sm:p-4"
                    aria-labelledby="gojet-origin-title"
                  >
                    <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-4">
                      {gojetOriginUpdate.photos?.[0] && (
                        <img
                          {...getResponsiveImageProps(
                            gojetOriginUpdate.photos[0].src,
                            "88px",
                          )}
                          alt={gojetOriginUpdate.photos[0].alt}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[3/4] h-auto w-full object-contain"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-champagne">
                          #ゆかJETの原点 ・ {gojetOriginUpdate.date}
                        </p>
                        <h4
                          id="gojet-origin-title"
                          className="mt-1.5 text-base font-black leading-snug text-white sm:text-lg"
                        >
                          『GO,JET!GO!GO!』プロデュース発表
                        </h4>
                        <p className="mt-2 text-xs leading-5 text-white/72 sm:text-sm sm:leading-6">
                          出演者として挑んだ思い出の舞台を、今度はプロデューサーとして立ち上げた始まりの記録。
                        </p>
                      </div>
                    </div>
                    <a
                      href={gojetOriginUpdate.homepageUrl}
                      className="yukako-button yukako-button-gold mt-3 min-h-11 w-full px-4 py-2.5 text-sm sm:w-auto"
                    >
                      {gojetOriginUpdate.homepageLabel}
                    </a>
                  </aside>
                )}

                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-champagne sm:mt-6">
                  最新の活動記録
                </p>
                <div id="gojet-feature-updates" className="mt-3 grid gap-3">
                  {visibleUpdates.map((update, index) => (
                    <div
                      id={update.anchorId}
                      key={update.postUrl}
                      className="scroll-mt-28 border border-champagne/35 bg-white/[0.07] p-3 shadow-paper sm:p-4"
                    >
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">
                        {index === 0 ? "New" : "Update"} ・ {update.date} ・ {update.label}
                      </p>
                      <h4 className="mt-2 text-xl font-black leading-tight text-white">
                        {update.title}
                      </h4>
                      {update.supportColors && update.supportColors.length > 0 && (
                        <dl
                          aria-label="ペンライト応援カラー"
                          className="mt-3 grid grid-cols-2 gap-2"
                        >
                          {update.supportColors.map((item) => (
                            <div
                              key={`${item.team}-${item.role}`}
                              className={`min-w-0 border px-3 py-2.5 ${
                                item.tone === "pink"
                                  ? "border-rosefog/60 bg-rosefog/15"
                                  : "border-red-400/60 bg-red-950/25"
                              }`}
                            >
                              <dt className="text-[11px] font-bold text-white/65">
                                {item.team}・{item.role}
                              </dt>
                              <dd className="mt-0.5 text-sm font-black text-white">
                                <span aria-hidden="true">{item.emoji}</span>{" "}
                                {item.color}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {update.roleTags && update.roleTags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {update.roleTags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 border border-champagne/40 bg-champagne/10 px-2.5 py-1 text-[11px] font-black text-champagne"
                            >
                              <Users className="h-3 w-3 shrink-0" aria-hidden="true" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/72 sm:leading-7">
                        <LinkedBodyText text={update.body} />
                      </p>
                      {update.videoGuide && (
                        <div className="mt-4">
                          <a
                            href={update.videoGuide.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${update.videoGuide.alt}（Xで開く）`}
                            className="flex items-center gap-3 border border-champagne/60 bg-champagne/10 p-4 transition hover:border-champagne hover:bg-champagne/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:gap-4"
                          >
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-champagne/60 bg-black/25">
                              <PlayCircle
                                className="h-7 w-7 text-champagne"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-black text-white sm:text-base">
                                劇場までの行き方動画
                              </span>
                              {update.videoGuide.note && (
                                <span className="mt-0.5 block text-xs font-bold text-white/70">
                                  {update.videoGuide.note}
                                </span>
                              )}
                              <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-black text-champagne sm:text-sm">
                                <ExternalLink
                                  className="h-4 w-4 shrink-0"
                                  aria-hidden="true"
                                />
                                {update.videoGuide.buttonLabel}
                              </span>
                            </span>
                          </a>
                          {update.videoGuide.venue ? (
                            <VenueAccess
                              venue={update.videoGuide.venue}
                              steps={update.videoGuide.steps}
                            />
                          ) : (
                            update.videoGuide.steps &&
                            update.videoGuide.steps.length > 0 && (
                              <details className="mt-2 border border-white/12 bg-black/15 p-3">
                                <summary className="cursor-pointer text-sm font-bold text-champagne">
                                  道順を詳しく見る
                                </summary>
                                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-white/72 sm:leading-7">
                                  {update.videoGuide.steps.map((step) => (
                                    <li key={step}>{step}</li>
                                  ))}
                                </ol>
                              </details>
                            )
                          )}
                        </div>
                      )}
                      {update.caption && (
                        <details className="mt-3 border border-white/12 bg-black/15 p-3">
                          <summary className="cursor-pointer text-sm font-bold text-champagne">
                            投稿本文を読む
                          </summary>
                          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/72 sm:leading-7">
                            <LinkedBodyText text={update.caption} />
                          </p>
                        </details>
                      )}
                      {update.quotedPost && (
                        <aside
                          className="mt-3 border-l-4 border-champagne/70 bg-black/20 p-3 sm:p-4"
                          aria-label="引用元投稿"
                        >
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-champagne">
                            引用元投稿
                          </p>
                          <p className="mt-1 text-sm font-black text-white">
                            {update.quotedPost.author}（{update.quotedPost.handle}）
                          </p>
                          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/72 sm:leading-7">
                            {update.quotedPost.body}
                          </p>
                          {update.quotedPost.url && (
                            <a
                              href={update.quotedPost.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-champagne underline underline-offset-4 transition hover:text-white"
                            >
                              <ExternalLink
                                className="h-3.5 w-3.5 shrink-0"
                                aria-hidden="true"
                              />
                              {update.quotedPost.urlLabel ?? "引用元の投稿を見る"}
                            </a>
                          )}
                        </aside>
                      )}
                      {update.photo && (
                        <button
                          type="button"
                          onClick={() =>
                            setLightbox({
                              photos: [update.photo as PromoImage],
                              index: 0,
                              label: `${update.title} 画像`
                            })
                          }
                          className="mt-4 block w-full overflow-hidden border border-white/12 bg-black/20"
                          aria-label={`${update.photo.alt}を拡大表示`}
                        >
                          <img
                            {...getResponsiveImageProps(
                              update.photo.src,
                              "(min-width: 1024px) 40vw, 100vw",
                            )}
                            alt={update.photo.alt}
                            loading="lazy"
                            decoding="async"
                            className="mx-auto block h-auto max-h-[520px] w-auto max-w-full object-contain object-top"
                          />
                        </button>
                      )}
                      {update.photos && update.photos.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {update.photos.map((photo, photoIndex) => (
                            <button
                              key={photo.src}
                              type="button"
                              onClick={() =>
                                setLightbox({
                                  photos: update.photos ?? [],
                                  index: photoIndex,
                                  label: `${update.title} 画像ギャラリー`
                                })
                              }
                              className="overflow-hidden border border-white/12 bg-black/20"
                              aria-label={`${photo.alt}を拡大表示`}
                            >
                              <img
                                {...getResponsiveImageProps(
                                  photo.src,
                                  "(min-width: 1024px) 20vw, 50vw",
                                )}
                                alt={photo.alt}
                                loading="lazy"
                                decoding="async"
                                className="block h-auto w-full object-contain"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                      {update.schedule &&
                        update.schedule.items.length > 0 && (
                          <div
                            className="mt-4 border border-champagne/30 bg-black/20 p-4"
                            aria-label={update.schedule.heading}
                          >
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-champagne">
                              {update.schedule.heading}
                            </p>
                            <ul className="mt-3 grid gap-2">
                              {update.schedule.items.map((item) => (
                                <li
                                  key={`${item.time}-${item.label}`}
                                  className="flex items-baseline gap-3 border-b border-white/10 pb-2 last:border-0 last:pb-0"
                                >
                                  <span className="shrink-0 text-sm font-black text-champagne">
                                    {item.time}
                                  </span>
                                  <span className="min-w-0 text-sm font-bold text-white">
                                    {item.label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {update.schedule.note && (
                              <p className="mt-3 text-xs font-bold text-white/60">
                                {update.schedule.note}
                              </p>
                            )}
                          </div>
                        )}
                      {update.goods && update.goods.items.length > 0 && (
                        <div
                          className="mt-4 border border-champagne/30 bg-black/20 p-4"
                          aria-label={update.goods.heading}
                        >
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-champagne">
                            {update.goods.heading}
                          </p>
                          <ul className="mt-3 grid gap-2">
                            {update.goods.items.map((item) => (
                              <li
                                key={item.name}
                                className="flex flex-col gap-0.5 border-b border-white/10 pb-2 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3"
                              >
                                <span className="min-w-0 text-sm font-bold text-white">
                                  {item.name}
                                  {item.detail && (
                                    <span className="mt-0.5 block text-xs font-bold text-white/60">
                                      {item.detail}
                                    </span>
                                  )}
                                </span>
                                <span className="shrink-0 text-sm font-black text-champagne">
                                  {item.price}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {update.goods.note && (
                            <p className="mt-3 text-xs font-bold text-white/60">
                              {update.goods.note}
                            </p>
                          )}
                        </div>
                      )}
                      {update.video && (
                        <video
                          controls
                          playsInline
                          preload="none"
                          poster={update.video.poster}
                          aria-label={update.video.label}
                          className="mt-4 block max-h-[420px] w-full border border-white/12 bg-black object-contain"
                        >
                          <source src={update.video.src} type="video/mp4" />
                        </video>
                      )}
                      {update.deadline && (
                        <p className="mt-4 inline-flex w-fit items-center gap-2 border border-champagne/50 bg-champagne/10 px-3 py-2 text-xs font-black text-champagne">
                          <Clock3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          {isPastDeadline(update.deadline.at, currentTime)
                            ? update.deadline.afterText
                            : update.deadline.beforeText}
                        </p>
                      )}
                      <UpdateLinkButtons update={update} />
                      <RelatedGojetLinks current={update} />
                    </div>
                  ))}
                </div>
                {remainingUpdates > 0 && (
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllUpdates((current) => !current)}
                      className="yukako-button yukako-button-ghost min-h-12 px-5 py-3 text-sm"
                      aria-expanded={showAllUpdates}
                      aria-controls="gojet-feature-updates"
                    >
                      {showAllUpdates ? (
                        <ChevronUp className="h-4 w-4 text-champagne" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-champagne" aria-hidden="true" />
                      )}
                      {showAllUpdates
                        ? "最新のお知らせだけ表示"
                        : `過去の稽古場だより一覧を見る（残り${remainingUpdates}件）`}
                    </button>
                  </div>
                )}

                <p className="mt-6 text-base leading-8 text-white/72">{event.summary}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {ticketLink && (
                  <ExternalButton href={ticketLink.url} variant="gold" className="w-full sm:w-auto">
                    <span className="inline-flex items-center gap-2">
                      <Ticket className="h-4 w-4" aria-hidden="true" />
                      {ticketLink.kind === "ticket" ? "チケット予約" : ticketLink.label}
                    </span>
                  </ExternalButton>
                )}
                <a
                  href={googleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
                >
                  <CalendarPlus className="h-4 w-4 text-champagne" aria-hidden="true" />
                  カレンダーに追加
                </a>
                <a
                  href="#support"
                  className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
                >
                  応援メニューを見る
                </a>
              </div>

              {infoLinks.length > 0 && (
                <ul className="mt-6 grid gap-2 border-t border-white/10 pt-6">
                  {infoLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/75 underline underline-offset-4 transition hover:text-champagne"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {gojetPromoImages.length > 0 && (
            <div className="relative z-10 border-t border-white/10 p-4 sm:p-10 lg:p-14 lg:pt-0">
              <p className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagne">
                <Images className="h-4 w-4" aria-hidden="true" />
                #ゆかJET 特集（稽古写真・相関図・チケット案内）
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {gojetPromoImages.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() =>
                      setLightbox({
                        photos: gojetPromoImages,
                        index,
                        label: "#ゆかJET 特集ギャラリー"
                      })
                    }
                    className="group relative aspect-[3/4] overflow-hidden border border-white/12 bg-black/20 transition hover:border-champagne/60"
                    aria-label={`${photo.alt}を拡大表示`}
                  >
                    <img
                      {...getResponsiveImageProps(photo.src, "160px")}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain transition group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      {lightbox && (
        <PromoLightbox
          photos={lightbox.photos}
          index={lightbox.index}
          label={lightbox.label}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
