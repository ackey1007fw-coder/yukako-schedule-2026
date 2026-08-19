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
  const { siteUpdates: latestSiteUpdates } = await server.ssrLoadModule(
    "/src/data/siteUpdates.ts"
  );

  // 先頭は8/19 21:09のプロデュース公演アカウント（美里のオリジナル楽曲2曲・歌詞カード2枚）。
  const originalSongsPost = gojetFeatureUpdates[0];
  assert.equal(
    originalSongsPost.postUrl,
    "https://x.com/yukako_produce/status/2090048586331676998"
  );
  assert.equal(
    originalSongsPost.anchorId,
    "gojet-original-songs-misato-2026-08-19"
  );
  assert.equal(originalSongsPost.date, "2026.8.19 21:09");
  assert.equal(originalSongsPost.imageLayout, "contain");
  assert.equal(originalSongsPost.photos?.length, 2);
  assert.equal(
    originalSongsPost.photos?.[0]?.src,
    "/images/yukajet/2026-08-19-future-rose-lyrics.jpg",
    "歌詞カードの並びが『薔薇色 → 灰色』からずれている"
  );
  assert.equal(
    originalSongsPost.photos?.[1]?.src,
    "/images/yukajet/2026-08-19-future-gray-lyrics.jpg"
  );
  assert.match(originalSongsPost.title, /『未来は薔薇色』⇄『未来は灰色』/);
  assert.match(originalSongsPost.caption, /オリジナル楽曲①/);
  assert.equal(originalSongsPost.quotedPost?.handle, "@yukako_produce");
  assert.equal(
    originalSongsPost.quotedPost?.url,
    undefined,
    "引用元投稿のURLは未確認のため設定しない"
  );
  originalSongsPost.photos?.forEach((image) => {
    assert.ok(
      existsSync(new URL(`../public${image.src}`, import.meta.url)),
      `オリジナル楽曲①の歌詞カード画像が無い: public${image.src}`
    );
  });
  const originalSongsUpdate = latestSiteUpdates.find(
    (update) => update.anchor === "#gojet-original-songs-misato-2026-08-19"
  );
  assert.ok(originalSongsUpdate, "最新情報にオリジナル楽曲①の記事が無い");
  assert.equal(latestSiteUpdates[0]?.id, originalSongsUpdate.id);
  assert.equal(originalSongsUpdate.sourceUrl, originalSongsPost.postUrl);
  assert.equal(
    originalSongsUpdate.imageLayout,
    "contain",
    "縦長の歌詞カードが最新情報サムネイルで切り抜かれてしまう"
  );
  assert.equal(
    originalSongsUpdate.image?.src,
    "/images/yukajet/2026-08-19-future-rose-lyrics.jpg"
  );
  assert.equal(
    latestSiteUpdates.filter(
      (update) => update.sourceUrl === originalSongsPost.postUrl
    ).length,
    1,
    "オリジナル楽曲①の投稿が最新情報に重複している"
  );

  // 2件目は8/10 10:36の優花子さん本人（配信視聴最終日・A/B/C班集合写真）。
  const newestPost = gojetFeatureUpdates[1];
  assert.equal(
    newestPost.postUrl,
    "https://x.com/mokoopy/status/2086627781023285249"
  );
  assert.equal(
    newestPost.anchorId,
    "gojet-streaming-viewing-final-day-2026-08-10"
  );
  assert.equal(newestPost.photos?.length, 3);
  assert.match(newestPost.title, /A・B・C班、3枚の集合写真/);
  assert.match(newestPost.caption, /何度も観てたっぷりお楽しみください/);
  newestPost.photos?.forEach((image) => {
    assert.ok(
      existsSync(new URL(`../public${image.src}`, import.meta.url)),
      `配信視聴最終日の画像ファイルが無い: public${image.src}`
    );
  });
  const popcornUpdate = latestSiteUpdates.find(
    (update) => update.id === "iburigakko-popcorn-homecoming-2026-08-17"
  );
  assert.ok(popcornUpdate, "最新情報に8/17いぶりがっこポップコーンの記事が無い");
  assert.equal(
    popcornUpdate.sourceUrl,
    "https://x.com/mokoopy/status/2089283468576608643"
  );
  assert.equal(
    popcornUpdate.image?.src,
    "/images/yukako-iburigakko-popcorn-2026-08-17.jpg"
  );
  assert.equal(popcornUpdate.imageLayout, "contain");
  assert.equal(
    latestSiteUpdates.filter(
      (update) => update.sourceUrl === popcornUpdate.sourceUrl
    ).length,
    1,
    "同じX投稿が最新情報に重複している"
  );
  const popcornOrigin = latestSiteUpdates.find(
    (update) => update.id === "iburigakko-popcorn-original-2026-01-18"
  );
  assert.ok(popcornOrigin, "最新情報に1/18いぶりがっこポップコーン元投稿が無い");
  assert.equal(popcornOrigin.date, "2026.1.18");
  assert.equal(
    popcornOrigin.sourceUrl,
    "https://x.com/mokoopy/status/2012824363620331966"
  );
  assert.equal(
    popcornOrigin.image?.src,
    "/images/yukako-iburigakko-popcorn-menu-2026-01-18.jpg"
  );
  assert.equal(popcornOrigin.imageLayout, "contain");
  assert.ok(
    existsSync(new URL(`../public${popcornOrigin.image.src}`, import.meta.url)),
    `1/18元投稿の画像ファイルが無い: public${popcornOrigin.image.src}`
  );
  assert.equal(
    latestSiteUpdates.filter(
      (update) => update.sourceUrl === popcornOrigin.sourceUrl
    ).length,
    1,
    "1/18元投稿が最新情報に重複している"
  );
  assert.notEqual(
    popcornUpdate.sourceUrl,
    popcornOrigin.sourceUrl,
    "8/17投稿と1/18元投稿のURLが同じになっている"
  );
  assert.equal(
    popcornUpdate.relatedId,
    popcornOrigin.id,
    "8/17カードから1/18元投稿への導線が無い"
  );
  assert.match(popcornOrigin.summary ?? "", /8\/17の『再び食べた』投稿につながる元投稿/);
  const { news, latestNewsListingDate } = await server.ssrLoadModule(
    "/src/data/news.ts"
  );
  assert.equal(
    news[0]?.url,
    "https://x.com/yukako_produce/status/2090048586331676998",
    "NewsBar先頭が8/19オリジナル楽曲①の投稿からずれている"
  );
  assert.equal(
    news.filter(
      (item) =>
        item.url === "https://x.com/yukako_produce/status/2090048586331676998"
    ).length,
    1,
    "news.ts にオリジナル楽曲①が重複登録されている"
  );
  const popcornOriginNews = news.find(
    (item) => item.url === popcornOrigin.sourceUrl
  );
  assert.ok(popcornOriginNews, "news.ts に1/18元投稿が無い");
  assert.equal(popcornOriginNews.date, "2026.1.18");
  assert.equal(popcornOriginNews.listedAt, "2026.8.18");
  assert.equal(
    latestNewsListingDate(news),
    "2026.8.19",
    "Footerの掲載情報更新日が8/19からずれている"
  );
  const streamingFinalUpdate = latestSiteUpdates.find(
    (update) => update.anchor === "#gojet-streaming-viewing-final-day-2026-08-10"
  );
  assert.ok(streamingFinalUpdate, "最新情報から配信視聴最終日の記事が消えている");
  assert.equal(streamingFinalUpdate.sourceUrl, newestPost.postUrl);

  // 3件目は8/9の優花子さん本人（8/10までの配信・感想投稿の呼びかけ）。
  const streamingMessagePost = gojetFeatureUpdates[2];
  assert.equal(
    streamingMessagePost.postUrl,
    "https://x.com/mokoopy/status/2086455342796603727?s=12"
  );
  assert.equal(
    streamingMessagePost.anchorId,
    "gojet-streaming-viewing-ended-2026-08-09"
  );
  assert.equal(streamingMessagePost.photos?.length, 2);
  assert.equal(streamingMessagePost.ctaLabel, "Xで元の投稿を見る");
  assert.match(streamingMessagePost.body, /2026年8月10日をもって終了しました/);
  streamingMessagePost.photos?.forEach((image) => {
    assert.ok(
      existsSync(new URL(`../public${image.src}`, import.meta.url)),
      `8/9配信案内の画像ファイルが無い: public${image.src}`
    );
  });
  const streamingMessageUpdate = latestSiteUpdates.find(
    (update) => update.anchor === "#gojet-streaming-viewing-ended-2026-08-09"
  );
  assert.ok(streamingMessageUpdate, "最新情報から8/9配信案内の記事が消えている");
  assert.equal(streamingMessageUpdate.sourceUrl, streamingMessagePost.postUrl);

  // 4件目は8/8 9:25の優花子さん本人（JETの妹・メグ役紹介）。
  const megCastIntroPost = gojetFeatureUpdates[3];
  assert.equal(
    megCastIntroPost.postUrl,
    "https://x.com/mokoopy/status/2085885102899507709?s=12"
  );
  assert.equal(
    megCastIntroPost.anchorId,
    "gojet-yukako-meg-cast-intro-2026-08-08"
  );
  assert.equal(megCastIntroPost.date, "2026.8.8 9:25");
  assert.equal(megCastIntroPost.photos?.length, 2);
  assert.match(megCastIntroPost.title, /JETの妹・メグ/);
  assert.match(megCastIntroPost.body, /感情の乗った歌声/);
  megCastIntroPost.photos?.forEach((image) => {
    assert.ok(
      existsSync(new URL(`../public${image.src}`, import.meta.url)),
      `8/8メグ役紹介の画像ファイルが無い: public${image.src}`
    );
  });
  const megCastIntroUpdate = latestSiteUpdates.find(
    (update) => update.anchor === "#gojet-yukako-meg-cast-intro-2026-08-08"
  );
  assert.ok(megCastIntroUpdate, "最新情報からメグ役紹介の記事が消えている");
  assert.equal(megCastIntroUpdate.sourceUrl, megCastIntroPost.postUrl);

  // 続いて8/3 21:52の優花子さん本人（配信最終案内）、8/3 20:40の沼尾さん。
  const previousNewestPost = gojetFeatureUpdates[4];
  assert.equal(
    previousNewestPost.postUrl,
    "https://x.com/mokoopy/status/2084261233344016471"
  );
  assert.equal(
    previousNewestPost.anchorId,
    "gojet-yukako-final-call-quote-2026-08-03"
  );
  assert.equal(
    previousNewestPost.quotedPost?.url,
    "https://x.com/yukako_produce/status/2084256242856587746"
  );
  assert.match(previousNewestPost.title, /載せていない見所がありすぎる/);

  const newestCastPost = gojetFeatureUpdates[5];
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
  const afterViewingDeadline = new Date("2026-08-11T00:00:00+09:00");
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
  // 初期表示は先頭9件。8/19のオリジナル楽曲①が加わり、8/2のC班キャスト引用
  // （2083894429962977371 / 2083763241877217706）は「もっと見る」の中へ移動した。
  for (const keptUrl of [
    "https://x.com/yukako_produce/status/2090048586331676998",
    "https://x.com/mokoopy/status/2084261233344016471",
    "https://x.com/yukako_produce/status/2084256242856587746",
    "https://x.com/mokoopy/status/2083944200119476437",
    "https://x.com/yukako_produce/status/2083938076452434371",
    "https://x.com/mokoopy/status/2083896120812720278",
    "https://x.com/yukako_produce/status/2083560056470323653",
    "https://x.com/mokoopy/status/2083895403389555175",
    "https://x.com/yukako_produce/status/2083560994169889115"
  ]) {
    assert.ok(
      producingAfterHtml.includes(keptUrl),
      `〆切後も残すべき投稿リンクが消えている: ${keptUrl}`
    );
  }

  // 2b. 8/11以降：配信終了を明示し、期限切れの購入CTAを表示しない。
  const producingClosedHtml = renderToStaticMarkup(
    createElement(NowProducingSection, {
      event: gojetEvent,
      now: afterViewingDeadline
    })
  );
  assert.doesNotMatch(producingClosedHtml, /チケット予約/);
  assert.doesNotMatch(producingClosedHtml, /配信チケットを申し込む/);
  assert.doesNotMatch(producingClosedHtml, /カレンダーに追加/);
  assert.match(producingClosedHtml, /#ゆかJET 活動の軌跡/);
  assert.match(producingClosedHtml, /応援メニューの記録を見る/);
  assert.match(
    producingClosedHtml,
    /配信視聴は2026年8月10日をもって終了しました/
  );
  assert.ok(
    producingClosedHtml.includes(
      "https://x.com/mokoopy/status/2086455342796603727?s=12"
    )
  );
  assert.ok(
    producingClosedHtml.includes(
      "/images/yukajet/2026-08-09-yukako-streaming-message-four-cast.jpg"
    )
  );
  assert.ok(
    producingClosedHtml.includes(
      "/images/yukajet/2026-08-09-yukako-streaming-message-six-cast.jpg"
    )
  );
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

  const finaleClosedHtml = renderToStaticMarkup(
    createElement(GojetFinaleReportSection, { now: afterViewingDeadline })
  );
  assert.doesNotMatch(finaleClosedHtml, /配信チケットを申し込む/);
  assert.match(finaleClosedHtml, /配信は8\/10をもって終了/);
  assert.match(
    finaleClosedHtml,
    /配信終了・視聴期間は2026年8月10日をもって終了/
  );
  assert.match(finaleClosedHtml, /現在、視聴期間は終了しています/);
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

  // 9. Miss Grand Japan FINAL（8/10 16:00 開演）
  //    開演前はチケット導線あり、開演後はチケット導線だけ消えて告知・投稿リンクは残る。
  const { MissGrandJapanManagementSection } = await server.ssrLoadModule(
    "/src/components/MissGrandJapanManagementSection.tsx"
  );
  const { missGrandJapanFinal } = await server.ssrLoadModule(
    "/src/data/missGrandJapanManagement.ts"
  );

  const beforeFinal = new Date("2026-08-10T15:59:00+09:00");
  const afterFinal = new Date("2026-08-10T16:00:01+09:00");

  const mgjBeforeHtml = renderToStaticMarkup(
    createElement(MissGrandJapanManagementSection, { now: beforeFinal })
  );
  assert.ok(
    mgjBeforeHtml.includes(missGrandJapanFinal.ticketUrl),
    "開演前なのにMGJ FINALのチケット導線が無い"
  );
  assert.match(mgjBeforeHtml, /チケット申し込みフォームへ/);
  assert.ok(mgjBeforeHtml.includes(missGrandJapanFinal.ticketNote));
  assert.doesNotMatch(mgjBeforeHtml, /公式TICKET/);

  const mgjAfterHtml = renderToStaticMarkup(
    createElement(MissGrandJapanManagementSection, { now: afterFinal })
  );
  assert.ok(
    !mgjAfterHtml.includes(missGrandJapanFinal.ticketUrl),
    "開演後もMGJ FINALのチケット導線が残っている"
  );
  assert.doesNotMatch(mgjAfterHtml, /チケット申し込みフォームへ/);
  assert.ok(mgjAfterHtml.includes(missGrandJapanFinal.endedNote));
  // 告知画像・投稿写真・元投稿への導線は開演後も残す
  const mgjImages = [
    missGrandJapanFinal.heroImage,
    missGrandJapanFinal.ticketImage,
    missGrandJapanFinal.yukakoPost.image
  ];
  for (const image of mgjImages) {
    assert.ok(
      mgjAfterHtml.includes(image.src),
      `開演後にMGJ FINALの画像が消えている: ${image.src}`
    );
    assert.ok(
      existsSync(new URL(`../public${image.src}`, import.meta.url)),
      `MGJ FINALの画像ファイルが無い: public${image.src}`
    );
  }
  assert.ok(mgjAfterHtml.includes(missGrandJapanFinal.officialPostUrl));

  // 優花子さん本人の投稿ブロック（写真・中身・本人への導線）は開演前後とも出す
  for (const [label, html] of [
    ["開演前", mgjBeforeHtml],
    ["開演後", mgjAfterHtml]
  ]) {
    const post = missGrandJapanFinal.yukakoPost;
    assert.ok(html.includes(post.postUrl), `${label}に優花子さんの投稿への導線が無い`);
    assert.ok(html.includes(post.profileUrl), `${label}に優花子さんのXへの導線が無い`);
    assert.ok(html.includes(post.image.src), `${label}に優花子さんの投稿写真が無い`);
    assert.ok(html.includes(post.title), `${label}に投稿の見出しが無い`);
    for (const line of post.handwritten) {
      assert.ok(html.includes(line), `${label}に画像の書き込み「${line}」が無い`);
    }
  }

  // 引用は出典とセットで出す（誰の言葉か分からない「」を作らない）
  assert.ok(
    mgjBeforeHtml.includes(missGrandJapanFinal.quote) &&
      mgjBeforeHtml.includes(missGrandJapanFinal.quoteSource),
    "MGJ FINAL の引用に出典が付いていない"
  );

  // events.ts の同じ公演と日時がずれていないか（二重管理の検算）
  const mgjEvent = events.find((event) => event.id === "miss-grand-japan-2026-final-mc");
  assert.ok(mgjEvent, "events.ts に miss-grand-japan-2026-final-mc が無い");
  assert.equal(
    new Date(mgjEvent.startAt).getTime(),
    new Date(missGrandJapanFinal.startsAt).getTime(),
    "MGJ FINAL の開演時刻が events.ts と missGrandJapanFinal でずれている"
  );
  assert.ok(mgjEvent.endAt, "MGJ FINAL に表示上の終了境界が無い");
  assert.ok(
    new Date(mgjEvent.endAt).getTime() > new Date(mgjEvent.startAt).getTime(),
    "MGJ FINAL が開演時刻と同時に終了扱いになる"
  );

  // 10. トップの「最新情報」記事にも、本人投稿の写真と記事内導線を出す。
  const { LatestUpdatesSection } = await server.ssrLoadModule(
    "/src/components/LatestUpdatesSection.tsx"
  );
  const { siteUpdates } = await server.ssrLoadModule("/src/data/siteUpdates.ts");
  const mgjUpdate = siteUpdates.find(
    (update) => update.id === "miss-grand-japan-final-mc-2026-08-08"
  );
  assert.ok(mgjUpdate, "最新情報にMGJ FINALの記事が無い");
  assert.equal(
    mgjUpdate.image?.src,
    "/images/miss-grand-japan/yukako-mgj-2026-final-members-2026-08-08.jpg"
  );
  assert.equal(mgjUpdate.imageLayout, "contain");
  assert.equal(mgjUpdate.anchor, "#miss-grand-japan-final");
  // MGJ FINALは8/10で終了済み。新しい更新が入るとカード3枠からは外れるが、
  // 記事と #miss-grand-japan-final への導線は最新情報の一覧に残り続ける。
  assert.ok(
    siteUpdates.some((update) => update.id === mgjUpdate.id),
    "MGJ FINALの記事が最新情報の一覧から消えている"
  );
  const latestUpdatesHtml = renderToStaticMarkup(createElement(LatestUpdatesSection));
  assert.ok(latestUpdatesHtml.includes("sm:object-contain"));

  // カードは1カテゴリ1枚。X枠は最新の本人投稿が取り、その投稿が引用している元投稿は
  // 独立カードではなく、同じカード内の引用ブロックとして出る（主役が入れ替わらない）。
  const latestXUpdate = siteUpdates.find((update) => update.category === "X");
  assert.ok(latestXUpdate, "最新情報にX投稿の記事が無い");
  assert.ok(
    latestUpdatesHtml.includes(latestXUpdate.image?.src ?? "\u0000"),
    "X枠のカードに本人投稿の写真が無い"
  );
  const quotedUpdate = siteUpdates.find(
    (update) => update.id === latestXUpdate.relatedId
  );
  assert.ok(quotedUpdate, "最新のX投稿カードに引用元投稿が紐付いていない");
  assert.ok(
    latestUpdatesHtml.includes(quotedUpdate.sourceUrl),
    "X枠のカードに引用元投稿のXリンクが無い"
  );
  assert.ok(
    latestUpdatesHtml.includes(quotedUpdate.image?.src ?? "\u0000"),
    "X枠のカードに引用元投稿のサムネイルが無い"
  );
  assert.ok(
    latestUpdatesHtml.includes(quotedUpdate.date),
    "引用ブロックに元投稿の投稿日が無い"
  );
  assert.ok(
    latestUpdatesHtml.includes(latestXUpdate.relatedLabel ?? "話題のはじまり")
  );
  assert.ok(
    latestUpdatesHtml.includes(latestXUpdate.relatedLinkLabel ?? "元投稿をXで見る")
  );
  assert.equal(
    latestUpdatesHtml.split(quotedUpdate.sourceUrl).length - 1,
    1,
    "引用元投稿が独立カードとしても重複表示されている"
  );
  // 最新情報の記事と、MGJ FINALセクション内の投稿ブロックは同じX投稿を指す。
  // news.ts にも同じURLの項目があるので、siteUpdates 側で1件に畳まれていることを見る。
  const yukakoPostUrl = missGrandJapanFinal.yukakoPost.postUrl;
  assert.ok(yukakoPostUrl, "MGJ FINAL に優花子さんの投稿URLが無い");
  assert.equal(
    siteUpdates.filter((update) => update.sourceUrl?.split("?")[0] === yukakoPostUrl).length,
    1,
    "同じX投稿が最新情報に重複している"
  );
  assert.equal(mgjUpdate.sourceUrl, yukakoPostUrl, "最新情報の記事が別の投稿を指している");

  // 11. 初回訪問向け：ヒーローは次の出演を出し、終了済み公演を現行公演のように見せない。
  const { Hero } = await server.ssrLoadModule("/src/components/Hero.tsx");
  const { EventCard } = await server.ssrLoadModule("/src/components/EventCard.tsx");
  const { eventSchemaStatus } = await server.ssrLoadModule("/src/lib/date.ts");
  const { searchFaqs, searchIntents } = await server.ssrLoadModule(
    "/src/data/searchFaq.ts"
  );
  const babySharkOgaki = events.find((event) => event.id === "babyshark-live-2026-08-22");
  const mgjFinalEvent = events.find((event) => event.id === "miss-grand-japan-2026-final-mc");
  assert.ok(babySharkOgaki, "大垣公演が events.ts に無い");
  assert.ok(mgjFinalEvent, "MGJ FINAL が events.ts に無い");

  const heroWithNextHtml = renderToStaticMarkup(
    createElement(Hero, {
      nextEvent: babySharkOgaki,
      socialLinks: [
        {
          label: "SHOWROOM",
          handle: "秋田の優花子",
          url: "https://www.showroom-live.com/room/profile?room_id=347571",
          kind: "showroom",
          description: "SHOWROOM"
        }
      ]
    })
  );
  assert.match(heroWithNextHtml, /次の出演/);
  assert.match(heroWithNextHtml, /Baby Shark 大垣/);
  assert.match(heroWithNextHtml, /出演予定を見る/);
  assert.match(heroWithNextHtml, /最新情報を見る/);
  assert.match(heroWithNextHtml, /href="#schedule"/);
  assert.match(heroWithNextHtml, /href="#updates"/);
  assert.doesNotMatch(heroWithNextHtml, /#ゆかJET \/ 公演情報を見る/);
  assert.doesNotMatch(heroWithNextHtml, /今日の予定を見る/);

  const heroWithoutNextHtml = renderToStaticMarkup(
    createElement(Hero, { socialLinks: [] })
  );
  assert.match(heroWithoutNextHtml, /発表があり次第ここに載せます/);
  assert.match(heroWithoutNextHtml, /これまでの歩みを見る/);
  assert.doesNotMatch(heroWithoutNextHtml, /次の出演/);

  const afterQuickNavHtml = renderToStaticMarkup(
    createElement(QuickNav, {
      now: new Date("2026-08-14T12:00:00+09:00")
    })
  );
  assert.match(afterQuickNavHtml, /href="#schedule"/);
  assert.match(afterQuickNavHtml, /ゆかJET/);
  assert.ok(
    afterQuickNavHtml.indexOf('href="#schedule"') <
      afterQuickNavHtml.indexOf('href="#next"'),
    "終了後のモバイルナビで、出演予定より先に#ゆかJETへ誘導している"
  );

  const snapshotNow = new Date("2026-08-14T12:00:00+09:00");
  const pastEventHtml = renderToStaticMarkup(
    createElement(EventCard, { event: mgjFinalEvent, now: snapshotNow })
  );
  assert.match(pastEventHtml, />終了</);
  assert.doesNotMatch(pastEventHtml, /チケット予約/);
  assert.doesNotMatch(pastEventHtml, />NEXT</);

  const upcomingEventHtml = renderToStaticMarkup(
    createElement(EventCard, {
      event: babySharkOgaki,
      isNext: true,
      now: snapshotNow
    })
  );
  assert.match(upcomingEventHtml, />NEXT</);
  assert.match(upcomingEventHtml, /チケット予約/);
  assert.doesNotMatch(upcomingEventHtml, />終了</);

  assert.equal(
    eventSchemaStatus(mgjFinalEvent, snapshotNow),
    "https://schema.org/EventCompleted"
  );
  assert.equal(
    eventSchemaStatus(babySharkOgaki, snapshotNow),
    "https://schema.org/EventScheduled"
  );

  const ticketFaq = searchFaqs.find((faq) => faq.question === "チケットはどこで買える？");
  const yukajetFaq = searchFaqs.find((faq) => faq.question === "#ゆかJET とは何ですか？");
  assert.equal(ticketFaq?.href, "#schedule");
  assert.match(ticketFaq?.answer ?? "", /受付・視聴を終了しました/);
  assert.match(yukajetFaq?.answer ?? "", /上演され/);
  assert.doesNotMatch(yukajetFaq?.answer ?? "", /上演されます/);
  assert.equal(searchIntents[0]?.href, "#schedule");

  console.log("gojet-status tests OK");
} finally {
  await server.close();
}
