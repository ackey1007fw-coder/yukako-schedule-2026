import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// BABY SHARK LIVE 特集用 OGP（1200×630）。
// 元写真は変形・補正・AI生成せず、contain 配置のみ。
// 再生成: node scripts/generate-baby-shark-og-image.mjs
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public", "images", "baby-shark", "baby-shark-pearl.jpg");
const outputDir = path.join(root, "public", "images", "og");
const output = path.join(outputDir, "yukako-baby-shark-live-1200x630.jpg");

await mkdir(outputDir, { recursive: true });

const photo = await sharp(source)
  .rotate()
  .resize(440, 580, {
    fit: "contain",
    background: { r: 11, g: 58, b: 82, alpha: 1 }
  })
  .toBuffer();

const typography = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#c29a4a" stroke-width="2"/>
    <rect x="64" y="78" width="72" height="4" fill="#c29a4a"/>
    <text x="64" y="150" fill="#fffdf7" font-family="'Yu Mincho', 'Hiragino Mincho ProN', Georgia, serif" font-size="48" font-weight="700">BABY SHARK LIVE！</text>
    <text x="64" y="228" fill="#f3d99f" font-family="Arial, 'Yu Gothic', sans-serif" font-size="26" font-weight="700">ヤドカリのヘッティー／海賊のパール</text>
    <line x1="64" y1="278" x2="620" y2="278" stroke="#c29a4a" stroke-width="1" opacity="0.75"/>
    <text x="64" y="350" fill="#fffdf7" font-family="'Yu Mincho', 'Hiragino Mincho ProN', Georgia, serif" font-size="36" font-weight="700">吉井優花子 出演記録</text>
    <text x="64" y="540" fill="#fffdf7" opacity="0.72" font-family="Arial, 'Yu Gothic', sans-serif" font-size="18" letter-spacing="2">FAN-MADE SUPPORT PORTAL</text>
  </svg>
`);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: "#0b3a52"
  }
})
  .composite([
    { input: photo, left: 720, top: 25 },
    { input: typography, left: 0, top: 0 }
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(output);

console.log(`generated: ${path.relative(root, output)} (1200x630)`);
