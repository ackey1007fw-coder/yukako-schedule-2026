import { readFile } from "node:fs/promises";

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
  "room_id=550336",
  "roomId: \"550336\"",
];

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

for (const value of FORBIDDEN) {
  if (combined.includes(value)) {
    errors.push(`Forbidden Riri-site signal found: "${value}".`);
  }
}

if (errors.length > 0) {
  console.error("\nSite identity mismatch: main must contain the Yoshii Yukako fan portal.");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log("site-guard OK: main matches the Yoshii Yukako fan portal.");
