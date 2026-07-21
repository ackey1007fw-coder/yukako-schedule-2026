import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Mic2 } from "lucide-react";
import { profile } from "../data/profile";
import { scrollToSection } from "../lib/scrollToSection";
import type { SocialLink } from "../types";

// ホーム以外のページ（/archive など）にも同じヘッダーを出すため、
// セクションリンクは "#updates" ではなく "/#updates"（どのページからでもホームの該当セクションへ飛べる。
// ホーム上ではパスが同じなのでリロードせずスクロールだけが起きる）。
const navItems = [
  { label: "最新情報", href: "/#updates", id: "updates" },
  { label: "公演情報", href: "/#next", id: "next" },
  { label: "スケジュール", href: "/#schedule", id: "schedule" },
  { label: "これまでの歩み", href: "/#highlights", id: "highlights" },
  { label: "アーカイブ", href: "/archive", id: "archive" },
  { label: "プロフィール", href: "/#profile", id: "profile" },
  { label: "SNS", href: "/#links", id: "links" }
];

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

type SiteHeaderProps = {
  socialLinks: SocialLink[];
};

export function SiteHeader({ socialLinks }: SiteHeaderProps) {
  const showroom = socialLinks.find((link) => link.kind === "showroom");
  const activeSection = useActiveSection();

  const handleSectionLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (window.location.pathname !== "/") return;

    const id = href.split("#")[1];
    if (!id || !document.getElementById(id)) return;

    event.preventDefault();
    const hash = `#${id}`;
    if (window.location.hash === hash) {
      window.history.replaceState(null, "", hash);
    } else {
      window.history.pushState(null, "", hash);
    }
    scrollToSection(id, { behavior: "smooth" });
  };

  return (
    <header
      data-sticky-site-header
      className="safe-area-header sticky top-0 z-50 w-full overflow-hidden border-b border-champagne/25 bg-porcelain/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 w-full min-w-0 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="/#top" className="flex min-w-0 items-center gap-3 text-ink">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-champagne/60 bg-ink text-champagne">
            <Mic2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base leading-none min-[430px]:text-lg">
              Yoshii Yukako
            </span>
            <span className="mt-1 block text-[11px] font-semibold text-ink/55">
              Actor / Akita / Stage
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-ink/70 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleSectionLinkClick(event, item.href)}
              className={`transition-colors ${
                activeSection === item.id
                  ? "text-champagneInk"
                  : "hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {showroom ? (
          <a
            href={showroom.url}
            target="_blank"
            rel="noopener noreferrer"
            className="yukako-button yukako-button-gold min-h-10 shrink-0 rounded-full px-3 text-xs sm:min-h-11 sm:px-4 sm:text-sm"
          >
            <span className="hidden min-[430px]:inline">SHOWROOM</span>
            <span className="min-[430px]:hidden">SR</span>
          </a>
        ) : socialLinks[0] && (
          <a
            href={socialLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="yukako-button yukako-button-gold min-h-10 shrink-0 rounded-full px-3 text-xs sm:min-h-11 sm:px-4 sm:text-sm"
          >
            {socialLinks[0].label}
          </a>
        )}
      </div>
    </header>
  );
}
