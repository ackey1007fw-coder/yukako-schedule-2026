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

  const targetTop = window.scrollY + target.getBoundingClientRect().top;
  const top = Math.max(0, targetTop - getStickyNavigationBottom() - gap);
  window.scrollTo({ top, behavior });
  return true;
}
