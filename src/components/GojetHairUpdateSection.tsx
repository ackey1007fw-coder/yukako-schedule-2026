import { ArrowUpRight } from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";

const rehearsalPhoto = {
  src: "/images/yukako-yukajet-rehearsal-2026-07-15-cast-photo.jpg",
  alt: "2026年7月15日の稽古後に撮影された吉井優花子さんと共演者の集合写真",
  caption: "7月15日の稽古後。共演者の皆さんと"
};

const hairPhoto = {
  src: "/images/yukako-pink-brown-hair-2026-07-15.jpg",
  alt: "ピンクブラウンの髪色を披露する吉井優花子さん",
  caption: "早紀役にぴったりなピンクブラウンの新しいヘアカラー"
};

export function GojetHairUpdateSection() {
  return (
    <section
      id="gojet-hair-update"
      aria-labelledby="gojet-hair-update-title"
      className="scroll-mt-24 bg-gradient-to-br from-[#fff7f4] via-porcelain to-[#fdf1e6] py-16 sm:py-24"
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
              ピンクブラウンにイメージチェンジ！早紀役にぴったりの新ヘア
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-[2fr_1fr]">
              <figure className="m-0 overflow-hidden border border-champagne/30 bg-porcelain">
                <img
                  {...getResponsiveImageProps(
                    rehearsalPhoto.src,
                    "(min-width: 1024px) 55vw, 100vw",
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
              <figure className="m-0 overflow-hidden border border-champagne/30 bg-porcelain">
                <img
                  {...getResponsiveImageProps(
                    hairPhoto.src,
                    "(min-width: 1024px) 25vw, 100vw",
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
            </div>

            <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              <p>吉井優花子さんが、髪色を柔らかく華やかなピンクブラウンにチェンジしました。</p>
              <blockquote className="space-y-1 border-l-2 border-rosefog/60 bg-[#fff8f6] px-4 py-4 font-semibold text-ink/85">
                <p>「染めた☺️ ピンクブラウン💗</p>
                <p>早紀役にぴったりな色🤟」</p>
              </blockquote>
              <p>
                と、新しいヘアスタイルを紹介。2026年7月15日の稽古後には、共演者の皆さんとの笑顔いっぱいの集合写真も投稿されました。
              </p>
              <p>
                『GO,JET!GO!GO! vol.1 Premium』〜I LOVE YOUが言えなくて〜で演じる早紀役の雰囲気にもぴったりな、明るさとかわいらしさを感じる新しい髪色です。
              </p>
              <p>本番へ向けて稽古を重ねる優花子さんと、#ゆかJETカンパニーの皆さんを、引き続き応援していきましょう。</p>
            </div>

            <p className="mt-5 text-xs leading-6 text-ink/50">
              吉井優花子さん SHOWROOMファンルーム投稿・2026年7月15日
            </p>

            <div className="mt-7">
              <a
                href="#next"
                className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                #ゆかJET 公演情報を見る
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
