import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// 秋田→東京 原点記事用 OGP（1200×630）。
// 元写真は変形・補正・AI生成せず、contain 配置のみ。
// 再生成: pnpm images:og:akita-to-tokyo
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public", "images", "yukako-tokyo-20221001.jpg");
const outputDir = path.join(root, "public", "images", "og");
const output = path.join(outputDir, "yukako-akita-to-tokyo-2022-1200x630.jpg");

await mkdir(outputDir, { recursive: true });

// 生成り寄りの深い紺。写真の余白色にも合わせる。
const navy = { r: 24, g: 28, b: 46, alpha: 1 };

const photo = await sharp(source)
  .rotate()
  .resize(420, 590, {
    fit: "contain",
    background: navy
  })
  .toBuffer();

const typography = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#c29a4a" stroke-width="2"/>
    <rect x="64" y="72" width="72" height="4" fill="#c29a4a"/>
    <text x="64" y="128" fill="#f3d99f" font-family="Arial, 'Yu Gothic', sans-serif" font-size="22" font-weight="700" letter-spacing="3">2022.10.01</text>
    <text x="64" y="210" fill="#fffdf7" font-family="'Yu Mincho', 'Hiragino Mincho ProN', Georgia, serif" font-size="48" font-weight="700">秋田から東京へ</text>
    <text x="64" y="278" fill="#fffdf7" font-family="'Yu Mincho', 'Hiragino Mincho ProN', Georgia, serif" font-size="42" font-weight="700">俳優として歩み出した日</text>
    <line x1="64" y1="324" x2="640" y2="324" stroke="#c29a4a" stroke-width="1" opacity="0.75"/>
    <text x="64" y="392" fill="#fffdf7" font-family="'Yu Mincho', 'Hiragino Mincho ProN', Georgia, serif" font-size="34" font-weight="700">吉井優花子</text>
    <text x="64" y="452" fill="#f3d99f" font-family="Arial, 'Yu Gothic', sans-serif" font-size="20" font-weight="700" letter-spacing="3">YUKAKO STORY ARCHIVE</text>
    <text x="64" y="548" fill="#fffdf7" opacity="0.72" font-family="Arial, 'Yu Gothic', sans-serif" font-size="18" letter-spacing="2">FAN-MADE SUPPORT PORTAL</text>
  </svg>
`);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: "#181c2e"
  }
})
  .composite([
    { input: photo, left: 740, top: 20 },
    { input: typography, left: 0, top: 0 }
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(output);

console.log(`generated: ${path.relative(root, output)} (1200x630)`);
