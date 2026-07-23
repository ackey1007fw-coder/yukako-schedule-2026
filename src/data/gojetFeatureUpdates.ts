import {
  gojetFeatureUpdates as sourceUpdates,
  type GojetFeatureUpdate
} from "./gojetPromo";
import { getStableGojetAnchorId } from "../lib/engagement";

export type DisplayGojetFeatureUpdate = GojetFeatureUpdate & {
  // トップの最新情報から対象カードへ直接移動するための任意アンカー
  anchorId?: string;
  // 記事ごとに、公演情報と元投稿のどちらを主CTAにするか指定する
  primaryCta?: "post" | "homepage";
};

const FINAL_GOJET_POST_URL =
  "https://x.com/mokoopy/status/2078466058168791234";
const YUKAKO_X_PROFILE_URL = "https://x.com/mokoopy";
const ERI1408_INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/eri_1408_/";
const CBAN_GIRLS_POST_URL =
  "https://x.com/mokoopy/status/2078281074199982129";
const PENLIGHT_POST_URL =
  "https://x.com/mokoopy/status/2078467900470599986";
const TAGA_DIRECTOR_COMMENT_POST_URL =
  "https://x.com/ryuburan_taga/status/2079368211527790758";
const THEATER_ENTRY_20260722_POST_URL =
  "https://x.com/yukako_produce/status/2079581898372968725";
const OPENING_EVE_20260722_POST_URL =
  "https://x.com/yukako_produce/status/2079928926068260939";
const INSTAGRAM_OPENING_20260723_POST_URL =
  "https://www.instagram.com/p/DbGY3XDgT_5/?igsh=MXVyamZ0MWJjaDg0dA==";
const JET_VISUAL_20260723_POST_URL =
  "https://x.com/mokoopy/status/2079948269850091668";
const SHIINA_AKANE_20260723_POST_URL =
  "https://x.com/mokoopy/status/2080116978329763841";
const COUNTDOWN_3DAYS_20260720_POST_URL =
  "https://x.com/mokoopy/status/2079223875905491204";
const PREMIUM_PROMO_VIDEO_POST_URL =
  "https://x.com/yukako_produce/status/2079205943192191096";
const COUNTDOWN_3DAYS_POST_URL =
  "https://x.com/mokoopy/status/2078869508970995791?s=12";
const PRODUCE_ANNOUNCE_POST_URL =
  "https://www.instagram.com/p/DZch0STFB0M/?igsh=MWt2amJ6djV3ZGZnaA==";

const yukakoTheaterEntryUpdate: DisplayGojetFeatureUpdate = {
  date: "2026.7.22",
  label: "吉井優花子さん本人・劇場入り",
  title: "ついに劇場へ。新たな「早紀」と「JET」を本番で",
  body:
    "#ゆかJETがついに劇場へ。素敵なメンバーが集まり、こだわった脚色や楽曲ができた喜びとともに、「私の魂の芝居で、GO,JET!に幕を下ろす」と来場を呼びかけています。新たな「早紀」と「JET」をお楽しみに。",
  postUrl: "https://x.com/mokoopy/status/2079594085653070145",
  homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
  ctaLabel: "元の投稿を見る",
  homepageLabel: "応援・予約ページを見る",
  roleTags: ["吉井優花子さん本人", "B班：JET", "C班：早紀", "引用投稿"],
  photo: {
    src: "/images/yukajet/2026-07-22-mokoopy-2079594085653070145-01.jpg",
    alt: "#ゆかJETのステージで、両手を広げるチップ青木さんとマイクの前で歌う吉井優花子さん"
  },
  anchorId: "gojet-yukako-theater-entry-2026-07-22",
  primaryCta: "post"
};

const finalGojetUpdate: DisplayGojetFeatureUpdate = {
  date: "2026.7.18",
  label: "大切なお知らせ",
  title: "ガールズもGO,JET!も、これが最後。特別な#ゆかJETへ",
  body:
    "「私は、ガールズもGO,JET!も最後になります」——締めくくりの舞台は、自身でプロデュースする特別な#ゆかJET。最後のガールズ、最後のGO,JET!を、劇場や配信で見届けたい。",
  // 元投稿は削除済みのため、現在閲覧できる本人プロフィールへ案内する。
  postUrl: YUKAKO_X_PROFILE_URL,
  homepageUrl: "https://premiumgoyukajet.hp.peraichi.com/",
  ctaLabel: "優花子さんのXプロフィールを見る",
  homepageLabel: "公演日程・予約を見る",
  roleTags: ["最後のガールズ", "最後のGO,JET!", "引用投稿"],
  anchorId: "gojet-final-message-2026-07-18",
  primaryCta: "homepage"
};

