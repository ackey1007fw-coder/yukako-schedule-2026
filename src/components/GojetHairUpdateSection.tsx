import { ArrowUpRight, ExternalLink, Ticket } from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";

const xPostUrl = "https://x.com/mokoopy/status/2077393070140821844";
const homepageUrl = "https://premiumgoyukajet.hp.peraichi.com/";

const hairPhoto = {
  src: "/images/yukako-pink-brown-hair-2026-07-15.jpg",
  alt: "#ゆかJETの早紀役に合わせたピンクブラウンの髪色を披露する吉井優花子さん",
  caption: "早紀役にぴったりなピンクブラウンの新しい髪色"
};

const rehearsalPhoto = {
  src: "/images/yukako-yukajet-rehearsal-2026-07-15-cast-photo.jpg",
  alt: "2026年7月15日の稽古後に撮影された吉井優花子さんと共演者の集合写真",
  caption: "7月15日の稽古後。共演者の皆さんと"
};

export function GojetHairUpdateSection() {
  return (
    <section
      id="gojet-hair-update"
      aria-labelledby="gojet-hair-update-title"
      className="scroll-mt-32 bg-gradient-to-br from-[#fff7f4] via-porcelain to-[#fdf1e6] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="yukako-card overflow-hidden border-rosefog/25 bg-white shadow-paper">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
              <span className="border border-champagne/45 bg-porcelain px-2.5 py-1">#ゆかJET</span>
              <span className="border border-rosefog/35 bg-[#fff1f6] px-2.5 py-1 text-[#8d4260]">稽古・オフショット</span>
              <span className="border border-champagne/45 bg-porcelain px-2.5 py-1">最新トピック</span>
              <span className="text-ink/45">2026.7.15</span>
            </p>

            <h2
              id="gojet-hair-update-title"
              className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl"
            >
              #ゆかJETのためにピンクブラウンへ！早紀役に寄せた新ヘア
            </h2>

            <figure className="m-0 mt-6 overflow-hidden border border-champagne/30 bg-porcelain sm:max-w-sm">
              <img
                {...getResponsiveImageProps(
                  hairPhoto.src,
                  "(min-width: 640px) 24rem, 100vw",
                )}
                alt={hairPhoto.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              <figcaption className="border-t border-champagne/20 bg-white px-3 py-2 text-xs font-bold text-ink/65">
                {hairPhoto.caption}
              </figcaption>
            </figure>

            <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              <p>
                2026年7月15日、吉井優花子さんが、#ゆかJETのために髪をピンクブラウンへ染めたことをXで報告しました。
              </p>
              <blockquote className="space-y-1 border-l-2 border-rosefog/60 bg-[#fff8f6] px-4 py-4 font-semibold text-ink/85">
                <p>「#ゆかJET のために髪染めた🥰</p>
                <p>早紀にぴったりなピンクブラウン💓」</p>
              </blockquote>
              <p>
                艶のある柔らかなピンクブラウンは、優花子さんがC班で演じる早紀の明るく華やかな雰囲気にもぴったりです。
              </p>
              <p>
                今回の公演で優花子さんは、プロデューサーとして作品全体を作り上げながら、B班ではJET役、C班では早紀役を演じます。
              </p>
              <blockquote className="space-y-1 border-l-2 border-rosefog/60 bg-[#fff8f6] px-4 py-4 font-semibold text-ink/85">
                <p>「私の最初のGO,JET!プロデュース、</p>
                <p>そして最後のGO,JET!見届けてね🎙️✨」</p>
              </blockquote>
              <p>と、公演に込めた想いも伝えられました。</p>
              <p>
                本番に向けて役作りと稽古を重ねる優花子さん。新しい髪色からも、#ゆかJETと早紀役へのこだわりが伝わってきます。
              </p>
              <p>公演は2026年7月23日から7月27日まで、Air studio両国で上演されます。</p>
              <p>
                B班のJET、C班の早紀という、それぞれ異なる役を演じる優花子さんの姿を、ぜひ劇場や配信で見届けましょう。
              </p>
            </div>

            <figure className="m-0 mt-6 overflow-hidden border border-champagne/30 bg-porcelain sm:max-w-sm">
              <img
                {...getResponsiveImageProps(
                  rehearsalPhoto.src,
                  "(min-width: 640px) 24rem, 100vw",
                )}
                alt={rehearsalPhoto.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              <figcaption className="border-t border-champagne/20 bg-white px-3 py-2 text-xs font-bold text-ink/65">
                {rehearsalPhoto.caption}
              </figcaption>
            </figure>

            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-6 text-ink/50">
              出典：吉井優花子さんのX投稿（2026年7月15日）
              <a
                href={xPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-champagneInk underline underline-offset-4 transition hover:text-rosefog"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Xで投稿を見る
              </a>
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
              >
                <Ticket className="h-4 w-4" aria-hidden="true" />
                #ゆかJETの公演・予約情報を見る
              </a>
              <a
                href="#next"
                className="yukako-button yukako-button-soft min-h-12 px-5 py-3 text-sm"
              >
                <ArrowUpRight className="h-4 w-4 text-champagneInk" aria-hidden="true" />
                サイト内の#ゆかJET公演情報を見る
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
