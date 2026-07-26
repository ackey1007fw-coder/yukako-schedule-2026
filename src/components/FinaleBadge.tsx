import { Award } from "lucide-react";

type FinaleBadgeProps = {
  label?: string;
  className?: string;
};

// 千秋楽（最終公演・最終日）を示す小さなバッジ。gojetTimetable の isFinale や
// 最終公演日の判定と組み合わせて使う。今後の公演でも再利用できるよう独立させている。
export function FinaleBadge({ label = "千秋楽", className = "" }: FinaleBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 border border-champagne/50 bg-champagne/10 px-2 py-0.5 text-[11px] font-black text-champagneInk ${className}`}
    >
      <Award className="h-3 w-3 shrink-0" aria-hidden="true" />
      {label}
    </span>
  );
}
