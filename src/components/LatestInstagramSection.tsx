import { ArrowUpRight, Instagram, Ship, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const reelUrl = "https://www.instagram.com/reel/DaoGHTuSj2U/?igsh=NTFvYzVjdXQ2OHJy";
const profileUrl = "https://www.instagram.com/yoppy_777?igsh=MXdkNDZvYnVteTRndw==";
const drivePreviewUrl =
  "https://drive.google.com/file/d/1P1coTEnC2cG2XlN9jbdwHVShoSjV-Akf/preview";

const cruiseHighlights = [
  "美味しい料理と、毎日変わるショーやイベント",
  "スポーツ・プール・ショッピングなど船内の楽しみ",
  "寄港地での観光と、海の上で過ごす特別な時間",
  "母の日のプレゼントとして、お母さまと作った一生の思い出"
];

export function LatestInstagramSection() {
  return (
    <section id="latest-reel" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Latest Instagram Reel"
          title="豪華客船 MSC Bellissimaで、6泊7日の船旅へ"
          copy="吉井優花子さんのInstagramに、クルーズ旅行の新しいリール動画が公開されました。船上で過ごした充実の時間と、大切な人へ贈った特別な旅の思い出をご覧ください。"
        />

        <article className="yukako-card overflow-hidden border-rosefog/25 bg-porcelain shadow-paper lg:grid lg:grid-cols-[minmax(300px,0.82fr)_1.18fr]">
          <div className="flex items-center justify-center bg-ink p-4 sm:p-6">
            <div className="aspect-[9/16] w-full max-w-[390px] overflow-hidden border border-white/15 bg-black shadow-2xl">
              <iframe
                src={drivePreviewUrl}
                title="吉井優花子さん MSC Bellissima 6泊7日の船旅 リール動画"
                loading="lazy"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-champagneInk">
              <span className="inline-flex items-center gap-1.5 border border-champagne/45 bg-white px-3 py-1.5">
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Instagram
              </span>
              <span className="border border-rosefog/35 bg-[#fff1f6] px-3 py-1.5 text-[#8d4260]">
                PR
              </span>
              <span className="text-ink/45">2026.7.11</span>
            </div>

            <div className="mt-6 flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center border border-champagne/50 bg-white text-champagne">
                <Ship className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-champagneInk">MSC Bellissima</p>
                <h3 className="mt-1 font-display text-3xl leading-tight text-ink sm:text-4xl">
                  「明日は何をしよう？」が尽きない毎日
                </h3>
              </div>
            </div>

            <p className="mt-6 text-base leading-8 text-ink/72">
              ずっと気になっていたクルーズ旅行へ。今回は母の日のプレゼントとしてお母さまと乗船し、ミス・グランド・ジャパン同期のお二人とも偶然同じ日程に。たくさんの笑顔と思い出が詰まった旅になりました。
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {cruiseHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 border border-rosefog/25 bg-white px-4 py-3 text-sm leading-6 text-ink/70"
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Instagramで動画を見る
              </a>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yukako-button min-h-12 border border-champagne bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"
              >
                @yoppy_777 を見る
                <ArrowUpRight className="h-4 w-4 text-champagne" aria-hidden="true" />
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
