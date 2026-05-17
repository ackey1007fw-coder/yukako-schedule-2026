import { profile } from "../data/profile";
import type { SocialLink } from "../types";

type FooterProps = {
  socialLinks: SocialLink[];
  source?: "fallback" | "sheets";
  updatedAt?: string;
};

export function Footer({ socialLinks, source, updatedAt }: FooterProps) {
  return (
    <footer className="border-t border-rosefog/20 bg-ink px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl">{profile.name}</p>
          <p className="mt-1 text-sm text-white/60">
            {profile.theme} | 応援スケジュール
          </p>
          <p className="mt-2 text-xs text-white/45">
            Data: {source === "sheets" ? "Google Sheets" : "Fallback"}
            {updatedAt ? ` / ${new Date(updatedAt).toLocaleString("ja-JP")}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {socialLinks.slice(0, 5).map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/18 px-3 py-2 text-xs font-bold text-white/75 transition hover:border-champagne hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
