export type StreamSlot = {
  date: string;
  time: string;
  note?: string;
};

// Source: https://www.showroom-live.com/room/profile?room_id=347571
// Public profile checked 2026-10-31 11:59 JST: 「ライブ : 10/31 21:30〜」.
// End time and stream content are not confirmed.
export const streamSchedule: StreamSlot[] = [
  { date: "2026-10-31", time: "21:30", note: "SHOWROOM" }
];

export type SpecialStream = {
  date: string;
  time: string;
  title: string;
  note: string;
};

export const specialStream: SpecialStream | null = null;
