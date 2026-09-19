import type { PublishedStreamRecap } from "./streamRecaps";

export const streamRecap20260918Radio: PublishedStreamRecap = {
  id: "2026-09-18-evening-radio",
  date: "2026-09-18",
  title: "移動の合間に、電話みたいなラジオ配信",
  summary: "移動の合間に、声だけでつながった夕方のひと枠。電話のようなやり取りから、温泉ロケの思い出、飲み物や食べたいものの話まで。",
  platform: "SHOWROOM",
  status: "published",
  mode: "radio",
  recording: { startedAt: "2026-09-18T18:41:12+09:00", durationSeconds: 1179.501, segmentCount: 2 },
  image: {
    src: "/images/stream-recaps/yukako-2026-09-18-radio.jpg",
    width: 640,
    height: 360,
    alt: "9月18日の優花子さんのラジオ配信で使われた静止画。黄色いベイビーシャークと、赤い大きなハサミ付き衣装の人物",
    caption: "この回で使われていた配信画像。ラジオ配信のため、代表の1枚をそのまま掲載しています。",
    downloadName: "yukako-2026-09-18-radio.jpg",
  },
  sourceLabel: "2026年9月18日 SHOWROOMラジオ配信（18:41頃・18:50頃から記録した2区間）",
  verifiedAt: "2026-09-19",
  verificationNote: "保存されていた2本の全音声を自動文字起こしして内容を確認しました。聞き取りにくい箇所は掲載していません。配信全体の完全な記録や、全編の手動聴取ではありません。",
  timestampNote: "時刻は保存された2本を順につないだ目安。1本目の先頭が0:00:00、2本目は0:08:28頃からです。録画の空きや欠落は含まず、実際の配信の経過時間とは異なります。",
  highlights: [
    {
      timestamp: "0:03:34",
      title: "電話みたいなおしゃべり",
      body: "声が届いているかを確かめながら、コメントにお返事。もしもし、と呼びかけるやり取りから、電話をしているみたいという話になりました。",
    },
    {
      timestamp: "0:10:30",
      title: "遅くなる前に、少しだけ",
      body: "移動のあとでは遅い時間になるから、その前に少し配信を。音声が戻ったことを確かめつつ、来てくれたみんなへのあいさつが続きます。",
    },
    {
      timestamp: "0:12:03",
      title: "温泉ロケの思い出へ",
      body: "以前の温泉ロケを振り返るおしゃべり。海に入った撮影の話も出て、短い配信の中で過去のお仕事の思い出に寄り道。",
    },
    {
      timestamp: "0:13:31",
      title: "飲み物と、食べたいものの話",
      body: "フラペチーノを飲みながら、おにぎりやお好み焼きの話へ。食べたいもののお店はもう調べてある、という準備のひとこまも。",
    },
  ],
  timeline: [
    { timestamp: "0:01:49", label: "音声を確かめながら、ごあいさつ" },
    { timestamp: "0:03:34", label: "電話みたい、というやり取り" },
    { timestamp: "0:08:29", label: "2本目の記録。音声の戻りを確認" },
    { timestamp: "0:10:30", label: "移動が長くなる前の配信" },
    { timestamp: "0:12:03", label: "以前の温泉ロケの思い出" },
    { timestamp: "0:13:31", label: "飲み物と、食べたいもののおしゃべり" },
    { timestamp: "0:15:25", label: "お店はもう調べてある、という話" },
  ],
};
