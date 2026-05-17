import {
  CalendarHeart,
  Clapperboard,
  Mic2,
  MonitorPlay,
  PartyPopper,
  Sparkles,
  Star
} from "lucide-react";
import type { EventCategory } from "../types";

export const categoryMeta: Record<
  EventCategory,
  {
    label: string;
    tone: string;
    dot: string;
    Icon: typeof CalendarHeart;
  }
> = {
  stage: {
    label: "舞台",
    tone: "border-champagne/40 bg-[#fff7e4] text-[#805a1f]",
    dot: "bg-champagne",
    Icon: Clapperboard
  },
  radio: {
    label: "ラジオ",
    tone: "border-rosefog/40 bg-[#fff1f6] text-[#8d4260]",
    dot: "bg-rosefog",
    Icon: Mic2
  },
  tv: {
    label: "テレビ",
    tone: "border-lilac/40 bg-[#f4f0ff] text-[#6653a9]",
    dot: "bg-lilac",
    Icon: MonitorPlay
  },
  event: {
    label: "イベント",
    tone: "border-moss/30 bg-[#f2f7ef] text-moss",
    dot: "bg-moss",
    Icon: PartyPopper
  },
  web: {
    label: "WEB",
    tone: "border-[#a3c8d5]/40 bg-[#eef8fb] text-[#4f7380]",
    dot: "bg-[#7fb4c4]",
    Icon: Sparkles
  },
  birthday: {
    label: "特別",
    tone: "border-champagne/50 bg-[#fff3d5] text-[#735118]",
    dot: "bg-champagne",
    Icon: Star
  }
};
