import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.argv[2] ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json"
};
const unavailableRuntimePrefixes = ["/api/", "/_vercel/"];

async function resolveFile(requestPath) {
  const route = requestPath === "/" ? "/index.html" : requestPath;
  const file = path.normalize(path.join(root, route));

  if (!file.startsWith(root)) return null;

  // Vercelの静的配信は拡張子なしのパス(例: /archive)を <path>/index.html として解決する。
  // ローカル確認でも同じ挙動を再現しておく。
  for (const candidate of [file, path.join(file, "index.html")]) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      continue;
    }
  }

  return null;
}

// 動画(<video>)はブラウザがRangeリクエストでストリーミング/シークするため、
// Rangeに応答しないと再生前に接続を打ち切られることがある(本番のVercel CDNは対応済み)。
function serveFile(request, response, file, size) {
  const contentType = types[path.extname(file)] ?? "application/octet-stream";
  const range = request.headers.range;

  if (!range) {
    response.writeHead(200, { "Content-Type": contentType, "Content-Length": size, "Accept-Ranges": "bytes" });
    createReadStream(file).pipe(response);
    return;
  }

  const match = /bytes=(\d*)-(\d*)/.exec(range);
  const start = match?.[1] ? Number(match[1]) : 0;
  const end = match?.[2] ? Number(match[2]) : size - 1;

  response.writeHead(206, {
    "Content-Type": contentType,
    "Content-Length": end - start + 1,
    "Content-Range": `bytes ${start}-${end}/${size}`,
    "Accept-Ranges": "bytes"
  });
  createReadStream(file, { start, end }).pipe(response);
}

const server = createServer(async (request, response) => {
  const cleanUrl = decodeURIComponent((request.url ?? "/").split("?")[0]);

  if (unavailableRuntimePrefixes.some((prefix) => cleanUrl.startsWith(prefix))) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not Found");
    return;
  }

  const file = await resolveFile(cleanUrl);

  if (file) {
    const info = await stat(file);
    serveFile(request, response, file, info.size);
    return;
  }

  // Vercel と同様: /archive/* で静的ファイルが無いときは archive/404.html を返す
  // （正規の /archive と /archive/<slug>/ は上の resolveFile で index.html が先に当たる）
  if (cleanUrl === "/archive" || cleanUrl.startsWith("/archive/")) {
    const archiveFallback = path.join(root, "archive", "404.html");
    try {
      const info = await stat(archiveFallback);
      if (info.isFile()) {
        serveFile(request, response, archiveFallback, info.size);
        return;
      }
    } catch {
      // 404.html がまだ無いビルドでもホームへフォールバックできるよう続行
    }
  }

  const fallback = path.join(root, "index.html");
  const info = await stat(fallback);
  serveFile(request, response, fallback, info.size);
});

server.listen(port, "127.0.0.1");
