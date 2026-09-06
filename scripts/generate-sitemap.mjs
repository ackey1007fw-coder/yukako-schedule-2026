import { writeFile } from "node:fs/promises";
import { loadArchiveItems, loadBabySharkLive } from "./lib/loadArchiveData.mjs";

const SITE_URL = "https://yukako-schedule-2026.vercel.app";
// Build time is not a significant page modification time.
// Only individual archive records have an explicit dateModified source.
const archiveItems = await loadArchiveItems();
const babySharkLive = await loadBabySharkLive();

const urls = [
  { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE_URL}/archive`, changefreq: "weekly", priority: "0.8" },
  {
    loc: `${SITE_URL}${babySharkLive.path}`,
    changefreq: "monthly",
    priority: "0.8"
  },
  ...archiveItems.map((item) => ({
    loc: `${SITE_URL}/archive/${item.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: item.dateModified
  }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
${url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>\n` : ""}    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

await writeFile(new URL("../public/sitemap.xml", import.meta.url), sitemap, "utf8");
console.log(`sitemap.xml updated (${urls.length} urls)`);
