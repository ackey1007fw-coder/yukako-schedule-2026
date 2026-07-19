import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as esbuild from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

// src/data/*.ts はビルドスクリプト(素のNode/ESM)からは直接importできないため、
// esbuildでその場でトランスパイルして一時ファイル経由で読み込む。
// データを増減させても、この読み込み方法は変更不要。
async function loadTsModule(relativePath) {
  const sourcePath = path.join(root, relativePath);
  const source = await readFile(sourcePath, "utf8");
  const { code } = await esbuild.transform(source, {
    loader: "ts",
    format: "esm",
    target: "es2020"
  });

  const tempDir = path.join(root, "node_modules", ".tmp");
  await mkdir(tempDir, { recursive: true });
  const tempFile = path.join(tempDir, `${path.basename(relativePath, ".ts")}.generated.mjs`);
  await writeFile(tempFile, code, "utf8");

  const moduleUrl = `${pathToFileURL(tempFile).href}?t=${Date.now()}`;
  return import(moduleUrl);
}

export async function loadArchiveItems() {
  const mod = await loadTsModule("src/data/archive.ts");
  const items = mod.archiveItems;
  const seen = new Set();

  for (const item of items) {
    if (!item.slug || !item.title || !item.datePublished || !item.seoTitle || !item.seoDescription) {
      throw new Error(`archive data: required field is missing for slug "${item.slug || "(empty)"}"`);
    }
    if (seen.has(item.slug)) {
      throw new Error(`archive data: duplicate slug "${item.slug}"`);
    }
    seen.add(item.slug);
  }

  return items;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HTTPS_RE = /^https:\/\//i;

/**
 * BABY SHARK LIVE の updates 配列を検証する。
 * - 同じ id / 同じ sourceUrl（設定時のみ）は不可
 * - 同じ date でも id が異なれば可
 */
export function validateBabySharkUpdates(updates = []) {
  const seenIds = new Set();
  const seenSourceUrls = new Set();

  for (const update of updates) {
    if (!update?.id || typeof update.id !== "string") {
      throw new Error("babySharkLive data: updates require id");
    }
    if (!update?.date || typeof update.date !== "string") {
      throw new Error(`babySharkLive data: updates require date (id "${update.id}")`);
    }
    if (!DATE_RE.test(update.date)) {
      throw new Error(
        `babySharkLive data: update date must be YYYY-MM-DD (id "${update.id}", date "${update.date}")`
      );
    }
    if (!update?.dateLabel || typeof update.dateLabel !== "string") {
      throw new Error(`babySharkLive data: updates require dateLabel (id "${update.id}")`);
    }
    if (!update?.title || typeof update.title !== "string") {
      throw new Error(`babySharkLive data: updates require title (id "${update.id}")`);
    }
    if (!Array.isArray(update.body)) {
      throw new Error(`babySharkLive data: updates require body array (id "${update.id}")`);
    }
    if (update.body.length === 0) {
      throw new Error(`babySharkLive data: update body must not be empty (id "${update.id}")`);
    }

    if (seenIds.has(update.id)) {
      throw new Error(`babySharkLive data: duplicate update id "${update.id}"`);
    }
    seenIds.add(update.id);

    if (update.sourceUrl !== undefined && update.sourceUrl !== null && update.sourceUrl !== "") {
      if (typeof update.sourceUrl !== "string" || !HTTPS_RE.test(update.sourceUrl)) {
        throw new Error(
          `babySharkLive data: sourceUrl must be an https:// URL (id "${update.id}")`
        );
      }
      if (seenSourceUrls.has(update.sourceUrl)) {
        throw new Error(
          `babySharkLive data: duplicate update sourceUrl "${update.sourceUrl}"`
        );
      }
      seenSourceUrls.add(update.sourceUrl);
    }
  }
}

export async function loadBabySharkLive() {
  const mod = await loadTsModule("src/data/babySharkLive.ts");
  const work = mod.babySharkLive;
  if (!work?.slug || !work?.path || !work?.seoTitle || !work?.seoDescription || !work?.heroImage) {
    throw new Error("babySharkLive data: required fields are missing");
  }

  validateBabySharkUpdates(work.updates ?? []);
  return work;
}

export async function loadImageManifest() {
  const mod = await loadTsModule("src/data/imageManifest.ts");
  return mod.imageManifest;
}
