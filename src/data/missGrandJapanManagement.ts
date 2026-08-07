// Miss Grand Japan「代表補佐／運営マネジメント」就任｜専用コーナー用データ。
// 出典: 吉井優花子さん本人のInstagram投稿（@yoppy_777）
// https://www.instagram.com/p/DZSK68wgVm4/?igsh=ZDY4YTQ3a2M5bHcz

export type MissGrandJapanManagementImage = {
  src: string;
  alt: string;
};

// Miss Grand Japan のシリーズ企画リール。
// 動画ファイルは自己ホストせず、Instagram標準の埋め込み（blockquote + embed.js）で再生する。
// 新しいリールは reels 配列の先頭に追記する。
export type MissGrandJapanSeriesReel = {
  id: string;
  /** 元投稿の公開日 */
  dateLabel: string;
  title: string;
  /** 映像の内容を一言で（見て分かる事実だけ書く） */
  note?: string;
  /** 共同投稿の代表アカウントと、投稿形態の補足 */
  postedBy?: { handle: string; url: string; note?: string };
  /** 使用楽曲のクレジット表記 */
  bgm?: string;
  hashtags: string[];
  /** リール本体のURL（埋め込みにもリンクにも使う） */
  url: string;
};

export const missGrandJapanSeries = {
  eyebrow: "MISS GRAND JAPAN / SERIES",
  title: "シリーズ企画のリール",
  copy: "ミス・グランド・ジャパンのシリーズ企画から、吉井優花子さんも参加したリール。再生はInstagramの埋め込みプレーヤーで。",
  reels: [
    {
      id: "float-my-boat-challenge-2026-05",
      dateLabel: "2026.5.18",
      title: "#floatmyboat チャレンジ",
      note: "ビル街を望むテラスでのウォーキングチャレンジ。生成りのワンピース姿の吉井優花子さんも。",
      postedBy: {
        handle: "@suke_japan",
        url: "https://www.instagram.com/suke_japan",
        note: "ほか4アカウントとの共同投稿"
      },
      bgm: "Lazy Jay「Float My Boat (Bougenvilla Remix)」",
      hashtags: ["#floatmyboat", "#challenge", "#misstake", "#チャレンジ失敗😂"],
      url: "https://www.instagram.com/reel/DYe2xLHhrwp/"
    }
  ] satisfies MissGrandJapanSeriesReel[]
};

