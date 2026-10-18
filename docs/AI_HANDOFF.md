# AI_HANDOFF — yukako-schedule-2026

> 最終更新: 2026-10-18（Claude Code が、これまでの制作・運用の全体を次のAIへ引き継ぐために作成）
> 読む順番: `AGENTS.md` → `README.md` → **このファイル** → `docs/DECISION_LOG.md` → `docs/AI_PROJECT_MEMORY_SKILL.md` → 自分の担当指示書（Claude=`docs/SONNET.md` / Codex=`docs/CODEX.md`）→ 対象コード・テスト

「いまの状態」のセーブデータです。ルール本体は `AGENTS.md`。ここはルールを追加・緩和しません。

---

## 1. このプロジェクトは何か

- 吉井優花子（よしい ゆかこ）さんの**非公式の応援スケジュールサイト**（ファン制作の応援ポータル）。
- 公開コンテンツは常に「ファン / サポーターとして応援している立場」。

| 項目 | 値 |
| --- | --- |
| repo | `ackey1007fw-coder/yukako-schedule-2026`（public） / base `main` |
| 本番 | https://yukako-schedule-2026.vercel.app/ （`main` merge → Vercel 自動デプロイ） |
| stack | Vite / React / TypeScript / Tailwind / pnpm / Vercel Functions（ESM） / 任意で Google Sheets + Apps Script API |
| 配色 | クリムゾン × ゴールド × アイボリー（白背景の金文字は `champagneInk` #8a6d2e、暗い背景は `champagne` #c29a4a） |
| 姉妹サイト | 里季さんのサイトは**別repo**。人物・SNS・演目・画像・配色を持ち込まない（Site Identity Guard が検出） |
| 親ポータル | フッターの「応援アーカイブ」→ https://ouen-archive-564c.vercel.app/ 。このサイトは portal feed を提供（`pnpm test:portal-feed`） |
| AI分担 | Codex＝データ更新が第一レーン（`docs/CODEX.md`）、Claude＝UI/UX・レビュー・文言・CI（`docs/SONNET.md`）。レーンは「最優先」であって「専有」ではない |

## 2. いま公開されているもの

ホーム（1ページ）+ 静的生成の `/archive/<slug>`（YUKAKO STORY ARCHIVE）と `/works/<slug>`。主なセクション:

- Hero / 今日・次の予定 / 優先バナー / 最新情報（`siteUpdates.ts` で集約）/ スケジュール・カレンダー
- **#ゆかJET**（プロデュース公演）特集：チーム、キャストの声、エールカード、千秋楽レポート、オリジナル楽曲、告知資料（`gojetPromo.ts`）
- 出演アーカイブ: お嬢様はバンドがやりたい、龍馬くん、BABY SHARK LIVE!、MISS GRAND JAPAN（MC・運営）、秋田との絆（竿燈・角館・大曲花火・秋田犬）、主演ショートドラマ『次の目的地』前後編
- 配信コーナー `#stream-recaps`（`docs/STREAM-RECAPS.md`）、SHOWROOM（`room_id=347571`）、フォトギャラリー（本人スナップのみ）、クリップ、歩み、プロフィール

## 3. 現在地点（2026-10-18 時点）

- **次の大きな出演: ミュージカル『Golden & Glass』2026-11-26〜30、Air Studio 両国**。情報解禁・予約開始予定（#221）、公式HP・来場/配信・応援リンク（#224）、10/14 顔合わせX投稿（#225）まで掲載済み。共有フィードは公演最終日まで保持（#223）。
- 配信コーナーは 9/16 から開始し、9/25 深夜回まで掲載。
- 予約開始・チケット・配信情報の続報は、**公式・本人の一次情報で確認してから**反映する。

## 4. 未完了・次にやること

- 『Golden & Glass』の予約開始・タイムテーブル・配信の続報反映、公演期間中の更新、終演後のアーカイブ化。
- 7月〜9月の古い Open PR が残っている。本数・番号は変わるので**着手時に GitHub で確認**し、同じファイルを触っていないか見る。整理はオーナーに提案する。
- **要確認**: `pending-media/yukajet/` に第三者（観劇したお客さん）のStory画像2枚が公開repoに置かれている（#110 由来、未掲載のまま）。本人・第三者の承認範囲が不明なら、公開repoから外すべきかオーナーに確認する。勝手に削除しない。

