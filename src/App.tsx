import { useEffect } from "react";
import { ArrowDownRight } from "lucide-react";
import { ActionStrip } from "./components/ActionStrip";
import { AkitaRootsSection } from "./components/AkitaRootsSection";
import { AudienceReportSection } from "./components/AudienceReportSection";
import { Footer } from "./components/Footer";
import { GojetCastMessageSection } from "./components/GojetCastMessageSection";
import { GojetCastVoiceSection } from "./components/GojetCastVoiceSection";
import { GojetHairUpdateSection } from "./components/GojetHairUpdateSection";
import { GojetPerformancePanel } from "./components/GojetPerformancePanel";
import { GojetTeamsSection } from "./components/GojetTeamsSection";
import { GojetTopicsBand } from "./components/GojetTopicsBand";
import { GojetYellCardSection } from "./components/GojetYellCardSection";
import { Hero } from "./components/Hero";
import { HighlightsSection } from "./components/HighlightsSection";
import { KakunodateTourSection } from "./components/KakunodateTourSection";
import { LatestInstagramSection } from "./components/LatestInstagramSection";
import { LatestUpdatesSection } from "./components/LatestUpdatesSection";
import { LinksSection } from "./components/LinksSection";
import { MissGrandJapanManagementSection } from "./components/MissGrandJapanManagementSection";
import { NowProducingSection } from "./components/NowProducingSection";
import { OmagariHanabiSection } from "./components/OmagariHanabiSection";
import { PhotoGallerySection } from "./components/PhotoGallerySection";
import { BabySharkLiveSection } from "./components/BabySharkLiveSection";
import { OjosamaBandSection } from "./components/OjosamaBandSection";
import { PriorityBanner } from "./components/PriorityBanner";
import { RyomaKunSection } from "./components/RyomaKunSection";
import { QuickNav } from "./components/QuickNav";
import { ScrollToTop } from "./components/ScrollToTop";
import { SectionReveal } from "./components/SectionReveal";
import { ProfileSection } from "./components/ProfileSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { SearchSeoSection } from "./components/SearchSeoSection";
import { ShareSection } from "./components/ShareSection";
import { ShowroomSection } from "./components/ShowroomSection";
import { SiteHeader } from "./components/SiteHeader";
import { SupportersSection } from "./components/SupportersSection";
import { StructuredData } from "./components/StructuredData";
import { TodayNextPanel } from "./components/TodayNextPanel";
import { WorkCreditsSection } from "./components/WorkCreditsSection";
import {
  getMonthKeysFromEvents,
  isEventPast,
  sortEventsAsc,
  sortEventsDesc
} from "./lib/date";
import { scrollToSection } from "./lib/scrollToSection";
import { useSchedule } from "./lib/useSchedule";

