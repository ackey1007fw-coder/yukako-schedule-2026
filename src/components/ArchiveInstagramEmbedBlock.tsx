import { InstagramReelEmbed } from "./InstagramReelEmbed";
import type { ArchiveInstagramEmbed } from "../data/archive";

type ArchiveInstagramEmbedBlockProps = {
  embed: ArchiveInstagramEmbed;
};

export function ArchiveInstagramEmbedBlock({ embed }: ArchiveInstagramEmbedBlockProps) {
  return (
    <div className="yukako-card my-10 border-champagne/30 bg-white p-5 shadow-paper sm:p-8">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-champagneInk">
        <span className="border border-champagne/45 bg-white px-2.5 py-1">Instagram Reel</span>
        <span className="border border-rosefog/45 bg-rosefog/10 px-2.5 py-1 text-rosefog">PR</span>
        <time dateTime={embed.datePublished} className="text-ink/45 normal-case tracking-normal">
          {embed.dateLabel}
        </time>
      </div>

      <h2 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
        {embed.heading}
      </h2>
      <p className="mt-1 text-xs font-bold text-ink/50">{embed.attribution}</p>
      <p className="mt-4 leading-8 text-ink/75">{embed.caption}</p>

      <div className="mt-6">
        <InstagramReelEmbed url={embed.url} label={embed.label} />
      </div>
    </div>
  );
}
