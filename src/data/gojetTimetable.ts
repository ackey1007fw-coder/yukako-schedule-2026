export type GojetPerformance = {
  time: string;
  team: string;
  /** 吉井優花子さんが出演する回だけ、役柄を表示する */
  yukakoRole?: string;
  /** 上演時間（分）。カーテンコール等を含めた目安。ステータス判定に使用する */
  durationMinutes: number;
};

// 上演時間の目安（分）。公式から「1時間20分」→「1時間40分」（カーテンコール込み）へ
// 変更が案内されたことを反映。将来の変更に備え、公演ごとに個別設定できるようにしている。
const DEFAULT_PERFORMANCE_DURATION_MINUTES = 100;

export type GojetTimetableDay = {
  /** YYYY-MM-DD（JST） */
  date: string;
  label: string;
  performances: GojetPerformance[];
  note?: string;
};

export const gojetTicketUrl = "https://premiumgoyukajet.hp.peraichi.com";
export const gojetInPersonTicketUrl =
  "https://torioki.confetti-web.com/form/4827";
export const gojetStreamingTicketUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform";

export const gojetOpeningDate = "2026-07-23";
export const gojetClosingDate = "2026-07-27";
export const gojetArchiveStartDate = "2026-07-28";
export const gojetArchiveEndDate = "2026-08-06";

// タイムテーブル（yukako-gojet-poster.jpg の記載どおり）
export const gojetTimetable: GojetTimetableDay[] = [
  {
    date: "2026-07-23",
    label: "7/23（木）",
    performances: [
      {
        time: "15:30",
        team: "A班",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      },
      {
        time: "19:00",
        team: "B班",
        yukakoRole: "JET役",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      }
    ]
  },
  {
    date: "2026-07-24",
    label: "7/24（金）",
    performances: [
      {
        time: "12:00",
        team: "C班",
        yukakoRole: "早紀役",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      },
      {
        time: "15:30",
        team: "B班",
        yukakoRole: "JET役",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      },
      {
        time: "19:00",
        team: "A班",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      }
    ]
  },
  {
    date: "2026-07-25",
    label: "7/25（土）",
    performances: [
      {
        time: "12:00",
        team: "B班",
        yukakoRole: "JET役",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      },
      {
        time: "15:30",
        team: "A班",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      },
      {
        time: "19:00",
        team: "C班",
        yukakoRole: "早紀役",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      }
    ],
    note: "25日のみ、A班あかね役は葉山椎菜さんが務めます。"
  },
  {
    date: "2026-07-26",
    label: "7/26（日）",
    performances: [
      {
        time: "12:00",
        team: "C班",
        yukakoRole: "早紀役",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      },
      {
        time: "15:30",
        team: "A班",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      },
      {
        time: "19:00",
        team: "B班",
        yukakoRole: "JET役",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      }
    ]
  },
  {
    date: "2026-07-27",
    label: "7/27（月）",
    performances: [
      {
        time: "18:00",
        team: "C班",
        yukakoRole: "早紀役",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      },
      {
        time: "20:00",
        team: "全班合同LIVE",
        yukakoRole: "LIVE出演",
        durationMinutes: DEFAULT_PERFORMANCE_DURATION_MINUTES
      }
    ]
  }
];
