import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section-reveal ${revealed ? "section-revealed" : ""} ${className}`}
      // iOS Safariでは、表示後もtransform / will-changeを残すと、
      // overflow-hiddenとアニメーションを含む大きなカードの上部が欠けることがある。
      // none / autoへ戻して恒常的な合成レイヤーを解除する。
      style={revealed ? { transform: "none", willChange: "auto" } : undefined}
    >
      {children}
    </div>
  );
}
