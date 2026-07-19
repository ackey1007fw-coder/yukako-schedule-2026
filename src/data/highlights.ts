export type Highlight = {
  id: string;
  year: string;
  date: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  images?: { src: string; alt: string }[];
  link?: { label: string; url: string };
  links?: { label: string; url: string }[];
  /** 受賞などを示す短いバッジ（例: "MISS PEACE賞"） */
  badge?: string;
};

export const highlights: Highlight[] = [
  {
    id: "yukajet-gojet-vol1-2026-07",
    year: "2026",
    date: "2026年7月",
    category: "舞台",
    title: "#ゆかJET『GO,JET!GO!GO! vol.1 Premium 〜 I LOVE YOU が言えなくて 〜』",
    description:
      "吉井優花子プロデュース公演の第1弾。A/B/C班構成で、2026年7月23日〜27日にAir studio 両国にて上演。",
    links: [
      { label: "舞台情報解禁（X）", url: "https://x.com/yukako_produce/status/2070122985265197380" },
      { label: "全キャスト・物販情報（X）", url: "https://x.com/yukako_produce/status/2070830869070377393" }
    ]
  },
  {
    id: "ojosama-band-2026-05",
    year: "2026",
    date: "2026年5月",
    category: "舞台",
    title: "劇団ココア『お嬢様はバンドがやりたい ♪♪♪』",
    description:
      "2026年5月20日〜24日、シアターグリーン Big Tree Theaterにて上演。A班・黒白院雲雀役として出演し、主人公すずめを支える母の深い愛を、歌・感情芝居・コミカルな芝居で表現しました。",
    image: "/images/ojosama-band-2026/yukako-ojosama-band-2026-01.jpg"
  },
  {
    id: "ryoma-kun-2026-04",
    year: "2026",
    date: "2026年4月",
    category: "舞台",
    title: "『かわええのう、龍馬くん』",
    description:
      "2026年4月7日〜12日、A-root赤坂にて上演。B班で坂本龍馬役、C班でおりょう役の二役を演じ、アソシエイトプロデューサーも務めました。",
    images: [
      {
        src: "/images/ryoma-kun-2026/yukako-ryoma-kun-2026-main-visual.jpg",
        alt: "舞台『かわええのう、龍馬くん』メインビジュアル"
      },
      {
        src: "/images/ryoma-kun-2026/yukako-ryoma-kun-2026-cast-schedule.jpg",
        alt: "舞台『かわええのう、龍馬くん』あらすじ・出演者・公演日程"
      }
    ]
  },
  {
    id: "littlebraver-tasogare-2025-12",
    year: "2025",
    date: "2025年12月",
    category: "舞台",
    title: "演劇ユニットリトルブレイバー Vol.30『黄昏歌のカルーセル』",
    description:
      "2025年12月17日〜21日、荻窪小劇場にて上演。花チームに参加。"
  },
  {
    id: "babyshark-live-2024",
    year: "2024",
    date: "2024年〜",
    category: "舞台",
    title: "BABY SHARK LIVE! -The Hidden Treasure- 全国公演",
    description:
      "ヤドカリのヘッティー、海賊のパールとして出演してきた全国公演のファミリーミュージカル。作品は現在も公演継続中。優花子さんの出演日は告知確認後に更新。",
    image: "/images/baby-shark/baby-shark-pearl.jpg",
    link: { label: "出演の記録を見る", url: "/works/baby-shark-live" }
  },
  {
    id: "mgj-2025-miss-peace",
    year: "2025",
    date: "2025年9月",
    category: "受賞",
    title: "MISS GRAND JAPAN 2025 MISS PEACE賞受賞",
    description:
      "「誰もが安心して輝ける社会」への思いを胸に大会へ挑戦。仲間への姿勢と平和的な活動が認められ、MISS PEACE賞を受賞しました。",
    image: "/images/yukako-mgj-award.jpg",
    badge: "MISS PEACE賞",
    link: { label: "受賞までの物語を見る", url: "/archive/miss-grand-japan-2025-miss-peace" }
  },
  {
    id: "akt-tokyo-komachi-2025",
    year: "2025",
    date: "2025年",
    category: "TV",
    title: "AKT秋田テレビ『土曜の情報缶詰どっかん！』内「東京こまち」",
    description:
      "秋田出身者として、東京の話題を秋田へ届けるコーナーに出演。"
  },
  {
    id: "cocoa-seirei-2025-03",
    year: "2025",
    date: "2025年3月",
    category: "舞台",
    title: "劇団ココア『魔女エステリーゼの事件簿 精霊と焔編』",
    description:
      "2025年3月19日〜23日、萬劇場にて上演。ヴィレッタ役で出演。"
  },
  {
    id: "gojet-vol2-2024-11",
    year: "2024",
    date: "2024年11月",
    category: "舞台",
    title: "Air studio produce『GO,JET!GO!GO! vol.2』",
    description:
      "2024年11月20日〜25日、両国・Air studioにて上演。A班・早紀役で出演。"
  },
  {
    id: "miss-cosmo-japan-2024",
    year: "2024",
    date: "2024年8月",
    category: "受賞",
    title: "Miss Cosmo Japan 2024 TOP5ファイナリスト",
    description:
      "審査累計ポイントランキング1位を獲得してTOP5ファイナリストに選出。国内最終選考では3位に選定されました。"
  },
  {
    id: "gojet-paradise-live4-2024-06",
    year: "2024",
    date: "2024年6月",
    category: "舞台",
    title: "LAST DIAMOND『GO,JET!GO!GO! PARADISE LIVE 4』",
    description:
      "2024年6月18日〜23日、A-Garageにて上演。Aチーム・すずこ役で出演。"
  },
  {
    id: "akt-ambassador-2024",
    year: "2024",
    date: "2024年5月",
    category: "CM",
    title: "AKT秋田テレビ アプリアンバサダー",
    description:
      "AKT秋田テレビのアプリ「AKTアプリ」のアンバサダーに選出。地上波テレビCMやイベントに出演しました。"
  },
  {
    id: "warau-neko-littlebraver-2024-04",
    year: "2024",
    date: "2024年4月",
    category: "舞台",
    title: "『笑う門には猫来る -リトブレ ver.-』",
    description:
      "2024年4月17日〜21日、荻窪小劇場にて上演。C班・猫神役で出演。"
  },
  {
    id: "cocoa-kuroneko-2024-03",
    year: "2024",
    date: "2024年3月",
    category: "舞台",
    title: "劇団ココア『魔女エステリーゼの事件簿 黒猫喧騒編』",
    description:
      "2024年3月13日〜17日、劇場MOMOにて上演された新作短編に出演。"
  },
  {
    id: "khb-weather-2024",
    year: "2024",
    date: "2024年1月〜6月",
    category: "TV",
    title: "khb東日本放送『khb weather forecast』お天気レポーター",
    description:
      "テレビ朝日系列・khb東日本放送のレギュラーお天気レポーターを務めました。"
  },
  {
    id: "malasada-tokyo-model-2023",
    year: "2023",
    date: "2023年11月〜2024年2月",
    category: "モデル",
    title: "THE MALASADA TOKYO イメージモデル",
    description:
      "東京・下北沢のTHE MALASADA TOKYOのイメージモデルを務めました。"
  },
  {
    id: "cocoa-gan-2023-11",
    year: "2023",
    date: "2023年11月",
    category: "舞台",
    title: "劇団ココア 6周年記念公演『魔女エステリーゼの事件簿 贋と軀編』",
    description:
      "シリーズ第6弾。2023年11月14日〜19日、萬劇場にて上演。フレヤ・スチュアート役で出演。"
  },
  {
    id: "gojet-paradise-vol2-2023-09",
    year: "2023",
    date: "2023年9月",
    category: "舞台",
    title: "『GO,JET!GO!GO! PARADISE LIVE vol.2』",
    description:
      "2023年9月、A-Garage（Air studio）にて上演。あかね役で出演。"
  },
  {
    id: "gojet-paradise-vol1-2023-05",
    year: "2023",
    date: "2023年5月",
    category: "舞台",
    title: "『GO,JET!GO!GO! PARADISE LIVE vol.1』",
    description:
      "2023年5月、A-Garage（Air studio）にて上演。早紀役で出演。"
  },
  {
    id: "tvk-weather-report-2023",
    year: "2023",
    date: "2023年4月〜9月",
    category: "TV",
    title: "テレビ神奈川『weather report』リポーター",
    description:
      "2023年4月10日〜9月30日放送のテレビ神奈川『weather report』にリポーターとして出演。夏のリポーター挑戦篇にも登場しました。"
  },
  {
    id: "akuma-no-namida-2022",
    year: "2022",
    date: "2022年12月",
    category: "舞台",
    title: "舞台『悪魔の涙』（舞台デビュー）",
    description:
      "プロジェクトアクト東京の第七回公演。2022年12月8日〜12日に平賀スクエアで上演。カラヤン組で諏訪桃子役を演じ、俳優としてのキャリアをスタート。"
  },
  {
    id: "akita-to-tokyo-2022-10",
    year: "2022",
    date: "2022年10月1日",
    category: "転機",
    title: "秋田から東京へ――俳優として歩み出した日",
    description:
      "公務員を退職し、初舞台の稽古にできる限り参加するため、秋田から東京へ拠点を移した日。家族や故郷への思いと、俳優として夢に挑み続ける覚悟を綴った原点の記録。",
    image: "/images/yukako-tokyo-20221001.jpg",
    badge: "原点",
    link: {
      label: "原点となった一日を読む",
      url: "/archive/2022-10-01-akita-to-tokyo"
    }
  },
  {
    id: "miss-yukata-2021",
    year: "2021",
    date: "2021年",
    category: "受賞",
    title: "Sunny Side Project ミス浴衣コンテスト 準グランプリ",
    description:
      "秋田で公務員として勤務中にエントリー。準グランプリとSHOWROOM賞を受賞し、SHOWROOMでの配信活動を開始するきっかけに。"
  }
];
