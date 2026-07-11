import { track } from "@vercel/analytics";

export type PortalEventName =
  | "ticket_click"
  | "stream_click"
  | "calendar_add"
  | "sns_click"
  | "x_share";

export const trackPortalEvent = (
  name: PortalEventName,
  properties: Record<string, string> = {},
) => {
  track(name, properties);
};
