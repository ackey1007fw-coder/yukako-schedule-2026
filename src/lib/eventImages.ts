import type { EventCategory } from "../types";

const driveImage = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

const eventImageById: Record<string, string> = {
  "yofukashi-campus-2026-05-09": driveImage("1A8rODe-N__YMWSjNEL5hNeT0U5gaT7Ka"),
  "theoridea-2026-05-14": driveImage("1AzWL5zxhUWd2l4_Clk6SfR-eNsjwuRmg"),
  "aitoki-2026-05-29": driveImage("1hPMNv9kiFKfBKgp7CLfjv7zJBtTOKCx_"),
  "birthday-2026-06-24": driveImage("1rUFypXYABEcyRUaxhie6o_jaNBTAWR16"),
  "fukurow-fm-2026-04-21": driveImage("1uaNFIH1HkefOjn06tXwSJZvq8eIGjLBA"),
  "tvk-nekohita-2026-04-16": driveImage("1R8gptDr0DxZ71Ncuw8koDmgKo-lDjoYi"),
  "imacampus-2026-04-12": driveImage("1FM8cYikXk6Z2TtAoHCpBkq_XOT_AmqbS"),
  "steenz-2026-04-08": driveImage("1Amj4Ddj1QaQpv2IXO9qw2vHwS0wMXwGv"),
  "kyanly-2026-03-14": driveImage("1D9t__MTdyoBzSHyK9-gxTWetikuHYnZ7")
};

const eventImageByCategory: Record<EventCategory, string> = {
  stage: driveImage("1hPMNv9kiFKfBKgp7CLfjv7zJBtTOKCx_"),
  radio: driveImage("1A8rODe-N__YMWSjNEL5hNeT0U5gaT7Ka"),
  tv: driveImage("1R8gptDr0DxZ71Ncuw8koDmgKo-lDjoYi"),
  event: driveImage("1D9t__MTdyoBzSHyK9-gxTWetikuHYnZ7"),
  web: driveImage("1Amj4Ddj1QaQpv2IXO9qw2vHwS0wMXwGv"),
  birthday: driveImage("1rUFypXYABEcyRUaxhie6o_jaNBTAWR16")
};

export function resolveEventImage(
  eventId: string,
  image: string | undefined,
  category: EventCategory
) {
  if (eventImageById[eventId]) return eventImageById[eventId];
  if (image && !image.startsWith("/images/event-") && image !== "/images/event-placeholder.jpg") {
    return image;
  }

  return eventImageByCategory[category];
}
