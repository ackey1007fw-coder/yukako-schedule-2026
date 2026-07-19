import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public", "images", "yukako-mgj-award.jpg");
const outputDir = path.join(root, "public", "images", "og");
const output = path.join(outputDir, "yukako-mgj-2025-miss-peace-1200x630.jpg");

await mkdir(outputDir, { recursive: true });

// 元写真は変形・補正・生成をせず、全身が入るcontain配置だけを行う。
const photo = await sharp(source)
  .rotate()
  .resize(420, 590, {
    fit: "contain",
    background: { r: 20, g: 25, b: 48, alpha: 1 }
  })
  .toBuffer();

const typography = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#c29a4a" stroke-width="2"/>
    <rect x="64" y="72" width="72" height="4" fill="#c29a4a"/>
    <text x="64" y="126" fill="#f3d99f" font-family="Arial, 'Yu Gothic', sans-serif" font-size="25" font-weight="700" letter-spacing="2">MISS GRAND JAPAN 2025</text>
    <text x="64" y="218" fill="#fffdf7" font-family="'Yu Mincho', 'Hiragino Mincho ProN', serif" font-size="58" font-weight="700">MISS PEACE賞</text>
    <text x="64" y="294" fill="#fffdf7" font-family="'Yu Mincho', 'Hiragino Mincho ProN', serif" font-size="58" font-weight="700">受賞</text>
    <line x1="64" y1="340" x2="640" y2="340" stroke="#c29a4a" stroke-width="1" opacity="0.75"/>
    <text x="64" y="404" fill="#fffdf7" font-family="'Yu Mincho', 'Hiragino Mincho ProN', serif" font-size="36" font-weight="700">吉井優花子</text>
    <text x="64" y="462" fill="#f3d99f" font-family="Arial, 'Yu Gothic', sans-serif" font-size="21" font-weight="700" letter-spacing="3">YUKAKO STORY ARCHIVE</text>
    <text x="64" y="548" fill="#fffdf7" opacity="0.72" font-family="Arial, 'Yu Gothic', sans-serif" font-size="18">FAN-MADE SUPPORT PORTAL</text>
  </svg>
`);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: "#141930"
  }
})
  .composite([
    { input: photo, left: 748, top: 20 },
    { input: typography, left: 0, top: 0 }
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(output);

console.log(`generated: ${path.relative(root, output)} (1200x630)`);