function App() {
  const { schedule, isLoading } = useSchedule();
  const { events, socialLinks, mediaLinks, source, updatedAt } = schedule;

  // /archive などから "/#highlights" の形で戻ってきたとき、セクションはReactの描画後に
  // 現れるためブラウザ標準のフラグメントスクロールが効かない。描画後とスケジュール読込完了後に
  // 同じ対象へ移動し、読込表示の高さが変わっても着地点を保つ。
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !document.getElementById(id)) return;

    let stopped = false;
    let frameId = 0;
    const alignTarget = () => {
      if (stopped) return;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() =>
        scrollToSection(id, { behavior: "auto" }),
      );
    };
    const stopFollowingLayout = () => {
      stopped = true;
      resizeObserver.disconnect();
    };

    // 画像やAPIデータでページ上部の高さが変わる間だけ、同じ見出しへ再調整する。
    // ユーザーが操作を始めた後はスクロール位置を奪わない。
    const resizeObserver = new ResizeObserver(alignTarget);
    resizeObserver.observe(document.body);
    alignTarget();
    window.addEventListener("wheel", stopFollowingLayout, { passive: true, once: true });
    window.addEventListener("touchstart", stopFollowingLayout, { passive: true, once: true });
    const timeoutId = window.setTimeout(stopFollowingLayout, 2500);

    return () => {
      stopped = true;
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener("wheel", stopFollowingLayout);
      window.removeEventListener("touchstart", stopFollowingLayout);
    };
  }, [isLoading]);
  const now = new Date();
  const upcomingEvents = sortEventsAsc(
    events.filter((event) => !isEventPast(event, now)),
  );
  const pastEvents = sortEventsDesc(
    events.filter((event) => isEventPast(event, now)),
  );
  const nextEvent = upcomingEvents[0];
  const todayKey = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const todayEvents = upcomingEvents.filter((event) => (event.dates?.length ? event.dates : [event.startAt.slice(0, 10), (event.endAt ?? event.startAt).slice(0, 10)]).includes(todayKey));
  const gojetEvent = events.find((event) => event.id === "yukajet-gojet-2026-07");
  const monthKeys = getMonthKeysFromEvents(events);

  return (
    <div className="min-h-screen bg-porcelain text-ink">
      <SiteHeader socialLinks={socialLinks} />
      <PriorityBanner />
      <QuickNav />
      <main>
        {isLoading && (
          <div className="bg-ink px-4 py-2 text-center text-xs font-bold text-white">
            スケジュールを読み込み中です
          </div>
        )}

        {/* 1. 入口：今日・次の予定・最新情報を最短で確認する */}
        <GojetPerformancePanel />
        <Hero nextEvent={nextEvent} socialLinks={socialLinks} />
        <TodayNextPanel todayEvents={todayEvents} nextEvent={nextEvent} />
        <nav aria-label="目的別ナビゲーション" className="bg-porcelain px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-3">
            {[
              {
                href: "#profile",
                title: "初めての方へ",
                copy: "プロフィールと、これまでの歩み。",
                cta: "プロフィールへ"
              },
              {
                href: "#updates",
                title: "最新情報",
                copy: "SNS投稿とお知らせ。新しい順。",
                cta: "最新情報へ"
              },
              {
                href: "#schedule",
                title: "出演予定",
                copy: "直近の出演と、終了した公演の記録。",
                cta: "スケジュールへ"
              }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="yukako-card yukako-card-interactive flex min-h-32 min-w-0 flex-col border-rosefog/25 bg-white p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              >
                <span className="font-display text-xl text-ink">{item.title}</span>
                <span className="mt-2 text-sm leading-6 text-ink/70">{item.copy}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-bold text-champagneInk">
                  {item.cta}
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </nav>
        <SectionReveal>
          <LatestUpdatesSection />
        </SectionReveal>
        <SectionReveal>
          <KakunodateTourSection />
        </SectionReveal>
        <SectionReveal>
          <OmagariHanabiSection />
        </SectionReveal>

        {/* 2. これからの出演：予定を確認してから応援へ */}
        <SectionReveal>
          <ScheduleSection
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            allEvents={events}
            monthKeys={monthKeys}
          />
        </SectionReveal>
        <ActionStrip
          nextEvent={nextEvent}
          upcomingEvents={upcomingEvents}
          socialLinks={socialLinks}
        />
        {source !== "sheets" && (
          <p className="bg-porcelain px-4 pb-4 text-center text-xs font-semibold text-ink/55" role="status">
            {source === "cache" ? "保存済みの予定を表示し、最新情報を確認しています。" : "現在は内蔵の予備データを表示しています。最新情報は各詳細リンクでもご確認ください。"}
          </p>
        )}

        {/* 3. 代表プロジェクトの記録：#ゆかJET（公演・配信とも終了） */}
        <SectionReveal>
          <NowProducingSection event={gojetEvent ?? nextEvent} />
        </SectionReveal>
        <SectionReveal>
          <GojetTeamsSection />
        </SectionReveal>
        <GojetTopicsBand>
          <SectionReveal>
            <GojetCastMessageSection />
          </SectionReveal>
          <SectionReveal>
            <GojetCastVoiceSection />
          </SectionReveal>
          <SectionReveal>
            <GojetHairUpdateSection />
          </SectionReveal>
          <SectionReveal>
            <GojetYellCardSection />
          </SectionReveal>
          <SectionReveal>
            <AudienceReportSection />
          </SectionReveal>
        </GojetTopicsBand>
        <SectionReveal>
          <SupportersSection />
        </SectionReveal>
        <SectionReveal>
          <LatestInstagramSection />
        </SectionReveal>
        <SectionReveal>
          <WorkCreditsSection />
        </SectionReveal>

        {/* 4. アーカイブ：これまでの歩みと代表出演作品 */}
        <SectionReveal>
          <HighlightsSection />
        </SectionReveal>
        <SectionReveal>
          <BabySharkLiveSection />
        </SectionReveal>
        <SectionReveal>
          <OjosamaBandSection />
        </SectionReveal>
        <SectionReveal>
          <RyomaKunSection />
        </SectionReveal>

        {/* 5. 人物像・恒常情報 */}
        <SectionReveal>
          <ProfileSection />
        </SectionReveal>
        <SectionReveal>
          <AkitaRootsSection />
        </SectionReveal>
        <SectionReveal>
          <PhotoGallerySection />
        </SectionReveal>
        <SectionReveal>
          <MissGrandJapanManagementSection />
        </SectionReveal>
        <SearchSeoSection />
        <SectionReveal>
          <ShowroomSection />
        </SectionReveal>
        <SectionReveal>
          <LinksSection socialLinks={socialLinks} mediaLinks={mediaLinks} />
        </SectionReveal>
        <SectionReveal>
          <ShareSection />
        </SectionReveal>
      </main>
      <Footer
        socialLinks={socialLinks}
        source={source}
        updatedAt={updatedAt}
      />
      <ScrollToTop />
      <StructuredData events={events} />
    </div>
  );
}

export default App;
