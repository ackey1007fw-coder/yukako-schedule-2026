import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
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
  ".jpeg": "image/jpeg"
};
const unavailableRuntimePrefixes = ["/api/", "/_vercel/"];

const server = createServer(async (request, response) => {
  const cleanUrl = decodeURIComponent((request.url ?? "/").split("?")[0]);

  if (unavailableRuntimePrefixes.some((prefix) => cleanUrl.startsWith(prefix))) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not Found");
    return;
  }

  const route = cleanUrl === "/" ? "/index.html" : cleanUrl;
  const file = path.normalize(path.join(root, route));

  if (!file.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(file);
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] ?? "application/octet-stream"
    });
    response.end(body);
  } catch {
    const fallback = await readFile(path.join(root, "index.html"));
    response.writeHead(200, { "Content-Type": types[".html"] });
    response.end(fallback);
  }
});

server.listen(port, "127.0.0.1");
