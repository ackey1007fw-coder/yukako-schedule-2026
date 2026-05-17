import { categoryMeta } from "../lib/eventMeta";
import type { EventCategory } from "../types";

type BadgeProps = {
  children: string;
  category?: EventCategory;
  strong?: boolean;
};

export function Badge({ children, category, strong = false }: BadgeProps) {
  const tone = category
    ? categoryMeta[category].tone
    : strong
      ? "border-champagne bg-champagne text-white"
      : "border-rosefog/30 bg-white/80 text-ink/70";

  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 text-[11px] font-bold uppercase ${tone}`}
    >
      {children}
    </span>
  );
}
