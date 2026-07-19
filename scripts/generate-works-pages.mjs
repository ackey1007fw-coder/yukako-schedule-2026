// postbuild: /works/baby-shark-live の静的HTMLを生成する。
// archive と同様、SNSクローラー向けに正しい OGP / canonical / JSON-LD を持たせる。
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadBabySharkLive, loadImageManifest } from "./lib/loadArchiveData.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const SITE_URL = "https://yukako-schedule-2026.vercel.app";

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const toAbsolute = (src) => (src.startsWith("http") ? src : `${SITE_URL}${src}`);

function replaceMetaByAttr(html, attrPattern, newTag, { required = true } = {}) {
  const regex = new RegExp(`<meta\\s+${attrPattern}[\\s\\S]*?/>`, "m");
  if (!regex.test(html)) {
    if (required) {
      throw new Error(`generate-works-pages: meta tag not found for ${attrPattern}`);
    }
    return html;
  }
  return html.replace(regex, newTag);
}

function applyHead(template, page) {
  let html = template;

  html = html.replace(/\s*<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/, "");
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceMetaByAttr(
    html,
    'name="description"',
    `<meta name="description" content="${escapeHtml(page.description)}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${page.canonical}" />`
  );
  html = replaceMetaByAttr(html, 'property="og:type"', `<meta property="og:type" content="${page.ogType}" />`);
  html = replaceMetaByAttr(html, 'property="og:title"', `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
  html = replaceMetaByAttr(html, 'property="og:description"', `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = replaceMetaByAttr(html, 'property="og:url"', `<meta property="og:url" content="${page.canonical}" />`);
  html = replaceMetaByAttr(html, 'property="og:image"', `<meta property="og:image" content="${page.ogImage}" />`);
  html = replaceMetaByAttr(html, 'property="og:image:width"', `<meta property="og:image:width" content="${page.ogImageWidth}" />`);
  html = replaceMetaByAttr(html, 'property="og:image:height"', `<meta property="og:image:height" content="${page.ogImageHeight}" />`);
  html = replaceMetaByAttr(html, 'property="og:image:alt"', `<meta property="og:image:alt" content="${escapeHtml(page.ogImageAlt)}" />`);
  html = replaceMetaByAttr(html, 'name="twitter:title"', `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`);
  html = replaceMetaByAttr(html, 'name="twitter:description"', `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`);
  html = replaceMetaByAttr(html, 'name="twitter:image"', `<meta name="twitter:image" content="${page.ogImage}" />`);
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${JSON.stringify(page.jsonLd)}\n    </script>`
  );

  return html;
}

const template = await readFile(path.join(distDir, "index.html"), "utf8");
const work = await loadBabySharkLive();
const imageManifest = await loadImageManifest();

const ogSrc = work.ogImage ?? work.heroImage;
const ogDims = imageManifest[ogSrc] ?? { width: 1200, height: 630 };
const canonical = `${SITE_URL}${work.path}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: work.titleJa, item: canonical }
      ]
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      name: work.seoTitle,
      description: work.seoDescription,
      url: canonical,
      inLanguage: "ja",
      isPartOf: {
        "@type": "WebSite",
        name: "吉井優花子 応援ポータル",
        url: `${SITE_URL}/`
      },
      about: {
        "@type": "Person",
        name: "吉井優花子"
      },
      primaryImageOfPage: toAbsolute(ogSrc)
    }
  ]
};

const html = applyHead(template, {
  title: work.seoTitle,
  description: work.seoDescription,
  canonical,
  ogType: "article",
  ogImage: toAbsolute(ogSrc),
  ogImageWidth: String(ogDims.width),
  ogImageHeight: String(ogDims.height),
  ogImageAlt: work.ogImageAlt ?? work.heroAlt,
  jsonLd
});

const outDir = path.join(distDir, "works", work.slug);
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, "index.html"), html, "utf8");
console.log(`generated: ${work.path}/`);
