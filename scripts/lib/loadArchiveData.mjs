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
  return mod.archiveItems;
}

export async function loadImageManifest() {
  const mod = await loadTsModule("src/data/imageManifest.ts");
  return mod.imageManifest;
}
