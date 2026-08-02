import type { ReactNode } from "react";
import { audienceReports } from "../data/audienceReports";
import { GojetFinaleReportSection } from "./GojetFinaleReportSection";

// #ゆかJET のトピック（出演者メッセージ・稽古オフショット・応援メニュー・観劇レポート）は
// もともと背景も余白もばらばらの独立セクションで、同じ特集に見えなかった。
// 1本の帯にまとめて、先頭に行き先の一覧を置く。
const topics = [
  { href: "#gojet-finale-report", label: "公演完走レポート" },
  { href: "#gojet-shiina-message", label: "出演者メッセージ" },
  { href: "#gojet-cast-voice", label: "キャストの声" },
  { href: "#gojet-hair-update", label: "稽古・オフショット" },
  { href: "#gojet-yell-card", label: "エールカード" },
  {
    href: "#audience-reports",
    label: "観劇レポート",
    enabled: audienceReports.some((entry) => entry.published)
  }
];

export function GojetTopicsBand({ children }: { children: ReactNode }) {
  const visibleTopics = topics.filter((topic) => topic.enabled !== false);

  return (
    <div className="bg-gradient-to-b from-porcelain via-white to-porcelain">
      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-champagneInk">
          #ゆかJET Topics
        </p>
        <h2 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
          特集のつづき
        </h2>
        <div
          className="mt-4 h-px w-24 bg-gradient-to-r from-champagne to-transparent"
          aria-hidden="true"
        />
        <nav aria-label="#ゆかJET 特集の目次">
          <ul className="mt-5 flex flex-wrap gap-2">
            {visibleTopics.map((topic) => (
              <li key={topic.href}>
                <a
                  href={topic.href}
                  className="inline-flex min-h-11 items-center border border-champagne/45 bg-white px-3.5 py-2 text-sm font-bold text-champagneInk transition hover:border-champagne hover:bg-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                >
                  {topic.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <GojetFinaleReportSection />
      {children}
    </div>
  );
}
