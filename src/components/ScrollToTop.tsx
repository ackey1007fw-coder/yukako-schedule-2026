import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-3 z-[45] grid h-11 w-11 place-items-center border border-champagne/70 bg-porcelain/95 text-ink shadow-[0_8px_24px_rgba(43,37,38,0.24)] backdrop-blur-sm transition hover:border-champagne hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:right-4 md:bottom-6 md:h-12 md:w-12"
      aria-label="ページのトップに戻る"
      style={{ borderRadius: "6px" }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
