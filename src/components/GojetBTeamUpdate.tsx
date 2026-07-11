import { ExternalLink, PlayCircle, Ticket, Users } from "lucide-react";

const postUrl = "https://x.com/yukako_produce/status/2075952839856386054";
const homepageUrl = "https://premiumgoyukajet.hp.peraichi.com/";
const videoViewUrl =
  "https://drive.google.com/file/d/1NtCp3irqTs6w7mNyGLIHNK3nFz-WFYRr/view?usp=drivesdk";
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
                New ・ 2026.7.11 ・ B班キャスト紹介
              </p>
              <h3
                id="gojet-b-team-title"
                className="mt-2 font-display text-3xl leading-tight text-white sm:text-4xl"
              >
                GO,JET!史上初、女性だけで届けるB班
              </h3>
            </div>
            <span className="inline-flex w-fit items-center gap-2 border border-champagne/40 bg-champagne/10 px-3 py-2 text-xs font-black text-champagne">
              <Users className="h-4 w-4" aria-hidden="true" />
              #ゆかJET
            </span>
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            荒井映里乃さん、冬雪咲百夏さん、月島ほたるさん、吉井優花子さん、清水桃香さん、中城遥さんが笑顔で登場。自己紹介から芝居・ダンス稽古まで、笑いの絶えないB班の空気が約2分で伝わる紹介動画です。会場に来られない方には配信チケットも用意されています。
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
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-button yukako-button-gold min-h-12 px-4 py-3 text-sm"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              Xの投稿を見る
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
            <a
              href={videoViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
            >
              <ExternalLink className="h-4 w-4 text-champagne" aria-hidden="true" />
              動画を大きく見る
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
