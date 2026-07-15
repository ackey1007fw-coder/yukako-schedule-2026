import { useEffect, useState } from "react";
import {
  CalendarDays,
  CalendarHeart,
  ChevronDown,
  HeartHandshake,
  Megaphone,
  MessageCircle,
  Radio
} from "lucide-react";
import { getGojetStatus } from "../lib/gojetStatus";

type QuickNavProps = {
  now?: Date;
};

const CLOCK_UPDATE_MS = 60000;

const mainItems = [
  { label: "今日", href: "#today", Icon: CalendarDays }, { label: "公演", href: "#next", Icon: CalendarHeart },
  { label: "予定", href: "#schedule", Icon: CalendarDays }, { label: "応援", href: "#support", Icon: HeartHandshake },
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
  { label: "これまでの歩み", href: "#highlights" }, { label: "お嬢様はバンド", href: "#ojosama-band" },
  { label: "龍馬くん", href: "#ryoma-kun" },
  { label: "プロフィール", href: "#profile" }, { label: "秋田とのつながり", href: "#akita-roots" },
  { label: "写真", href: "#gallery" }, { label: "SHOWROOM", href: "#showroom" }
];
export function QuickNav({ now }: QuickNavProps) {
  const [currentTime, setCurrentTime] = useState(() => now ?? new Date());

  useEffect(() => {
    if (now) {
      setCurrentTime(now);
      return undefined;
    }

    const timer = window.setInterval(() => setCurrentTime(new Date()), CLOCK_UPDATE_MS);
    return () => window.clearInterval(timer);
  }, [now]);

  const navItems =
    getGojetStatus(currentTime).phase === "today"
      ? [gojetLiveItem, ...mainItems]
      : [updatesItem, ...mainItems];

  return <nav aria-label="ページ内メニュー" className="sticky top-16 z-40 border-b border-rosefog/20 bg-white/95 shadow-sm backdrop-blur-xl lg:hidden">
    <div className="mx-auto grid max-w-2xl grid-cols-7 gap-1 px-2 py-1.5">
      {navItems.map(({ label, href, Icon }) => <a key={href} href={href} className="flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 text-center text-[10px] font-bold leading-tight text-ink/72 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne min-[420px]:text-xs"><Icon className="h-4 w-4 text-champagne" aria-hidden="true" />{label}</a>)}
      <details className="group relative"><summary className="flex min-h-11 cursor-pointer list-none flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-ink/72 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne min-[380px]:text-xs"><ChevronDown className="h-4 w-4 text-champagne transition group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />もっと</summary>
        <div className="absolute right-0 top-full mt-2 grid w-48 border border-rosefog/25 bg-white p-2 shadow-paper">{moreItems.map((item) => <a key={item.href} href={item.href} className="px-3 py-2 text-sm font-bold text-ink/72 hover:bg-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne">{item.label}</a>)}</div>
      </details>
    </div>
  </nav>;
}
