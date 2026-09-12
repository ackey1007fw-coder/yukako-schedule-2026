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

const mgjNextDance = {
  videoSrc: "/videos/yukako-mgj-next-body-and-soul-2026-09-12.mp4",
  videoPoster: "/images/yukako-mgj-next-body-and-soul-2026-09-12.jpg",
  sourceProfileUrl: "https://www.instagram.com/tata_diet711_official/",
  yukakoProfileUrl: "https://www.instagram.com/yoppy_777/"
};

export function LatestInstagramSection() {
  return (
    <section id="latest-reel" className="scroll-mt-32 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Instagram / MGJ NEXT"
          title="MGJ NEXTで「Body & Soul」"
          copy="MGJ NEXTの3人が、SPEED「Body & Soul」をダンス。新しい挑戦を楽しむメッセージと一緒に、サイト内でも動画を見られます。"
        />

        <article className="yukako-card overflow-hidden border-rosefog/25 bg-porcelain shadow-paper lg:grid lg:grid-cols-2">
          <div className="flex min-w-0 items-center justify-center bg-ink p-4 sm:p-6">
            <div className="aspect-[9/16] w-full max-w-[390px] overflow-hidden rounded-sm border border-white/15 bg-black shadow-2xl">
              <video
                controls
                playsInline
                preload="metadata"
                poster={mgjNextDance.videoPoster}
                aria-label="MGJ NEXT「Body & Soul」ダンス動画（サイト内再生）"
                className="h-full w-full bg-black object-contain"
              >
                <source src={mgjNextDance.videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-champagneInk">
              <span className="border border-champagne/45 bg-white px-3 py-1.5">MGJ NEXT</span>
              <span className="border border-rosefog/35 bg-[#fff1f6] px-3 py-1.5 text-[#8d4260]">Instagram Repost</span>
              <span className="text-ink/45">2026.9.12 掲載</span>
            </div>

            <p className="mt-6 text-sm font-bold text-champagneInk">#SPEED_ボディソRemixチャレンジ</p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
              3人で踊る「Body & Soul」💃
            </h3>

            <p className="mt-6 text-base leading-8 text-ink/70">
              MGJ NEXTで「Body & Soul」。TaTaさん、優花子さん、千葉サラさんの3人でダンス。
              投稿に添えられたのは、年齢や経験に関係なく、新しいことへ挑戦して人生を楽しんでいこうというメッセージです。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={mgjNextDance.sourceProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPortalEvent("sns_click", { kind: "instagram", placement: "mgj_next_source" })}
                className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
              >
                出典 @tata_diet711_official →
              </a>
              <a
                href={mgjNextDance.yukakoProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPortalEvent("sns_click", { kind: "instagram", placement: "mgj_next_yukako" })}
                className="yukako-button min-h-12 border border-champagne bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"
              >
                優花子のInstagramへ →
              </a>
            </div>

            <p className="mt-5 text-xs leading-6 text-ink/50">
              公開投稿の動画を掲載。元投稿の個別URLは未確認のため、出典アカウントへリンクしています。
            </p>
          </div>
        </article>

        <div className="mt-14 border-t border-rosefog/25 pt-12">
          <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-ink/45">
            Previous Reel
          </p>
          <h3 className="mt-2 mb-7 text-center font-display text-2xl text-ink sm:text-3xl">
            {title}
          </h3>
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
      </div>
    </section>
  );
}
