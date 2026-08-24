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
  // Google Driveなど、共有元のプレーヤーをカード内に埋め込む場合に使用する。
  embeddedVideo?: {
    src: string;
    label: string;
    note?: string;
  };
  // トップの「最新情報」サムネイルでの見せ方。歌詞カードのように
  // 切り抜くと読めなくなる縦長画像は "contain" を指定する。
  imageLayout?: "portrait-preview" | "contain";
  // 締切を持つ申込導線は lib/gojetOrderDeadline.ts が自動で閉じる。
  // URL（Googleフォーム）とラベル（「申し込む」等）で判定できない申込導線だけ、
  // ここで明示的に指定する。通常は指定不要。
  hideHomepageAfterDeadline?: boolean;
};

const NUMAO_MAYUKA_C_GIRLS_20260803_POST_URL =
  "https://x.com/mayuka_pinkcha/status/2084243063141179760";

const ORIGINAL_SONGS_MEG_20260824_POST_URL =
  "https://x.com/yukako_produce/status/2091831946922045674";

const ORIGINAL_SONGS_MISATO_20260819_POST_URL =
  "https://x.com/yukako_produce/status/2090048586331676998";

const YUKAKO_STREAMING_VIEWING_FINAL_DAY_20260810_POST_URL =
  "https://x.com/mokoopy/status/2086627781023285249";

const YUKAKO_STREAMING_MESSAGE_20260809_POST_URL =
  "https://x.com/mokoopy/status/2086455342796603727?s=12";

const YUKAKO_MEG_CAST_INTRO_20260808_POST_URL =
  "https://x.com/mokoopy/status/2085885102899507709?s=12";

const YUKAKO_FINAL_CALL_QUOTE_20260803_POST_URL =
  "https://x.com/mokoopy/status/2084261233344016471";
const STREAMING_FINAL_DAY_20260803_POST_URL =
  "https://x.com/yukako_produce/status/2084256242856587746";
const YUKAKO_FINAL_LIVE_QUOTE_20260803_POST_URL =
  "https://x.com/mokoopy/status/2083944200119476437";
const FINAL_LIVE_20260803_POST_URL =
  "https://x.com/yukako_produce/status/2083938076452434371";
const C_TEAM_CAST_REPOST_20260802_POST_URL =
  "https://x.com/yukako_produce/status/2083763241877217706";
const YUKAKO_C_TEAM_CAST_QUOTE_20260802_POST_URL =
  "https://x.com/mokoopy/status/2083894429962977371";
const YUKAKO_B_TEAM_CHARACTER_INTRO_QUOTE_20260802_POST_URL =
  "https://x.com/mokoopy/status/2083895403389555175";
const SAKI_TRIO_20260801_POST_URL =
  "https://x.com/akino_aoinari/status/2083430725815247136";
const YUKAKO_FUCHAN_CONNECTION_20260801_POST_URL =
  "https://x.com/mokoopy/status/2083565988352790714";
const A_TEAM_CHARACTER_INTRO_20260801_POST_URL =
  "https://x.com/yukako_produce/status/2083560056470323653";
const B_TEAM_CHARACTER_INTRO_20260801_POST_URL =
  "https://x.com/yukako_produce/status/2083560994169889115";
const C_TEAM_CHARACTER_INTRO_20260801_POST_URL =
  "https://x.com/yukako_produce/status/2083561783437279522";
const YUKAKO_A_TEAM_CHARACTER_INTRO_QUOTE_20260802_POST_URL =
  "https://x.com/mokoopy/status/2083896120812720278";
const REHEARSAL_LOOKBACK_20260801_POST_URL =
  "https://x.com/mokoopy/status/2083394253787644060";
const RYOMA_CASTMATES_20260731_POST_URL =
  "https://x.com/mokoopy/status/2083193878006620507";
const DUAL_ROLES_RYOMA_20260731_POST_URL =
  "https://x.com/mokoopy/status/2083189908970348909";
const STREAMING_FINAL_CALL_20260731_POST_URL =
  "https://x.com/yukako_produce/status/2083165443876081719";
const THREE_JETS_20260731_POST_URL =
  "https://x.com/mokoopy/status/2083127016010944516";
const YUKAKO_NEXT_STAGE_20260731_POST_URL =
  "https://x.com/mokoopy/status/2082884478134079637";
const SUPPORT_CONTENT_SHIPPING_20260730_POST_URL =
  "https://x.com/yukako_produce/status/2082689806270947683";
const YUKAKO_LOOKBACK_1_20260729_POST_URL =
  "https://x.com/mokoopy/status/2082478266989113425";
const YUKAKO_STREAMING_TICKET_20260729_POST_URL =
  "https://x.com/mokoopy/status/2082456710611128358";
const NUMAO_MAYUKA_MEGS_20260729_POST_URL =
  "https://x.com/mayuka_pinkcha/status/2082450093261861085";
const PRODUCE_FINALE_20260729_POST_URL =
  "https://x.com/yukako_produce/status/2082402006891888959";
const CAST_VOICES_FINALE_20260727_POST_URL =
  "https://x.com/hashtag/%E3%82%86%E3%81%8BJET?f=live";
const YUKAKO_FINALE_20260728_POST_URL =
  "https://x.com/mokoopy/status/2081797457068130391";
const YUKAKO_YELL_CARDS_20260727_POST_URL =
  "https://x.com/mokoopy/status/2081421564504097269";
const YUKAKO_DAY4_WRAP_20260727_POST_URL =
  "https://x.com/mokoopy/status/2081417317918155013";
const YUKAKO_SCHEDULE_CHANGE_20260726_POST_URL =
  "https://x.com/mokoopy/status/2081386441725071564";
const KURUME_MAIMU_BBAN_FINALE_20260726_POST_URL =
  "https://x.com/maimu_htk/status/2081372480959307913";
const YUKAKO_SONGS_STAGING_20260726_POST_URL =
  "https://x.com/mokoopy/status/2081190994415083734";
const YAGUCHI_SHU_DAY3_20260726_POST_URL =
  "https://x.com/syu_martin68y/status/2081054397170372677";
const YUKAKO_DAY3_WRAP_20260726_POST_URL =
  "https://x.com/mokoopy/status/2081033107919229302";
const YUKAKO_REMAINING_SHOWS_20260725_POST_URL =
  "https://x.com/mokoopy/status/2081165030729654285";
const MIMURA_SUMIKA_C_DAY2_20260725_POST_URL =
  "https://x.com/smk_mmr/status/2081012385842860371";
