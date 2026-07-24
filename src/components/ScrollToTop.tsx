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
      className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-[45] grid h-12 w-12 place-items-center border border-champagne/70 bg-porcelain text-ink shadow-[0_8px_24px_rgba(43,37,38,0.24)] transition hover:border-champagne hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne md:bottom-6"
      aria-label="ページのトップに戻る"
      style={{ borderRadius: "6px" }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
