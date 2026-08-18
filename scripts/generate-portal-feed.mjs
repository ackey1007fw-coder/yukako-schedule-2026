import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const projectRoot = path.resolve(import.meta.dirname, "..");
const entryPoint = path.join(projectRoot, "src", "lib", "portalFeed.ts");

export async function loadPortalFeedModule() {
  const result = await build({
    entryPoints: [entryPoint],
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node20",
    write: false,
    logLevel: "silent"
  });
  const bundledSource = result.outputFiles[0]?.text;
  if (!bundledSource) throw new Error("Portal feed bundle was empty");

  const dataUrl = `data:text/javascript;base64,${Buffer.from(bundledSource).toString("base64")}`;
  return import(dataUrl);
}

export async function generatePortalFeed(generatedAt) {
  const { createPortalFeed } = await loadPortalFeedModule();
  return createPortalFeed(generatedAt);
}

export async function writePortalFeed(outputPath = path.join(projectRoot, "dist", "portal-feed.json")) {
  const feed = await generatePortalFeed();
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(feed, null, 2)}\n`, "utf8");
  return feed;
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) {
  const feed = await writePortalFeed();
  console.log(`portal-feed.json: ${feed.items.length} items`);
}