const AKINO_AOINARI_20260725_POST_URL =
  "https://x.com/akino_aoinari/status/2080843278480818262";
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
const ARAI_ACCESS_VIDEO_20260723_POST_URL =
  "https://x.com/eri_no_a/status/2080193541503127649";
const OFFICIAL_VISITOR_GOODS_20260723_POST_URL =
  "https://x.com/yukako_produce/status/2080130440137232583";
const OPENING_NIGHT_REPORT_20260723_POST_URL =
  "https://x.com/yukako_produce/status/2080297797144969336";
const YUKAKO_JET_OPENING_GOODS_20260724_POST_URL =
  "https://x.com/mokoopy/status/2080320822825439518";
const OFFICIAL_X_NEWS_20260724_POST_URL =
  "https://x.com/yukako_produce/status/2080313032174174590";
const PENLIGHT_SCHEDULE_20260724_POST_URL =
  "https://x.com/mokoopy/status/2080454389677039811";
const AOKI_ANNA_DAY2_HEART_20260724_POST_URL =
  "https://x.com/anna_aoki0906/status/2080630150077825528";
const KAE_YUKAJET_DAY2_20260724_POST_URL =
  "https://x.com/kaenomusic/status/2080619068445597718";
const KURUME_MAIMU_DAY2_20260724_POST_URL =
  "https://x.com/maimu_htk/status/2080595354442137931";
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

