import {
  ArrowDownRight,
  ExternalLink,
  Film,
  Images,
  Instagram,
  Sparkles,
  Ticket
} from "lucide-react";
import { gojetStreamingTicketUrl } from "../data/gojetTimetable";
import { trackPortalEvent } from "../lib/analytics";

const instagramPostUrl =
  "https://www.instagram.com/p/DbiZ7_MlKIt/?img_index=5&igsh=MW91b25wN2o3dW92Yg==";

const photos = [
  {
    id: "14Vo03fCpL6-w5WqLzBZDSQr3teZzYvDw",
    alt: "舞台セットの前でポーズをとる#ゆかJET A班キャストの集合写真",
    caption: "A班キャスト"
  },
  {
    id: "186ZwlbiVquo8aWKdz7QjtHPtwPaAAmb0",
    alt: "舞台セットの前でポーズをとる#ゆかJET B班キャストの集合写真",
    caption: "B班キャスト／JET役・吉井優花子さん"
  },
  {
    id: "1kza1J9Z-NjoELY_7niOROg9FoLCHi2SJ",
    alt: "舞台セットの前でポーズをとる#ゆかJET C班キャストの集合写真",
    caption: "C班キャスト／早紀役・吉井優花子さん"
  }
] as const;

const videos = [
  {
    id: "13cLw7bsw7lo-95pUNQZoJRVnLe8FnW9i",
    label: "#ゆかJET 舞台記録 1"
  },
  {
    id: "1PHLrnk6-7rFCi-WaBjBOuzhK881mYxHM",
    label: "#ゆかJET 舞台記録 2"
  },
  {
    id: "1Ca3PkVDA5oBapzUjpxeWcx9UTTBine1E",
    label: "#ゆかJET 舞台記録 3"
  }
] as const;

const highlights = [
  "A・B・C班を完走",
  "約100分のラブコメ×ミュージカル",
  "千秋楽LIVEで約20曲",
  "配信申込は8/3まで"
];

const driveViewUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const drivePreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
const driveThumbnailUrl = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export function GojetFinaleReportSection() {
  return (
    <section
      id="gojet-finale-report"
      aria-labelledby="gojet-finale-report-title"
      className="scroll-mt-32 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <article className="yukako-card overflow-hidden border-rosefog/25 bg-white shadow-paper">
          <div className="bg-gradient-to-br from-ink via-[#4b1f2c] to-[#72283d] p-6 text-white sm:p-10 lg:p-12">
            <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagne">
              <span className="border border-champagne/45 bg-white/10 px-2.5 py-1">#ゆかJET</span>
              <span className="border border-white/25 bg-white/10 px-2.5 py-1">公演完走レポート</span>
              <span className="text-white/55">2026.8.2</span>
            </p>

            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2
                  id="gojet-finale-report-title"
                  className="font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
                >
                  A・B・C班、そしてLIVEまで——
                  <br className="hidden sm:block" />
                  初プロデュース #ゆかJET 完走
                </h2>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
                  吉井優花子さん初の完全プロデュース舞台『GO,JET!GO!GO! vol.1 Premium』が、全班と千秋楽LIVEまで無事に駆け抜けました。追加楽曲を含むこだわりの脚色、緻密な演出、魅力あふれるキャストが重なり、たくさんの好評の声が届いています。
                </p>
              </div>
              <Sparkles className="hidden h-16 w-16 text-champagne/80 lg:block" aria-hidden="true" />
            </div>

            <ul className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="公演のハイライト">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="border border-white/15 bg-white/10 px-3 py-3 text-sm font-bold leading-6 text-white/90"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
              <Images className="h-4 w-4" aria-hidden="true" />
              Cast Photos
            </div>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">
              三つの班、それぞれの色
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {photos.map((photo) => (
                <figure
                  key={photo.id}
                  className="m-0 overflow-hidden border border-champagne/30 bg-porcelain"
                >
                  <a
                    href={driveViewUrl(photo.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-ink"
                    aria-label={`${photo.caption}の写真を大きく見る`}
                  >
                    <img
                      src={driveThumbnailUrl(photo.id)}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="block aspect-[4/3] h-auto w-full object-contain transition duration-300 group-hover:opacity-90"
                    />
                  </a>
                  <figcaption className="border-t border-champagne/20 bg-white px-3 py-3 text-xs font-bold leading-5 text-ink/70">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
              <Film className="h-4 w-4" aria-hidden="true" />
              Stage Movies
            </div>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">
              写真だけでは伝わらない、舞台の熱
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/70">
              3本の動画で、公演の空気とキャストの表情を楽しめます。再生できない場合は、各カードの「動画を開く」からGoogleドライブでご覧ください。
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {videos.map((video, index) => (
                <figure
                  key={video.id}
                  className="m-0 overflow-hidden border border-champagne/30 bg-ink shadow-paper"
                >
                  <div className="aspect-[9/16] w-full bg-black">
                    <iframe
                      src={drivePreviewUrl(video.id)}
                      title={video.label}
                      loading="lazy"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-3 text-xs font-bold text-white/75">
                    <span>舞台記録 {index + 1}</span>
                    <a
                      href={driveViewUrl(video.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 underline underline-offset-4 transition hover:text-champagne"
                    >
                      動画を開く
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>

            <blockquote className="mt-10 border-l-2 border-rosefog/60 bg-[#fff8f6] px-5 py-5 text-base font-bold leading-8 text-ink/85 sm:text-lg">
              「最初で最後のゆかJETを、ぜひ配信で観てください。これは…見なきゃ損🙂‍↕️❗️」
            </blockquote>

            <div className="mt-8 border border-champagne/35 bg-porcelain p-5 sm:p-6">
              <p className="text-sm font-black text-rosefog">配信チケット 3,700円／申込は8月3日まで</p>
              <p className="mt-2 text-sm leading-7 text-ink/70">
                A班・B班・C班と全キャスト参加の千秋楽LIVEを、8月10日まで視聴できます。
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={gojetStreamingTicketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackPortalEvent("ticket_click", {
                      placement: "gojet_finale_report",
                      item: "配信チケットを申し込む"
                    })
                  }
                  className="yukako-button yukako-button-rose min-h-12 px-5 py-3 text-sm"
                >
                  <Ticket className="h-4 w-4" aria-hidden="true" />
                  配信チケットを申し込む
                </a>
                <a
                  href={instagramPostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackPortalEvent("sns_click", {
                      kind: "instagram",
                      placement: "gojet_finale_report"
                    })
                  }
                  className="yukako-button yukako-button-soft min-h-12 px-5 py-3 text-sm"
                >
                  <Instagram className="h-4 w-4 text-rosefog" aria-hidden="true" />
                  Instagramの元投稿を見る
                </a>
              </div>
            </div>

            <nav className="mt-7 border-t border-champagne/20 pt-6" aria-label="#ゆかJET 関連コンテンツ">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-champagneInk">
                続けて見る
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#audience-reports" className="yukako-button yukako-button-soft min-h-11 px-4 py-2.5 text-sm">
                  <ArrowDownRight className="h-4 w-4 text-champagneInk" aria-hidden="true" />
                  観劇レポートへ
                </a>
                <a href="#gojet-cast-voice" className="yukako-button yukako-button-soft min-h-11 px-4 py-2.5 text-sm">
                  <ArrowDownRight className="h-4 w-4 text-champagneInk" aria-hidden="true" />
                  キャストの声へ
                </a>
              </div>
            </nav>

            <p className="mt-6 flex flex-wrap items-center gap-1.5 text-xs leading-6 text-ink/50">
              出典：吉井優花子さんのInstagram投稿（2026年8月2日）
              <a
                href={instagramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-champagneInk underline underline-offset-4 transition hover:text-rosefog"
              >
                投稿を見る
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
