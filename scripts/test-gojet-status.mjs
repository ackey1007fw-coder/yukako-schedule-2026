import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const server = await createServer({
  appType: "custom",
  server: { middlewareMode: true }
});

try {
  const {
    getGojetStatus,
    getPerformanceLiveStatus,
    summarizeGojetDayLiveStatus
  } = await server.ssrLoadModule("/src/lib/gojetStatus.ts");
  const { GojetPerformancePanel } = await server.ssrLoadModule(
    "/src/components/GojetPerformancePanel.tsx"
  );
  const { PriorityBanner } = await server.ssrLoadModule(
    "/src/components/PriorityBanner.tsx"
  );
  const { QuickNav } = await server.ssrLoadModule(
    "/src/components/QuickNav.tsx"
  );
  const { TodayNextPanel } = await server.ssrLoadModule(
    "/src/components/TodayNextPanel.tsx"
  );
  const { gojetFeatureUpdates } = await server.ssrLoadModule(
    "/src/data/gojetFeatureUpdates.ts"
  );

  // 先頭は8/3 21:52の優花子さん本人（配信最終案内）、その次が8/3 20:40の沼尾さん。
  const newestPost = gojetFeatureUpdates[0];
  assert.equal(
    newestPost.postUrl,
    "https://x.com/mokoopy/status/2084261233344016471"
  );
  assert.equal(
    newestPost.anchorId,
    "gojet-yukako-final-call-quote-2026-08-03"
  );
  assert.equal(
    newestPost.quotedPost?.url,
    "https://x.com/yukako_produce/status/2084256242856587746"
  );
  assert.match(newestPost.title, /載せていない見所がありすぎる/);

  const newestCastPost = gojetFeatureUpdates[1];
  assert.equal(
    newestCastPost.postUrl,
    "https://x.com/mayuka_pinkcha/status/2084243063141179760"
  );
  assert.equal(
    newestCastPost.anchorId,
    "gojet-numao-mayuka-c-girls-2026-08-03"
  );
  assert.equal(newestCastPost.photos?.length, 3);
  assert.match(newestCastPost.title, /メグから見た早紀とC班ガールズ/);

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

  const todayNextHtml = renderToStaticMarkup(
    createElement(TodayNextPanel, {
      todayEvents: [],
      now: new Date("2026-07-23T13:06:00+09:00")
    })
  );
  assert.match(todayNextHtml, /今日の出演/);
  assert.match(todayNextHtml, /7\/23（木）/);
  assert.match(todayNextHtml, /19:00/);
  assert.match(todayNextHtml, /B班/);
  assert.match(todayNextHtml, /JET役/);
  assert.match(todayNextHtml, /次の出演/);
  assert.match(todayNextHtml, /7\/24（金）/);
  assert.match(todayNextHtml, /12:00/);
  assert.match(todayNextHtml, /C班/);
  assert.match(todayNextHtml, /早紀役/);
  assert.match(todayNextHtml, /出演班：B班・JET役 ／ C班・早紀役/);
  assert.doesNotMatch(todayNextHtml, /2026年7月23日（木）〜27日（月）/);

  const doubleAppearanceHtml = renderToStaticMarkup(
    createElement(TodayNextPanel, {
      todayEvents: [],
      now: new Date("2026-07-24T10:00:00+09:00")
    })
  );
  assert.match(doubleAppearanceHtml, /12:00/);
  assert.match(doubleAppearanceHtml, /15:30/);
  assert.match(doubleAppearanceHtml, /C班/);
  assert.match(doubleAppearanceHtml, /B班/);

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

  const beforeFinalStartHtml = renderToStaticMarkup(
    createElement(GojetPerformancePanel, {
      now: new Date("2026-07-27T19:59:59+09:00")
    })
  );
  assert.match(beforeFinalStartHtml, /残り1公演/);
  assert.match(
    beforeFinalStartHtml,
    /data-ticket-tone="primary"[^>]*>[\s\S]*?来場チケット[\s\S]*?<\/a>/
  );
  assert.match(
    beforeFinalStartHtml,
    /data-ticket-tone="secondary"[^>]*>[\s\S]*?配信チケット[\s\S]*?<\/a>/
  );

  // 最終日のLIVEは開演20:15（当初20:00から15分繰り下げ）。
  const afterFinalStartHtml = renderToStaticMarkup(
    createElement(GojetPerformancePanel, {
      now: new Date("2026-07-27T20:15:01+09:00")
    })
  );
  assert.match(afterFinalStartHtml, /残り0公演/);
  assert.match(afterFinalStartHtml, /本日の全公演は開演済みです/);
  assert.match(
    afterFinalStartHtml,
    /data-ticket-tone="secondary"[^>]*>[\s\S]*?来場チケット[\s\S]*?<\/a>/
  );
  assert.match(
    afterFinalStartHtml,
    /data-ticket-tone="primary"[^>]*>[\s\S]*?配信チケット[\s\S]*?<\/a>/
  );

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
  assert.match(archiveHtml, /アーカイブ配信は8\/10（月）まで/);
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
    new Date("2026-08-10T23:59:59+09:00")
  );
  assert.equal(archiveLastMinute.phase, "archive");

  const ended = getGojetStatus(new Date("2026-08-11T00:00:00+09:00"));
  assert.deepEqual(ended, { phase: "ended" });
  assert.equal(
    renderToStaticMarkup(
      createElement(GojetPerformancePanel, {
        now: new Date("2026-08-11T00:00:00+09:00")
      })
    ),
    ""
  );

  // --- 公演ライブステータス判定（開演時刻＋想定上演時間 durationMinutes=100 での目安表示） ---
  // 公式案内の上演時間変更（1時間20分→1時間40分＝カーテンコール込み約100分）を反映。
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-24T11:00:00+09:00"),
      "2026-07-24",
      "12:00",
      100
    ),
    "before"
  );
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-24T11:40:00+09:00"),
      "2026-07-24",
      "12:00",
      100
    ),
    "soon"
  );
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-24T12:20:00+09:00"),
      "2026-07-24",
      "12:00",
      100
    ),
    "live"
  );
  // 12:00 C班 → 12:00〜13:40 は「上演中」（終演直前の境界も上演中を維持）
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-24T13:40:00+09:00"),
      "2026-07-24",
      "12:00",
      100
    ),
    "live"
  );
  // 13:40を過ぎたら「終演」
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-24T13:41:00+09:00"),
      "2026-07-24",
      "12:00",
      100
    ),
    "ended"
  );
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-24T15:40:00+09:00"),
      "2026-07-24",
      "15:30",
      100
    ),
    "live"
  );
  // 15:30 B班 → 15:30〜17:10 は「上演中」
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-24T17:10:00+09:00"),
      "2026-07-24",
      "15:30",
      100
    ),
    "live"
  );
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-24T19:20:00+09:00"),
      "2026-07-24",
      "19:00",
      100
    ),
    "live"
  );
  // 19:00 A班 → 19:00〜20:40 は「上演中」
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-24T20:40:00+09:00"),
      "2026-07-24",
      "19:00",
      100
    ),
    "live"
  );
  for (const time of ["12:00", "15:30", "19:00"]) {
    assert.equal(
      getPerformanceLiveStatus(
        new Date("2026-07-24T21:00:00+09:00"),
        "2026-07-24",
        time,
        100
      ),
      "ended"
    );
  }

  // 前日・翌日の公演には影響しない（対象日以外で「上演中」を出さない）
  assert.equal(
    getPerformanceLiveStatus(
      new Date("2026-07-25T12:20:00+09:00"),
      "2026-07-24",
      "12:00",
      100
    ),
    "ended"
  );

  const day0724 = getGojetStatus(new Date("2026-07-24T12:20:00+09:00"));
  assert.equal(day0724.phase, "today");
  const summaryLive = summarizeGojetDayLiveStatus(
    new Date("2026-07-24T12:20:00+09:00"),
    day0724.day
  );
  assert.equal(summaryLive.live?.time, "12:00");
  assert.equal(summaryLive.live?.team, "C班");
  assert.equal(summaryLive.next?.time, "15:30");
  assert.equal(summaryLive.allEnded, false);

  const summaryAllEnded = summarizeGojetDayLiveStatus(
    new Date("2026-07-24T21:00:00+09:00"),
    day0724.day
  );
  assert.equal(summaryAllEnded.live, null);
  assert.equal(summaryAllEnded.next, null);
  assert.equal(summaryAllEnded.allEnded, true);

  // GojetPerformancePanel: カードのステータス表示・見出し付近の上演中インジケーター
  const livePanelHtml = renderToStaticMarkup(
    createElement(GojetPerformancePanel, {
      now: new Date("2026-07-24T12:20:00+09:00")
    })
  );
  assert.match(livePanelHtml, /現在、12:00 C班を上演中/);
  assert.match(livePanelHtml, /上演中/);
  assert.match(livePanelHtml, /まもなく開演|開演前/);
  assert.match(livePanelHtml, /公演時間をもとにした目安表示です/);

  const beforeNextPanelHtml = renderToStaticMarkup(
    createElement(GojetPerformancePanel, {
      now: new Date("2026-07-24T13:41:00+09:00")
    })
  );
  assert.match(beforeNextPanelHtml, /次の公演/);
  assert.match(beforeNextPanelHtml, /15:30/);
  assert.match(beforeNextPanelHtml, /B班/);
  assert.match(beforeNextPanelHtml, /終演/);

  // PriorityBanner: トップのお知らせバーの動的テキスト
  const bannerBeforeHtml = renderToStaticMarkup(
    createElement(PriorityBanner, {
      now: new Date("2026-07-24T11:00:00+09:00")
    })
  );
  assert.match(bannerBeforeHtml, /次回は12:00〜 C班公演/);

  const bannerLiveHtml = renderToStaticMarkup(
    createElement(PriorityBanner, {
      now: new Date("2026-07-24T12:20:00+09:00")
    })
  );
  assert.match(bannerLiveHtml, /C班ただいま上演中！ 次回15:30〜B班/);

  const bannerLiveOnlyHtml = renderToStaticMarkup(
    createElement(PriorityBanner, {
      now: new Date("2026-07-24T19:20:00+09:00")
    })
  );
  assert.match(bannerLiveOnlyHtml, /ただいま #ゆかJET A班 上演中！/);

  const bannerEndedHtml = renderToStaticMarkup(
    createElement(PriorityBanner, {
      now: new Date("2026-07-24T21:00:00+09:00")
    })
  );
  assert.match(bannerEndedHtml, /本日の #ゆかJET 公演は終了しました/);

  // --- 配信申込の〆切（2026-08-03T23:59:59+09:00）と、A・B・C班カードの重複表示 ---
  const { NowProducingSection } = await server.ssrLoadModule(
    "/src/components/NowProducingSection.tsx"
  );
  const { GojetFinaleReportSection } = await server.ssrLoadModule(
    "/src/components/GojetFinaleReportSection.tsx"
  );
  const { gojetFeatureUpdates: displayUpdates } = await server.ssrLoadModule(
    "/src/data/gojetFeatureUpdates.ts"
  );
  const { gojetFeatureUpdates: sourceUpdates } = await server.ssrLoadModule(
    "/src/data/gojetPromo.ts"
  );
  const { events } = await server.ssrLoadModule("/src/data/events.ts");

  const gojetEvent = events.find((event) => event.id === "yukajet-gojet-2026-07");
  assert.ok(gojetEvent, "#ゆかJET のイベントデータが見つからない");

  const beforeDeadline = new Date("2026-08-03T23:59:58+09:00");
  const afterDeadline = new Date("2026-08-04T00:00:00+09:00");
  const orderFormHref = 'href="https://docs.google.com/forms/';

  // 1. 〆切1秒前：配信申込CTAが出ている
  const producingBeforeHtml = renderToStaticMarkup(
    createElement(NowProducingSection, { event: gojetEvent, now: beforeDeadline })
  );
  assert.ok(
    producingBeforeHtml.includes(orderFormHref),
    "〆切前は配信申込フォームへのCTAが表示されるべき"
  );
  assert.match(producingBeforeHtml, /配信チケットを申し込む/);
  assert.match(
    producingBeforeHtml,
    /配信チケットの申し込みは8月3日（月）まで/
  );

  // 2. 〆切後：申込CTAだけが消え、投稿・引用元・視聴期限の案内は残る
  const producingAfterHtml = renderToStaticMarkup(
    createElement(NowProducingSection, { event: gojetEvent, now: afterDeadline })
  );
  assert.ok(
    !producingAfterHtml.includes(orderFormHref),
    "〆切後に配信申込フォームへのCTAが残っている"
  );
  assert.doesNotMatch(producingAfterHtml, /配信チケットを申し込む/);
  assert.match(producingAfterHtml, /配信チケットの申し込みは終了。視聴は8月10日（月）まで/);
  for (const keptUrl of [
    "https://x.com/mokoopy/status/2084261233344016471",
    "https://x.com/yukako_produce/status/2084256242856587746",
    "https://x.com/mokoopy/status/2083944200119476437",
    "https://x.com/yukako_produce/status/2083938076452434371",
    "https://x.com/mokoopy/status/2083896120812720278",
    "https://x.com/yukako_produce/status/2083560056470323653",
    "https://x.com/mokoopy/status/2083895403389555175",
    "https://x.com/yukako_produce/status/2083560994169889115",
    "https://x.com/mokoopy/status/2083894429962977371",
    "https://x.com/yukako_produce/status/2083763241877217706"
  ]) {
    assert.ok(
      producingAfterHtml.includes(keptUrl),
      `〆切後も残すべき投稿リンクが消えている: ${keptUrl}`
    );
  }
  // 既存動画・Drive動画も〆切後に消えない
  // （一覧の初期表示は先頭6件なので、動画の保持はデータ側で確認する）
  const displayMedia = new Set(
    displayUpdates.flatMap((update) =>
      [update.video?.src, update.video?.poster, update.embeddedVideo?.src].filter(
        Boolean
      )
    )
  );
  for (const media of [
    "/videos/yukajet-a-team-character-intro-2026-08-01.mp4",
    "/videos/yukajet-b-team-character-intro-2026-08-01.mp4",
    "/videos/yukajet-cban-cast-2026-07-13.mp4",
    "/videos/yukajet-c-team-character-intro-2026-08-01.mp4",
    "/images/yukajet/2026-08-01-a-team-character-intro-poster.jpg",
    "/images/yukajet/2026-08-01-b-team-character-intro-poster.jpg",
    "/images/yukako-yukajet-cban-cast-video-poster-2026-07-13.jpg",
    "https://drive.google.com/file/d/1Gq7dSABc559mD_tpibBMLIwih6pkxg1I/preview",
    "https://drive.google.com/file/d/1X3-NYAOQ-Lx7GW9W_T8lG0bTG4SVdgOx/preview"
  ]) {
    assert.ok(
      displayMedia.has(media),
      `一覧から動画・ポスターが消えている: ${media}`
    );
  }

  // 3. A・B・C班で同じ動画カードが二重表示されない
  for (const videoSrc of [
    "/videos/yukajet-a-team-character-intro-2026-08-01.mp4",
    "/videos/yukajet-b-team-character-intro-2026-08-01.mp4",
    "/videos/yukajet-c-team-character-intro-2026-08-01.mp4",
    "/videos/yukajet-cban-cast-2026-07-13.mp4"
  ]) {
    const shown = displayUpdates.filter(
      (update) => update.video?.src === videoSrc
    );
    assert.equal(
      shown.length,
      1,
      `一覧に同じ動画のカードが${shown.length}件ある: ${videoSrc}`
    );
  }
  // 一覧の代表カードは本人（@mokoopy）の引用投稿
  for (const [videoSrc, expectedPostUrl] of [
    [
      "/videos/yukajet-a-team-character-intro-2026-08-01.mp4",
      "https://x.com/mokoopy/status/2083896120812720278"
    ],
    [
      "/videos/yukajet-b-team-character-intro-2026-08-01.mp4",
      "https://x.com/mokoopy/status/2083895403389555175"
    ],
    [
      "/videos/yukajet-cban-cast-2026-07-13.mp4",
      "https://x.com/mokoopy/status/2083894429962977371"
    ]
  ]) {
    const card = displayUpdates.find((update) => update.video?.src === videoSrc);
    assert.equal(card.postUrl, expectedPostUrl);
    assert.ok(card.quotedPost?.url, "代表カードに引用元の公式投稿URLが必要");
  }

  // 4. 保持必須の投稿URLが元データにも残っている
  const sourceUrls = new Set(
    sourceUpdates.flatMap((update) =>
      [update.postUrl, update.quotedPost?.url].filter(Boolean)
    )
  );
  for (const requiredUrl of [
    "https://x.com/yukako_produce/status/2083763241877217706",
    "https://x.com/yukako_produce/status/2083560994169889115",
    "https://x.com/yukako_produce/status/2083560056470323653"
  ]) {
    assert.ok(
      sourceUrls.has(requiredUrl),
      `元データから投稿が消えている: ${requiredUrl}`
    );
  }

  // 5. アンカーIDの重複がない
  const anchorIds = displayUpdates.map((update) => update.anchorId);
  assert.equal(
    new Set(anchorIds).size,
    anchorIds.length,
    "#ゆかJET カードのアンカーIDが重複している"
  );

  // 6. Instagram完走レポート：〆切後は申込ボタンだけ消し、写真・動画・Instagram導線は残す
  const finaleBeforeHtml = renderToStaticMarkup(
    createElement(GojetFinaleReportSection, { now: beforeDeadline })
  );
  assert.match(finaleBeforeHtml, /配信チケットを申し込む/);
  assert.match(finaleBeforeHtml, /配信申込は8\/3まで/);

  const finaleAfterHtml = renderToStaticMarkup(
    createElement(GojetFinaleReportSection, { now: afterDeadline })
  );
  assert.doesNotMatch(finaleAfterHtml, /配信チケットを申し込む/);
  assert.ok(!finaleAfterHtml.includes(orderFormHref));
  assert.match(finaleAfterHtml, /配信チケットの申し込みは終了・視聴は8月10日まで/);
  assert.match(finaleAfterHtml, /配信は8\/10まで視聴可能/);
  assert.match(finaleAfterHtml, /8月10日まで視聴できます/);
  assert.ok(finaleAfterHtml.includes("https://www.instagram.com/p/DbiZ7_MlKIt/"));
  // 写真・動画は自己ホスト。外部（Googleドライブ）へは依存しない。
  for (const asset of [
    "/images/yukajet/2026-08-02-finale-a-team.jpg",
    "/images/yukajet/2026-08-02-finale-b-team.jpg",
    "/images/yukajet/2026-08-02-finale-c-team.jpg",
    "/videos/yukajet-finale-a-team-2026-08-02.mp4",
    "/videos/yukajet-finale-b-team-2026-08-02.mp4",
    "/videos/yukajet-finale-c-team-2026-08-02.mp4"
  ]) {
    assert.ok(
      finaleAfterHtml.includes(asset),
      `完走レポートの自己ホスト素材が消えている: ${asset}`
    );
    assert.ok(
      existsSync(new URL(`../public${asset}`, import.meta.url)),
      `完走レポートの素材ファイルが無い: public${asset}`
    );
  }
  assert.ok(
    !finaleAfterHtml.includes("drive.google.com"),
    "完走レポートにGoogleドライブへの依存が残っている"
  );

  // 7. 上部のアーカイブ配信パネル
  const archiveBeforeDeadlineHtml = renderToStaticMarkup(
    createElement(GojetPerformancePanel, { now: beforeDeadline })
  );
  assert.match(archiveBeforeDeadlineHtml, /配信チケット/);
  assert.ok(archiveBeforeDeadlineHtml.includes(orderFormHref));

  const archiveAfterDeadlineHtml = renderToStaticMarkup(
    createElement(GojetPerformancePanel, { now: afterDeadline })
  );
  assert.ok(!archiveAfterDeadlineHtml.includes(orderFormHref));
  assert.match(
    archiveAfterDeadlineHtml,
    /配信チケットの申し込みは終了。視聴は8\/10（月）までです。/
  );
  assert.match(archiveAfterDeadlineHtml, /アーカイブ配信は8\/10（月）まで/);
  assert.match(archiveAfterDeadlineHtml, /href="#gojet-finale-report"/);

  // 8. トップのお知らせバー
  const bannerArchiveBeforeHtml = renderToStaticMarkup(
    createElement(PriorityBanner, { now: beforeDeadline })
  );
  assert.match(
    bannerArchiveBeforeHtml,
    /配信チケットの申し込みは8\/3（月）まで/
  );

  const bannerArchiveAfterHtml = renderToStaticMarkup(
    createElement(PriorityBanner, { now: afterDeadline })
  );
  assert.ok(!bannerArchiveAfterHtml.includes(orderFormHref));
  assert.match(
    bannerArchiveAfterHtml,
    /配信チケットの申し込みは終了・視聴は8\/10（月）まで/
  );

  console.log("gojet-status tests OK");
} finally {
  await server.close();
}