const sakiTrio20260801Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === SAKI_TRIO_20260801_POST_URL
);
const originalSongsMeg20260824Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === ORIGINAL_SONGS_MEG_20260824_POST_URL
);
const originalSongsMisato20260819Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === ORIGINAL_SONGS_MISATO_20260819_POST_URL
);
const yukakoStreamingViewingFinalDay20260810Update = decoratedSourceUpdates.find(
  (update) =>
    update.postUrl === YUKAKO_STREAMING_VIEWING_FINAL_DAY_20260810_POST_URL
);
const yukakoStreamingMessage20260809Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_STREAMING_MESSAGE_20260809_POST_URL
);
const yukakoMegCastIntro20260808Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_MEG_CAST_INTRO_20260808_POST_URL
);
const numaoMayukaCGirls20260803Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === NUMAO_MAYUKA_C_GIRLS_20260803_POST_URL
);
const cTeamCastRepost20260802Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === C_TEAM_CAST_REPOST_20260802_POST_URL
);
const yukakoFuchanConnection20260801Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_FUCHAN_CONNECTION_20260801_POST_URL
);
const aTeamCharacterIntro20260801Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === A_TEAM_CHARACTER_INTRO_20260801_POST_URL
);
const bTeamCharacterIntro20260801Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === B_TEAM_CHARACTER_INTRO_20260801_POST_URL
);
const cTeamCharacterIntro20260801Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === C_TEAM_CHARACTER_INTRO_20260801_POST_URL
);
const rehearsalLookback20260801Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === REHEARSAL_LOOKBACK_20260801_POST_URL
);
const ryomaCastmates20260731Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === RYOMA_CASTMATES_20260731_POST_URL
);
const dualRolesRyoma20260731Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === DUAL_ROLES_RYOMA_20260731_POST_URL
);
const streamingFinalCall20260731Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === STREAMING_FINAL_CALL_20260731_POST_URL
);
const threeJets20260731Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === THREE_JETS_20260731_POST_URL
);
const yukakoNextStage20260731Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_NEXT_STAGE_20260731_POST_URL
);
const yukakoLookback120260729Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_LOOKBACK_1_20260729_POST_URL
);
const supportContentShipping20260730Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === SUPPORT_CONTENT_SHIPPING_20260730_POST_URL
);
const yukakoStreamingTicket20260729Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_STREAMING_TICKET_20260729_POST_URL
);
const numaoMayukaMegs20260729Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === NUMAO_MAYUKA_MEGS_20260729_POST_URL
);
const produceFinale20260729Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === PRODUCE_FINALE_20260729_POST_URL
);
const castVoicesFinale20260727Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === CAST_VOICES_FINALE_20260727_POST_URL
);
const yukakoFinale20260728Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_FINALE_20260728_POST_URL
);
const yukakoYellCards20260727Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_YELL_CARDS_20260727_POST_URL
);
const yukakoDay4Wrap20260727Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_DAY4_WRAP_20260727_POST_URL
);
const yukakoScheduleChange20260726Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_SCHEDULE_CHANGE_20260726_POST_URL
);
const kurumeMaimuBbanFinale20260726Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === KURUME_MAIMU_BBAN_FINALE_20260726_POST_URL
);
const yukakoSongsStaging20260726Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_SONGS_STAGING_20260726_POST_URL
);
const yaguchiShuDay320260726Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YAGUCHI_SHU_DAY3_20260726_POST_URL
);
const yukakoDay3Wrap20260726Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_DAY3_WRAP_20260726_POST_URL
);
const yukakoRemainingShows20260725Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_REMAINING_SHOWS_20260725_POST_URL
);
const akinoAoinari20260725Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === AKINO_AOINARI_20260725_POST_URL
);
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
const araiAccessVideo20260723Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === ARAI_ACCESS_VIDEO_20260723_POST_URL
);
const officialVisitorGoods20260723Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === OFFICIAL_VISITOR_GOODS_20260723_POST_URL
);
const openingNightReport20260723Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === OPENING_NIGHT_REPORT_20260723_POST_URL
);
const yukakoJetOpeningGoods20260724Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === YUKAKO_JET_OPENING_GOODS_20260724_POST_URL
);
const officialXNews20260724Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === OFFICIAL_X_NEWS_20260724_POST_URL
);
const penlightSchedule20260724Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === PENLIGHT_SCHEDULE_20260724_POST_URL
);
const aokiAnnaDay2Heart20260724Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === AOKI_ANNA_DAY2_HEART_20260724_POST_URL
);
const kaeYukajetDay220260724Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === KAE_YUKAJET_DAY2_20260724_POST_URL
);
const kurumeMaimuDay220260724Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === KURUME_MAIMU_DAY2_20260724_POST_URL
);
const eri1408SakiStoryUpdate = decoratedSourceUpdates.find(
  (update) => update.postUrl === ERI1408_INSTAGRAM_PROFILE_URL
);
const mimuraSumikaCDay220260725Update = decoratedSourceUpdates.find(
  (update) => update.postUrl === MIMURA_SUMIKA_C_DAY2_20260725_POST_URL
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
    update.postUrl !== ORIGINAL_SONGS_MEG_20260824_POST_URL &&
    update.postUrl !== ORIGINAL_SONGS_MISATO_20260819_POST_URL &&
    update.postUrl !== YUKAKO_STREAMING_VIEWING_FINAL_DAY_20260810_POST_URL &&
    update.postUrl !== YUKAKO_STREAMING_MESSAGE_20260809_POST_URL &&
    update.postUrl !== YUKAKO_MEG_CAST_INTRO_20260808_POST_URL &&
    update.postUrl !== NUMAO_MAYUKA_C_GIRLS_20260803_POST_URL &&
    update.postUrl !== C_TEAM_CAST_REPOST_20260802_POST_URL &&
    update.postUrl !== YUKAKO_FUCHAN_CONNECTION_20260801_POST_URL &&
    update.postUrl !== A_TEAM_CHARACTER_INTRO_20260801_POST_URL &&
    update.postUrl !== B_TEAM_CHARACTER_INTRO_20260801_POST_URL &&
    update.postUrl !== C_TEAM_CHARACTER_INTRO_20260801_POST_URL &&
    update.postUrl !== SAKI_TRIO_20260801_POST_URL &&
    update.postUrl !== REHEARSAL_LOOKBACK_20260801_POST_URL &&
    update.postUrl !== RYOMA_CASTMATES_20260731_POST_URL &&
    update.postUrl !== DUAL_ROLES_RYOMA_20260731_POST_URL &&
    update.postUrl !== STREAMING_FINAL_CALL_20260731_POST_URL &&
    update.postUrl !== THREE_JETS_20260731_POST_URL &&
    update.postUrl !== YUKAKO_NEXT_STAGE_20260731_POST_URL &&
    update.postUrl !== SUPPORT_CONTENT_SHIPPING_20260730_POST_URL &&
    update.postUrl !== YUKAKO_LOOKBACK_1_20260729_POST_URL &&
    update.postUrl !== YUKAKO_STREAMING_TICKET_20260729_POST_URL &&
    update.postUrl !== NUMAO_MAYUKA_MEGS_20260729_POST_URL &&
    update.postUrl !== PRODUCE_FINALE_20260729_POST_URL &&
    update.postUrl !== CAST_VOICES_FINALE_20260727_POST_URL &&
    update.postUrl !== YUKAKO_FINALE_20260728_POST_URL &&
    update.postUrl !== YUKAKO_YELL_CARDS_20260727_POST_URL &&
    update.postUrl !== YUKAKO_DAY4_WRAP_20260727_POST_URL &&
    update.postUrl !== YUKAKO_SCHEDULE_CHANGE_20260726_POST_URL &&
    update.postUrl !== KURUME_MAIMU_BBAN_FINALE_20260726_POST_URL &&
    update.postUrl !== YUKAKO_SONGS_STAGING_20260726_POST_URL &&
    update.postUrl !== YAGUCHI_SHU_DAY3_20260726_POST_URL &&
    update.postUrl !== YUKAKO_DAY3_WRAP_20260726_POST_URL &&
    update.postUrl !== YUKAKO_REMAINING_SHOWS_20260725_POST_URL &&
    update.postUrl !== MIMURA_SUMIKA_C_DAY2_20260725_POST_URL &&
    update.postUrl !== AKINO_AOINARI_20260725_POST_URL &&
    update.postUrl !== AOKI_ANNA_DAY2_HEART_20260724_POST_URL &&
    update.postUrl !== KAE_YUKAJET_DAY2_20260724_POST_URL &&
    update.postUrl !== KURUME_MAIMU_DAY2_20260724_POST_URL &&
    update.postUrl !== PENLIGHT_SCHEDULE_20260724_POST_URL &&
    update.postUrl !== YUKAKO_JET_OPENING_GOODS_20260724_POST_URL &&
    update.postUrl !== OFFICIAL_X_NEWS_20260724_POST_URL &&
    update.postUrl !== OPENING_NIGHT_REPORT_20260723_POST_URL &&
    update.postUrl !== ARAI_ACCESS_VIDEO_20260723_POST_URL &&
    update.postUrl !== OFFICIAL_VISITOR_GOODS_20260723_POST_URL &&
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

// 歌詞カードは縦長。最新情報のサムネイルでも全文が読めるよう contain で見せる。
const featuredOriginalSongsMeg20260824Update =
  originalSongsMeg20260824Update
    ? {
        ...originalSongsMeg20260824Update,
        anchorId: "gojet-original-songs-meg-2026-08-24",
        primaryCta: "post" as const,
        imageLayout: "contain" as const
      }
    : undefined;

const featuredOriginalSongsMisato20260819Update =
  originalSongsMisato20260819Update
    ? {
        ...originalSongsMisato20260819Update,
        anchorId: "gojet-original-songs-misato-2026-08-19",
        primaryCta: "post" as const,
        imageLayout: "contain" as const
      }
    : undefined;

const featuredYukakoStreamingViewingFinalDay20260810Update =
  yukakoStreamingViewingFinalDay20260810Update
    ? {
        ...yukakoStreamingViewingFinalDay20260810Update,
        anchorId: "gojet-streaming-viewing-final-day-2026-08-10",
        primaryCta: "post" as const
      }
    : undefined;

const featuredYukakoStreamingMessage20260809Update =
  yukakoStreamingMessage20260809Update
    ? {
        ...yukakoStreamingMessage20260809Update,
        anchorId: "gojet-streaming-viewing-ended-2026-08-09",
        primaryCta: "post" as const
      }
    : undefined;

const featuredYukakoMegCastIntro20260808Update =
  yukakoMegCastIntro20260808Update
    ? {
        ...yukakoMegCastIntro20260808Update,
        anchorId: "gojet-yukako-meg-cast-intro-2026-08-08",
        primaryCta: "post" as const
      }
    : undefined;

const featuredYukakoFinalCallQuote20260803Update: DisplayGojetFeatureUpdate = {
  date: "2026.8.3 21:52",
  label: "吉井優花子さん（@mokoopy）・配信最終案内",
  // 見出しに「本日まで」のような相対表現を入れると、締切後の案内と食い違う。
  // 期限の状態は deadline の案内文に任せる。
  title: "載せていない見所がありすぎる｜笑いどころも、ドラマも",
  body:
    "「載せていない見所がありすぎる🙂‍↕️🎙️」——宣伝動画で見せきれなかった笑いどころも、ドラマも。A班・B班・C班それぞれがクオリティの高い作品に。\n\n愛のある脚本、素敵なキャスト、素晴らしい演出。こだわって作ったメグと美里の曲も。約3分50秒の映像で、本編の空気をもう一度。\n\n配信チケットの購入は8月3日まで、視聴は8月10日まで。",
  caption:
    "#ゆかJET\n宣伝動画でたくさん見せているけど。。\n載せていない見所がありすぎる🙂‍↕️🎙️\n笑いどころも、、😂笑\nそしてもちろんドラマも✨\n\nA班、B班、C班それぞれでクオリティの高い作品となりました。\n愛のある脚本、素敵なキャスト、素晴らしい演出で、とってもおもしろいです！！！\n\nこだわって作ったメグと美里の曲もお楽しみください😌\n\n【配信チケットの購入は本日まで！🎟️】\n※8月10日まで視聴可能\n⬇️",
  postUrl: YUKAKO_FINAL_CALL_QUOTE_20260803_POST_URL,
  homepageUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
  ctaLabel: "優花子さんのX投稿を見る",
  homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
  roleTags: [
    "#ゆかJET",
    "吉井優花子さん",
    "配信チケット",
    "A班",
    "B班",
    "C班",
    "メグと美里の曲",
    "千秋楽LIVE"
  ],
  embeddedVideo: {
    src: "https://drive.google.com/file/d/1X3-NYAOQ-Lx7GW9W_T8lG0bTG4SVdgOx/preview",
    label:
      "『GO,JET!GO!GO! vol.1 Premium』配信チケット案内の宣伝動画（約3分50秒・音声あり）",
    note: "再生できない場合は、本人投稿または引用元投稿からご覧ください。"
  },
  deadline: {
    at: "2026-08-03T23:59:59+09:00",
    beforeText:
      "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
    afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
  },
  quotedPost: {
    author: "吉井優花子プロデュース公演",
    handle: "@yukako_produce",
    body:
      "#ゆかJET\n【📣配信チケットの購入は本日まで‼️】\n\n劇場でも配信でもお楽しみいただいております😭✨\n\nキャストの個性が光るvol.1 Premiumを\nぜひ『配信チケット』でご覧ください☺️✨\n\n🌟A.B.C班の本編\n🌟全キャスト参加の千秋楽LIVE\n\n8月10日まで視聴可能◎\n⬇️",
    url: STREAMING_FINAL_DAY_20260803_POST_URL,
    urlLabel: "引用元の配信チケット最終案内を見る"
  },
  anchorId: "gojet-yukako-final-call-quote-2026-08-03",
  primaryCta: "homepage"
};

const featuredYukakoFinalLiveQuote20260803Update: DisplayGojetFeatureUpdate = {
  date: "2026.8.3 0:53",
  label: "吉井優花子さん（@mokoopy）・千秋楽LIVE",
  title: "激熱の千秋楽LIVE｜オリジナル楽曲を全キャストで",
  body:
    "「#ゆかJET 激熱”LIVE”観てほしい👀❤️‍🔥」——全キャストで届けた千秋楽LIVEのダイジェストが公開されました。\n\nオリジナル楽曲を、さまざまな組み合わせで。ゆかJETだけの美里とメグの曲も。お客様もキャストも一緒に楽しめるよう、優花子さんが企画・構成をものすごく考えたLIVEです。\n\n約2分18秒の映像では、カラフルな衣装と赤×白のダイナーセットで、歌とダンスを次々に。配信チケットは8月3日〆切、視聴は8月10日まで。",
  caption:
    "#ゆかJET 激熱”LIVE”観てほしい👀❤️‍🔥\n\n色々なオリジナル楽曲を、様々な組み合わせでお届けしています‼️\n\nお客様もキャストも楽しめるように\n諸々ものすごく考えました💭\nたくさんの方に楽しんでほしいな🥹♪\n\n【配信チケット🎟️】\n※8月3日〆切〜10日まで視聴可能◎",
  postUrl: YUKAKO_FINAL_LIVE_QUOTE_20260803_POST_URL,
  homepageUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScsEmjjECWOVKzYuJ_93BRlS1rI8cbzcPFBb0f4mVqWNlLnuQ/viewform",
  ctaLabel: "優花子さんのX投稿を見る",
  homepageLabel: "配信チケットを申し込む（8/3〆切・¥3,700）",
  roleTags: [
    "#ゆかJET",
    "吉井優花子さん",
    "千秋楽LIVE",
    "全キャスト",
    "オリジナル楽曲",
    "美里とメグ",
    "配信チケット"
  ],
  embeddedVideo: {
    src: "https://drive.google.com/file/d/1Gq7dSABc559mD_tpibBMLIwih6pkxg1I/preview",
    label:
      "『GO,JET!GO!GO! vol.1 Premium』全キャストによる千秋楽LIVEダイジェスト（約2分18秒・音声あり）",
    note: "再生できない場合は、本人投稿または引用元投稿からご覧ください。"
  },
  deadline: {
    at: "2026-08-03T23:59:59+09:00",
    beforeText:
      "配信チケットの申し込みは8月3日（月）まで・視聴は8月10日（月）まで（¥3,700/本）",
    afterText: "配信チケットの申し込みは終了。視聴は8月10日（月）まで"
  },
  quotedPost: {
    author: "吉井優花子プロデュース公演",
    handle: "@yukako_produce",
    body:
      "#ゆかJET\n【千秋楽LIVE】🪩✨\n\nオリジナル楽曲が盛りだくさん‼️\nゆかJETだけの美里とメグの曲も…👀✨\n\n映像でもたっぷり楽しめますので\nぜひ”配信チケット”でご覧ください😊🎶",
    url: FINAL_LIVE_20260803_POST_URL,
    urlLabel: "引用元の千秋楽LIVE投稿を見る"
  },
  anchorId: "gojet-yukako-final-live-quote-2026-08-03",
  primaryCta: "homepage"
};

const featuredNumaoMayukaCGirls20260803Update:
  | DisplayGojetFeatureUpdate
  | undefined = numaoMayukaCGirls20260803Update
  ? {
      ...numaoMayukaCGirls20260803Update,
      anchorId: "gojet-numao-mayuka-c-girls-2026-08-03",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoCTeamCastQuote20260802Update:
  | DisplayGojetFeatureUpdate
  | undefined = cTeamCastRepost20260802Update
  ? {
      ...cTeamCastRepost20260802Update,
      date: "2026.8.2 21:35",
      label: "吉井優花子さん（@mokoopy）・C班",
      title: "C班紹介動画をもう一度｜配信チケットは8月3日まで",
      body:
        "「#ゆかJET C班紹介動画‼️(なぜか消えたよ👻)」——優花子さん本人から、C班の魅力たっぷりなお芝居を配信で、と改めて案内。\n\n約2分54秒の紹介動画で、相関図、キャストの表情、稽古や本番の熱をひと足先に。配信チケットは8月3日〆切、視聴は8月10日まで。",
      caption:
        "#ゆかJET\nC班紹介動画‼️(なぜか消えたよ👻)\n\nC班の魅力たっぷりなお芝居は\nぜひ『配信チケット』でご覧ください✨\n\n⬇️\n【配信チケット🎟️】\n※約100分のラブコメ×ミュージカル♪\n※8月3日〆切〜10日まで視聴可能◎",
      postUrl: YUKAKO_C_TEAM_CAST_QUOTE_20260802_POST_URL,
      ctaLabel: "優花子さんのX投稿を見る",
      roleTags: [
        "#ゆかJET",
        "吉井優花子さん",
        "C班",
        "キャスト紹介",
        "ラブコメ×ミュージカル",
        "配信チケット"
      ],
      quotedPost: {
        author: "吉井優花子プロデュース公演",
        handle: "@yukako_produce",
        // 引用元（公式再投稿）の本文をそのまま残す。
        body:
          cTeamCastRepost20260802Update.caption ??
          "消えていたC班キャスト紹介を再投稿。A班・B班も遡って見られます。",
        url: C_TEAM_CAST_REPOST_20260802_POST_URL,
        urlLabel: "引用元のC班キャスト紹介（公式再投稿）を見る"
      },
      anchorId: "gojet-yukako-c-team-cast-quote-2026-08-02",
      primaryCta: "homepage"
    }
  : undefined;

const featuredYukakoATeamCharacterIntroQuote20260802Update:
  | DisplayGojetFeatureUpdate
  | undefined = aTeamCharacterIntro20260801Update
  ? {
      ...aTeamCharacterIntro20260801Update,
      date: "2026.8.2 21:42",
      label: "吉井優花子さん（@mokoopy）・A班",
      title:
        "マスターはいじりようなくて💭笑｜Aガールズのキャッキャッがかわいい",
      body:
        "「A班のマスターは…いじりようなくて💭笑」「Aガールズのキャッキャッがかわいい🙂‍↕️」——優花子さんのひと言と一緒に見る、A班キャラ紹介ナレーション。\n\n約2分52秒の舞台映像には、A班の明るい歌・ダンス・掛け合いがたっぷり。落ち着いたマスターと、にぎやかなAガールズの空気にも注目です。配信チケットは8月3日〆切、視聴は8月10日まで。",
      caption:
        "#ゆかJET キャラ紹介を公開❣️\n\nA班のマスターは…いじりようなくて💭笑\n\nAガールズのキャッキャッがかわいい🙂‍↕️",
      postUrl: YUKAKO_A_TEAM_CHARACTER_INTRO_QUOTE_20260802_POST_URL,
      ctaLabel: "優花子さんのX投稿を見る",
      roleTags: [
        "#ゆかJET",
        "吉井優花子さん",
        "A班",
        "キャラ紹介ナレーション",
        "マスター",
        "Aガールズ",
        "配信チケット"
      ],
      quotedPost: {
        author: "吉井優花子プロデュース公演",
        handle: "@yukako_produce",
        // 引用元（公演アカウント）の本文をそのまま残す。
        body:
          aTeamCharacterIntro20260801Update.caption ??
          "三班連続の第1弾、A班のキャラクター紹介ナレーション映像。",
        url: A_TEAM_CHARACTER_INTRO_20260801_POST_URL,
        urlLabel: "引用元のA班キャラ紹介（公演アカウント）を見る"
      },
      anchorId: "gojet-yukako-a-team-character-intro-quote-2026-08-02",
      primaryCta: "homepage"
    }
  : undefined;

const featuredYukakoBTeamCharacterIntroQuote20260802Update:
  | DisplayGojetFeatureUpdate
  | undefined = bTeamCharacterIntro20260801Update
  ? {
      ...bTeamCharacterIntro20260801Update,
      date: "2026.8.2 21:39",
      label: "吉井優花子さん（@mokoopy）・B班",
      title: "マスターナレは･･･ちっちゃい😂｜あ、大地も🫶笑",
      body:
        "「B班のマスターナレは･･･ちっちゃい😂 あ、大地も🫶笑」——優花子さんのツッコミと一緒に見る、B班キャラ紹介ナレーション。\n\n約3分01秒の舞台映像には、女性キャストだけで作り上げたB班の歌・ダンス・掛け合いがたっぷり。マスターと大地の登場にも注目です。配信チケットは8月3日〆切、視聴は8月10日まで。",
      caption:
        "#ゆかJET 紹介ナレーション公開✨\n\nB班のマスターナレは･･･ちっちゃい😂\n\nあ、大地も🫶笑",
      postUrl: YUKAKO_B_TEAM_CHARACTER_INTRO_QUOTE_20260802_POST_URL,
      ctaLabel: "優花子さんのX投稿を見る",
      roleTags: [
        "#ゆかJET",
        "吉井優花子さん",
        "B班",
        "キャラ紹介ナレーション",
        "マスター",
        "大地",
        "配信チケット"
      ],
      quotedPost: {
        author: "吉井優花子プロデュース公演",
        handle: "@yukako_produce",
        // 引用元（公演アカウント）の本文をそのまま残す。
        body:
          bTeamCharacterIntro20260801Update.caption ??
          "三班連続の第2弾、女性キャストのみのB班キャラクター紹介ナレーション映像。",
        url: B_TEAM_CHARACTER_INTRO_20260801_POST_URL,
        urlLabel: "引用元のB班キャラ紹介（公演アカウント）を見る"
      },
      anchorId: "gojet-yukako-b-team-character-intro-quote-2026-08-02",
      primaryCta: "homepage"
    }
  : undefined;

// A班・B班・C班のキャラ紹介／キャスト紹介は、優花子さん本人の引用投稿カードを代表カードとして
// 1件だけ並べる（本人の言葉＋引用元の公式投稿＋既存動画を1セットで保持）。
// 引用元の公式投稿は代表カード内の「引用元投稿」欄からURL付きで辿れるため、
// 同じ動画・ポスター・配信導線を持つ公式カードは一覧に重ねて出さない。
// 元データは src/data/gojetPromo.ts にそのまま残している。

const featuredSakiTrio20260801Update:
  | DisplayGojetFeatureUpdate
  | undefined = sakiTrio20260801Update
  ? {
      ...sakiTrio20260801Update,
      anchorId: "gojet-saki-trio-2026-08-01",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoFuchanConnection20260801Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoFuchanConnection20260801Update
  ? {
      ...yukakoFuchanConnection20260801Update,
      anchorId: "gojet-yukako-fuchan-connection-2026-08-01",
      primaryCta: "post"
    }
  : undefined;

const featuredCTeamCharacterIntro20260801Update:
  | DisplayGojetFeatureUpdate
  | undefined = cTeamCharacterIntro20260801Update
  ? {
      ...cTeamCharacterIntro20260801Update,
      anchorId: "gojet-c-team-character-intro-2026-08-01",
      primaryCta: "homepage"
    }
  : undefined;

const featuredRehearsalLookback20260801Update:
  | DisplayGojetFeatureUpdate
  | undefined = rehearsalLookback20260801Update
  ? {
      ...rehearsalLookback20260801Update,
      anchorId: "gojet-rehearsal-lookback-2026-08-01",
      primaryCta: "homepage"
    }
  : undefined;

const featuredRyomaCastmates20260731Update:
  | DisplayGojetFeatureUpdate
  | undefined = ryomaCastmates20260731Update
  ? {
      ...ryomaCastmates20260731Update,
      anchorId: "gojet-ryoma-castmates-2026-07-31",
      primaryCta: "post"
    }
  : undefined;

const featuredDualRolesRyoma20260731Update:
  | DisplayGojetFeatureUpdate
  | undefined = dualRolesRyoma20260731Update
  ? {
      ...dualRolesRyoma20260731Update,
      anchorId: "gojet-dual-roles-ryoma-2026-07-31",
      primaryCta: "post"
    }
  : undefined;

const featuredStreamingFinalCall20260731Update:
  | DisplayGojetFeatureUpdate
  | undefined = streamingFinalCall20260731Update
  ? {
      ...streamingFinalCall20260731Update,
      anchorId: "gojet-streaming-final-call-2026-07-31",
      primaryCta: "homepage"
    }
  : undefined;

const featuredThreeJets20260731Update:
  | DisplayGojetFeatureUpdate
  | undefined = threeJets20260731Update
  ? {
      ...threeJets20260731Update,
      anchorId: "gojet-three-jets-2026-07-31",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoNextStage20260731Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoNextStage20260731Update
  ? {
      ...yukakoNextStage20260731Update,
      anchorId: "gojet-yukako-next-stage-2026-07-31",
      primaryCta: "post"
    }
  : undefined;

const featuredSupportContentShipping20260730Update:
  | DisplayGojetFeatureUpdate
  | undefined = supportContentShipping20260730Update
  ? {
      ...supportContentShipping20260730Update,
      anchorId: "gojet-support-content-shipping-2026-07-30",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoLookback120260729Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoLookback120260729Update
  ? {
      ...yukakoLookback120260729Update,
      anchorId: "gojet-yukako-lookback-1-2026-07-29",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoStreamingTicket20260729Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoStreamingTicket20260729Update
  ? {
      ...yukakoStreamingTicket20260729Update,
      anchorId: "gojet-yukako-streaming-ticket-2026-07-29",
      primaryCta: "homepage"
    }
  : undefined;

const featuredNumaoMayukaMegs20260729Update:
  | DisplayGojetFeatureUpdate
  | undefined = numaoMayukaMegs20260729Update
  ? {
      ...numaoMayukaMegs20260729Update,
      anchorId: "gojet-numao-mayuka-megs-2026-07-29",
      primaryCta: "post"
    }
  : undefined;

const featuredProduceFinale20260729Update:
  | DisplayGojetFeatureUpdate
  | undefined = produceFinale20260729Update
  ? {
      ...produceFinale20260729Update,
      anchorId: "gojet-produce-finale-2026-07-29",
      primaryCta: "post"
    }
  : undefined;

const featuredCastVoicesFinale20260727Update:
  | DisplayGojetFeatureUpdate
  | undefined = castVoicesFinale20260727Update
  ? {
      ...castVoicesFinale20260727Update,
      anchorId: "gojet-cast-voices-finale-2026-07-27",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoFinale20260728Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoFinale20260728Update
  ? {
      ...yukakoFinale20260728Update,
      anchorId: "gojet-yukako-finale-2026-07-28",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoYellCards20260727Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoYellCards20260727Update
  ? {
      ...yukakoYellCards20260727Update,
      anchorId: "gojet-yukako-yell-cards-2026-07-27",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoDay4Wrap20260727Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoDay4Wrap20260727Update
  ? {
      ...yukakoDay4Wrap20260727Update,
      anchorId: "gojet-yukako-day4-wrap-2026-07-27",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoScheduleChange20260726Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoScheduleChange20260726Update
  ? {
      ...yukakoScheduleChange20260726Update,
      anchorId: "gojet-schedule-change-2026-07-27",
      primaryCta: "post"
    }
  : undefined;

const featuredKurumeMaimuBbanFinale20260726Update:
  | DisplayGojetFeatureUpdate
  | undefined = kurumeMaimuBbanFinale20260726Update
  ? {
      ...kurumeMaimuBbanFinale20260726Update,
      anchorId: "gojet-kurume-maimu-bban-finale-2026-07-26",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoSongsStaging20260726Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoSongsStaging20260726Update
  ? {
      ...yukakoSongsStaging20260726Update,
      anchorId: "gojet-yukako-songs-staging-2026-07-26",
      primaryCta: "post"
    }
  : undefined;

const featuredYaguchiShuDay320260726Update:
  | DisplayGojetFeatureUpdate
  | undefined = yaguchiShuDay320260726Update
  ? {
      ...yaguchiShuDay320260726Update,
      anchorId: "gojet-yaguchi-shu-day3-2026-07-26",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoDay3Wrap20260726Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoDay3Wrap20260726Update
  ? {
      ...yukakoDay3Wrap20260726Update,
      anchorId: "gojet-yukako-day3-wrap-2026-07-26",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoRemainingShows20260725Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoRemainingShows20260725Update
  ? {
      ...yukakoRemainingShows20260725Update,
      anchorId: "gojet-yukako-remaining-shows-2026-07-25",
      primaryCta: "post"
    }
  : undefined;

const featuredMimuraSumikaCDay220260725Update:
  | DisplayGojetFeatureUpdate
  | undefined = mimuraSumikaCDay220260725Update
  ? {
      ...mimuraSumikaCDay220260725Update,
      anchorId: "gojet-mimura-sumika-cban-day2-2026-07-25",
      primaryCta: "post"
    }
  : undefined;

const featuredAkinoAoinari20260725Update:
  | DisplayGojetFeatureUpdate
  | undefined = akinoAoinari20260725Update
  ? {
      ...akinoAoinari20260725Update,
      anchorId: "gojet-akino-aoinari-2026-07-25",
      primaryCta: "post"
    }
  : undefined;

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

const featuredAraiAccessVideo20260723Update:
  | DisplayGojetFeatureUpdate
  | undefined = araiAccessVideo20260723Update
  ? {
      ...araiAccessVideo20260723Update,
      anchorId: "gojet-arai-access-video-2026-07-23",
      primaryCta: "post"
    }
  : undefined;

const featuredOpeningNightReport20260723Update:
  | DisplayGojetFeatureUpdate
  | undefined = openingNightReport20260723Update
  ? {
      ...openingNightReport20260723Update,
      anchorId: "gojet-opening-night-report-2026-07-23",
      primaryCta: "post"
    }
  : undefined;

const featuredYukakoJetOpeningGoods20260724Update:
  | DisplayGojetFeatureUpdate
  | undefined = yukakoJetOpeningGoods20260724Update
  ? {
      ...yukakoJetOpeningGoods20260724Update,
      anchorId: "gojet-yukako-jet-opening-goods-2026-07-24",
      primaryCta: "homepage"
    }
  : undefined;

const featuredOfficialXNews20260724Update:
  | DisplayGojetFeatureUpdate
  | undefined = officialXNews20260724Update
  ? {
      ...officialXNews20260724Update,
      anchorId: "gojet-official-x-news-2026-07-24",
      primaryCta: "post"
    }
  : undefined;

const featuredPenlightSchedule20260724Update:
  | DisplayGojetFeatureUpdate
  | undefined = penlightSchedule20260724Update
  ? {
      ...penlightSchedule20260724Update,
      anchorId: "gojet-penlight-schedule-2026-07-24",
      primaryCta: "post"
    }
  : undefined;

const featuredAokiAnnaDay2Heart20260724Update:
  | DisplayGojetFeatureUpdate
  | undefined = aokiAnnaDay2Heart20260724Update
  ? {
      ...aokiAnnaDay2Heart20260724Update,
      anchorId: "gojet-aoki-anna-day2-heart-2026-07-24",
      primaryCta: "post"
    }
  : undefined;

const featuredKaeYukajetDay220260724Update:
  | DisplayGojetFeatureUpdate
  | undefined = kaeYukajetDay220260724Update
  ? {
      ...kaeYukajetDay220260724Update,
      anchorId: "gojet-kae-yukajet-day2-2026-07-24",
      primaryCta: "post"
    }
  : undefined;

const featuredKurumeMaimuDay220260724Update:
  | DisplayGojetFeatureUpdate
  | undefined = kurumeMaimuDay220260724Update
  ? {
      ...kurumeMaimuDay220260724Update,
      anchorId: "gojet-kurume-maimu-day2-2026-07-24",
      primaryCta: "post"
    }
  : undefined;

const featuredOfficialVisitorGoods20260723Update:
  | DisplayGojetFeatureUpdate
  | undefined = officialVisitorGoods20260723Update
  ? {
      ...officialVisitorGoods20260723Update,
      anchorId: "gojet-official-visitor-goods-2026-07-23",
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

// 8/24 19:16公演アカウント（オリジナル楽曲②・メグ『認めたくないのに』）→
// 8/19 21:09公演アカウント（オリジナル楽曲①・美里『未来は薔薇色』⇄『未来は灰色』）→
// 8/10 10:36優花子さん本人（配信視聴最終日・A/B/C班集合写真）→
// 8/9優花子さん本人（8/10までの配信・感想投稿の呼びかけ）→
// 8/8 9:25優花子さん本人（JETの妹・メグ役紹介とA班の歌声）→
// 8/3 21:52優花子さん本人（載せていない見所・配信チケットの購入は本日まで）→
// 8/3 20:40沼尾麻由佳さん（メグから見た早紀とC班ガールズ）→
// 8/3 0:53優花子さん本人（千秋楽LIVEダイジェストを引用・配信チケット最終案内）→
// 8/2 21:42優花子さん本人（A班キャラ紹介ナレーションを引用・Aガールズの掛け合い）→
// 8/2 21:39優花子さん本人（B班キャラ紹介ナレーションを引用・マスターと大地へのツッコミ）→
// 8/2 21:35優花子さん本人（C班紹介動画を引用・配信チケット最終案内）→
// 8/1 23:50優花子さん×中原楓歌さん（偶然のご縁・また一緒に良い仕事を）→
// 8/1 23:33公演アカウント（三班連続のラスト・C班キャラクター紹介映像）→
// 8/1 14:52秋乃蒼依さん（早紀3人の集合セルフィー・三者三様の早紀）→
// 8/1 12:27優花子さん本人（稽古1カ月弱の振り返り・配信は約100分）→
// 7/31 23:11優花子さん本人（龍馬とJET違いすぎ・龍馬くん2026のB班映像）→
// 7/31 22:55優花子さん本人（男女二役の振り幅・龍馬くん2026との重ね合わせ）→
// 7/31 21:18公演アカウント（配信チケットの購入は3日まで・A/B/C班見比べ）→
// 7/31 18:45優花子さん本人（三者三様のJET・配信チケット案内）→
// 7/31 2:42優花子さん本人（次は何をしようか・作品の質へのこだわり）→
// 7/30 13:48公演アカウント（応援コンテンツの発送完了・順次送付）→
// 7/29 23:48優花子さん本人（振り返りつぶやき①・声と初プロデュースの学び）→
// 7/29 22:22優花子さん本人（配信チケットの案内・8/3〆切）→
// 7/29 21:56沼尾麻由佳さん（3つ子メグと千秋楽オフショット）→
// 7/29 18:45公演アカウント（終演報告・配信チケット案内）→
// 7/28 2:42優花子さん本人（全公演終了）→ 7/27〜28キャストの千秋楽投稿まとめ →
// 7/27 1:49優花子さん本人（喉と向き合いながらの最終日）→
// 7/27 1:32優花子さん本人（4日目終演・A班B班千秋楽の振り返りと最終日案内）→
// 7/26 23:29優花子さん本人（最終日LIVEの15分繰り下げ案内）→
// 7/26 22:34来瞳舞夢さん（B班千秋楽の完走報告）→ 7/26 10:32優花子さん本人（脚色・楽曲制作への想い）→
// 7/26 1:30矢口秀さん（3日目共演者投稿）→ 7/26 0:05優花子さん本人（3日目終演レポート）→
// 7/25 23:49優花子さん本人（残り公演の呼びかけ）→ 7/25 22:43三村すみかさん →
// 7/25 11:31秋乃蒼依さん → 21:24青木杏奈さん → 20:40曽原加絵さん → 19:06来瞳舞夢さんの順で先頭表示する。
const orderedGojetFeatureUpdates: DisplayGojetFeatureUpdate[] = [
  ...(featuredOriginalSongsMeg20260824Update
    ? [featuredOriginalSongsMeg20260824Update]
    : []),
  ...(featuredOriginalSongsMisato20260819Update
    ? [featuredOriginalSongsMisato20260819Update]
    : []),
  ...(featuredYukakoStreamingViewingFinalDay20260810Update
    ? [featuredYukakoStreamingViewingFinalDay20260810Update]
    : []),
  ...(featuredYukakoStreamingMessage20260809Update
    ? [featuredYukakoStreamingMessage20260809Update]
    : []),
  ...(featuredYukakoMegCastIntro20260808Update
    ? [featuredYukakoMegCastIntro20260808Update]
    : []),
  featuredYukakoFinalCallQuote20260803Update,
  ...(featuredNumaoMayukaCGirls20260803Update
    ? [featuredNumaoMayukaCGirls20260803Update]
    : []),
  featuredYukakoFinalLiveQuote20260803Update,
  ...(featuredYukakoATeamCharacterIntroQuote20260802Update
    ? [featuredYukakoATeamCharacterIntroQuote20260802Update]
    : []),
  ...(featuredYukakoBTeamCharacterIntroQuote20260802Update
    ? [featuredYukakoBTeamCharacterIntroQuote20260802Update]
    : []),
  ...(featuredYukakoCTeamCastQuote20260802Update
    ? [featuredYukakoCTeamCastQuote20260802Update]
    : []),
  ...(featuredYukakoFuchanConnection20260801Update
    ? [featuredYukakoFuchanConnection20260801Update]
    : []),
  ...(featuredCTeamCharacterIntro20260801Update
    ? [featuredCTeamCharacterIntro20260801Update]
    : []),
  ...(featuredSakiTrio20260801Update ? [featuredSakiTrio20260801Update] : []),
  ...(featuredRehearsalLookback20260801Update
    ? [featuredRehearsalLookback20260801Update]
    : []),
  ...(featuredRyomaCastmates20260731Update
    ? [featuredRyomaCastmates20260731Update]
    : []),
  ...(featuredDualRolesRyoma20260731Update
    ? [featuredDualRolesRyoma20260731Update]
    : []),
  ...(featuredStreamingFinalCall20260731Update
    ? [featuredStreamingFinalCall20260731Update]
    : []),
  ...(featuredThreeJets20260731Update
    ? [featuredThreeJets20260731Update]
    : []),
  ...(featuredYukakoNextStage20260731Update
    ? [featuredYukakoNextStage20260731Update]
    : []),
  ...(featuredSupportContentShipping20260730Update
    ? [featuredSupportContentShipping20260730Update]
    : []),
  ...(featuredYukakoLookback120260729Update
    ? [featuredYukakoLookback120260729Update]
    : []),
  ...(featuredYukakoStreamingTicket20260729Update
    ? [featuredYukakoStreamingTicket20260729Update]
    : []),
  ...(featuredNumaoMayukaMegs20260729Update
    ? [featuredNumaoMayukaMegs20260729Update]
    : []),
  ...(featuredProduceFinale20260729Update
    ? [featuredProduceFinale20260729Update]
    : []),
  ...(featuredYukakoFinale20260728Update
    ? [featuredYukakoFinale20260728Update]
    : []),
  ...(featuredCastVoicesFinale20260727Update
    ? [featuredCastVoicesFinale20260727Update]
    : []),
  ...(featuredYukakoYellCards20260727Update
    ? [featuredYukakoYellCards20260727Update]
    : []),
  ...(featuredYukakoDay4Wrap20260727Update
    ? [featuredYukakoDay4Wrap20260727Update]
    : []),
  ...(featuredYukakoScheduleChange20260726Update
    ? [featuredYukakoScheduleChange20260726Update]
    : []),
  ...(featuredKurumeMaimuBbanFinale20260726Update
    ? [featuredKurumeMaimuBbanFinale20260726Update]
    : []),
  ...(featuredYukakoSongsStaging20260726Update
    ? [featuredYukakoSongsStaging20260726Update]
    : []),
  ...(featuredYaguchiShuDay320260726Update
    ? [featuredYaguchiShuDay320260726Update]
    : []),
  ...(featuredYukakoDay3Wrap20260726Update
    ? [featuredYukakoDay3Wrap20260726Update]
    : []),
  ...(featuredYukakoRemainingShows20260725Update
    ? [featuredYukakoRemainingShows20260725Update]
    : []),
  ...(featuredMimuraSumikaCDay220260725Update
    ? [featuredMimuraSumikaCDay220260725Update]
    : []),
  ...(featuredAkinoAoinari20260725Update
    ? [featuredAkinoAoinari20260725Update]
    : []),
  ...(featuredAokiAnnaDay2Heart20260724Update
    ? [featuredAokiAnnaDay2Heart20260724Update]
    : []),
  ...(featuredKaeYukajetDay220260724Update
    ? [featuredKaeYukajetDay220260724Update]
    : []),
  ...(featuredKurumeMaimuDay220260724Update
    ? [featuredKurumeMaimuDay220260724Update]
    : []),
  ...(featuredPenlightSchedule20260724Update
    ? [featuredPenlightSchedule20260724Update]
    : []),
  ...(featuredYukakoJetOpeningGoods20260724Update
    ? [featuredYukakoJetOpeningGoods20260724Update]
    : []),
  ...(featuredOfficialXNews20260724Update
    ? [featuredOfficialXNews20260724Update]
    : []),
  ...(featuredOpeningNightReport20260723Update
    ? [featuredOpeningNightReport20260723Update]
    : []),
  ...(featuredAraiAccessVideo20260723Update
    ? [featuredAraiAccessVideo20260723Update]
    : []),
  ...(featuredOfficialVisitorGoods20260723Update
    ? [featuredOfficialVisitorGoods20260723Update]
    : []),
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
