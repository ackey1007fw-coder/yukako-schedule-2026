declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => Promise<Element[]>;
      };
    };
  }
}

const EMBED_SCRIPT_SRC = "https://platform.twitter.com/widgets.js";

let scriptPromise: Promise<void> | null = null;

/** X公式 widgets.js を一度だけ読み込む。複数の埋め込みが同時にマウントされてもscriptタグは1つだけになる。 */
export function loadXEmbedScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.twttr?.widgets) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("x embed script failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("x embed script failed to load"));
    document.body.appendChild(script);
  });

  return scriptPromise;
}
