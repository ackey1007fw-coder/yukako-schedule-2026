// postbuild: dist/index.html を元に /archive と /archive/<slug> の静的HTMLを生成する。
// このサイトはVite製のCSR SPAでSSRを持たないため、各記事に正しいOGP/canonical/JSON-LDを
// 持たせるには「記事ごとの実ファイル」を用意するのが最も確実（SNSクローラーはJSを実行しない）。
// 生成したHTMLは dist/index.html と同じJS/CSSバンドルを読み込み、
// クライアント側では main.tsx が location.pathname を見て表示コンポーネントを切り替える。
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadArchiveItems, loadImageManifest } from "./lib/loadArchiveData.mjs";

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
      throw new Error(`generate-archive-pages: meta tag not found for ${attrPattern}`);
    }
    return html;
  }
  return html.replace(regex, newTag);
}

function applyHead(template, page) {
  let html = template;

  // ホーム用のヒーロー画像preloadはアーカイブページでは使わないので外す（無駄な先読みを防ぐ）
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

async function writePage(routePath, html) {
  const outDir = path.join(distDir, routePath);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html, "utf8");
  console.log(`generated: /${routePath}/`);
}

const template = await readFile(path.join(distDir, "index.html"), "utf8");
const archiveItems = await loadArchiveItems();
const imageManifest = await loadImageManifest();

const imageDims = (src) => {
  const entry = imageManifest[src];
  return entry ? { width: entry.width, height: entry.height } : { width: 1200, height: 630 };
};

// OGP画像は item.ogImage（省略時は images[0]）。altはimages内の同じsrcのものを使う
const ogImageFor = (item) => {
  const src = item.ogImage ?? item.images[0].src;
  const match = item.images.find((image) => image.src === src);
  return { src, alt: match?.alt ?? item.images[0].alt };
};

const listCanonical = `${SITE_URL}/archive`;
const listTitle = "YUKAKO STORY ARCHIVE｜活動の軌跡 | 吉井優花子 応援ポータル";
const listDescription =
  "舞台、映像、モデル、ミスコン、配信。吉井優花子さんが重ねてきた挑戦を、SNS投稿とともに振り返る活動アーカイブです。";

const featured = archiveItems.find((item) => item.featured) ?? archiveItems[0];
const featuredImage = featured ? ogImageFor(featured) : null;
const featuredDims = featuredImage ? imageDims(featuredImage.src) : { width: 1200, height: 630 };

// --- /archive 一覧ページ ---
const listJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "YUKAKO STORY ARCHIVE", item: listCanonical }
      ]
    },
    {
      "@type": "CollectionPage",
      "@id": `${listCanonical}#collection`,
      name: listTitle,
      url: listCanonical,
      description: listDescription,
      inLanguage: "ja",
      hasPart: archiveItems.map((item) => ({
        "@type": "Article",
        headline: item.title,
        url: `${SITE_URL}/archive/${item.slug}`,
        datePublished: item.datePublished
      }))
    }
  ]
};

const listHtml = applyHead(template, {
  title: listTitle,
  description: listDescription,
  canonical: listCanonical,
  ogType: "website",
  ogImage: featuredImage ? toAbsolute(featuredImage.src) : `${SITE_URL}/images/yukako-portrait.jpg`,
  ogImageWidth: String(featuredDims.width),
  ogImageHeight: String(featuredDims.height),
  ogImageAlt: featuredImage?.alt ?? listTitle,
  jsonLd: listJsonLd
});

await writePage("archive", listHtml);

// --- /archive/<slug> 個別記事ページ ---
for (const item of archiveItems) {
  const canonical = `${SITE_URL}/archive/${item.slug}`;
  const ogImage = ogImageFor(item);
  const ogDims = imageDims(ogImage.src);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "YUKAKO STORY ARCHIVE", item: listCanonical },
          { "@type": "ListItem", position: 3, name: item.shortTitle, item: canonical }
        ]
      },
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: item.title,
        description: item.seoDescription,
        image: [...new Set([toAbsolute(item.images[0].src), toAbsolute(ogImage.src)])],
        datePublished: item.datePublished,
        dateModified: item.dateModified,
        inLanguage: "ja",
        author: { "@type": "Person", name: "吉井優花子" },
        publisher: {
          "@type": "Organization",
          name: "吉井優花子 応援ポータル",
          url: `${SITE_URL}/`
        },
        mainEntityOfPage: canonical
      }
    ]
  };

  const html = applyHead(template, {
    title: item.seoTitle,
    description: item.seoDescription,
    canonical,
    ogType: "article",
    ogImage: toAbsolute(ogImage.src),
    ogImageWidth: String(ogDims.width),
    ogImageHeight: String(ogDims.height),
    ogImageAlt: ogImage.alt,
    jsonLd
  });

  await writePage(`archive/${item.slug}`, html);
}

console.log(`archive pages generated: 1 list + ${archiveItems.length} article(s)`);