// 元投稿データは維持しつつ、表示上の文章・導線に必要な情報だけを補う。
// 今後、同様の個別最適化が増えた場合は GojetFeatureUpdate 本体への統合を検討する。
const decoratedSourceUpdates: DisplayGojetFeatureUpdate[] = sourceUpdates
  .filter((update) => update.postUrl !== FINAL_GOJET_POST_URL)
  .map((update) => {
    if (update.postUrl === PENLIGHT_POST_URL) {
      return {
        ...update,
        anchorId: "gojet-penlight-colors-2026-07-18"
      };
    }

    if (update.postUrl !== CBAN_GIRLS_POST_URL) return update;

    return {
      ...update,
      title:
        "まだ模索中だからこそ面白い。C班ガールズ3人でつくる「絶対良いもの」",
      body:
        "#ゆかJET C班で早紀を演じる優花子さん。GO,JET! Girlsの3人は、まだまだ模索しながら稽古中。「ガールズもまだまだ模索中なのが新鮮」「絶対良いものになる」——完成前の今だからこそ、舞台でどんな3人になるのか見届けたいところ。明るい3ショットと本人の言葉はXへ。C班の日程・予約はこちら。",
      ctaLabel: "優花子さんの投稿と写真を見る",
      homepageLabel: "C班の日程・予約を見る",
      roleTags: ["C班：早紀", "GO,JET! Girls", "引用投稿"],
      anchorId: "gojet-cban-girls-2026-07-18",
      primaryCta: "homepage"
    };
  });

const penlightUpdate = decoratedSourceUpdates.find(
  (update) => update.postUrl === PENLIGHT_POST_URL
);
const theaterEntry20260722Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === THEATER_ENTRY_20260722_POST_URL
);
const openingEve20260722Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === OPENING_EVE_20260722_POST_URL
);
const instagramOpening20260723Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === INSTAGRAM_OPENING_20260723_POST_URL
);
const jetVisual20260723Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === JET_VISUAL_20260723_POST_URL
);
const shiinaAkane20260723Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === SHIINA_AKANE_20260723_POST_URL
);
const eri1408SakiStoryUpdate = decoratedSourceUpdates.find(
  (update) => update.postUrl === ERI1408_INSTAGRAM_PROFILE_URL
);
const tagaDirectorCommentUpdate = decoratedSourceUpdates.find(
  (update) => update.postUrl === TAGA_DIRECTOR_COMMENT_POST_URL
);
const countdown3Days20260720Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === COUNTDOWN_3DAYS_20260720_POST_URL
);
const premiumPromoVideoUpdate = decoratedSourceUpdates.find(
  (update) => update.postUrl === PREMIUM_PROMO_VIDEO_POST_URL
);
const countdown3DaysUpdate = decoratedSourceUpdates.find(
  (update) => update.postUrl === COUNTDOWN_3DAYS_POST_URL
);
export const gojetOriginUpdate = decoratedSourceUpdates.find(
  (update) => update.postUrl === PRODUCE_ANNOUNCE_POST_URL
);
const remainingSourceUpdates = decoratedSourceUpdates.filter(
  (update) =>
    update.postUrl !== SHIINA_AKANE_20260723_POST_URL &&
    update.postUrl !== INSTAGRAM_OPENING_20260723_POST_URL &&
    update.postUrl !== JET_VISUAL_20260723_POST_URL &&
    update.postUrl !== OPENING_EVE_20260722_POST_URL &&
    update.postUrl !== THEATER_ENTRY_20260722_POST_URL &&
    update.postUrl !== ERI1408_INSTAGRAM_PROFILE_URL &&
    update.postUrl !== TAGA_DIRECTOR_COMMENT_POST_URL &&
    update.postUrl !== COUNTDOWN_3DAYS_20260720_POST_URL &&
    update.postUrl !== PREMIUM_PROMO_VIDEO_POST_URL &&
    update.postUrl !== COUNTDOWN_3DAYS_POST_URL &&
    update.postUrl !== PENLIGHT_POST_URL &&
    update.postUrl !== PRODUCE_ANNOUNCE_POST_URL
);

const featuredInstagramOpening20260723Update:
  | DisplayGojetFeatureUpdate
  | undefined = instagramOpening20260723Update
  ? {
      ...instagramOpening20260723Update,
      anchorId: "gojet-instagram-opening-2026-07-23",
      primaryCta: "post"
    }
  : undefined;

