import type { EventCategory, ScheduleEvent, SocialLink } from "../types";

export type ScheduleApiEvent = {
  id: string;
  visible?: boolean;
  status?: "upcoming" | "past";
  important?: boolean;
  category?: EventCategory | "special";
  title: string;
  shortTitle?: string;
  startAt: string;
  endAt?: string;
  displayDate?: string;
  venue?: string;
  location?: string;
  summary?: string;
  description?: string;
  badges?: string[];
  image?: string;
  ticketUrl?: string;
  streamingUrl?: string;
  detailUrl?: string;
  snsUrl?: string;
  updatedAt?: string;
};

export type ScheduleApiLink = {
  label: string;
  type?: string;
  handle?: string;
  url: string;
  description?: string;
  kind?: SocialLink["kind"];
};

export type ScheduleApiResponse = {
  siteName?: string;
  label?: string;
  updatedAt?: string;
  events?: ScheduleApiEvent[];
  links?: ScheduleApiLink[];
  profile?: Record<string, string>;
};

export type ScheduleData = {
  events: ScheduleEvent[];
  socialLinks: SocialLink[];
  mediaLinks: SocialLink[];
  updatedAt?: string;
  source: "fallback" | "cache" | "sheets";
};
