import { loadArchiveItems } from "./lib/loadArchiveData.mjs";

const SLUG = "2026-06-28-msc-bellissima-cruise";
const CANONICAL_SOURCE = "https://www.instagram.com/p/DZxVzBgmSFx/";
const MGJ_SLUG = "miss-grand-japan-2025-miss-peace";

const items = await loadArchiveItems();
const item = items.find((entry) => entry.slug === SLUG);

if (!item) {
  throw new Error(`archive item not found: ${SLUG}`);
}

if (!Array.isArray(item.images) || item.images.length !== 20) {
  throw new Error(`expected 20 images, got ${item.images?.length ?? 0}`);
}

const srcs = item.images.map((image) => image.src);
const uniqueSrcs = new Set(srcs);
if (uniqueSrcs.size !== 20) {
  throw new Error(`image src must be unique (got ${uniqueSrcs.size} unique)`);
}

for (const image of item.images) {
  if (!image.src || !image.alt) {
    throw new Error(`each image requires src and alt (missing on ${image.src || "(empty)"})`);
  }
  if (!image.src.startsWith("/images/archive/msc-bellissima-2026/")) {
    throw new Error(`unexpected image path: ${image.src}`);
  }
}

if (item.sourceUrl?.url !== CANONICAL_SOURCE) {
  throw new Error(`sourceUrl must be ${CANONICAL_SOURCE}`);
}

if (item.galleryLayout !== "responsive-grid") {
  throw new Error(`galleryLayout must be responsive-grid (got ${item.galleryLayout})`);
}

if (item.showAdditionalImages !== true) {
  throw new Error("showAdditionalImages must be true");
}

if (item.category !== "オフショット" || item.platform !== "Instagram") {
  throw new Error("category/platform mismatch");
}

if (item.attributionLabel !== "PR投稿") {
  throw new Error("attributionLabel must be PR投稿");
}

if (item.datePublished !== "2026-06-28") {
  throw new Error(`datePublished must reuse relatedEmbed value 2026-06-28 (got ${item.datePublished})`);
}

const relatedToMgj = item.relatedUrls?.some(
  (link) => link.url === `/archive/${MGJ_SLUG}`
);
if (!relatedToMgj) {
  throw new Error("new article must link to MISS GRAND JAPAN archive");
}

const mgj = items.find((entry) => entry.slug === MGJ_SLUG);
if (!mgj) {
  throw new Error(`MGJ archive missing: ${MGJ_SLUG}`);
}

const relatedToCruise = mgj.relatedUrls?.some(
  (link) => link.url === `/archive/${SLUG}`
);
if (!relatedToCruise) {
  throw new Error("MGJ article must link to the new cruise archive");
}

if (mgj.relatedEmbed?.url) {
  // 既存の関連embedは削除せず残す
  console.log(`OK: MGJ relatedEmbed kept (${mgj.relatedEmbed.url})`);
}

const stackedOrUnset = items.filter(
  (entry) => entry.slug !== SLUG && entry.showAdditionalImages
);
for (const entry of stackedOrUnset) {
  if (entry.galleryLayout === "responsive-grid") {
    throw new Error(
      `existing article unexpectedly uses responsive-grid: ${entry.slug}`
    );
  }
}

console.log("OK: slug resolved");
console.log("OK: images.length === 20");
console.log("OK: image src unique");
console.log("OK: sourceUrl canonical");
console.log("OK: galleryLayout responsive-grid");
console.log("OK: existing articles keep stacked/default gallery");
console.log("OK: mutual links with MISS GRAND JAPAN article");
console.log("msc-bellissima archive tests OK");
