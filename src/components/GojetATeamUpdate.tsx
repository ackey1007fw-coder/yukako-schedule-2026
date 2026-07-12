import { ExternalLink, PlayCircle, Ticket, Users } from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";

const yukakoPostUrl = "https://x.com/mokoopy/status/2076341467841445980";
// TODO: 引用元(@yukako_produce の A班キャスト紹介投稿)のURL待ち — ユーザー確認後に設定する
const originalPostUrl = "";
const homepageUrl = "https://premiumgoyukajet.hp.peraichi.com/";

export function GojetATeamUpdate() {
  return (
    <section
      aria-labelledby="gojet-a-team-title"
      className="bg-ink pb-16 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="border border-champagne/35 bg-white/[0.07] p-6 shadow-paper sm:p-8 lg:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">
                New ・ 2026.7.13 ・ 優花子からのメッセージ
              </p>
              <h3
                id="gojet-a-team-title"
                className="mt-2 font-display text-3xl leading-tight text-white sm:text-4xl"
              >
                混ざりたい🥺笑 A班への想い
              </h3>
            </div>
            <span className="inline-flex w-fit items-center gap-2 border border-champagne/40 bg-champagne/10 px-3 py-2 text-xs font-black text-champagne">
              <Users className="h-4 w-4" aria-hidden="true" />
              #ゆかJET
            </span>
          </div>

          <div className="mt-5 max-w-4xl border-l-2 border-champagne/60 bg-black/20 px-4 py-3 text-sm font-semibold leading-7 text-white/85 sm:text-base sm:leading-8">
            「混ざりたい🥺笑」——共演しないA班にも、優花子さんから「プロデューサーとしてみんなのことをとっても大切に想っています」と温かいエール。芝居稽古初日を迎えたA班の紹介動画を引用しての投稿です。
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            公式アカウントが公開したA班キャスト紹介動画と、優花子さん自身が撮ったA班との集合セルフィーをあわせて掲載します。フレッシュでおもしろい雰囲気に注目です。
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden border border-white/12 bg-black shadow-paper">
              <img
                {...getResponsiveImageProps(
                  "/images/yukako-yukajet-aban-cast-2026-07-13-selfie.jpg",
                  "(min-width: 640px) 45vw, 100vw",
                )}
                alt="#ゆかJET A班キャストと集合セルフィーを撮る吉井優花子さん"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-contain"
              />
            </div>
            <div className="overflow-hidden border border-white/12 bg-black shadow-paper">
              <video
                controls
                playsInline
                preload="none"
                poster="/images/yukako-yukajet-aban-cast-video-poster-2026-07-13.jpg"
                aria-label="#ゆかJET A班キャスト紹介動画(2分3秒・音声あり)"
                className="block h-full max-h-[420px] w-full object-contain"
              >
                <source src="/videos/yukajet-aban-cast-2026-07-13.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={yukakoPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-button yukako-button-gold min-h-12 px-4 py-3 text-sm"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              優花子のポストを見る
            </a>
            {originalPostUrl && (
              <a
                href={originalPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
              >
                <ExternalLink className="h-4 w-4 text-champagne" aria-hidden="true" />
                公式A班紹介を見る
              </a>
            )}
            <a
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
            >
              <Ticket className="h-4 w-4 text-champagne" aria-hidden="true" />
              予約・応援はこちら
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
