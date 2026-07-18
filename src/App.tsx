import { Analytics } from "@vercel/analytics/react";
import { ActionStrip } from "./components/ActionStrip";
import { AkitaRootsSection } from "./components/AkitaRootsSection";
import { Footer } from "./components/Footer";
import { GojetHairUpdateSection } from "./components/GojetHairUpdateSection";
import { GojetPerformancePanel } from "./components/GojetPerformancePanel";
import { GojetTeamsSection } from "./components/GojetTeamsSection";
import { GojetYellCardSection } from "./components/GojetYellCardSection";
import { Hero } from "./components/Hero";
import { HighlightsSection } from "./components/HighlightsSection";
import { LatestInstagramSection } from "./components/LatestInstagramSection";
import { LatestUpdatesSection } from "./components/LatestUpdatesSection";
import { LinksSection } from "./components/LinksSection";
import { NowProducingSection } from "./components/NowProducingSection";
import { PhotoGallerySection } from "./components/PhotoGallerySection";
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
import {
  getMonthKeysFromEvents,
  isEventPast,
  sortEventsAsc,
  sortEventsDesc
} from "./lib/date";
import { useSchedule } from "./lib/useSchedule";

function App() {
  const { schedule, isLoading } = useSchedule();
  const { events, socialLinks, mediaLinks, source, updatedAt } = schedule;
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
        <GojetPerformancePanel />
        <Hero nextEvent={nextEvent} socialLinks={socialLinks} />
        <TodayNextPanel todayEvents={todayEvents} nextEvent={nextEvent} />
        <SectionReveal>
          <LatestUpdatesSection />
        </SectionReveal>
        <SectionReveal>
          <NowProducingSection event={gojetEvent ?? nextEvent} />
        </SectionReveal>
        <SectionReveal>
          <GojetTeamsSection />
        </SectionReveal>
        <SectionReveal>
          <GojetYellCardSection />
        </SectionReveal>
        <SectionReveal>
          <GojetHairUpdateSection />
        </SectionReveal>
        <SectionReveal>
          <ScheduleSection
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            allEvents={events}
            monthKeys={monthKeys}
          />
        </SectionReveal>
        <SectionReveal>
          <LatestInstagramSection />
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
        <SectionReveal>
          <SupportersSection />
        </SectionReveal>
        <SectionReveal>
          <HighlightsSection />
        </SectionReveal>
        <SectionReveal>
          <OjosamaBandSection />
        </SectionReveal>
        <SectionReveal>
          <RyomaKunSection />
        </SectionReveal>
        <SectionReveal>
          <ProfileSection />
        </SectionReveal>
        <SectionReveal>
          <AkitaRootsSection />
        </SectionReveal>
        <SectionReveal>
          <PhotoGallerySection />
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
      <Analytics />
    </div>
  );
}

export default App;
