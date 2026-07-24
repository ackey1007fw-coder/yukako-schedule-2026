import { ExternalLink, Heart, MessageCircleHeart, Palette, Ticket } from "lucide-react";
import { trackPortalEvent } from "../lib/analytics";

const postUrl = "https://x.com/mokoopy/status/2076998431831433567";
const homepageUrl = "https://premiumgoyukajet.hp.peraichi.com/";

const cardFacts = [
  { label: "価格", value: "3,500円" },
  { label: "カラー", value: "白・水色・紫・桃・黄" },
  { label: "掲示", value: "劇場内に掲示" },
  { label: "お返し", value: "公演後、キャストからのメッセージ付きで返送" },
  { label: "応援キャスト", value: "吉井優花子（早紀 / JET役）" }
];

export function GojetYellCardSection() {
  return (
    <section
      id="gojet-yell-card"
      aria-labelledby="gojet-yell-card-title"
      className="scroll-mt-32 bg-gradient-to-br from-[#fff7f4] via-porcelain to-[#fdf1e6] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="yukako-card overflow-hidden border-rosefog/25 bg-white shadow-paper">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
              <span className="border border-champagne/45 bg-porcelain px-2.5 py-1">#ゆかJET</span>
              <span className="border border-rosefog/35 bg-[#fff1f6] px-2.5 py-1 text-[#8d4260]">応援コンテンツ</span>
              <span className="text-ink/45">2026.7.14</span>
            </p>

            <h2
              id="gojet-yell-card-title"
              className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl"
            >
              エールカードで優花子さんに応援を届けよう💌
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">
              優花子さんから、エールカードについて率直な呼びかけがありました。今回の『#ゆかJET』は、自身がプロデュースを手がけながら「早紀」と「JET」の2役に挑戦する特別な公演です。劇場を応援のメッセージでいっぱいにして、優花子さんへエールを届けませんか？
            </p>

            <blockquote className="mt-6 max-w-2xl space-y-2 border-l-2 border-rosefog/60 bg-[#fff8f6] px-4 py-4 text-sm font-semibold leading-7 text-ink/85 sm:text-base sm:leading-8">
              <p>「まだ、あの、、すごいとっても少なくて、、、😢」</p>
              <p>「最後＆プロデュース舞台＆2役なので、、届けてほしいーーー😭🙏！！！」</p>
              <p>「何色でも嬉しいな💭」</p>
            </blockquote>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
              {[
                { Icon: Heart, text: "プロデュース公演" },
                { Icon: MessageCircleHeart, text: "早紀とJETの2役に挑戦" },
                { Icon: Palette, text: "特別な公演への応援を募集中" }
              ].map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 border border-champagne/30 bg-porcelain px-3 py-2.5 text-sm font-bold text-ink/80"
                >
                  <Icon className="h-4 w-4 shrink-0 text-rosefog" aria-hidden="true" />
                  {text}
                </div>
              ))}
            </div>

            <dl className="mt-7 grid gap-2 border border-champagne/30 bg-porcelain/60 p-4 sm:p-5">
              {cardFacts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm sm:grid-cols-[6.5rem_1fr]">
                  <dt className="font-black text-champagneInk">{fact.label}</dt>
                  <dd className="text-ink/78">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-sm font-bold text-rosefog">
              購入期限: 2026年7月25日（土）23:59
            </p>

            <p className="mt-4 text-xs leading-6 text-ink/55">
              『GO,JET!GO!GO! vol.1 Premium 〜 I LOVE YOU が言えなくて 〜』／2026年7月23日（木）〜27日（月）／Air studio 両国
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPortalEvent("ticket_click", {
                    placement: "gojet_yell_card",
                    item: "エールカードを届ける"
                  })
                }
                className="yukako-button yukako-button-rose min-h-12 px-5 py-3 text-sm"
              >
                <Ticket className="h-4 w-4" aria-hidden="true" />
                エールカードを届ける
              </a>
              <a
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yukako-button yukako-button-soft min-h-12 px-5 py-3 text-sm"
              >
                <ExternalLink className="h-4 w-4 text-champagneInk" aria-hidden="true" />
                優花子のポストを見る
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
