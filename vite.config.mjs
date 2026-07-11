import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import siteContent from "./src/data/siteContent.json" with { type: "json" };

const SITE_URL = "https://yukako-schedule-2026.vercel.app";
const ogp = new Date().toISOString().slice(0, 10) <= siteContent.seasonalOgp.expiresAfter
  ? siteContent.seasonalOgp
  : siteContent.defaultOgp;
const ogpPlugin = {
  name: "time-aware-ogp",
  transformIndexHtml(html) {
    return html
      .replaceAll("__OG_IMAGE__", `${SITE_URL}${ogp.image}`)
      .replaceAll("__OG_WIDTH__", ogp.width)
      .replaceAll("__OG_HEIGHT__", ogp.height)
      .replaceAll("__OG_ALT__", ogp.alt);
  }
};

export default defineConfig({
  plugins: [react(), ogpPlugin],
  esbuild: false,
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          icons: ["lucide-react"]
        }
      }
    }
  }
});
