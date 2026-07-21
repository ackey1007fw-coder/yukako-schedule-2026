type ScrollToSectionOptions = {
  behavior?: ScrollBehavior;
  gap?: number;
};

const DEFAULT_GAP = 12;

function getVisibleBottom(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return 0;

  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden") return 0;

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 ? rect.bottom : 0;
}

function getDocumentTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;

  // offsetTop は CSS transform を含まないため、SectionReveal の初期
  // translateY(24px) が解除された後も着地点がずれない。
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return top;
}

export function getStickyNavigationBottom() {
  return Math.max(
    getVisibleBottom("[data-sticky-site-header]"),
    getVisibleBottom("[data-sticky-quick-nav]"),
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