## 5. 日々の更新の型

1. `AGENTS.md`（特に**文体ガイド**）と担当指示書を読む。
2. `main` から作業ブランチ（例: `claude/fix-xxx` / `codex/news-YYYY-MM-DD`）。
3. お知らせ `news.ts`（先頭に追加。過去投稿は `date` を元投稿日、`listedAt` を掲載日）。CLI `pnpm add:news` も使える。
4. 写真: 本人スナップ → `photos.ts`、フライヤー等の**告知画像 → `gojetPromo.ts`**（ギャラリーに混ぜない）。`public/images/yukako-*.jpg` に保存 → `node scripts/generate-responsive-images.mjs`。同名上書き禁止・`md5sum` で重複確認。
5. 品質ゲート → PR → CI green → マージ前チェックリスト → **AIの判断で squash merge** → 本番確認。

```bash
pnpm install --frozen-lockfile
pnpm typecheck && pnpm test:add-news && pnpm test:gojet && pnpm build
node scripts/check-site-identity.mjs main
git diff --check                      # 未ステージの変更
git diff --cached --check             # ステージ済みの変更
git diff --check origin/main...HEAD   # コミット済みのPR差分（最新のbaseを取得後）
```

一般の `pnpm test` はない。触った領域のテスト（`test:portal-feed` / `test:stream-recaps` など）を追加で実行する。UI変更は 390px で `scrollWidth` が viewport を超えないことを確認。

## 6. ハマりどころ（実際に踏んだもの）

- `SectionReveal` が `transform` を使うため、子孫の `position: fixed` が効かない → モーダルは `createPortal(…, document.body)`。
- 横スクロール帯を grid/flex に入れると親が伸びる → 親に `min-w-0`。長いURLは `break-words`（#109：1枚のカードの長いURLで全カードが910px幅になった）。
- 未確認のURL・引用・締切を「それらしく」書いて削除になった（#109）。確認できないものは載せない。
- 情報が載った告知画像はサムネイルでも `object-contain`（切れると読めない）。
- 文体: 「〜を投稿。」「〜と伝えています」で締めない、感情の代弁をしない、カギ括弧は原文どおりのみ。
- 血液型「AB型」はオーナーが明示確認済みの事実。Web検索で一次情報が見つからないという理由だけで消さない。
- 年次（例: 退職年）を断定的に載せるときは、その時点の出典を確認する。

## 7. 自律マージの対象外（オーナーに確認）

プロフィール事実の書き換え、出典不明の記述、セクション/ページの削除、配色・レイアウトの全面刷新、出典や本人性が確認できない写真、**本人承認のない二次素材（配信スクショ・切り抜き等）**の公開。

## 8. 心構え

- 主役は優花子さん。読み手はファン。「書き手の顔が見える、短く温度のある文」にする。AIの要約文に見える文章は入れない。
- 事実は一次情報か、オーナーが明示確認したものだけ。
- 二次素材は**素材ごと・掲載先ごとに本人承認**。過去の許可や「各SNSに展開して」という依頼を流用しない。
- Claude は Codex の仕事を抑え込むのではなく、レビューで**水準を引き上げる**。良い点は具体的に褒め、直し方を先に示す。直したらパターンを言語化して共有する。
- 他AIの未マージPRを上書きしない。依頼範囲外の改善は別PR。

## 9. 反省と改善

| 反省 | 改善（いまの仕組み） |
| --- | --- |
| 里季サイトと1repo2ブランチで同居し、取り違えが起きた | 2026-07 に独立repo化。Site Identity Guard をCI必須に |
| 画像の同名差し替えでキャッシュ・取り違え | Image Overwrite Guard と「新しいファイル名で差し替え」ルール |
| 未確認URL・引用の掲載、長いURLによるレイアウト崩れ（#109） | 出典確認をマージ条件に。`min-w-0` / `break-words` をレイアウト注意に明記 |
| AI要約調・レポート調の文章が増えた | AGENTS の文体ガイド（禁止パターン・良い例/悪い例） |
| オーナーの「マージして」待ちで更新が滞った | CI green + チェックリストでAIが自律squash merge（#125）。戻すときは revert PR |
| 告知画像がフォトギャラリーに混ざった | `photos.ts`（本人スナップ）と `gojetPromo.ts`（告知）の振り分け表 |
