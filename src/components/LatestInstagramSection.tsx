import { SectionHeader } from "./SectionHeader";
import siteContent from "../data/siteContent.json";
import { trackPortalEvent } from "../lib/analytics";

const { reelUrl, profileUrl, drivePreviewUrl, publishedAt, title } = siteContent.latestInstagram;

export function LatestInstagramSection() {
  return (
    <section id="latest-reel" className="scroll-mt-32 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Latest Instagram Reel"
          title={title}
          copy="吉井優花子さんのInstagramに、クルーズ旅行の新しいリール動画が公開されました。船上で過ごした充実の時間と、大切な人へ贈った特別な旅の思い出をご覧ください。"
        />

        <article className="yukako-card overflow-hidden border-rosefog/25 bg-porcelain shadow-paper lg:grid lg:grid-cols-2">
          <div className="flex items-center justify-center bg-ink p-4 sm:p-6">
            <div className="aspect-[9/16] w-full max-w-[390px] overflow-hidden border border-white/15 bg-black shadow-2xl">
              <iframe
                src={drivePreviewUrl}
                title="吉井優花子さん MSC Bellissima 6泊7日の船旅 リール動画"
                loading="lazy"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-champagneInk">
              <span className="border border-champagne/45 bg-white px-3 py-1.5">
                Instagram Reel
              </span>
              <span className="border border-rosefog/35 bg-[#fff1f6] px-3 py-1.5 text-[#8d4260]">
                PR
              </span>
              <span className="text-ink/45">{publishedAt}</span>
            </div>

            <p className="mt-6 text-sm font-bold text-champagneInk">MSC Bellissima</p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
              「明日は何をしよう？」が尽きない毎日
            </h3>

            <p className="mt-6 text-base leading-8 text-ink/72">
              ずっと気になっていたクルーズ旅行へ。美味しい料理、毎日変わるショーやイベント、スポーツ、プール、ショッピング、寄港地の観光まで、船の上とは思えないほど充実した6泊7日です。
            </p>
            <p className="mt-4 text-base leading-8 text-ink/72">
              今回は母の日のプレゼントとしてお母さまと乗船。ミス・グランド・ジャパン同期のお二人とも偶然同じ日程になり、たくさんの笑顔と思い出が詰まった旅になりました。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPortalEvent("sns_click", { kind: "instagram", placement: "latest_instagram" })}
                className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
              >
                Instagramで動画を見る
              </a>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPortalEvent("sns_click", { kind: "instagram", placement: "latest_instagram_profile" })}
                className="yukako-button min-h-12 border border-champagne bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"
              >
                @yoppy_777 を見る
              </a>
            </div>

            <p className="mt-5 text-xs leading-6 text-ink/50">
              動画はGoogleドライブのプレーヤーで再生されます。再生できない場合は、Instagramの元投稿からご覧ください。
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
