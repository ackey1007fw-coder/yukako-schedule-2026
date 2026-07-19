// news.ts へお知らせを安全に追加するための共通ロジック（CLI / テストから利用）

import { readFileSync, writeFileSync } from "node:fs";

/** 既存 news.ts で使われている label のみ許可 */
export const ALLOWED_LABELS = Object.freeze(["X", "Instagram", "チケット", "お知らせ"]);

const DATE_RE = /^(\d{4})\.(\d{1,2})\.(\d{1,2})$/;
const ARRAY_START_RE = /export\s+const\s+news\s*:\s*NewsItem\[\]\s*=\s*\[/;

export function escapeTsString(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t");
}

export function parseArgs(argv) {
  const options = {
    date: undefined,
    label: undefined,
    text: undefined,
    url: undefined,
    write: false,
    file: undefined,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    // pnpm / npm がスクリプトへ転送する区切りの "--" は無視する
    if (arg === "--") continue;
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--write") {
      options.write = true;
      continue;
    }
    if (arg.startsWith("--") && arg.includes("=")) {
      const eq = arg.indexOf("=");
      const key = arg.slice(2, eq);
      const value = arg.slice(eq + 1);
      if (key in options && key !== "write" && key !== "help") {
        options[key] = value;
      } else {
        throw new Error(`未知の引数です: ${arg}`);
      }
      continue;
    }
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      if (!(key in options) || key === "write" || key === "help") {
        throw new Error(`未知の引数です: ${arg}`);
      }
      const value = argv[i + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new Error(`--${key} には値が必要です`);
      }
      options[key] = value;
      i += 1;
      continue;
    }
    throw new Error(`未知の引数です: ${arg}`);
  }

  return options;
}

export function validateDate(date) {
  if (typeof date !== "string" || !date.trim()) {
    return "date が空です。YYYY.M.D または YYYY.MM.DD 形式で指定してください。";
  }
  const match = date.trim().match(DATE_RE);
  if (!match) {
    return `date の形式が不正です: "${date}"（YYYY.M.D または YYYY.MM.DD）`;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) {
    return `date の月が不正です: "${date}"`;
  }
  if (day < 1 || day > 31) {
    return `date の日が不正です: "${date}"`;
  }
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return `date が実在しない日付です: "${date}"`;
  }
  return null;
}

export function validateLabel(label) {
  if (typeof label !== "string" || !label.trim()) {
    return `label が空です。許可: ${ALLOWED_LABELS.join(" / ")}`;
  }
  if (!ALLOWED_LABELS.includes(label)) {
    return `label "${label}" は許可されていません。許可: ${ALLOWED_LABELS.join(" / ")}`;
  }
  return null;
}

export function validateText(text) {
  if (typeof text !== "string" || !text.trim()) {
    return "text が空です。掲載する本文を指定してください。";
  }
  return null;
}

export function validateUrl(url) {
  if (typeof url !== "string" || !url.trim()) {
    return "url が空です。https:// で始まるURLを指定してください。";
  }
  if (!url.startsWith("https://")) {
    return `url は https:// で始まる必要があります: "${url}"`;
  }
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") {
      return `url は https:// で始まる必要があります: "${url}"`;
    }
  } catch {
    return `url が不正です: "${url}"`;
  }
  return null;
}

/** 追跡・共有用として重複比較時だけ落とす query（表示/保存URLは変えない） */
const TRACKING_QUERY_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id"
]);
const X_SHARE_QUERY_PARAMS = new Set(["s", "t"]);
const INSTAGRAM_SHARE_QUERY_PARAMS = new Set(["igsh", "igshid"]);

/**
 * 重複判定専用のURL正規化。元の文字列は書き換えない。
 * - hostname 小文字化、先頭 www. 除去、hash 除去、末尾スラッシュ統一
 * - x.com と twitter.com を同一ホストとして扱う
 * - X/Instagram の共有用 query、一般的な utm_* のみ除去
 */
