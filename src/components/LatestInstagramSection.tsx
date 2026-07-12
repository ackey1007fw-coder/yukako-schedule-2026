import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import siteContent from "../data/siteContent.json";
import { trackPortalEvent } from "../lib/analytics";

const { reelUrl, profileUrl, drivePreviewUrl, publishedAt, title } = siteContent.latestInstagram;

export function LatestInstagramSection() {
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  return (
    <section id="latest-reel" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Latest Instagram Reel"
          title={title}
          copy="吉井優花子さんのInstagramに、MSC Bellissimaで過ごした6泊7日のクルーズ旅行のリールが公開されています。"
        />

        <article className="yukako-card overflow-hidden border-rosefog/25 bg-porcelain shadow-paper lg:grid lg:grid-cols-2">
          <div className="flex items-center justify-center bg-ink p-4 sm:p-6">
            <div className="aspect-[9/16] w-full max-w-[390px] overflow-hidden border border-white/15 bg-black shadow-2xl">
              {isPlayerLoaded ? (
                <iframe
                  src={drivePreviewUrl}
                  title="吉井優花子さん MSC Bellissima 6泊7日の船旅 リール動画"
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlayerLoaded(true)}
                  className="group flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-ink via-rosefog/20 to-black px-6 text-center text-white transition hover:via-rosefog/30"
                  aria-label="Googleドライブの動画プレーヤーを読み込む"
                >
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-champagne">
                    Instagram Reel
                  </span>
                  <PlayCircle
                    className="mt-6 h-16 w-16 text-champagne transition group-hover:scale-105 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <span className="mt-5 text-lg font-black">タップして動画を読み込む</span>
                  <span className="mt-2 text-xs leading-6 text-white/60">
                    Googleドライブのプレーヤーを使用
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-champagneInk">
              <span className="border border-champagne/45 bg-white px-3 py-1.5">
                Instagram Reel
              </span>
              <span className="border border-rosefog/35 bg-rosefog/10 px-3 py-1.5 text-rosefog">
                PR
              </span>
              <span className="text-ink/45">{publishedAt}</span>
            </div>

            <p className="mt-6 text-sm font-bold text-champagneInk">MSC Bellissima</p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
              食事・ショー・寄港地観光まで、6泊7日の記録
            </h3>

            <p className="mt-6 text-base leading-8 text-ink/72">
              ずっと気になっていたクルーズ旅行へ。食事、毎日変わるショーやイベント、スポーツ、プール、ショッピング、寄港地観光など、船内外の様子をまとめたリールです。
            </p>
            <p className="mt-4 text-base leading-8 text-ink/72">
              母の日のプレゼントとしてお母さまと乗船。Miss Grand Japan同期のお二人とも同じ日程になった旅の記録です。
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
              動画プレーヤーは再生ボタンを押したときだけ読み込まれます。再生できない場合は、Instagramの元投稿からご覧ください。
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
