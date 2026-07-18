import { ArrowUpRight, Ticket } from "lucide-react";
import { trackPortalEvent } from "../lib/analytics";
import { getResponsiveImageProps } from "../lib/responsiveImage";

const homepageUrl = "https://premiumgoyukajet.hp.peraichi.com/";

const messagePhoto = {
  src: "/images/yukako-yukajet-shiina-message-story-2026-07-19.jpg",
  alt: "C班あかね役のしいなさんから吉井優花子さんへ寄せられたメッセージと、二人の写真"
};

const companyVideo = {
  src: "/videos/yukajet-company-message-2026-07-19.mp4",
  poster: "/images/yukako-yukajet-company-message-poster-2026-07-19.jpg",
  width: 720,
  height: 1280,
  label: "出演者のみなさんが集まった、笑顔あふれる #ゆかJET のカンパニーの動画",
  caption: "出演者のみなさんが集まった、笑顔あふれる #ゆかJET のカンパニー"
};

export function GojetCastMessageSection() {
  return (
    <section
      id="gojet-shiina-message"
      aria-labelledby="gojet-shiina-message-title"
      className="scroll-mt-24 bg-gradient-to-br from-[#fff7f4] via-porcelain to-[#fdf1e6] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="yukako-card overflow-hidden border-rosefog/25 bg-white shadow-paper">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
              <span className="border border-champagne/45 bg-porcelain px-2.5 py-1">#ゆかJET</span>
              <span className="border border-rosefog/35 bg-[#fff1f6] px-2.5 py-1 text-[#8d4260]">出演者メッセージ</span>
              <span className="text-ink/45">2026.7.19</span>
            </p>

            <h2
              id="gojet-shiina-message-title"
              className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl"
            >
              “最後まで一緒に、楽しく誠実に”――仲間と育てる #ゆかJET
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              C班で「あかね」を演じるしいなさんから、吉井優花子さんへ、あたたかなメッセージが届きました。
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
                Instagramストーリーズより：吉井優花子さん、しいなさん（@shiina_style222）
              </figcaption>
            </figure>

            <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              <p>
                出会ってから約2年。共演した回数だけでは数えきれないほど、優花子さんの人柄や成長をそばで見てきたというしいなさん。積み重ねてきた努力への尊敬を、まっすぐな言葉で届けてくれました。
              </p>
              <blockquote className="space-y-1 border-l-2 border-rosefog/60 bg-[#fff8f6] px-4 py-4 font-semibold text-ink/85">
                <p>「温かさと一生懸命さに、今回も支えられています」</p>
                <p>「最後まで一緒に、楽しく誠実に頑張っていこう」</p>
              </blockquote>
              <p>
                お互いの努力を認め合いながら、同じ舞台をつくっていく二人。写真に写るのは、長い時間をかけて育まれてきた信頼と、飾らない自然体の空気です。
              </p>
              <p>そして、カンパニーのみなさんが集まった動画も届きました。</p>
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
              <figcaption className="border-t border-white/10 bg-ink px-3 py-2 text-xs font-bold text-white/75">
                {companyVideo.caption}
              </figcaption>
            </figure>

            <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              <p>
                そこに映るのは、優花子さんが今回の公演で目指してきたという、和やかで笑顔のあふれる空気。
              </p>
              <p>
                吉井優花子さんにとって、今回は最後の『GO,JET!』出演、そして初めてのプロデュース公演です。出演者・スタッフのみなさんとともに、最後まで楽しく、誠実に――カンパニー全員で届ける特別な舞台への準備が進んでいます。
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
                    item: "#ゆかJETの公演・予約情報を見る"
                  })
                }
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
