export type SearchIntent = {
  label: string;
  title: string;
  copy: string;
  href: string;
};

export type SearchFaq = {
  question: string;
  answer: string;
  href: string;
  linkLabel: string;
};

export const searchIntents: SearchIntent[] = [
  {
    label: "出演予定",
    title: "公演スケジュールを確認する",
    copy: "これからの出演と、終了した公演の記録はこちら。",
    href: "#schedule"
  },
  {
    label: "出演歴",
    title: "これまでの活動を見る",
    copy: "舞台、CM、MV、ドラマ、ミスコン。年ごとのタイムラインで。",
    href: "#highlights"
  },
  {
    label: "SNS",
    title: "SNSをチェックする",
    copy: "X・Instagram・TikTok・SHOWROOM。リンクをまとめて。",
    href: "#links"
  },
  {
    label: "プロフィール",
    title: "吉井優花子さんを知る",
    copy: "プロフィール・経歴・受賞歴はこちら。",
    href: "#profile"
  }
];

export const searchFaqs: SearchFaq[] = [
  {
    question: "チケットはどこで買える？",
    answer:
      "これからの出演はスケジュールから案内しています。#ゆかJETの来場チケットとアーカイブ配信は、いずれも受付・視聴を終了しました。",
    href: "#schedule",
    linkLabel: "出演予定を見る"
  },
  {
    question: "配信で観られる？",
    answer:
      "A班・B班・C班の本編と全キャストLIVEのアーカイブ配信は、2026年8月10日をもって終了しました。配信終了までの記録は#ゆかJET特集に残しています。",
    href: "#gojet-streaming-viewing-ended-2026-08-09",
    linkLabel: "配信終了の活動記録を見る"
  },
  {
    question: "会場はどこ？",
    answer:
      "これからの会場は各出演予定に記載しています。#ゆかJET 第1弾は Air studio 両国（東京都墨田区両国2-18-7 地下1階）で上演されました。",
    href: "#schedule",
    linkLabel: "出演予定を見る"
  },
  {
    question: "SHOWROOMはどこ？",
    answer:
      "「秋田の優花子(ゆかこ)」のルームで配信しています。配信は不定期のため、SHOWROOMをフォローすると開始通知が届きます。",
    href: "#links",
    linkLabel: "SHOWROOMを見る"
  },
  {
    question: "初めてでも応援できる？",
    answer:
      "X・Instagram・SHOWROOMのフォローから応援できます。公演ごとの応援案内は、各出演予定と#ゆかJETの記録にまとめています。",
    href: "#links",
    linkLabel: "SNS・配信を見る"
  },
  {
    question: "Miss Grand Japanでの役職は？",
    answer:
      "2026年度より、ミス・グランド・ジャパンの「代表補佐／運営マネジメント」を務めています。大会運営全体のマネジメントと体制強化を担う役割です。",
    href: "#miss-grand-japan-management",
    linkLabel: "詳しく見る"
  },
  {
    question: "#ゆかJET とは何ですか？",
    answer:
      "吉井優花子さんがプロデュースする舞台シリーズ『GO,JET!GO!GO!』の愛称です。第1弾は2026年7月23日〜27日にAir studio 両国で上演され、アーカイブ配信も8月10日に終了しました。",
    href: "#next",
    linkLabel: "#ゆかJETの記録を見る"
  }
];
