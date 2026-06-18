import { Gift, Heart, PartyPopper, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { getBirthdayCountdown } from "../lib/date";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

const birthYear = Number(profile.birthday.slice(0, 4));

type Spark = { id: number; left: number; delay: number; heart: boolean };

export function BirthdayCountdown() {
  const [countdown, setCountdown] = useState(() =>
    getBirthdayCountdown(profile.birthdayMonthDay, new Date(), birthYear),
  );
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(
        getBirthdayCountdown(profile.birthdayMonthDay, new Date(), birthYear),
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const celebrate = () => {
    const base = Date.now();
    const items: Spark[] = Array.from({ length: 8 }, (_, i) => ({
      id: base + i,
      left: 6 + Math.random() * 88,
      delay: Math.random() * 140,
      heart: i % 2 === 0
    }));
    setSparks((prev) => [...prev, ...items]);
    window.setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !items.some((it) => it.id === s.id)));
    }, 1700);
  };

  const ageLabel =
    countdown.turningAge === undefined
      ? ""
      : countdown.turningAge === 20
        ? "20歳（ハタチ）"
        : `${countdown.turningAge}歳`;

  const values = [
    { label: "日", value: countdown.days },
    { label: "時間", value: countdown.hours },
    { label: "分", value: countdown.minutes },
    { label: "秒", value: countdown.seconds }
  ];

  return (
    <section id="birthday" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div>
          <SectionHeader
            kicker="Birthday Countdown"
            title="お誕生日までのカウントダウン"
            copy={`${profile.birthdayLabel}${
              ageLabel ? `・${ageLabel}の記念日` : ""
            }まで、あと少し。SNSやSHOWROOMで一緒にお祝いしよう。`}
          />
          <div className="relative border border-champagne/40 bg-white p-5 shadow-paper sm:p-6">
            {/* お祝いのキラキラ（絶対配置・クリック不可なのでレイアウトに影響しない） */}
            <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
              {sparks.map((spark) => (
                <span
                  key={spark.id}
                  className="absolute bottom-16"
                  style={{
                    left: `${spark.left}%`,
                    animation: `riri-celebrate 1.5s ease-out ${spark.delay}ms forwards`
                  }}
                >
                  {spark.heart ? (
                    <Heart className="h-5 w-5 fill-rosefog text-rosefog" aria-hidden="true" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-champagne" aria-hidden="true" />
                  )}
                </span>
              ))}
            </div>

            <div className="mb-5 flex items-center gap-3 text-champagne">
              <Gift className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-bold">
                {countdown.targetLabel}
                {ageLabel ? `・${ageLabel}` : ""}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {values.map((item) => (
                <div key={item.label} className="border border-rosefog/25 bg-porcelain p-4 text-center">
                  <span
                    key={item.value}
                    className="block font-display text-4xl text-ink sm:text-5xl"
                    style={{ animation: "riri-pop 500ms ease" }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <div className="mt-2 text-xs font-bold text-ink/55">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm font-bold text-ink/70">
                <Heart className="h-4 w-4 text-rosefog" aria-hidden="true" />
                {countdown.isBirthdayToday
                  ? "今日はお祝い当日です。"
                  : "一緒にお祝いの準備を進めよう。"}
              </p>
              <button
                type="button"
                onClick={celebrate}
                className="inline-flex min-h-10 items-center gap-2 border border-champagne/60 bg-white px-4 py-2 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-champagne hover:shadow-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                aria-label="お祝いのキラキラを贈る"
              >
                <PartyPopper className="h-4 w-4 text-champagne" aria-hidden="true" />
                おめでとうを贈る
              </button>
            </div>
          </div>
        </div>

        <div className="columns-2 gap-3 lg:pt-16 [&>img]:mb-3 [&>img]:break-inside-avoid">
          {profile.gallery.map((src, index) => (
            <img
              key={src}
              {...getResponsiveImageProps(
                src,
                "(min-width: 1024px) 25vw, 50vw",
              )}
              alt={`${profile.name} gallery ${index + 1}`}
              loading="lazy"
              className="h-auto w-full border border-white shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
