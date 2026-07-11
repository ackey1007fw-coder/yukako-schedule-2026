import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

type ExternalButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "gold" | "ghost";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary: "yukako-button-primary",
  light: "yukako-button-soft",
  gold: "yukako-button-gold",
  ghost: "yukako-button-ghost"
};

export function ExternalButton({
  href,
  children,
  variant = "light",
  className = "",
  onClick
}: ExternalButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`yukako-button min-h-12 px-4 py-3 text-sm ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
