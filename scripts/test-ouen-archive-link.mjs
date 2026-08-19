import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const OUEN_ARCHIVE_URL = "https://ouen-archive-564c.vercel.app/";

const server = await createServer({
  appType: "custom",
  server: { middlewareMode: true }
});

try {
  const { Footer } = await server.ssrLoadModule("/src/components/Footer.tsx");

  const html = renderToStaticMarkup(
    createElement(Footer, {
      socialLinks: [{ label: "X", url: "https://x.com/example" }]
    })
  );

  // 1. 親ポータルの canonical URL が href になっている
  assert.ok(
    html.includes(`href="${OUEN_ARCHIVE_URL}"`),
    "Footer must link to the Ouen Archive canonical production URL"
  );

  // 2. 「応援アーカイブ」の文字がある（リンクテキストだけで遷移先が分かる）
  assert.ok(html.includes("応援アーカイブへ戻る"), "return link text is missing");
  assert.ok(
    html.includes("5つの応援サイトをつなぐ非公式ポータル"),
    "the portal is introduced as an unofficial portal"
  );

  // 3. Footer 内に配置されている
  const footerStart = html.indexOf("<footer");
  const footerEnd = html.indexOf("</footer>");
  const linkIndex = html.indexOf(OUEN_ARCHIVE_URL);
  assert.ok(footerStart >= 0 && footerEnd > footerStart, "footer element is missing");
  assert.ok(
    linkIndex > footerStart && linkIndex < footerEnd,
    "the return link must live inside the footer element"
  );

  // 4. 同一タブ遷移（親ポータルへ戻るリンクだけ target を持たない）
  const returnAnchor = html.slice(
    html.lastIndexOf("<a", linkIndex),
    html.indexOf("</a>", linkIndex) + 4
  );
  assert.ok(
    !returnAnchor.includes('target="_blank"'),
    "the return link must open in the same tab"
  );
  assert.ok(returnAnchor.includes("underline"), "the link must not rely on color alone");
  assert.ok(returnAnchor.includes("min-h-[44px]"), "the link needs a ~44px tap target");

  // 5. 既存の主要 Footer コンテンツが残っている
  assert.ok(html.includes("吉井優花子"), "person name must stay in the footer");
  assert.ok(
    html.includes("本人・所属団体が運営するサイトではありません"),
    "unofficial disclaimer must stay in the footer"
  );
  assert.ok(html.includes("Produced by あっきー"), "credit line must stay in the footer");
  assert.ok(html.includes('href="https://x.com/example"'), "social links must stay");

  // 6. Portal Feed は変更していない
  const portalFeedScript = await readFile("scripts/generate-portal-feed.mjs", "utf8");
  assert.ok(
    !portalFeedScript.includes("ouen-archive"),
    "Portal Feed generation must stay untouched"
  );

  // 7. 人物データを変更していない
  const profileSource = await readFile("src/data/profile.ts", "utf8");
  assert.ok(!profileSource.includes("ouen-archive"), "profile data must stay untouched");

  console.log("ouen-archive return link: ok");
} finally {
  await server.close();
}
