import { HeartHandshake, MonitorPlay, Radio, Ticket, Video } from "lucide-react";
import { supportContent } from "../data/supportContent";
import { SectionHeader } from "./SectionHeader";

const icons = [HeartHandshake, Video, MonitorPlay, Ticket];

export function SupportersSection() {
  if (supportContent.length === 0) return null;

  const hashtagUrl = "https://x.com/hashtag/%E3%82%86%E3%81%8BJET";

  return (
    <section id="support" className="scroll-mt-32 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Support Menu"
          title="#ゆかJET 応援メニューの記録"
          copy="『GO,JET!GO!GO! vol.1 Premium』で案内された応援メニューの記録です。各種受付と配信視聴は終了しています。"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportContent.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <article
                key={item.title}
                className="yukako-card flex min-h-44 flex-col gap-3 border-rosefog/25 bg-porcelain p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/50 bg-white text-champagne">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-xl text-ink">
                  {item.title}
                </span>
                <span className="text-sm leading-6 text-ink/65">
                  {item.description}
                </span>
                <span className="mt-auto w-fit border border-rosefog/30 bg-white px-2 py-1 text-xs font-black text-rosefog">
                  受付終了
                </span>
              </article>
            );
          })}
        </div>

        <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-ink/60">
          <Radio className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
          配信視聴は2026年8月10日をもって終了しました。劇場と配信で届けられた公演の記録は、#ゆかJET特集で振り返れます。
        </p>
        <div className="mt-5">
          <a
            href={hashtagUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center border border-champagne bg-porcelain px-4 py-2 text-sm font-bold text-ink transition hover:bg-champagne hover:text-white"
          >
            Xでみんなの #ゆかJET 応援を見る
          </a>
        </div>
      </div>
    </section>
  );
}