export function normalizeUrlForCompare(url) {
  let parsed;
  try {
    parsed = new URL(String(url).trim());
  } catch {
    return String(url).trim().replace(/\/+$/, "");
  }

  let host = parsed.hostname.toLowerCase();
  if (host.startsWith("www.")) host = host.slice(4);
  if (host === "twitter.com") host = "x.com";

  const kept = new URLSearchParams();
  for (const [key, value] of parsed.searchParams) {
    const lower = key.toLowerCase();
    if (TRACKING_QUERY_PARAMS.has(lower)) continue;
    if (host === "x.com" && X_SHARE_QUERY_PARAMS.has(lower)) continue;
    if (host === "instagram.com" && INSTAGRAM_SHARE_QUERY_PARAMS.has(lower)) continue;
    kept.append(key, value);
  }
  kept.sort();

  const pathname = parsed.pathname.replace(/\/+$/, "") || "";
  const search = kept.toString();
  return `https://${host}${pathname}${search ? `?${search}` : ""}`;
}

/** @deprecated 重複比較は normalizeUrlForCompare を使う。互換のため残す。 */
export function normalizeUrl(url) {
  return normalizeUrlForCompare(url);
}

export function normalizeTextForCompare(text) {
  return text
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, "")
    .replace(/[「」『』【】\[\]()（）・…‥。．、，,.!！?？✨🥺😆💛🎫🌼⭐️⭐＊*]/gu, "");
}

