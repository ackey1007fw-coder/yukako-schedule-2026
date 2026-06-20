import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { profile } from "../data/profile";

// 配信中だけ、ページ最上部に「配信中！」バナーを自動表示。
// 定期的に /api/showroom を確認し、配信開始で自動表示・終了で自動的に消える。
const POLL_MS = 60000;

export function LiveBanner() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;
    const check = () => {
      fetch("/api/showroom")
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { isLive?: boolean } | null) => {
          if (active && data) setIsLive(Boolean(data.isLive));
        })
        .catch(() => {
          /* 取得失敗時は何もしない（バナー非表示のまま） */
        });
    };
    check();
    const timer = window.setInterval(check, POLL_MS);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (!isLive) return null;

  return (
    <a
      href={profile.showroom.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#e0245e] text-white transition hover:bg-[#c81f52]"
      aria-label="SHOWROOMで配信中。いますぐ見る"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-sm font-black tracking-wide sm:px-6 lg:px-8">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" aria-hidden="true" />
        <Radio className="h-4 w-4" aria-hidden="true" />
        ただいまSHOWROOMで配信中！
        <span className="underline underline-offset-4">いますぐ見る →</span>
      </div>
    </a>
  );
}
