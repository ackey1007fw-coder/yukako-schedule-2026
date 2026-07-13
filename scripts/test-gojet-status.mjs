import assert from "node:assert/strict";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const server = await createServer({
  appType: "custom",
  server: { middlewareMode: true }
});

try {
  const { getGojetStatus } = await server.ssrLoadModule("/src/lib/gojetStatus.ts");
  const { GojetPerformancePanel } = await server.ssrLoadModule(
    "/src/components/GojetPerformancePanel.tsx"
  );
  const { QuickNav } = await server.ssrLoadModule(
    "/src/components/QuickNav.tsx"
  );

  const before = getGojetStatus(new Date("2026-07-22T23:59:59+09:00"));
  assert.deepEqual(before, { phase: "before", daysLeft: 1 });
  assert.equal(
    renderToStaticMarkup(
      createElement(GojetPerformancePanel, {
        now: new Date("2026-07-22T23:59:59+09:00")
      })
    ),
    ""
  );

  const opening = getGojetStatus(new Date("2026-07-23T00:00:00+09:00"));
  assert.equal(opening.phase, "today");
  assert.equal(opening.remainingPerformances, 13);
  const openingHtml = renderToStaticMarkup(
    createElement(GojetPerformancePanel, {
      now: new Date("2026-07-23T00:00:00+09:00")
    })
  );
  assert.match(openingHtml, /本日の公演/);
  assert.match(openingHtml, /15:30/);
  assert.match(openingHtml, /A班/);
  assert.match(openingHtml, /残り13公演/);
  assert.match(openingHtml, /来場チケット/);
  assert.match(openingHtml, /配信チケット/);
  assert.match(openingHtml, /id="gojet-live-panel"/);
  assert.match(openingHtml, /scroll-mt-32/);

  const beforeQuickNavHtml = renderToStaticMarkup(
    createElement(QuickNav, {
      now: new Date("2026-07-22T23:59:59+09:00")
    })
  );
  assert.doesNotMatch(beforeQuickNavHtml, /href="#gojet-live-panel"/);

  const todayQuickNavHtml = renderToStaticMarkup(
    createElement(QuickNav, {
      now: new Date("2026-07-24T12:00:00+09:00")
    })
  );
  assert.match(todayQuickNavHtml, /href="#gojet-live-panel"/);
  assert.match(todayQuickNavHtml, /本日の公演/);
  assert.ok(
    todayQuickNavHtml.indexOf('href="#gojet-live-panel"') <
      todayQuickNavHtml.indexOf('href="#today"')
  );

  const afterFirstStart = getGojetStatus(
    new Date("2026-07-23T15:30:01+09:00")
  );
  assert.equal(afterFirstStart.phase, "today");
  assert.equal(afterFirstStart.remainingPerformances, 12);

  const closingNightHtml = renderToStaticMarkup(
    createElement(GojetPerformancePanel, {
      now: new Date("2026-07-27T23:59:59+09:00")
    })
  );
  assert.match(closingNightHtml, /本日の公演/);
  assert.match(closingNightHtml, /残り0公演/);

  const archiveHtml = renderToStaticMarkup(
    createElement(GojetPerformancePanel, {
      now: new Date("2026-07-28T00:00:00+09:00")
    })
  );
  assert.match(archiveHtml, /アーカイブ配信は8\/6（木）まで/);
  assert.match(archiveHtml, /3,700円/);
  assert.match(archiveHtml, /id="gojet-live-panel"/);
  assert.match(archiveHtml, /scroll-mt-32/);

  const archiveQuickNavHtml = renderToStaticMarkup(
    createElement(QuickNav, {
      now: new Date("2026-07-28T00:00:00+09:00")
    })
  );
  assert.doesNotMatch(archiveQuickNavHtml, /href="#gojet-live-panel"/);

  const archiveLastMinute = getGojetStatus(
    new Date("2026-08-06T23:59:59+09:00")
  );
  assert.equal(archiveLastMinute.phase, "archive");

  const ended = getGojetStatus(new Date("2026-08-07T00:00:00+09:00"));
  assert.deepEqual(ended, { phase: "ended" });
  assert.equal(
    renderToStaticMarkup(
      createElement(GojetPerformancePanel, {
        now: new Date("2026-08-07T00:00:00+09:00")
      })
    ),
    ""
  );

  console.log("gojet-status tests OK");
} finally {
  await server.close();
}
