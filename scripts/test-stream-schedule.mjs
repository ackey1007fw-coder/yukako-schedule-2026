import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const server = await createServer({appType:'custom', server:{middlewareMode:true}});
try {
  const {streamSchedule} = await server.ssrLoadModule('/src/data/streamSchedule.ts');
  const {TodayNextPanel} = await server.ssrLoadModule('/src/components/TodayNextPanel.tsx');
  const {PriorityBanner} = await server.ssrLoadModule('/src/components/PriorityBanner.tsx');
  const slot = streamSchedule.filter(s=>s.date==='2026-10-31');
  assert.equal(slot.length,1);
  assert.equal(slot[0].time,'21:30');
  const now = new Date('2026-10-31T12:00:00+09:00');
  const today = renderToStaticMarkup(createElement(TodayNextPanel,{todayEvents:[],now}));
  assert.match(today,/SHOWROOM配信/);
  assert.match(today,/21:30/);
  assert.doesNotMatch(today,/今日は予定なし/);
  assert.match(today,/room_id=347571/);
  const tomorrow = renderToStaticMarkup(createElement(TodayNextPanel,{todayEvents:[],now:new Date('2026-11-01T12:00:00+09:00')}));
  assert.doesNotMatch(tomorrow,/21:30/);
  assert.match(tomorrow,/今日は予定なし/);
  const banner = renderToStaticMarkup(createElement(PriorityBanner,{now}));
  assert.match(banner,/21:30/);
  assert.doesNotMatch(today,/ハロウィン|終了時刻/);
  console.log('Stream schedule tests passed: unique date/time, today card, room link, next-day expiry, banner.');
} finally { await server.close(); }
