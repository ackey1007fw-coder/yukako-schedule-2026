import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  CalendarDays,
  CalendarHeart,
  ChevronDown,
  HeartHandshake,
  Megaphone,
  MessageCircle,
  Radio,
  X
} from "lucide-react";
import { getGojetStatus } from "../lib/gojetStatus";
import { scrollToSection } from "../lib/scrollToSection";

type QuickNavProps = {
  now?: Date;
};

const CLOCK_UPDATE_MS = 60000;

const mainItems = [
  { label: "今日", href: "#today", Icon: CalendarDays },
  { label: "公演", href: "#next", Icon: CalendarHeart },
  { label: "予定", href: "#schedule", Icon: CalendarDays },
  { label: "応援", href: "#support", Icon: HeartHandshake },
  { label: "SNS", href: "#links", Icon: MessageCircle }
];

const gojetLiveItem = {
  label: "本日の公演",
  href: "#gojet-live-panel",
  Icon: Radio
};

// 公演当日は「本日の公演」を優先して7列に収めるため、「更新」はもっとメニュー側へ退避する
const updatesItem = { label: "更新", href: "#updates", Icon: Megaphone };

const moreItems = [
  { label: "最新情報", href: "#updates" },
  { label: "これまでの歩み", href: "#highlights" },
  { label: "ベイビーシャーク", href: "#baby-shark-live" },
  { label: "お嬢様はバンド", href: "#ojosama-band" },
  { label: "龍馬くん", href: "#ryoma-kun" },
  { label: "プロフィール", href: "#profile" },
  { label: "秋田とのつながり", href: "#akita-roots" },
  { label: "写真", href: "#gallery" },
  { label: "SHOWROOM", href: "#showroom" }
];

export function QuickNav({ now }: QuickNavProps) {
  const [currentTime, setCurrentTime] = useState(() => now ?? new Date());
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [overlayTop, setOverlayTop] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const menuPanelId = `${menuId}-panel`;

  useEffect(() => {
    if (now) {
      setCurrentTime(now);
      return undefined;
    }

    const timer = window.setInterval(() => setCurrentTime(new Date()), CLOCK_UPDATE_MS);
    return () => window.clearInterval(timer);
  }, [now]);

  const closeMoreMenu = (options?: { restoreFocus?: boolean }) => {
    setIsMoreOpen(false);
    if (options?.restoreFocus !== false) {
      // メニューを閉じたあと、必要に応じて「もっと」へフォーカスを戻す
      window.requestAnimationFrame(() => moreButtonRef.current?.focus());
    }
  };

  const updateOverlayTop = () => {
    const bottom = navRef.current?.getBoundingClientRect().bottom ?? 0;
    setOverlayTop(Math.max(bottom, 0));
  };

  useEffect(() => {
    if (!isMoreOpen) return undefined;

    updateOverlayTop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMoreMenu();
      }
    };
    const onHashChange = () => closeMoreMenu({ restoreFocus: false });
    const onPopState = () => closeMoreMenu({ restoreFocus: false });
    const onViewportChange = () => {
      updateOverlayTop();
      closeMoreMenu({ restoreFocus: false });
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("orientationchange", onViewportChange);
    window.addEventListener("resize", onViewportChange);

    // 開いた直後は閉じるボタンへフォーカスを移し、Tab順を分かりやすくする
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("orientationchange", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
    };
  }, [isMoreOpen]);

  const navItems =
    getGojetStatus(currentTime).phase === "today"
      ? [gojetLiveItem, ...mainItems]
      : [updatesItem, ...mainItems];

  const handleMoreToggle = () => {
    if (isMoreOpen) {
      closeMoreMenu();
      return;
    }
    setIsMoreOpen(true);
  };

  const handleSectionLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    options?: { closeMenu?: boolean },
  ) => {
    const id = href.split("#")[1];
    if (!id || !document.getElementById(id)) return;

    event.preventDefault();
    if (options?.closeMenu) {
      closeMoreMenu({ restoreFocus: false });
    }

    const hash = `#${id}`;
    if (window.location.hash === hash) {
      window.history.replaceState(null, "", hash);
    } else {
      window.history.pushState(null, "", hash);
    }

    const align = () => scrollToSection(id, { behavior: "smooth" });
    if (options?.closeMenu) {
      window.requestAnimationFrame(() => window.requestAnimationFrame(align));
    } else {
      align();
    }
  };

  return (
    <nav
      ref={navRef}
      data-sticky-quick-nav
      aria-label="ページ内メニュー"
      className="sticky top-16 z-40 border-b border-rosefog/20 bg-white/95 shadow-sm backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto grid max-w-2xl grid-cols-7 gap-1 px-2 py-1.5">
        {navItems.map(({ label, href, Icon }) => (
          <a
            key={href}
            href={href}
            onClick={(event) => handleSectionLinkClick(event, href)}
            className="flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 text-center text-[10px] font-bold leading-tight text-ink/72 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne min-[420px]:text-xs"
          >
            <Icon className="h-4 w-4 text-champagne" aria-hidden="true" />
            {label}
          </a>
        ))}
        <button
          ref={moreButtonRef}
          type="button"
          aria-expanded={isMoreOpen}
          aria-controls={menuPanelId}
          aria-label={isMoreOpen ? "追加メニューを閉じる" : "追加メニューを開く"}
          onClick={handleMoreToggle}
          className="flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-ink/72 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne min-[380px]:text-xs"
        >
          <ChevronDown
            className={`h-4 w-4 text-champagne transition motion-reduce:transition-none ${
              isMoreOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
          もっと
        </button>
      </div>

      {isMoreOpen && (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-x-0 bottom-0 z-[39] bg-ink/35"
            style={{ top: overlayTop }}
            onClick={() => closeMoreMenu()}
          />
          <div
            id={menuPanelId}
            role="region"
            aria-label="追加メニュー"
            className="absolute inset-x-0 top-full z-[41] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2"
          >
            <div className="mx-auto max-w-2xl overflow-hidden border border-champagne/35 bg-white shadow-paper">
              <div className="flex items-center justify-between gap-3 border-b border-rosefog/20 px-3 py-2.5">
                <p className="text-sm font-bold text-ink">メニュー</p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => closeMoreMenu()}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 border border-champagne/45 bg-porcelain px-3 text-sm font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne"
                >
                  <X className="h-4 w-4 text-champagne" aria-hidden="true" />
                  閉じる
                </button>
              </div>
              <div className="max-h-[min(55vh,24rem)] overflow-y-auto overscroll-contain p-2">
                <ul className="grid grid-cols-2 gap-1">
                  {moreItems.map((item) => (
                    <li key={item.href} className="min-w-0">
                      <a
                        href={item.href}
                        onClick={(event) =>
                          handleSectionLinkClick(event, item.href, { closeMenu: true })
                        }
                        className="flex min-h-11 items-center px-3 py-2 text-sm font-bold leading-snug text-ink/78 hover:bg-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
