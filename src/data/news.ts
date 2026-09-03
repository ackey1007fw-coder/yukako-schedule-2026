export type NewsItem = {
  // 投稿日・出来事の日付。最新情報の時系列はこちらを使う。
  date: string;
  label: string;
  text: string;
  url: string;
  // サイトに載せた日。過去投稿を後から追加するときだけ入れる。
  // Footer の「掲載情報更新」は listedAt ?? date の新しい方を見る。省略時は date。
  listedAt?: string;
};

export const news: NewsItem[] = [
  {
    date: "2026.9.3",
    label: "Instagram",
    text: "「自然が気持ち良い」——#大曲の花火 ツアー初日。角館の武家屋敷を人力車で。",
    url: "https://www.instagram.com/yoppy_777"
  },
  {
    date: "2026.9.1",
    label: "X",
    text: "「こりゃ難しいなと思ってる(色々な理由で)」——次のプロデュース舞台。タイトル・会場・日程は未発表。",
    url: "https://x.com/mokoopy/status/2094455042506178857"
  },
  {
    date: "2026.8.29",
    label: "X",
    text: "「しったげめんけべ？✨」——#大曲の花火。こまちめげないTシャツを指さして。",
    url: "https://x.com/mokoopy/status/2093618569678574046"
  },
  {
    date: "2026.8.24",
    label: "Instagram",
    text:
      "秋田で「あいぱく® AKITA 2026」へ。生黒ごま・蜜芋・メロン・生チョコのソフト4種。西武秋田店で8/26まで。#PR",
    url: "https://www.instagram.com/reel/DccnlfshIly/",
    listedAt: "2026.8.25"
  },
  {
    date: "2026.8.24",
    label: "X",
    text:
      "#ゆかJET オリジナル楽曲②。メグの『認めたくないのに』。歌うこと自体がvol.1史上初。JETへの想いとあかねへの想いが交錯する曲。",
    url: "https://x.com/yukako_produce/status/2091831946922045674"
  },
  {
    date: "2026.8.23",
    label: "X",
    text:
      "「無事に開催することができました☺️」——MISS GRAND JAPAN 2026 / MR GAY JAPAN 2026 FINAL。MCを務めた吉井優花子さんが感謝を伝え、公式YouTubeの大会アーカイブを案内。",
    url: "https://x.com/mokoopy/status/2091511016077377631"
  },
  {
    date: "2026.8.21",
    label: "Instagram",
    text:
      "「明日は岐阜❤️ 来月は広島と福岡✨」——BABY SHARK LIVE! の大垣・福山・久留米出演をストーリーズでお知らせ。",
    url: "https://www.instagram.com/yoppy_777"
  },
  {
    date: "2026.8.19",
    label: "X",
    text:
      "#ゆかJET オリジナル楽曲①。美里の『未来は薔薇色』と、対になる『未来は灰色』の歌詞カードを公開。新演出と須田JETから受け継いだ演出も。",
    url: "https://x.com/yukako_produce/status/2090048586331676998"
  },
  {
    date: "2026.8.17",
    label: "X",
    text: "秋田帰省で、あの『いぶりがっこポップコーン』を再び。取り上げてくれた記事はリプ欄へ。",
    url: "https://x.com/mokoopy/status/2089283468576608643",
    listedAt: "2026.8.18"
  },
  {
    // 掲載日。公演日（8/10）ではなく、サイトに載せた日を入れる。
    date: "2026.8.9",
    label: "X",
    text: "「今年の日本大会も盛り上げていくぞ🔥」——8/10（月）16:00、MISS GRAND JAPAN & MR GAY JAPAN 2026 FINAL。吉井優花子さんが日本語MCとしてヒューリックホール東京のステージへ。",
    url: "https://x.com/mokoopy/status/2086075435927138676"
  },
  {
    date: "2026.8.4",
    label: "X",
    text: "基本は通知オフなのに、なぜかsetlogだけオンのまま。B班メンバーの私生活が視野に入る生活になってる——人生の課題は睡眠。",
    url: "https://x.com/mokoopy/status/2084474587052691763",
    listedAt: "2026.8.14"
  },
  {
    date: "2026.7.13",
    label: "X",
    text: "「ワイワイC班😆 最後の早紀、楽しんで演じます✨」——CM枠は7/16（木）23:59まで。",
    url: "https://x.com/mokoopy/status/2076682572550267389"
  },
  {
    date: "2026.7.13",
    label: "X",
    text: "#ゆかJET C班キャスト紹介。「とってもパワフルです😆💛」——オシャレで大笑いできる新しいGO,JET!を模索中。",
    url: "https://x.com/yukako_produce/status/2076673958691410143"
  },
  {
    date: "2026.7.13",
    label: "X",
    text: "#ゆかJET A班キャスト紹介へ「混ざりたい🥺笑」。共演しない班にも、プロデューサーとして大切に想うエールを。",
    url: "https://x.com/mokoopy/status/2076341467841445980"
  },
  {
    date: "2026.7.12",
    label: "X",
    text: "#ゆかJET B班キャスト紹介。「毎日撮って編集しております🥺」——大笑いの稽古場と、最後まで決まるオチも。",
    url: "https://x.com/mokoopy/status/2076121780398563659"
  },
  {
    date: "2026.7.11",
    label: "Instagram",
    text: "豪華客船 MSC Bellissimaで過ごした6泊7日の船旅。母の日のプレゼントとして贈った、特別なクルーズのリール動画が公開されました。",
    url: "https://www.instagram.com/reel/DaoGHTuSj2U/?igsh=NTFvYzVjdXQ2OHJy"
  },
  {
    date: "2026.7.6",
    label: "X",
    text: "#ゆかJET 今日も歌ダンス稽古。メグに続き、美里もプロデューサーオリジナル楽曲に。三班のJET×あかねの雰囲気の違いもお楽しみに。",
    url: "https://x.com/yukako_produce/status/2074136760825885049"
  },
  {
    date: "2026.7.5",
    label: "X",
    text: "#ゆかJET 稽古場より。キャストが稽古を楽しんでくれているのが何より嬉しい——ちゃんと休みつつ、本番へ。",
    url: "https://x.com/mokoopy/status/2073778000177594434"
  },
  {
    date: "2026.7.5",
    label: "X",
    text: "#ゆかJET メグが歌うオリジナル楽曲は優花子さんの作。稽古で初めてのお披露目。",
    url: "https://x.com/mokoopy/status/2073772074964054080"
  },
  {
    date: "2026.7.5",
    label: "X",
    text: "#ゆかJET 歌ダンス稽古の動画が公開中。LIVEコーナーでの楽曲披露の予告も。",
    url: "https://x.com/yukako_produce/status/2073768826303631470"
  },
  {
    date: "2026.7.3",
    label: "X",
    text: "「もっと届いてほしい」——#ゆかJET 来場・配信チケット予約受付中。リポストも応援に。",
    url: "https://x.com/mokoopy/status/2073008837641269562"
  },
  {
    date: "2026.7.4",
    label: "X",
    text: "#ゆかJET 稽古スタート！まずは三班合同の歌ダンスシーンから。",
    url: "https://x.com/mokoopy/status/2073389892433027178"
  },
  {
    date: "2026.7.1",
    label: "X",
    text: "「7月の舞台、チェックしてくれたかな？最高のプロデュース作品にするから絶対観に来てね！」#ゆかJET ホームページも公開🌼",
    url: "https://x.com/mokoopy/status/2072459071773708413"
  },
  {
    date: "2026.6.30",
    label: "チケット",
    text: "【予約受付開始】#ゆかJET『GO,JET!GO!GO! vol.1 Premium』ご予約はこちら🎫",
    url: "https://premiumgoyukajet.hp.peraichi.com"
  },
  {
    date: "2026.6.30",
    label: "お知らせ",
    text: "吉井優花子さんの応援スケジュールサイトを公開しました",
    url: "https://yukako-schedule-2026.vercel.app/"
  },
  {
    date: "2026.6",
    label: "X",
    text: "#ゆかJET 全キャスト確定＆当日物販情報が発表されました",
    url: "https://x.com/yukako_produce/status/2070830869070377393"
  },
  {
    date: "2026.6",
    label: "X",
    text: "#ゆかJET 舞台情報が解禁されました（7/23〜27 Air studio 両国）",
    url: "https://x.com/yukako_produce/status/2070122985265197380"
  },
  {
    date: "2026.5.18",
    label: "Instagram",
    text: "ミス・グランド・ジャパンのシリーズ企画リール。テラスでの #floatmyboat チャレンジは #misstake #チャレンジ失敗😂",
    url: "https://www.instagram.com/reel/DYe2xLHhrwp/"
  },
  {
    date: "2026.5.18",
    label: "Instagram",
    text: "『かわええのう、龍馬くん』の振り返り。大量の龍馬のセリフから好きな3選、B班の龍馬とC班のおりょう、そして初のアソシエイト・プロデューサーで大切にしたこと。",
    url: "https://www.instagram.com/p/DYeSf_aGe1T/"
  },
  {
    date: "2026.1.18",
    label: "X",
    text: "秋田の映画館には『いぶりがっこ味のポップコーン』があるんです。大きな反響を呼んだ元投稿。",
    url: "https://x.com/mokoopy/status/2012824363620331966",
    listedAt: "2026.8.18"
  }
];

const newsDateKey = (date: string) => {
  const [year = 0, month = 0, day = 0] = date.split(".").map(Number);
  return (year * 100 + month) * 100 + day;
};

export const listingDateOf = (item: NewsItem) => item.listedAt ?? item.date;

export const listingDateToUtcMs = (date: string) => {
  const [year, month, day] = date.split(".").map(Number);
  if (!year || !month) return undefined;
  return Date.UTC(year, month - 1, day || 1);
};

export const latestNewsListingDate = (items: readonly NewsItem[] = news) => {
  if (items.length === 0) return "—";
  return items.reduce((latest, item) => {
    const candidate = listingDateOf(item);
    return newsDateKey(candidate) > newsDateKey(latest) ? candidate : latest;
  }, listingDateOf(items[0]));
};
