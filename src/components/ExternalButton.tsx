import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

type ExternalButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "gold" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "border-ink bg-ink text-white hover:bg-[#4a3942] focus-visible:outline-ink",
  light:
    "border-rosefog/40 bg-white/85 text-ink hover:border-rosefog hover:bg-white focus-visible:outline-rosefog",
  gold:
    "border-champagne bg-champagne text-white shadow-button hover:bg-[#c99a47] focus-visible:outline-champagne",
  ghost:
    "border-white/50 bg-white/20 text-white hover:bg-white/30 focus-visible:outline-white"
};

export function ExternalButton({
  href,
  children,
  variant = "light",
  className = ""
}: ExternalButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
