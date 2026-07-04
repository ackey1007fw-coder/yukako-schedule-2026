// サイト取り違え防止ガード（1サイト版）。
// このリポジトリは吉井優花子さん専用（旧: riri-schedule-2026 の yukako/main ブランチから独立）。
// 誤って別人（夏凪里季さん）のデータがコピー混入していないかを、複数の hard signal で検査する。
// ローカルでも `node scripts/check-site-identity.mjs` で確認可能。
import { readFile } from "node:fs/promises";

const SELF = {
  label: "吉井優花子 (yukako)",
  name: "吉井 優花子", // src/data/profile.ts の name
  roomId: "347571", // SHOWROOM room_id
  titleIncludes: "吉井優花子", // index.html <title>
  prodUrl: "yukako-schedule-2026.vercel.app", // 本番URL
};

const OTHER = {
  label: "夏凪里季 (riri)",
  name: "夏凪 里季",
  roomId: "550336",
  titleIncludes: "夏凪里季",
  prodUrl: "riri-schedule-2026.vercel.app",
};

const read = async (relative) => {
  try {
    return await readFile(new URL(relative, import.meta.url), "utf8");
  } catch {
    return "";
  }
};

const profile = await read("../src/data/profile.ts");
const html = await read("../index.html");
const combined = `${profile}\n${html}`;

const errors = [];

// 1. profile.ts の name（最重要シグナル）
const nameMatch = profile.match(/^\s{2}name:\s*"([^"]+)"/m);
const actualName = nameMatch ? nameMatch[1] : "(見つかりません)";
if (actualName !== SELF.name) {
  errors.push(`profile.ts の name = "${actualName}"（期待: "${SELF.name}"）`);
}
if (actualName === OTHER.name) {
  errors.push(`profile.ts に別サイトの name「${OTHER.name}」が入っています`);
}

// 2. SHOWROOM room_id：自分のIDがあり、相手のIDが無いこと
if (!combined.includes(SELF.roomId)) {
  errors.push(`SHOWROOM room_id "${SELF.roomId}" が見当たりません`);
}
if (combined.includes(OTHER.roomId)) {
  errors.push(`別サイトの room_id "${OTHER.roomId}" が混入しています`);
}

// 3. index.html の <title>：自分の名前を含み、相手の名前を含まないこと
const titleMatch = html.match(/<title>([^<]*)<\/title>/);
const title = titleMatch ? titleMatch[1] : "";
if (!title.includes(SELF.titleIncludes)) {
  errors.push(`index.html の title に「${SELF.titleIncludes}」が含まれていません（title="${title}"）`);
}
if (title.includes(OTHER.titleIncludes)) {
  errors.push(`index.html の title に別サイトの「${OTHER.titleIncludes}」が含まれています`);
}

// 4. 本番URL：自分のURLがあり、相手のURLが無いこと
if (!combined.includes(SELF.prodUrl)) {
  errors.push(`本番URL "${SELF.prodUrl}" が見当たりません`);
}
if (combined.includes(OTHER.prodUrl)) {
  errors.push(`別サイトの本番URL "${OTHER.prodUrl}" が混入しています`);
}

if (errors.length > 0) {
  console.error(
    `\n❌ サイト取り違えを検知しました（Site identity mismatch）\n` +
      `  このリポジトリは ${SELF.label} サイトのはずですが、次の不一致があります:`,
  );
  for (const e of errors) console.error(`   - ${e}`);
  console.error(`\n  → 別サイトのデータが混入している可能性が高いです。マージしないでください。\n`);
  process.exit(1);
}

console.log(`✅ site-guard OK: ${SELF.label} サイトとして全シグナル一致。`);
