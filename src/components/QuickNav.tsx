// スマホ用の簡易セクションナビ（PCはヘッダーのナビがあるので lg:hidden）。
// トップ付近に置き、タップでスムーズスクロール。横スクロールで邪魔にならない。
const items = [
  { label: "次の出演", href: "#next" },
  { label: "スケジュール", href: "#schedule" },
  { label: "これまで", href: "#highlights" },
  { label: "ギャラリー", href: "#gallery" },
  { label: "SHOWROOM", href: "#showroom" },
  { label: "プロフィール", href: "#profile" }
];

export function QuickNav() {
  return (
    <nav
      aria-label="セクションへ移動"
      className="border-b border-rosefog/15 bg-porcelain/80 backdrop-blur lg:hidden"
    >
      <div className="flex gap-2 overflow-x-auto px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 whitespace-nowrap border border-rosefog/30 bg-white px-3 py-1.5 text-xs font-bold text-ink/75 transition hover:border-champagne hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
