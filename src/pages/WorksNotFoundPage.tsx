import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { Footer } from "../components/Footer";
import { useSchedule } from "../lib/useSchedule";

export function WorksNotFoundPage() {
  const { schedule } = useSchedule();

  useEffect(() => {
    document.title = "作品ページが見つかりません | 吉井優花子 応援ポータル";

    const robotsContent = "noindex, nofollow";
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    let createdRobots = false;
    let previousRobots: string | null = null;

    if (robots) {
      previousRobots = robots.content;
      robots.content = robotsContent;
    } else {
      robots = document.createElement("meta");
      robots.name = "robots";
      robots.content = robotsContent;
      document.head.appendChild(robots);
      createdRobots = true;
    }

    return () => {
      if (!robots) return;
      if (createdRobots) {
        robots.remove();
        return;
      }
      if (previousRobots !== null) {
        robots.content = previousRobots;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-porcelain text-ink">
      <SiteHeader socialLinks={schedule.socialLinks} />
      <main>
        <section className="scroll-mt-24 bg-porcelain py-24">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-3xl text-ink">作品ページが見つかりませんでした</h1>
            <p className="mt-4 leading-8 text-ink/70">
              お探しのページは移動または削除された可能性があります。
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/"
                className="yukako-button yukako-button-gold inline-flex min-h-12 px-5 py-3 text-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                ホームへ戻る
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer
        socialLinks={schedule.socialLinks}
        source={schedule.source}
        updatedAt={schedule.updatedAt}
      />
    </div>
  );
}
