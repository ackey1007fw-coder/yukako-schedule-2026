import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronDown, Clock3, Radio } from "lucide-react";
import { profile } from "../data/profile";
import { streamRecaps, type PublishedStreamRecap, type StreamRecap } from "../data/streamRecaps";
import { recapAnchor, recapDateLabel, recordingLabel, sortStreamRecaps } from "../lib/streamRecaps";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { scrollToSection } from "../lib/scrollToSection";

const focusStyle = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rosefog";

function RecapPart({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section aria-labelledby={id} className="mt-7">
    <h4 id={id} className="border-l-2 border-rosefog pl-3 text-base font-bold text-ink">{title}</h4>
    {children}
  </section>;
}

function RecapContent({ recap }: { recap: PublishedStreamRecap }) {
  return <>
    {recap.image && <div className="mt-5 text-sm leading-7 text-ink/75">
      <p>{recap.image.caption}</p>
      <a href={recap.image.src} download={recap.image.downloadName} className={`inline-flex min-h-11 items-center text-sm font-bold text-champagneInk underline underline-offset-4 ${focusStyle}`}>配信画像を保存</a>
    </div>}
    {recap.clip && <RecapPart id={`${recap.id}-clip`} title="声で振り返る、この回のひとこま">
      <figure className="mt-4 max-w-sm">
        <video controls playsInline preload="metadata" width={720} height={1280} poster={recap.clip.poster} className="block aspect-[9/16] w-full bg-ink object-contain" aria-label={`${recap.title}の音声付き切り抜き`}>
          <source src={recap.clip.src} type="video/mp4" />
          お使いのブラウザでは動画を再生できません。
        </video>
        <figcaption className="mt-2 text-sm leading-6 text-ink/75">{recap.clip.caption}</figcaption>
      </figure>
      <p className="mt-3 max-w-sm text-xs leading-6 text-ink/70">音声テキスト（自動認識を整文。聞き取りにくい箇所は省略）：{recap.clip.transcript}</p>
    </RecapPart>}
    {recap.timestampNote && <p className="mt-4 border-l-2 border-champagne/40 pl-3 text-xs leading-6 text-ink/70">{recap.timestampNote}</p>}
    {!!recap.songs?.length && <RecapPart id={`${recap.id}-songs`} title="この回に歌った曲">
      <p className="mt-3 text-xs leading-6 text-ink/70">時刻は録画内の目安。原曲へのリンクは、優花子さんの歌唱映像とは別のものです。</p>
      <ol className="mt-3 space-y-3">{recap.songs.map((song) => <li key={`${song.timestamp}-${song.title}`} className="min-w-0 border border-champagne/25 bg-porcelain p-4">
        <p className="text-xs tabular-nums text-champagneInk">{song.timestamp}頃</p>
        <p className="mt-1 break-words font-bold">{song.title}</p>
        <p className="mt-1 break-words text-sm text-ink/70">{song.artist}</p>
        {song.originalUrl && <a href={song.originalUrl} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-champagneInk underline underline-offset-4 ${focusStyle}`}>原曲を聴く<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}
      </li>)}</ol>
    </RecapPart>}
    {!!recap.highlights?.length && <RecapPart id={`${recap.id}-highlights`} title="この回の見どころ">
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">{recap.highlights.map((item) => <li key={`${item.timestamp}-${item.title}`} className="min-w-0 border border-rosefog/15 bg-porcelain p-4">
        <p className="text-xs tabular-nums text-champagneInk">{item.timestamp}</p>
        <h5 className="mt-2 break-words font-bold">{item.title}</h5>
        <p className="mt-2 break-words text-sm leading-7 text-ink/80">{item.body}</p>
      </li>)}</ul>
    </RecapPart>}
    {!!recap.gallery?.length && <RecapPart id={`${recap.id}-stills`} title="この回のスクショ">
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{recap.gallery.map((image) => <li key={image.src} className="min-w-0">
        <figure className="overflow-hidden border border-champagne/25 bg-porcelain">
          <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`${image.alt}（画像を新しいタブで開く）`} className={`block ${focusStyle}`}>
            <img {...getResponsiveImageProps(image.src, "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw")} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" className="block h-auto w-full object-contain" />
          </a>
          <figcaption className="px-4 pt-3 text-sm leading-6 text-ink/75">{image.caption}</figcaption>
          <a href={image.src} download={image.downloadName} className={`mx-4 inline-flex min-h-11 items-center text-sm font-bold text-champagneInk underline underline-offset-4 ${focusStyle}`}>写真を保存</a>
        </figure>
      </li>)}</ul>
      {recap.galleryZip && <a href={recap.galleryZip.src} download={recap.galleryZip.filename} className={`mt-4 inline-flex min-h-11 items-center border border-rosefog/30 px-4 text-sm font-bold text-ink ${focusStyle}`}>スクショをまとめて保存</a>}
    </RecapPart>}
    {!!recap.timeline?.length && <details className="mt-7 border-t border-champagne/25 pt-4">
      <summary className={`min-h-11 cursor-pointer py-2 text-sm font-bold ${focusStyle}`}>タイムスタンプ</summary>
      <ol className="mt-3 space-y-3">{recap.timeline.map((item) => <li key={`${item.timestamp}-${item.label}`} className="flex min-w-0 gap-3 text-sm leading-6">
        <span className="shrink-0 tabular-nums text-champagneInk">{item.timestamp}</span><span className="min-w-0 break-words">{item.label}</span>
      </li>)}</ol>
    </details>}
    {recap.nextNote && <RecapPart id={`${recap.id}-next`} title="配信時点の次回案内">
      <p className="mt-3 text-sm leading-7 text-ink/80">{recap.nextNote}</p>
      <p className="mt-2 text-xs leading-6 text-ink/70">その回での案内です。最新の予定はSHOWROOMでご確認ください。</p>
    </RecapPart>}
  </>;
}

export function StreamRecapCard({ recap, defaultOpen = false }: { recap: StreamRecap; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = recapAnchor(recap.id);
  const cover = recap.status === "published" ? recap.image ?? recap.gallery?.[0] : undefined;
  useEffect(() => {
    let frame = 0;
    const followLink = () => {
      if (window.location.hash !== `#${id}`) return;
      setOpen(true);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => scrollToSection(id, { behavior: "auto" }));
    };
    followLink();
    window.addEventListener("hashchange", followLink);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", followLink); };
  }, [id]);

  return <details id={id} open={open} onToggle={(event) => { if (event.currentTarget.open !== open) setOpen(event.currentTarget.open); }} className="group min-w-0 scroll-mt-40 border border-rosefog/25 bg-white shadow-paper">
    <summary className={`cursor-pointer list-none p-5 sm:p-7 [&::-webkit-details-marker]:hidden ${focusStyle}`}>
      <span className="flex flex-wrap items-center gap-2 text-xs font-bold">
        <time dateTime={recap.date} className="text-champagneInk">{recapDateLabel(recap.date)}</time>
        <span className="border border-rosefog/25 px-2 py-1 text-rosefog">{recap.platform}</span>
        {recap.status === "published" && recap.mode === "radio" && <span className="border border-champagne/35 px-2 py-1 text-champagneInk">ラジオ配信</span>}
        <span className="bg-porcelain px-2 py-1 text-ink/75">{recap.status === "published" ? "配信メモ" : "メモ準備中"}</span>
        <ChevronDown aria-hidden="true" className="ml-auto h-5 w-5 shrink-0 text-rosefog transition-transform group-open:rotate-180 motion-reduce:transition-none" />
      </span>
      <h3 className="mt-4 break-words font-display text-2xl leading-snug text-ink sm:text-3xl">{recap.title}</h3>
      <p className="mt-3 break-words text-sm leading-7 text-ink/80">{recap.summary}</p>
      {recap.recording && <p className="mt-4 flex items-start gap-2 text-xs leading-6 text-ink/70"><Clock3 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />{recordingLabel(recap.recording)}</p>}
      {cover && <figure className="mx-auto mt-5 max-w-2xl overflow-hidden bg-porcelain">
        <img {...getResponsiveImageProps(cover.src, "(min-width: 1024px) 640px, 100vw")} width={cover.width} height={cover.height} alt={cover.alt} loading="lazy" decoding="async" className="block h-auto w-full object-contain" />
      </figure>}
      <span className="mt-4 inline-block text-xs font-bold text-champagneInk"><span className="group-open:hidden">この回を開く</span><span className="hidden group-open:inline">閉じる</span></span>
    </summary>
    <div className="border-t border-champagne/20 px-5 pb-5 sm:px-7 sm:pb-7">
      {recap.status === "published" && <RecapContent recap={recap} />}
      <div className="mt-5 border-l-2 border-champagne/50 bg-porcelain p-4 text-xs leading-6 text-ink/75">
        <p>出典：{recap.sourceLabel}</p>
        {recap.status === "published" && recap.verificationNote && <p className="mt-2">{recap.verificationNote}</p>}
        <p className="mt-1">確認日：<time dateTime={recap.verifiedAt}>{recap.verifiedAt.replace(/-/g, ".")}</time></p>
        {recap.recording && <p className="mt-2">表示の時刻・長さは録画の記録です。配信の開始・終了時刻とは異なる場合があります。</p>}
      </div>
      <a href={`#${id}`} className={`mt-3 inline-flex min-h-11 items-center text-xs font-bold text-champagneInk underline underline-offset-4 ${focusStyle}`}>この回へのリンク</a>
    </div>
  </details>;
}

export function StreamRecapsSection({ recaps = streamRecaps }: { recaps?: readonly StreamRecap[] }) {
  const entries = sortStreamRecaps(recaps);
  const publishedCount = entries.filter((recap) => recap.status === "published").length;
  return <section id="stream-recaps" aria-labelledby="stream-recaps-heading" className="scroll-mt-40 border-y border-champagne/20 bg-porcelain py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 min-w-0 border-l-4 border-rosefog pl-5 sm:flex sm:items-end sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-[0.18em] text-champagneInk">LIVE STREAM</p>
          <h2 id="stream-recaps-heading" className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">配信コーナー</h2>
          <p className="mt-4 text-sm leading-7 text-ink/75">配信のあとも、ここでひと息。日付ごとに振り返る、優花子さんの配信の記録。</p>
        </div>
        <p className="mt-5 shrink-0 text-xs font-bold leading-6 text-champagneInk">配信の記録 {entries.length}回<span className="mx-2" aria-hidden="true">/</span>配信メモ {publishedCount}回</p>
      </div>
      <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0">{entries.length ? <ul className="space-y-5">{entries.map((recap, index) => <li key={recap.id}><StreamRecapCard recap={recap} defaultOpen={index === 0} /></li>)}</ul> : <p className="border border-champagne/30 bg-white p-6 text-sm leading-7 text-ink/75">配信の記録は、まだありません。次の配信はSHOWROOMからどうぞ。</p>}</div>
        <aside aria-label="配信を見に行く" className="min-w-0 border border-champagne/35 bg-ink p-6 text-porcelain">
          <Radio className="h-6 w-6 text-champagne" aria-hidden="true" />
          <h3 className="mt-4 font-display text-2xl">次は、配信で。</h3>
          <p className="mt-3 text-sm leading-7 text-porcelain/85">優花子さんのSHOWROOMルームへ。</p>
          <a href={profile.showroom.url} target="_blank" rel="noopener noreferrer" className={`mt-5 flex min-h-12 items-center justify-center gap-2 bg-porcelain px-4 py-3 text-sm font-bold text-ink ${focusStyle}`}>SHOWROOMを開く<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a>
          <a href="#showroom" className={`mt-3 inline-flex min-h-11 items-center text-sm font-bold text-champagne underline underline-offset-4 ${focusStyle}`}>配信予定・ルーム情報へ</a>
          <p className="mt-5 border-t border-champagne/30 pt-4 text-xs leading-6 text-porcelain/80">ファン制作の配信コーナーです。配信メモ・曲・スクショは、確認できた回に掲載します。</p>
        </aside>
      </div>
    </div>
  </section>;
}
