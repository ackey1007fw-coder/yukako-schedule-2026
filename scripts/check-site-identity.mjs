import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const EXPECTED = {
  branch: "main",
  name: "吉井 優花子",
  roomId: "347571",
  titleIncludes: "吉井優花子",
  prodUrl: "yukako-schedule-2026.vercel.app",
};

const FORBIDDEN = [
  "夏凪 里季",
  "riri-schedule-2026.vercel.app",
  "RiriSchedule",
  "riri-fan-schedule",
  "room_id=550336",
  "roomId: \"550336\"",
  "550336",
  "frecam",
  "kalua",
  "riri",
];

// リポジトリ全体を走査して Riri 由来のシグナルが紛れ込んでいないか確認する
// （テキスト系ソースのみ。node_modules/dist/public の画像・動画等は対象外）
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIRS = ["src", "api", "scripts", "."];
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".html"]);
const SKIP_DIRS = new Set([
  "node_modules", "dist", ".git", "public", ".vercel", "optimized",
]);
const SKIP_FILES = new Set(["check-site-identity.mjs", "package-lock.json"]);

const branch = (process.argv[2] || "").trim();

if (branch !== EXPECTED.branch) {
  console.log(`site-guard: "${branch}" is not the protected branch (${EXPECTED.branch}); skipping.`);
  process.exit(0);
}

const read = async (relative) => {
  try {
    return await readFile(new URL(relative, import.meta.url), "utf8");
  } catch {
    return "";
  }
};

async function collectFiles(dir, { topLevelOnly = false } = {}) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (topLevelOnly) continue;
      files.push(...await collectFiles(fullPath));
      continue;
    }
    if (SKIP_FILES.has(entry.name)) continue;
    if (SCAN_EXTENSIONS.has(path.extname(entry.name))) files.push(fullPath);
  }
  return files;
}

const profile = await read("../src/data/profile.ts");
const html = await read("../index.html");
const combined = `${profile}\n${html}`;

const errors = [];

const nameMatch = profile.match(/^\s{2}name:\s*"([^"]+)"/m);
const actualName = nameMatch ? nameMatch[1] : "(not found)";
if (actualName !== EXPECTED.name) {
  errors.push(`profile.ts name is "${actualName}", expected "${EXPECTED.name}".`);
}

if (!combined.includes(EXPECTED.roomId)) {
  errors.push(`SHOWROOM room_id "${EXPECTED.roomId}" was not found.`);
}

const titleMatch = html.match(/<title>([^<]*)<\/title>/);
const title = titleMatch ? titleMatch[1] : "";
if (!title.includes(EXPECTED.titleIncludes)) {
  errors.push(`index.html title does not include "${EXPECTED.titleIncludes}" (title="${title}").`);
}

if (!combined.includes(EXPECTED.prodUrl)) {
  errors.push(`Production URL "${EXPECTED.prodUrl}" was not found.`);
}

// リポジトリ全体（src/api/scripts + ルート直下）を走査
const scanTargets = [
  ...(await collectFiles(path.join(root, "src"))),
  ...(await collectFiles(path.join(root, "api"))),
  ...(await collectFiles(path.join(root, "scripts"))),
  ...(await collectFiles(root, { topLevelOnly: true })),
];

for (const filePath of scanTargets) {
  const content = await readFile(filePath, "utf8").catch(() => "");
  for (const value of FORBIDDEN) {
    if (content.includes(value)) {
      errors.push(`Forbidden Riri-site signal "${value}" found in ${path.relative(root, filePath)}.`);
    }
  }
}

if (errors.length > 0) {
  console.error("\nSite identity mismatch: main must contain the Yoshii Yukako fan portal.");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log("site-guard OK: main matches the Yoshii Yukako fan portal.");
