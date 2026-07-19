import { ArrowUpRight, Ticket } from "lucide-react";
import { trackPortalEvent } from "../lib/analytics";
import { getResponsiveImageProps } from "../lib/responsiveImage";

const homepageUrl = "https://premiumgoyukajet.hp.peraichi.com/";

const messagePhoto = {
  src: "/images/yukako-yukajet-shiina-message-story-2026-07-19-web.jpg",
  alt: "C班・あかね役のしいなさんが寄せたメッセージと、吉井優花子さんが感謝を添えたInstagramストーリーズ"
};

const companyVideo = {
  src: "/videos/yukajet-company-message-2026-07-19-web.mp4",
  poster: "/images/yukako-yukajet-company-message-poster-2026-07-19.jpg",
  width: 720,
  height: 1280,
  label: "#ゆかJETのカンパニーが稽古場に集まった縦型動画",
  caption: "Instagramストーリーズより：#ゆかJET カンパニー集合動画"
};

export function GojetCastMessageSection() {
  return (
    <section
      id="gojet-shiina-message"
      aria-labelledby="gojet-shiina-message-title"
      className="scroll-mt-24 bg-gradient-to-br from-porcelain via-white to-blush/20 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="yukako-card overflow-hidden border-rosefog/25 bg-white shadow-paper">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
              <span className="border border-champagne/45 bg-porcelain px-2.5 py-1">#ゆかJET</span>
              <span className="border border-rosefog/35 bg-rosefog/10 px-2.5 py-1 text-rosefog">出演者メッセージ</span>
              <span className="text-ink/45">2026.7.19</span>
            </p>

            <h2
              id="gojet-shiina-message-title"
              className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl"
            >
              最後まで一緒に、楽しく誠実に——仲間と育てる #ゆかJET
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              C班・あかね役のしいなさんから、優花子さんへ。出会って約2年という二人の、尊敬と感謝の言葉です。
            </p>

            <figure className="m-0 mt-6 overflow-hidden border border-champagne/30 bg-porcelain sm:mx-auto sm:max-w-[480px]">
              <img
                {...getResponsiveImageProps(
                  messagePhoto.src,
                  "(min-width: 640px) 480px, 100vw",
                )}
                alt={messagePhoto.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-contain"
              />
              <figcaption className="border-t border-champagne/20 bg-white px-3 py-2 text-xs font-bold text-ink/65">
                Instagramストーリーズ：しいなさん（@shiina_style222）／吉井優花子さん
              </figcaption>
            </figure>

            <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              <p>
                共演回数は多くないとしながらも、優花子さんの人柄や成長、その裏にある努力を見てきたというしいなさん。尊敬と感謝を、まっすぐな言葉で届けています。
              </p>
              <blockquote className="space-y-1 border-l-2 border-rosefog/60 bg-rosefog/5 px-4 py-4 font-semibold text-ink/85">
                <p>「温かさと一生懸命さに今回も支えられています🙏✨」</p>
                <p>「最後まで一緒に楽しく誠実に頑張っていこう〜💕」</p>
              </blockquote>
              <p>
                しいなさんの言葉を受け、優花子さんも感謝を返しています。互いを尊重しながら本番へ向かう、C班の温かなやり取りです。
              </p>
              <p>カンパニーがそろった集合動画には、稽古場の和やかな空気も収められています。</p>
            </div>

            <figure className="m-0 mt-6 overflow-hidden border border-champagne/30 bg-black sm:mx-auto sm:max-w-[400px]">
              <video
                controls
                playsInline
                preload="metadata"
                poster={companyVideo.poster}
                width={companyVideo.width}
                height={companyVideo.height}
                aria-label={companyVideo.label}
                className="block aspect-[9/16] h-auto w-full bg-black object-contain"
              >
                <source src={companyVideo.src} type="video/mp4" />
                お使いの環境では動画を再生できません。上のInstagramストーリーズ画像とあわせてご覧ください。
              </video>
              <figcaption className="flex flex-col gap-1 border-t border-white/10 bg-ink px-3 py-2 text-xs font-bold text-white/75 sm:flex-row sm:items-center sm:justify-between">
                <span>{companyVideo.caption}</span>
                <a
                  href={companyVideo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit underline underline-offset-4 transition hover:text-champagne"
                >
                  動画を直接開く
                </a>
              </figcaption>
            </figure>

            <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              <p>
                本人が「最後」と伝えた『GO,JET!』出演。その締めくくりを、自身のプロデュース公演でカンパニーのみなさんと迎えます。最後まで楽しく、誠実に——劇場や配信で見届けたい舞台です。
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("ticket_click", {
                    placement: "gojet_shiina_message",
                    item: "公演日程・予約を見る"
                  })
                }
                className="yukako-button yukako-button-gold min-h-12 px-5 py-3 text-sm"
              >
                <Ticket className="h-4 w-4" aria-hidden="true" />
                公演日程・予約を見る
              </a>
              <a
                href="#next"
                className="yukako-button yukako-button-soft min-h-12 px-5 py-3 text-sm"
              >
                <ArrowUpRight className="h-4 w-4 text-champagneInk" aria-hidden="true" />
                サイト内の#ゆかJET情報へ
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
