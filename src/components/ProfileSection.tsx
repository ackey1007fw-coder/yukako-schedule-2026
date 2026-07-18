import type { ReactNode } from "react";
import { ArrowUpRight, BookOpenText, ExternalLink, HeartHandshake, Star } from "lucide-react";
import { profile } from "../data/profile";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { ActHeader } from "./ActHeader";

type FactLink = { text: string; url: string };

// fact.value の中に fact.links で指定した文言があれば、その部分だけをリンクに差し替える。
// 例:「受賞歴」の中の「Miss Grand Japan 2025 MISS PEACE賞」だけをアーカイブ記事へのリンクにする。
function renderFactValue(value: string, links?: FactLink[]): ReactNode {
  if (!links || links.length === 0) return value;

  const nodes: ReactNode[] = [];
  let remaining = value;
  let key = 0;

  while (remaining.length > 0) {
    const next = links
      .map((link) => ({ link, index: remaining.indexOf(link.text) }))
      .filter((entry) => entry.index !== -1)
      .sort((a, b) => a.index - b.index)[0];

    if (!next) {
      nodes.push(<span key={key++}>{remaining}</span>);
      break;
    }

    if (next.index > 0) {
      nodes.push(<span key={key++}>{remaining.slice(0, next.index)}</span>);
    }

    const isInternal = next.link.url.startsWith("/");
    nodes.push(
      <a
        key={key++}
        href={next.link.url}
        {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="inline-flex items-center gap-0.5 font-bold text-rosefog underline decoration-champagne decoration-2 underline-offset-2 transition hover:text-champagneInk"
      >
        {next.link.text}
        <ArrowUpRight className="h-3 w-3 shrink-0 text-champagne" aria-hidden="true" />
      </a>,
    );

    remaining = remaining.slice(next.index + next.link.text.length);
  }

  return nodes;
}

export function ProfileSection() {
  return (
    <section id="profile" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <ActHeader
            act={4}
            eyebrow="Profile"
            title="プロフィール"
            copy="秋田出身の俳優・プロデューサー・ライバー。吉井優花子さんのプロフィールです。"
          />
          <div className="yukako-card border-champagne/40 bg-white p-5 shadow-paper">
            {profile.fanName && (
              <div className="mb-4 flex items-center gap-3">
                <Star className="h-5 w-5 text-champagne" aria-hidden="true" />
                <p className="text-sm font-bold text-ink/70">
                  ファンネーム：{profile.fanName} ／ ファンマーク {profile.fanMark}
                </p>
              </div>
            )}
            <p className="font-display text-4xl text-ink">{profile.name}</p>
            <p className="mt-2 text-lg text-ink/55">{profile.kana}</p>
            <a
              href={profile.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 border border-champagne/50 bg-porcelain px-4 py-3 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
            >
              <BookOpenText className="h-4 w-4 text-champagne" aria-hidden="true" />
              Wikipediaで見る
              <ExternalLink className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          {profile.portraitImage && (
            <div className="yukako-card relative border-white bg-porcelain lg:min-h-[420px]">
              <img
                {...getResponsiveImageProps(
                  profile.portraitImage,
                  "(min-width: 1024px) 34vw, 100vw",
                )}
                alt={`${profile.name} portrait`}
                loading="lazy"
                className="block h-auto w-full object-contain lg:absolute lg:inset-0 lg:h-full lg:object-cover lg:object-top"
              />
            </div>
          )}
          <div className="grid gap-3">
            {profile.facts.map((fact) => (
              <div key={fact.label} className="yukako-card grid grid-cols-[88px_1fr] border-rosefog/20 bg-white">
                <div className="border-r border-rosefog/20 bg-porcelain px-4 py-4 text-xs font-bold text-champagneInk">
                  {fact.label}
                </div>
                <div className="px-4 py-4 text-sm font-semibold leading-7 text-ink/75">
                  {renderFactValue(fact.value, "links" in fact ? fact.links : undefined)}
                </div>
              </div>
            ))}
            {profile.fanMark && (
              <div className="yukako-card flex items-center gap-3 border-champagne/40 bg-white p-4 text-sm font-bold leading-7 text-ink/70">
                <HeartHandshake className="h-5 w-5 shrink-0 text-champagne" aria-hidden="true" />
                ファンマーク {profile.fanMark} をつけて、みんなで一緒に応援しよう。
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
