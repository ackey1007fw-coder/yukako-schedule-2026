#!/usr/bin/env node
// 通常のお知らせ（src/data/news.ts）を先頭へ安全に追加する CLI。
// 標準は dry-run。実際の書き換えには --write が必要。
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  formatDryRunReport,
  parseArgs,
  prepareNewsAddition,
  readNewsFile,
  writeNewsFile
} from "./lib/addNewsCore.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultNewsPath = path.join(root, "src/data/news.ts");

function printHelp() {
  console.log(`使い方:
  pnpm add:news -- --date "2026.7.19" --label "X" --text "短い本文" --url "https://x.com/..."
  pnpm add:news -- --date "2026.7.19" --label "X" --text "短い本文" --url "https://x.com/..." --write

オプション:
  --date    YYYY.M.D または YYYY.MM.DD
  --label   X / Instagram / チケット / お知らせ
  --text    掲載本文（空不可）
  --url     https:// で始まるURL
  --write   実際に news.ts を書き換える（省略時は dry-run）
  --file    対象ファイル（テスト用。省略時は src/data/news.ts）
  --help    このヘルプ
`);
}

function main(argv = process.argv.slice(2)) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    console.error(`エラー: ${error.message}`);
    printHelp();
    process.exitCode = 1;
    return;
  }

  if (options.help) {
    printHelp();
    return;
  }

  const filePath = path.resolve(options.file ?? defaultNewsPath);

  let source;
  try {
    source = readNewsFile(filePath);
  } catch (error) {
    console.error(`エラー: ファイルを読めませんでした: ${filePath}`);
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const result = prepareNewsAddition({
    source,
    filePath,
    date: options.date,
    label: options.label,
    text: options.text,
    url: options.url,
    write: options.write
  });

  if (!options.write) {
    console.log(formatDryRunReport(result));
    if (!result.ok) process.exitCode = 1;
    return;
  }

  if (!result.ok) {
    console.error("書き込みを中止しました。");
    for (const error of result.errors) {
      console.error(`- ${error}`);
    }
    for (const warning of result.warnings) {
      console.error(`- ${warning}`);
    }
    process.exitCode = 1;
    return;
  }

  writeNewsFile(filePath, result.nextSource);
  console.log(`書き込みました: ${filePath}`);
  console.log("追加した項目:");
  console.log(result.itemTs);
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  main();
}

export { main };
