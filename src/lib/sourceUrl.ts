const INSTAGRAM_CONTENT_PATHS = new Set(["p", "reel", "tv", "stories"]);

/**
 * 投稿の恒久URLではなく、今後の更新でも再利用されるInstagramプロフィールURLか。
 * プロフィールURLは表示先としては使うが、更新同士の同一性判定には使わない。
 */
export function isReusableInstagramProfileUrl(value: string | undefined) {
  if (!value) return false;

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    if (hostname !== "instagram.com") return false;

    const pathParts = url.pathname.split("/").filter(Boolean);
    return (
      pathParts.length === 1 &&
      !INSTAGRAM_CONTENT_PATHS.has(pathParts[0].toLowerCase())
    );
  } catch {
    return false;
  }
}