export function extractNewsItems(source) {
  const items = [];
  const itemRe =
    /\{\s*date:\s*"((?:\\.|[^"\\])*)"\s*,\s*label:\s*"((?:\\.|[^"\\])*)"\s*,\s*text:\s*"((?:\\.|[^"\\])*)"\s*,\s*url:\s*"((?:\\.|[^"\\])*)"\s*\}/g;
  let match;
  while ((match = itemRe.exec(source)) !== null) {
    items.push({
      date: unescapeTsString(match[1]),
      label: unescapeTsString(match[2]),
      text: unescapeTsString(match[3]),
      url: unescapeTsString(match[4])
    });
  }
  return items;
}

function unescapeTsString(value) {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

export function findDuplicateUrl(items, url) {
  const target = normalizeUrlForCompare(url);
  return items.find((item) => normalizeUrlForCompare(item.url) === target) ?? null;
}

export function findSimilarText(items, text) {
  const target = normalizeTextForCompare(text);
  if (!target) return null;
  return (
    items.find((item) => {
      const existing = normalizeTextForCompare(item.text);
      if (!existing) return false;
      if (existing === target) return true;
      const shorter = existing.length <= target.length ? existing : target;
      const longer = existing.length <= target.length ? target : existing;
      if (shorter.length < 12) return false;
      return longer.includes(shorter) && shorter.length / longer.length >= 0.85;
    }) ?? null
  );
}

export function formatNewsItemTs(item) {
  return [
    "  {",
    `    date: "${escapeTsString(item.date)}",`,
    `    label: "${escapeTsString(item.label)}",`,
    `    text: "${escapeTsString(item.text)}",`,
    `    url: "${escapeTsString(item.url)}"`,
    "  }"
  ].join("\n");
}

export function insertNewsItem(source, item) {
  const match = ARRAY_START_RE.exec(source);
  if (!match) {
    throw new Error("news.ts 内の `export const news: NewsItem[] = [` が見つかりません。");
  }

  const insertAt = match.index + match[0].length;
  const after = source.slice(insertAt);
  // 配列が空でも、既存項目があっても先頭へ同じインデントで差し込む
  const block = `\n${formatNewsItemTs(item)},`;
  return source.slice(0, insertAt) + block + after;
}

export function validateNewsInput(input) {
  const errors = [
    validateDate(input.date),
    validateLabel(input.label),
    validateText(input.text),
    validateUrl(input.url)
  ].filter(Boolean);

  return {
    ok: errors.length === 0,
    errors,
    item: errors.length
      ? null
      : {
          date: input.date.trim(),
          label: input.label,
          text: input.text.trim(),
          url: input.url.trim()
        }
  };
}

/**
 * @returns {{
 *   ok: boolean,
 *   mode: "dry-run" | "write",
 *   errors: string[],
 *   warnings: string[],
 *   duplicateUrl: object | null,
 *   similarText: object | null,
 *   item: object | null,
 *   itemTs: string | null,
 *   nextSource: string | null,
 *   filePath: string,
 *   existingCount: number
 * }}
 */
export function prepareNewsAddition({
  source,
  filePath,
  date,
  label,
  text,
  url,
  write = false
}) {
  const validated = validateNewsInput({ date, label, text, url });
  if (!validated.ok) {
    return {
      ok: false,
      mode: write ? "write" : "dry-run",
      errors: validated.errors,
      warnings: [],
      duplicateUrl: null,
      similarText: null,
      item: null,
      itemTs: null,
      nextSource: null,
      filePath,
      existingCount: 0
    };
  }

  const items = extractNewsItems(source);
  const duplicateUrl = findDuplicateUrl(items, validated.item.url);
  if (duplicateUrl) {
    return {
      ok: false,
      mode: write ? "write" : "dry-run",
      errors: [`同一URLが既に存在します: ${duplicateUrl.url}`],
      warnings: [],
      duplicateUrl,
      similarText: null,
      item: validated.item,
      itemTs: formatNewsItemTs(validated.item),
      nextSource: null,
      filePath,
      existingCount: items.length
    };
  }

  const similarText = findSimilarText(items, validated.item.text);
  if (similarText) {
    return {
      ok: false,
      mode: write ? "write" : "dry-run",
      errors: [
        `同一またはほぼ同じ本文が既に存在します（追加しません）: ${similarText.text}`
      ],
      warnings: ["本文の重複警告のため --write でも追加しません。"],
      duplicateUrl: null,
      similarText,
      item: validated.item,
      itemTs: formatNewsItemTs(validated.item),
      nextSource: null,
      filePath,
      existingCount: items.length
    };
  }

  const nextSource = insertNewsItem(source, validated.item);
  return {
    ok: true,
    mode: write ? "write" : "dry-run",
    errors: [],
    warnings: [],
    duplicateUrl: null,
    similarText: null,
    item: validated.item,
    itemTs: formatNewsItemTs(validated.item),
    nextSource,
    filePath,
    existingCount: items.length
  };
}

export function readNewsFile(filePath) {
  return readFileSync(filePath, "utf8");
}

export function writeNewsFile(filePath, source) {
  writeFileSync(filePath, source, "utf8");
}

export function formatDryRunReport(result) {
  const lines = [
    "【news 追加プレビュー（dry-run）】",
    `追加先ファイル: ${result.filePath}`,
    `追加予定の date: ${result.item?.date ?? "(なし)"}`,
    `追加予定の label: ${result.item?.label ?? "(なし)"}`,
    `追加予定の text: ${result.item?.text ?? "(なし)"}`,
    `追加予定の url: ${result.item?.url ?? "(なし)"}`,
    "",
    "【重複チェック結果】"
  ];

  if (result.errors.length) {
    for (const error of result.errors) {
      lines.push(`- エラー: ${error}`);
    }
  } else {
    lines.push("- URL重複: なし");
    lines.push("- 本文の同一/近似: なし");
  }

  if (result.warnings.length) {
    lines.push("");
    lines.push("【警告】");
    for (const warning of result.warnings) {
      lines.push(`- ${warning}`);
    }
  }

  if (result.itemTs) {
    lines.push("");
    lines.push("【書き込む TypeScript 項目】");
    lines.push(result.itemTs);
  }

  lines.push("");
  if (result.ok) {
    lines.push("実際に書き込むには --write を付けて再実行してください。");
  } else {
    lines.push("入力または重複の問題があるため、news.ts は変更していません。");
  }

  return lines.join("\n");
}
