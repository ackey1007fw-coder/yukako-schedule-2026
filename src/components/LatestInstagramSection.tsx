import { SectionHeader } from "./SectionHeader";
import siteContent from "../data/siteContent.json";
import { getOptimizedImageUrl } from "../lib/responsiveImage";
import { trackPortalEvent } from "../lib/analytics";

const {
  reelUrl,
  profileUrl,
  videoSrc,
  videoPoster,
  publishedAt,
  title,
  eventLabel,
  isPr
} = siteContent.latestInstagram;

export function LatestInstagramSection() {
  return (
    <section id="latest-reel" className="scroll-mt-32 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Latest Instagram Reel"
          title={title}
          copy="秋田の夏にぴったりのアイスイベント「あいぱく® AKITA 2026」。食べた4種類と、会場の開催情報はリールで。"
        />

        <article className="yukako-card overflow-hidden border-rosefog/25 bg-porcelain shadow-paper lg:grid lg:grid-cols-2">
          <div className="flex min-w-0 items-center justify-center bg-ink p-4 sm:p-6">
            <div className="aspect-[9/16] w-full max-w-[390px] overflow-hidden rounded-sm border border-white/15 bg-black shadow-2xl">
              <video
                controls
                playsInline
                preload="metadata"
                poster={getOptimizedImageUrl(videoPoster)}
                aria-label="あいぱく® AKITA 2026 の Instagram Reel（サイト内再生）"
                className="h-full w-full bg-black object-contain"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-champagneInk">
              <span className="border border-champagne/45 bg-white px-3 py-1.5">
                Instagram Reel
              </span>
              {isPr && (
                <span className="border border-rosefog/35 bg-[#fff1f6] px-3 py-1.5 text-[#8d4260]">
                  PR
                </span>
              )}
              <span className="text-ink/45">{publishedAt}</span>
            </div>

            <p className="mt-6 text-sm font-bold text-champagneInk">{eventLabel}</p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
              秋田だって暑い——夏にぴったりのアイスへ
            </h3>

            <p className="mt-6 text-base leading-8 text-ink/70">
              今回食べたのは、生黒ごまソフト（K.L.I.M）、芋づくし蜜芋ソフトクリーム（神戸芋屋
              志のもと）、メロンソフト（シルスマリア）、生チョコソフト
              ビター（シルスマリア）。ほかにも気になるアイスがたくさん。
            </p>
            <p className="mt-4 text-base leading-8 text-ink/70">
              開催は西武秋田店（地階 催事場）、8月26日（水）まで。午前9時30分〜午後7時（最終日は午後5時閉場）。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("sns_click", {
                    kind: "instagram",
                    placement: "latest_instagram"
                  })
                }
                className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
              >
                InstagramでこのReelを見る →
              </a>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("sns_click", {
                    kind: "instagram",
                    placement: "latest_instagram_profile"
                  })
                }
                className="yukako-button min-h-12 border border-champagne bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"
              >
                優花子のInstagramへ →
              </a>
            </div>

            <p className="mt-5 text-xs leading-6 text-ink/50">
              動画はサイト内で再生できます。再生できない場合は、Instagramの元投稿からご覧ください。PR投稿です。
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
