import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteContent = JSON.parse(
  readFileSync(path.join(root, "src/data/siteContent.json"), "utf8")
);
const newsSrc = readFileSync(path.join(root, "src/data/news.ts"), "utf8");
const sectionSrc = readFileSync(
  path.join(root, "src/components/LatestInstagramSection.tsx"),
  "utf8"
);

const reel = siteContent.latestInstagram;
assert.equal(reel.reelUrl, "https://www.instagram.com/reel/DccnlfshIly/");
assert.equal(reel.publishedAt, "2026.8.24");
assert.equal(reel.profileUrl, "https://www.instagram.com/yoppy_777");
assert.equal(reel.videoSrc, "/videos/instagram-aipaku-akita-2026-08-24.mp4");
assert.equal(
  reel.videoPoster,
  "/images/yukako-aipaku-akita-reel-poster-2026-08-24.jpg"
);
assert.equal(reel.isPr, true);
assert.ok(!("drivePreviewUrl" in reel), "Google Drive preview URL must not remain");

const videoPath = path.join(root, "public", reel.videoSrc.replace(/^\//, ""));
const posterPath = path.join(root, "public", reel.videoPoster.replace(/^\//, ""));
assert.ok(existsSync(videoPath), `missing video: ${videoPath}`);
assert.ok(existsSync(posterPath), `missing poster: ${posterPath}`);

const videoBytes = statSync(videoPath).size;
assert.ok(videoBytes > 500_000, "video too small");
assert.ok(videoBytes < 12_000_000, `video too large for web: ${videoBytes}`);

assert.match(newsSrc, /DccnlfshIly/);
assert.equal(
  (newsSrc.match(/DccnlfshIly/g) ?? []).length,
  1,
  "Reel ID must appear exactly once in news.ts"
);

assert.match(sectionSrc, /playsInline/);
assert.match(sectionSrc, /preload="metadata"/);
assert.match(sectionSrc, /controls/);
assert.doesNotMatch(sectionSrc, /autoPlay|autoplay/);
assert.match(sectionSrc, /InstagramでこのReelを見る/);
assert.match(sectionSrc, /優花子のInstagramへ/);
assert.doesNotMatch(sectionSrc, /instagram\.com\/embed|instagram-media|LazyInstagramEmbed/);
assert.doesNotMatch(sectionSrc, /drive\.google\.com/);

console.log("test-aipaku-akita-reel: ok", {
  videoBytes,
  videoMb: Number((videoBytes / (1024 * 1024)).toFixed(2))
});