const featuredShiinaAkane20260723Update:
  | DisplayGojetFeatureUpdate
  | undefined = shiinaAkane20260723Update
  ? {
      ...shiinaAkane20260723Update,
      anchorId: "gojet-shiina-akane-2026-07-23",
      primaryCta: "post"
    }
  : undefined;

const featuredJetVisual20260723Update:
  | DisplayGojetFeatureUpdate
  | undefined = jetVisual20260723Update
  ? {
      ...jetVisual20260723Update,
      anchorId: "gojet-jet-visual-2026-07-23",
      primaryCta: "post"
    }
  : undefined;

const featuredOpeningEve20260722Update:
  | DisplayGojetFeatureUpdate
  | undefined = openingEve20260722Update
  ? {
      ...openingEve20260722Update,
      anchorId: "gojet-opening-eve-2026-07-22",
      primaryCta: "post"
    }
  : undefined;

const featuredTheaterEntry20260722Update:
  | DisplayGojetFeatureUpdate
  | undefined = theaterEntry20260722Update
  ? {
      ...theaterEntry20260722Update,
      anchorId: "gojet-theater-entry-2026-07-22",
      primaryCta: "post"
    }
  : undefined;

const featuredEri1408SakiStoryUpdate:
  | DisplayGojetFeatureUpdate
  | undefined = eri1408SakiStoryUpdate
  ? {
      ...eri1408SakiStoryUpdate,
      anchorId: "gojet-eri1408-saki-story-2026-07-21",
      primaryCta: "homepage"
    }
  : undefined;

const featuredTagaDirectorCommentUpdate:
  | DisplayGojetFeatureUpdate
  | undefined = tagaDirectorCommentUpdate
  ? {
      ...tagaDirectorCommentUpdate,
      anchorId: "gojet-taga-director-comment-2026-07-21",
      primaryCta: "post"
    }
  : undefined;

const featuredCountdown3Days20260720Update:
  | DisplayGojetFeatureUpdate
  | undefined = countdown3Days20260720Update
  ? {
      ...countdown3Days20260720Update,
      anchorId: "gojet-countdown-3days-2026-07-20",
      primaryCta: "homepage"
    }
  : undefined;

const featuredPremiumPromoVideoUpdate:
  | DisplayGojetFeatureUpdate
  | undefined = premiumPromoVideoUpdate
  ? {
      ...premiumPromoVideoUpdate,
      anchorId: "gojet-premium-promo-video-2026-07-20",
      primaryCta: "post"
    }
  : undefined;

const featuredCountdown3DaysUpdate: DisplayGojetFeatureUpdate | undefined =
  countdown3DaysUpdate
    ? {
        ...countdown3DaysUpdate,
        anchorId: "gojet-countdown-3days-2026-07-19",
        primaryCta: "homepage"
      }
    : undefined;

// 22:12のペンライト投稿を、22:04の「最後」の投稿より上に表示する。
const orderedGojetFeatureUpdates: DisplayGojetFeatureUpdate[] = [
  ...(featuredShiinaAkane20260723Update
    ? [featuredShiinaAkane20260723Update]
    : []),
  ...(featuredInstagramOpening20260723Update
    ? [featuredInstagramOpening20260723Update]
    : []),
  ...(featuredJetVisual20260723Update ? [featuredJetVisual20260723Update] : []),
  ...(featuredOpeningEve20260722Update
    ? [featuredOpeningEve20260722Update]
    : []),
  yukakoTheaterEntryUpdate,
  ...(featuredTheaterEntry20260722Update
    ? [featuredTheaterEntry20260722Update]
    : []),
  ...(featuredEri1408SakiStoryUpdate ? [featuredEri1408SakiStoryUpdate] : []),
  ...(featuredTagaDirectorCommentUpdate
    ? [featuredTagaDirectorCommentUpdate]
    : []),
  ...(featuredCountdown3Days20260720Update
    ? [featuredCountdown3Days20260720Update]
    : []),
  ...(featuredPremiumPromoVideoUpdate
    ? [featuredPremiumPromoVideoUpdate]
    : []),
  ...(featuredCountdown3DaysUpdate ? [featuredCountdown3DaysUpdate] : []),
  ...(penlightUpdate ? [penlightUpdate] : []),
  finalGojetUpdate,
  ...remainingSourceUpdates
];

// 既存アンカーはそのまま維持し、未設定の投稿だけ元URL等から安定IDを補う。
export const gojetFeatureUpdates: DisplayGojetFeatureUpdate[] =
  orderedGojetFeatureUpdates.map((update) => ({
    ...update,
    anchorId: getStableGojetAnchorId(update)
  }));