// MISS GRAND JAPAN & MR GAY JAPAN 2026 FINAL の MC 告知。
// 出典: Miss Grand Japan 公式Instagram（@missgrandjapan）
// https://www.instagram.com/p/DbuenU5FKVg/?igsh=bjFvdjA2enZ5czA4
// 開催日程は src/data/events.ts の "miss-grand-japan-2026-final-mc" と揃える。
export const missGrandJapanFinal = {
  eyebrow: "MISS GRAND JAPAN / FINAL",
  badge: "MC",
  title: "MISS GRAND JAPAN & MR GAY JAPAN 2026 FINAL",
  subtitle: "日本語MC 吉井優花子／英語MC RICO",
  facts: [
    { label: "日時", value: "2026年8月10日（月）16:00（日本時間）" },
    { label: "会場", value: "ヒューリックホール東京（東京都千代田区有楽町2-5-1 有楽町マリオン11階）" },
    { label: "配信", value: "@missgrandjapan のYouTubeでライブ配信" }
  ],
  body: [
    "ミス・グランド・ジャパンとミスター・ゲイ・ジャパン、2つの日本代表が決まるファイナル。日本語MCを吉井優花子さん、英語MCをRICOさんが務めます。",
    "優花子さんは2025年大会でMISS PEACE賞を受賞し、2026年度からは代表補佐／運営マネジメント。今回は進行役として本番のステージに立ちます。"
  ],
  // 公式投稿からの引用（原文どおり）
  quote: "2人とともに、日本代表が誕生する特別な瞬間をお届けします👑✨",
  images: [
    {
      src: "/images/miss-grand-japan/yukako-mgj-2026-final-mc-2026-08-10.jpg",
      alt: "黒と金の装飾フレームの中で、片方の肩を出した黒いドレス姿の吉井優花子さんが微笑む告知画像。下部に「MC YUKAKO YOSHII」「MISS GRAND JAPAN & MR GAY JAPAN 2026 FINAL COMPETITION」「AUG 10TH 4.00PM (JAPAN TIME)」「HULIC HALL TOKYO | LIVE STREAMING ON @MISSGRANDJAPAN」の文字",
      caption: "日本語MC 吉井優花子さん"
    },
    {
      src: "/images/miss-grand-japan/yukako-mgj-2026-final-ticket-2026-08-10.jpg",
      alt: "黒と金の背景に「TICKET」の見出しと大きなQRコードが置かれた告知画像。下部に「MISS GRAND JAPAN & MR GAY JAPAN 2026 FINAL COMPETITION」「AUG 10TH 4.00PM (JAPAN TIME)」「HULIC HALL TOKYO | LIVE STREAMING ON @MISSGRANDJAPAN」の文字",
      caption: "チケット案内（QRコード）"
    }
  ],
  // 開演時刻（ISO8601・JST）。これを過ぎたらチケット導線を閉じる。
  startsAt: "2026-08-10T16:00:00+09:00",
  // 上のTICKET画像のQRコードを読み取った先。スキャンしなくても飛べるように文字でも出す。
  ticketUrl: "https://forms.gle/zftxsTkwg8G7jT7G6",
  ticketNote: "リンク先は公式TICKET画像のQRコードと同じ申し込みフォームです。",
  // 開演後に出す案内。申し込みボタンは出さない。
  endedNote: "この日の公演は終了しています。",
  postUrl: "https://www.instagram.com/p/DbuenU5FKVg/?igsh=bjFvdjA2enZ5czA4",
  ctaLabel: "MC発表の投稿を見る"
};

export const missGrandJapanManagement = {
  // 投稿日（=就任日ではなく、就任を発表した日として扱う）
  dateLabel: "2026.6.7",
  eyebrow: "MISS GRAND JAPAN / MANAGEMENT",
  title: "挑戦する人と大会を支える、新たな役割",
  subtitle: "Miss Grand Japan 代表補佐／運営マネジメント",
  badge: "在任中",
  body: [
    "2026年度より、吉井優花子さんはミス・グランド・ジャパンの「代表補佐／運営マネジメント」を務めています。",
    "大会運営全体のマネジメントと体制強化を担い、参加者それぞれの挑戦や目標に寄り添いながら、大会のさらなるレベルアップを支えていく役割です。",
    "俳優・タレント・モデルとして表現するだけでなく、舞台のプロデュースや大会運営など、人と組織を支える分野にも活動を広げています。"
  ],
  quote: ["一人ひとりの挑戦に寄り添いながら、", "大会のさらなるレベルアップに尽力いたします。"],
  images: {
    main: {
      src: "/images/miss-grand-japan/yukako-miss-grand-japan-management-2026-01.jpg",
      alt: "白い衣装を着た吉井優花子さんの宣材写真。ミス・グランド・ジャパン代表補佐／運営マネジメント就任発表"
    } satisfies MissGrandJapanManagementImage,
    sub: {
      src: "/images/miss-grand-japan/yukako-miss-grand-japan-management-2026-02.jpg",
      alt: "吉井優花子さんのクローズアップ宣材写真"
    } satisfies MissGrandJapanManagementImage
  },
  photoCredit: "@thestudio.japan",
  postUrl: "https://www.instagram.com/p/DZSK68wgVm4/?igsh=ZDY4YTQ3a2M5bHcz",
  ctaLabel: "Instagramで元の投稿を見る"
};
