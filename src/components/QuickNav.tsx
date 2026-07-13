import { CalendarDays, CalendarHeart, ChevronDown, HeartHandshake, MessageCircle } from "lucide-react";

const mainItems = [
  { label: "今日", href: "#today", Icon: CalendarDays }, { label: "公演", href: "#next", Icon: CalendarHeart },
  { label: "予定", href: "#schedule", Icon: CalendarDays }, { label: "応援", href: "#support", Icon: HeartHandshake },
  { label: "SNS", href: "#links", Icon: MessageCircle }
];
const moreItems = [
  { label: "これまでの歩み", href: "#highlights" }, { label: "お嬢様はバンド", href: "#ojosama-band" },
  { label: "龍馬くん", href: "#ryoma-kun" },
  { label: "プロフィール", href: "#profile" }, { label: "秋田とのつながり", href: "#akita-roots" },
  { label: "写真", href: "#gallery" }, { label: "SHOWROOM", href: "#showroom" }
];
export function QuickNav() {
  return <nav aria-label="ページ内メニュー" className="sticky top-16 z-40 border-b border-rosefog/20 bg-white/95 shadow-sm backdrop-blur-xl lg:hidden">
    <div className="mx-auto grid max-w-2xl grid-cols-6 gap-1 px-2 py-1.5">
      {mainItems.map(({ label, href, Icon }) => <a key={href} href={href} className="flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-ink/72 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne min-[380px]:text-xs"><Icon className="h-4 w-4 text-champagne" aria-hidden="true" />{label}</a>)}
      <details className="group relative"><summary className="flex min-h-11 cursor-pointer list-none flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-ink/72 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne min-[380px]:text-xs"><ChevronDown className="h-4 w-4 text-champagne transition group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />もっと</summary>
        <div className="absolute right-0 top-full mt-2 grid w-48 border border-rosefog/25 bg-white p-2 shadow-paper">{moreItems.map((item) => <a key={item.href} href={item.href} className="px-3 py-2 text-sm font-bold text-ink/72 hover:bg-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne">{item.label}</a>)}</div>
      </details>
    </div>
  </nav>;
}
