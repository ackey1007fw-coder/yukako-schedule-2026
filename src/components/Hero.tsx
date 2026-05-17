import { CalendarCheck, MessageCircleHeart, Ticket, Users } from "lucide-react";
import { profile } from "../data/profile";
import type { ScheduleEvent, SocialLink } from "../types";
import { ExternalButton } from "./ExternalButton";
import { Photo } from "./Photo";

type HeroProps = {
  nextEvent?: ScheduleEvent;
  socialLinks: SocialLink[];
};

const socialShortLabels: Record<string, string> = {
  x: "X",
  instagram: "IG",
  tiktok: "TT",
  showroom: "SR",
  link: "LN",
  note: "NO",
  youtube: "YT",
  web: "WEB"
};

export function Hero({ nextEvent, socialLinks }: HeroProps) {
  const ticketLink =
    nextEvent?.links.find((link) => link.kind === "ticket") ??
    nextEvent?.links[0];
  const mainSocials = socialLinks.slice(0, 4);

  return (
    <section
      id="top"
      className="relative isolate min-h-[88svh] overflow-hidden border-b border-rosefog/20 bg-porcelain"
    >
      <Photo
        src={profile.heroImage}
        alt={`${profile.name} hero`}
        loading="eager"
        className="absolute inset-y-0 right-0 -z-10 w-full md:w-[68%]"
        imageClassName="object-[center_top]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#fffafc_0%,rgba(255,250,252,0.94)_36%,rgba(255,250,252,0.42)_68%,rgba(255,250,252,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(180deg,rgba(255,250,252,0),#fffafc)]" />

      <div className="mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl pb-6">
          <p className="mb-5 inline-flex border border-champagne/60 bg-white/70 px-3 py-2 text-xs font-bold uppercase text-champagne backdrop-blur">
            {profile.theme}
          </p>
          <h1 className="font-display text-5xl leading-[1.02] text-ink sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-3 font-display text-2xl text-ink/65 sm:text-3xl">
            {profile.romaji}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-9 text-ink/76 sm:text-xl">
            {profile.catchCopy}
          </p>
          <p className="mt-3 max-w-xl leading-8 text-ink/62">{profile.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#next"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-[#4a3942]"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              次の出演を見る
            </a>
            {ticketLink && (
              <ExternalButton href={ticketLink.url} variant="gold" className="px-5">
                <span className="inline-flex items-center gap-2">
                  <Ticket className="h-4 w-4" aria-hidden="true" />
                  チケット予約
                </span>
              </ExternalButton>
            )}
            <a
              href="#links"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-rosefog/40 bg-white/80 px-5 py-3 text-sm font-bold text-ink backdrop-blur transition hover:bg-white"
            >
              <MessageCircleHeart className="h-4 w-4" aria-hidden="true" />
              SNSを見る
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-champagne/30 pt-5 sm:flex-row sm:items-end sm:justify-between">
          {nextEvent && (
            <a
              href="#next"
              className="group flex max-w-xl items-start gap-4 text-left text-ink"
            >
              <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center border border-champagne bg-white/80">
                <CalendarCheck
                  className="h-5 w-5 text-champagne"
                  aria-hidden="true"
                />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase text-champagne">
                  Next Appearance
                </span>
                <span className="mt-1 block text-base font-bold sm:text-lg">
                  {nextEvent.shortTitle}
                </span>
                <span className="mt-1 block text-sm text-ink/62">
                  {nextEvent.displayDate}
                </span>
              </span>
            </a>
          )}

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-ink/50" aria-hidden="true" />
            {mainSocials.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${link.label} ${link.handle}`}
                className="grid h-11 w-11 place-items-center border border-white/70 bg-white/70 text-xs font-black text-ink shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-champagne"
              >
                {socialShortLabels[link.kind]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
