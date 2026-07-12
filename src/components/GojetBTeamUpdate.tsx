import { ExternalLink, PlayCircle, Ticket, Users } from "lucide-react";

const yukakoPostUrl = "https://x.com/mokoopy/status/2076121780398563659";
const originalPostUrl =
  "https://x.com/yukako_produce/status/2075952839856386054";
const homepageUrl = "https://premiumgoyukajet.hp.peraichi.com/";
const videoPreviewUrl =
  "https://drive.google.com/file/d/1NtCp3irqTs6w7mNyGLIHNK3nFz-WFYRr/preview";

export function GojetBTeamUpdate() {
  return (
    <section
      aria-labelledby="gojet-b-team-title"
      className="bg-ink pb-16 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="border border-champagne/35 bg-white/[0.07] p-6 shadow-paper sm:p-8 lg:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">
                New ・ 2026.7.12 ・ 優花子からのメッセージ
              </p>
              <h3
                id="gojet-b-team-title"
                className="mt-2 font-display text-3xl leading-tight text-white sm:text-4xl"
              >
                毎日撮影・編集。大笑いのB班を届けます
              </h3>
            </div>
            <span className="inline-flex w-fit items-center gap-2 border border-champagne/40 bg-champagne/10 px-3 py-2 text-xs font-black text-champagne">
              <Users className="h-4 w-4" aria-hidden="true" />
              #ゆかJET
            </span>
          </div>

          <div className="mt-5 max-w-4xl border-l-2 border-champagne/60 bg-black/20 px-4 py-3 text-sm font-semibold leading-7 text-white/85 sm:text-base sm:leading-8">
            「毎日撮って編集しております🥺」「私が大爆笑すぎる」——優花子さん自身が、撮影・編集を続けながら届けているB班キャスト紹介。笑いの絶えない稽古場の空気と、最後までしっかり決まるオチにも注目です。
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            GO,JET!史上初となる女性のみのB班。荒井映里乃さん、冬雪咲百夏さん、月島ほたるさん、吉井優花子さん、清水桃香さん、中城遥さんが笑顔で登場し、自己紹介から芝居・ダンス稽古まで約2分で紹介します。優花子さんは来場・拡散に加え、エールカードやメッセージ動画などの応援コンテンツも呼びかけています。
          </p>

          <div className="mt-6 overflow-hidden border border-white/12 bg-black shadow-paper">
            <div className="aspect-video w-full">
              <iframe
                src={videoPreviewUrl}
                title="#ゆかJET B班キャスト紹介動画"
                loading="lazy"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="h-full w-full"
              />
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
            <a
              href={originalPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
            >
              <ExternalLink className="h-4 w-4 text-champagne" aria-hidden="true" />
              公式B班紹介を見る
            </a>
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
