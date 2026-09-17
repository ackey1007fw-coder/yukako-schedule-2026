import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "vite";
import sharp from "sharp";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const server = await createServer({ appType: "custom", server: { middlewareMode: true } });
try {
  const { streamRecaps } = await server.ssrLoadModule("/src/data/streamRecaps.ts");
  const { sortStreamRecaps, recapDateLabel, recordingLabel, recapAnchor } = await server.ssrLoadModule("/src/lib/streamRecaps.ts");
  const { StreamRecapsSection, StreamRecapCard } = await server.ssrLoadModule("/src/components/StreamRecapsSection.tsx");
  const { profile } = await server.ssrLoadModule("/src/data/profile.ts");
  const render = (component, props) => renderToStaticMarkup(createElement(component, props));
  const { SiteHeader } = await server.ssrLoadModule("/src/components/SiteHeader.tsx");
  const subpageHeader = render(SiteHeader, { socialLinks: [] });
  assert.match(subpageHeader, /data-tablet-site-nav/);
  assert.match(subpageHeader, /md:block lg:hidden/);
  assert.doesNotMatch(render(SiteHeader, { socialLinks: [], hasQuickNav: true }), /data-tablet-site-nav/);
  const ids = new Set();
  const timestampSeconds = (value) => {
    assert.match(value, /^\d+:[0-5]\d:[0-5]\d$/);
    return value.split(":").map(Number).reduce((sum, part) => sum * 60 + part, 0);
  };
  const localAsset = (src) => {
    assert.match(src, /^\/(?:images|downloads)\/[a-zA-Z0-9_./-]+$/);
    assert.ok(!src.includes(".."));
    assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)), `Missing asset: ${src}`);
  };
  for (const recap of streamRecaps) {
    assert.ok(!ids.has(recap.id)); ids.add(recap.id);
    assert.match(recap.id, /^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/);
    assert.equal(recap.id.slice(0, 10), recap.date);
    assert.match(recap.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(`${recap.date}T00:00:00Z`).toISOString().slice(0, 10), recap.date);
    assert.ok(recap.verifiedAt >= recap.date);
    assert.ok(recap.title.trim() && recap.summary.trim() && recap.sourceLabel.trim());
    assert.equal(recap.platform, "SHOWROOM");
    assert.ok(["published", "preparing"].includes(recap.status));
    if (recap.recording) {
      assert.match(recap.recording.startedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/);
      assert.equal(recap.recording.startedAt.slice(0, 10), recap.date);
      assert.ok(Number.isFinite(Date.parse(recap.recording.startedAt)));
      assert.ok(recap.recording.durationSeconds > 0 && Number.isFinite(recap.recording.durationSeconds));
    }
    if (recap.status === "preparing") {
      for (const key of ["highlights", "songs", "gallery", "galleryZip", "timeline", "nextNote"]) assert.equal(recap[key], undefined, `Unreviewed field: ${key}`);
    } else {
      for (const key of ["highlights", "songs", "timeline"]) {
        let previous = -1;
        for (const item of recap[key] ?? []) {
          const seconds = timestampSeconds(item.timestamp);
          assert.ok(seconds >= previous); previous = seconds;
          if (recap.recording) assert.ok(seconds < recap.recording.durationSeconds);
        }
      }
      for (const image of recap.gallery ?? []) {
        localAsset(image.src);
        assert.ok(image.width > 0 && image.height > 0);
        const metadata = await sharp(readFileSync(new URL(`../public${image.src}`, import.meta.url))).metadata();
        assert.equal(metadata.width, image.width);
        assert.equal(metadata.height, image.height);
        assert.equal(metadata.exif, undefined);
        assert.match(image.alt, /優花子/);
        assert.ok(image.caption && image.downloadName);
      }
      if (recap.galleryZip) { assert.ok(recap.gallery?.length); localAsset(recap.galleryZip.src); }
      for (const song of recap.songs ?? []) {
        assert.ok(song.title && song.artist);
        if (song.originalUrl) assert.equal(new URL(song.originalUrl).protocol, "https:");
      }
    }
    assert.doesNotMatch(JSON.stringify(recap), /drive\.google\.com|docs\.google\.com|C:\\|\.mkv|\.flac|localhost|127\.0\.0\.1/i);
  }
  assert.equal(recapDateLabel("2026-09-16"), "2026.09.16（水）");
  assert.equal(recapDateLabel("2026-01-01"), "2026.01.01（木）");
  const current = streamRecaps.find((recap) => recap.id === "2026-09-16-night");
  assert.ok(current);
  assert.equal(recordingLabel(current.recording), "記録：20:43頃から・約28分");
  assert.equal(recapAnchor(current.id), "stream-2026-09-16-night");
  const morning = { ...current, id: "2026-09-16-morning", recording: { ...current.recording, startedAt: "2026-09-16T06:00:00+09:00" } };
  const older = { ...current, id: "2026-09-15-night", date: "2026-09-15", recording: { ...current.recording, startedAt: "2026-09-15T23:00:00+09:00" } };
  const source = [morning, older, current];
  assert.deepEqual(sortStreamRecaps(source).map((item) => item.id), [current.id, morning.id, older.id]);
  assert.deepEqual(source.map((item) => item.id), [morning.id, older.id, current.id], "Sort must not mutate input");
  const html = render(StreamRecapsSection, { recaps: [current] });
  assert.match(html, /id="stream-recaps"/);
  assert.match(html, /配信コーナー/);
  assert.match(html, /dateTime="2026-09-16"/i);
  assert.match(html, /配信の記録 1回/);
  assert.match(html, /配信メモ 1回/);
  assert.equal(current.status, "published");
  assert.equal(current.gallery.length, 10);
  assert.equal(new Set(current.gallery.map((image) => image.src)).size, 10);
  assert.doesNotMatch(html, /メモ準備中/);
  assert.match(html, /録画の記録/);
  assert.ok(html.includes(profile.showroom.url.replaceAll("&", "&amp;")));
  assert.doesNotMatch(html, /<video|<iframe|この回に歌った曲/);
  assert.match(html, /この回の見どころ/);
  assert.match(html, /この回のスクショ/);
  assert.match(html, /全音声の自動文字起こし/);
  assert.equal((html.match(/<img /g) ?? []).length, 11);
  assert.equal(current.highlights.length, 8);
  assert.equal(current.timeline.at(-1).timestamp, "0:26:44");
  assert.match(html, /yukako-2026-09-16-night-stills.zip/);
  const fixture = { ...current, id: "2026-09-16-test", status: "published", summary: "テスト用の本文", songs: [{ timestamp: "0:00:05", title: "テスト曲", artist: "テスト歌手", originalUrl: "https://example.com/original" }], highlights: [{ timestamp: "0:00:10", title: "テスト項目", body: "テスト本文" }], gallery: [{ src: "/images/fixture.jpg", width: 640, height: 360, alt: "吉井優花子さんのテスト画像", caption: "テスト写真", downloadName: "fixture.jpg" }], timeline: [{ timestamp: "0:00:10", label: "テスト時刻" }], nextNote: "配信時点の案内テスト" };
  const full = render(StreamRecapCard, { recap: fixture, defaultOpen: true });
  const headings = ["この回に歌った曲", "この回の見どころ", "この回のスクショ", "タイムスタンプ", "配信時点の次回案内", "出典："];
  let position = -1;
  for (const heading of headings) { const next = full.indexOf(heading); assert.ok(next > position, heading); position = next; }
  assert.match(full, /object-contain/);
  assert.match(full, /loading="lazy"/);
  assert.match(full, /download="fixture.jpg"/);
  assert.match(full, /rel="noopener noreferrer"/);
  assert.match(full, /width="640" height="360"/);
  const held = render(StreamRecapCard, { recap: { ...fixture, status: "preparing" } });
  assert.doesNotMatch(held, /fixture.jpg|テスト曲|テスト項目|テスト写真|配信時点の案内テスト/, "Preparing entries must not render unreviewed fields");
  const empty = render(StreamRecapsSection, { recaps: [] });
  assert.match(empty, /配信の記録は、まだありません/);
  assert.doesNotMatch(empty, /<details/);
  const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  assert.equal((app.match(/<StreamRecapsSection \/>/g) ?? []).length, 1);
  assert.ok(app.indexOf("<StreamRecapsSection />") < app.indexOf("<AkitaInuTourSection />"));
  assert.match(app, /href: "#stream-recaps"/);
  const nav = readFileSync(new URL("../src/components/QuickNav.tsx", import.meta.url), "utf8");
  assert.match(nav, /label: "配信コーナー", href: "#stream-recaps"/);
  console.log("stream recap data, publication gates, sorting, rendering, links and empty-state tests OK");
} finally {
  await server.close();
}
