import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

// .section-reveal のトランジション時間（index.css）と揃える。
const REVEAL_TRANSITION_MS = 640;

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  // 表示アニメーションが終わったセクションは、transform / transition を持たない
  // ただのdivへ戻す。iOS Safariでは、残ったtransformが大きなセクションを
  // 合成レイヤーにしてしまい、カード上部の欠けやスクロールの詰まりを起こす。
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      setSettled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      // #ゆかJET のような更新カードが多いセクションは高さが数万pxに達し、
      // threshold(対象要素の可視割合)が0より大きいと、共有リンクなどで
      // セクション途中へ直接ジャンプした際に可視割合が閾値へ届かず、
      // 永久にopacity:0のまま（revealされない）になる。0にして
      // 「viewportと少しでも重なれば表示」に統一する。
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed || settled) return undefined;

    const timer = window.setTimeout(() => setSettled(true), REVEAL_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [revealed, settled]);

  if (settled) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`section-reveal ${revealed ? "section-revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
