// 配信予定（手入力。フレキャン公式と同じく「登録した予定を並べる」方式）
// ・SHOWROOM等で配信予定が決まったら、ここに追記/編集するだけで反映されます。
// ・過去になった予定は自動で非表示になります（開始から約3時間で消えます）。
// ・日付はJST。time は24時間表記。
export type StreamSlot = {
  date: string; // "2026-06-17"（JSTの日付）
  time: string; // "21:30"
  note?: string; // 任意（例:「特別配信」）
};

export const streamSchedule: StreamSlot[] = [
  { date: "2026-06-17", time: "21:30" },
  { date: "2026-06-18", time: "22:45" },
  { date: "2026-06-19", time: "21:30" }
];
