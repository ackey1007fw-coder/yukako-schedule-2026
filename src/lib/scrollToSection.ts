type ScrollToSectionOptions = {
  behavior?: ScrollBehavior;
  gap?: number;
};

// SectionReveal未表示のセクションへ着地する場合、クリック時点ではまだ
// translateY(24px)が残っており、reveal後にコンテンツが24px分上へ動く。
// その分を吸収できるよう、通常の余白(12px)より大きめに確保する。
const DEFAULT_GAP = 36;

function getStickyBottom(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return 0;

  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden") return 0;

  const rect = element.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return 0;

  // タップ時点でQuickNavがPriorityBannerの下にあり、まだsticky位置へ到達して
  // いなくても、移動完了後の top + height を使って着地点を計算する。
  if (style.position === "sticky" || style.position === "fixed") {
    const stickyTop = Number.parseFloat(style.top);
    if (Number.isFinite(stickyTop)) {
      return Math.max(0, stickyTop) + rect.height;
    }
  }

  return rect.bottom;
}

function getDocumentTop(element: HTMLElement) {
  // offsetTop/offsetParent の手動チェーンは、will-change/transform を持つ
  // SectionReveal ラッパーが途中で新たな offsetParent 境界になった場合に
  // 数千px規模でずれることがある（未reveal区間が多いページ下部で顕著）。
  // getBoundingClientRect は常に実際の描画位置を返すため、こちらを正とする。
  return element.getBoundingClientRect().top + window.scrollY;
}

export function getStickyNavigationBottom() {
  return Math.max(
    getStickyBottom("[data-sticky-site-header]"),
    getStickyBottom("[data-sticky-quick-nav]"),
    0,
  );
}

export function scrollToSection(
  id: string,
  { behavior = "smooth", gap = DEFAULT_GAP }: ScrollToSectionOptions = {},
) {
  const target = document.getElementById(id);
  if (!target) return false;

  const top = Math.max(
    0,
    getDocumentTop(target) - getStickyNavigationBottom() - gap,
  );
  window.scrollTo({ top, behavior });
  return true;
}
