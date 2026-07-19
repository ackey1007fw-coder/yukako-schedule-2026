import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import { ArchiveListPage } from "./pages/ArchiveListPage";
import { ArchiveDetailPage } from "./pages/ArchiveDetailPage";
import "./index.css";

// このサイトにはルーターを導入していない（元々1ページのSPAだったため）。
// /archive 系は本番ではビルド後に実ファイルとして書き出す（scripts/generate-archive-pages.mjs）ので、
// クライアント側では location.pathname を見て表示するコンポーネントを切り替えるだけでよい。
function Root() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/archive") {
    return <ArchiveListPage />;
  }

  if (path.startsWith("/archive/")) {
    const slug = path.slice("/archive/".length);
    return <ArchiveDetailPage slug={slug} />;
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
    {/* 計測はホーム・アーカイブ全ページ共通なのでApp内ではなくここに置く */}
    <Analytics />
  </React.StrictMode>,
);
