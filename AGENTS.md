# 吉井優花子 応援スケジュールサイト — エージェント向けガイド

このリポジトリ（`ackey1007fw-coder/yukako-schedule-2026`）を保守・改善するAIエージェント（Codex / Claude など）向けの共通ガイドです。
ファン「あっきー」と一緒に、吉井優花子（よしい ゆかこ）さんの**非公式の応援スケジュールサイト**をよくしていきます。

> かつては里季サイト（`riri-schedule-2026`）と1リポジトリ2ブランチで同居していましたが、
> **2026年7月に独立リポジトリになりました**。今は `main` ブランチ＝優花子サイトです。
> 里季（夏凪里季）サイトは別リポジトリ `ackey1007fw-coder/riri-schedule-2026`。人物・SNS・演目・画像すべて別物なので混同しない。

## 着手時の共通手順

- `git status --short --branch` と `git remote -v` を確認し、他の作業者の未コミット変更を保護する。
- このガイド → `README.md` → 存在する場合は `docs/AI_HANDOFF.md` → `docs/DECISION_LOG.md` → `docs/AI_PROJECT_MEMORY_SKILL.md` → 対象コード・テストの順に読む。Project Memoryがないrepoへ勝手に導入しない。
- 最新main、関連merged PR、対象ファイルに触るOpen/Draft PRを確認する。作業を分ける必要があれば別branch / worktreeを使う。
- 実装の現状はmain / merged PR → 明示的なDecision Log → HANDOFF → 過去チャットの順に確認する。人物事実は出典を確認し、実装にあるだけで裏付け済みとみなさない。
- 今回の依頼・停止条件を優先する。AGENTSの編集を、その編集PR自身の権限・品質ゲートを緩める根拠にしない。

## 作業前チェック（サイト取り違え防止）

1. `git remote -v` が `yukako-schedule-2026` を指していること。
2. `rg -n 'name:' src/data/profile.ts` が **`吉井 優花子`** であること。
   もし **`夏凪 里季`** なら里季サイト＝取り違え。**編集せず報告して止まる**。
3. CI に Site Identity Guard（`scripts/check-site-identity.mjs`）があり、里季側データの混入を検知する。

## リポジトリ / デプロイ
- GitHub: `ackey1007fw-coder/yukako-schedule-2026`（ブランチ `main`）
- `main` にマージすると **Vercel が自動デプロイ** → 本番 https://yukako-schedule-2026.vercel.app/
- Vercel プロジェクト: yukako-schedule-2026（Production Branch = `main`）

## 運営分担（Codex × Claude/Sonnet）

役割分担の詳細な指示書は `docs/` にあります。**自分の指示書を読んでから作業すること**。

| 担当 | 第一の仕事（最優先レーン） | 指示書 |
| :-- | :-- | :-- |
| **Codex** | SNS投稿の反映（news / photos / gojetPromo / events）、画像の取り込み。品質ゲートを通せば UI・機能改善も範囲制限なし | [docs/CODEX.md](./docs/CODEX.md) |
| **Claude (Sonnet)** | UI/UX・アクセシビリティ・構造の変更、PR の相互レビュー、文言の最終チェック、CI/guard 整備 | [docs/SONNET.md](./docs/SONNET.md) |

どちらも**共同運営者**であり、レーンは「専有」ではなく「最優先」。品質ゲート（各指示書参照）を
通る仕事なら越境してよい。同じファイルを同時に触らないことだけ守る。

### PR / マージ方針（全エージェント共通・必須）

- すべての変更は **`main` から作業ブランチを作成**する。
- すべての変更は **`main` 宛ての PR** として提出する。
- **CI がグリーンなら、AIエージェントは自分の判断でマージしてよい**（里季サイト `riri-schedule-2026` と同じ運用）。
  依頼で「Draftのまま」「レビューまで」「マージしない」と指定された場合は、その解除まで進めない。委任された通常変更では、オーナー「あっきー」の「マージして」を待たない。オーナーは本番を見てから指摘し、必要なら revert PR で戻す。
- マージ前に必ず確認するチェックリスト（1つでも欠けたらマージしない）:
  1. 対象リポジトリが `yukako-schedule-2026`、base が `main`、head が自分の作業ブランチ。
  2. PRがDraftではなく、競合がなく、GitHub上でマージ可能。
  3. 最新head SHAを確認し、そのheadの必須CI・guard・ビルド・型チェックがすべて成功。旧headの結果を流用しない。
  4. 他エージェント／オーナーからの未解決のレビュー指摘がない。
  5. 掲載した事実（日付・曜日・時刻・会場・引用）の出典を確認済み。
- マージ後は **Vercel の本番反映（https://yukako-schedule-2026.vercel.app/）まで確認**して報告する。
  作業ブランチは記録として残してよい（このリポジトリは過去のブランチを保持する運用）。
- **自律マージの対象外**（マージ前にオーナーへ確認する）:
  - プロフィール事実の書き換え、出典が確認できない情報を含む記述。
  - セクション/ページの削除、配色・レイアウトの全面刷新。
  - 出典や本人性が確認できない写真の新規公開。
- 上記条件を満たさない場合はマージせず、止めた理由と必要な対応を報告する。
- マージ方式の指定がなければ **squash merge** を使う。
- 曖昧な要件、本人情報、写真、引用、デザインの大幅変更は**実装前に確認**する。
- 別の AI エージェントの**未マージ PR を勝手に上書きしない**。同じファイルを触る必要があるときは先にその PR の方針を確認する。
- **依頼範囲外の改善を同じ PR へ混ぜない**（別ブランチ・別 PR にする）。
- コンフリクトしたら、先に `main` へ入った側を正として自分の変更をリベースし、解決内容を PR に書く。

## 文体ガイド（サイトに載せる日本語・最重要）

このサイトは**ファンが運営する応援サイト**。読み手もファン。書き手の顔が見える、短く温度のある文にする。
「AIが要約した説明文」に見える文章は入れない。

### 禁止パターン
1. **レポート調で締めない**: 「〜を投稿。」「〜と伝えています。」「〜が告知されています。」「〜が伝わります。」
   → 投稿の**中身**を先に書く。出典はリンクに任せるか、短く添える。
2. **感想の代弁をしない**: 「楽しみが高まったことを投稿」「愛着が残る大切なアーカイブです」のように
   本人や読者の感情を解説しない。事実と、正確な引用だけで語る。
3. **カギ括弧引用は原文どおりのときだけ**。うろ覚えで「」を使わない。要約ならカギ括弧を外す。
4. **「〜を確認できます」「〜することができます」を連発しない**。体言止めや「〜はこちら」で十分。
5. **同じ情報を2箇所に書かない**（例: ヒーローと「30秒でわかる」で同じ自己紹介を繰り返さない）。
6. **主語を混同しない**: 公演側の提供物を「用意しています」と書くとサイト＝主催に見える。
   「〜があります」「〜が用意されています」とファン視点で書く。
7. **UIの仕組みを長々と説明しない**: 「ランダムに並べて自動で切り替わります」→ 触ればわかることは一言で。

### 良い例 / 悪い例
- ❌「優花子さんが、キャストが稽古を楽しいと思っていることへの嬉しさを投稿。温かい呼びかけが伝わります。」
- ⭕「キャストが稽古を楽しんでくれているのが何より嬉しい——ちゃんと休みつつ、本番へ。」
- ❌「#ゆかJET 歌ダンス稽古動画が公開。LIVEでの楽曲披露も告知されています。」
- ⭕「#ゆかJET 歌ダンス稽古の動画が公開中。LIVEコーナーでの楽曲披露の予告も。」

### alt属性は別ルール
`alt` はスクリーンリーダー用の**事実描写**（「#ゆかJETの稽古で歌詞カードを掲げる吉井優花子さん」）。
上の文体ガイドは適用しない。ただし alt の文章を見出しやキャプションに使い回さない。

## セットアップ
```bash
git clone https://github.com/ackey1007fw-coder/yukako-schedule-2026.git
cd yukako-schedule-2026
pnpm install --frozen-lockfile
pnpm dev   # http://127.0.0.1:5173 でローカル確認
```
- パッケージマネージャは **pnpm**（`pnpm-lock.yaml` 基準）。`npm install` で lock を作り直さない。
- 認証は接続済みの正規の手段を使う。認証情報を会話・ファイル・ログへ出さず、他人の名前やメールアドレスでgitの作者を設定しない。

## 技術スタック
- Vite + React + TypeScript + Tailwind CSS
- ホスティング Vercel。`/api` は Serverless Functions。
  - **必ず ESM で書く**：`export default async function handler(req, res) { ... }`。
  - `package.json` が `"type": "module"` なので `module.exports` を使うと関数がクラッシュする。

## データの場所（ここを編集する）
- `src/data/events.ts` … 公演・イベント一覧（`VITE_SCHEDULE_API_URL` 未設定時はこれがそのまま表示される）。
- `src/data/profile.ts` … プロフィール、`heroImage` / `portraitImage`、facts、SHOWROOM設定・統計フォールバック。
- `src/data/highlights.ts` … 「これまでの歩み」（受賞・舞台・メディアなど）。**新しい順**に配列。
- `src/data/archive.ts` … 「YUKAKO STORY ARCHIVE｜活動の軌跡」（`/archive`, `/archive/<slug>`）のファン編集記事。
  追加手順は [docs/ARCHIVE_TEMPLATE.md](./docs/ARCHIVE_TEMPLATE.md) を参照。
- `src/data/news.ts` … トップのお知らせバー。新しいものを**配列の先頭**に。`date` は元投稿の日付、過去投稿の追加では `listedAt` を掲載日として使う。過去分の表示順は `siteUpdates.ts` も確認する。
- `src/data/siteUpdates.ts` … 最新情報の集約。元投稿URL・専用カードとの重複を、掲載面ごとに確認する。日付だけで別投稿を一括除外しない。
- `scripts/add-news.mjs` / `scripts/lib/addNewsCore.mjs` … お知らせ追加の既存CLIと入力・重複検証。引数を確認して使う。
- `src/data/photos.ts` … フォトギャラリー＋ `galleryUpdate`（更新お知らせ）。**本人のスナップのみ**。
- `src/data/gojetPromo.ts` … #ゆかJET特集（`NowProducingSection`）の更新カードと告知資料。
  フライヤー・相関図・チケット案内などの**告知画像はこちら**（フォトギャラリーに入れない）。
- `src/data/ojosamaBand.ts` … 「お嬢様はバンドがやりたい」出演アーカイブ。
- `src/data/clips.ts` … TikTok / Instagram のショート動画。
- `src/data/searchFaq.ts` … 検索意図・FAQ。
- `src/data/streamSchedule.ts` … SHOWROOM 配信予定（手入力）。
- `src/data/imageManifest.ts` … レスポンシブ画像マニフェスト（**自動生成。手で書かない**）。
- `api/showroom.js` … SHOWROOM統計のリアルタイム取得（`room_id=347571`）。

## 画像を追加する手順
1. 依頼者提供・掲載承認済みの画像を使い、本人性・出典・利用範囲を確認して `public/images/` に保存（命名: `yukako-なにか.jpg`）。動画は `public/videos/`（`tiktok-YYYY-MM-DD.mp4` 等）。
2. `pnpm install`（`sharp` が無いと次のスクリプトが落ちる）。
3. `node scripts/generate-responsive-images.mjs` を実行
 → `public/images/optimized/` に WebP 生成 + `imageManifest.ts` を自動更新。
4. データファイル（highlights.ts / profile.ts / photos.ts / gojetPromo.ts 等）でパスを参照。
5. コード内では `getResponsiveImageProps("/images/yukako-なにか.jpg", "100vw")` で使用。
6. 既存画像と重複していないか `md5sum` で確認してから追加する。
7. **写真はトリミングしない方針**：モバイルは全体表示（`block w-full`）、PC（`sm:`/`lg:`）だけ `object-cover`。
   フライヤーやタイムテーブルなど**情報が載った画像はサムネイルでも `object-contain`**（切れると読めない）。
8. **差し替え時のキャッシュ対策**：既存ファイルを同名で上書きしない。**新しいファイル名**にして参照パスも更新する
   （例: `yukako-hero-2026-07.jpg` のように日付や版を入れる）。

## レイアウトの注意（既知のハマりどころ）
- `SectionReveal` は `transform` を使うため、子孫の `position: fixed` はビューポート基準にならない。
  モーダル/ライトボックスは `createPortal(…, document.body)` で描画する（`NowProducingSection` の `PromoLightbox` 参照）。
- 横スクロール要素（`w-max` のサムネイル帯など）を grid/flex の子に入れるときは、
  親アイテムに **`min-w-0`** を付ける。付けないとページ全体が横に伸びる（モバイルで横スクロールが発生）。

## ビジュアル（里季サイトと差別化）— **クリムゾン × ゴールド × アイボリー**
- `tailwind.config.ts` の colors トークン:
  - `porcelain` #fffdf7（アイボリー背景/カード）
  - `rosefog` #c8385a（クリムゾン＝アクセント/ラベル/境界）
  - `champagne` #c29a4a（ゴールド＝装飾・暗い背景上のラベル）
  - `champagneInk` #8a6d2e（**白背景で読ませるゴールド文字はこちら**。WCAG対応の濃色）
  - `blush` / `lavender` / `lilac`（補助・暖色）、`ink` #312a2e（本文）、`moss`
- 白・porcelain 背景のテキストは `champagneInk`、`bg-ink` など暗い背景のテキストは `champagne`。逆にすると読めなくなる。
- ディスプレイフォント: **Playfair Display**。和文は明朝フォールバック。
- 新規スタイルは既存トークンを優先する。上記の補助色は既存用途に限って維持し、里季サイトの配色へ置き換えない。

## 絶対ルール
1. **「公式」「公認」と書かない** →「応援スケジュール」「Fan Schedule」「ファン制作」と表記。
2. **未確認情報を書かない**（本人・主催者・媒体等の公開一次情報、またはオーナーが明示確認した事実に限定。二次情報だけで断定しない）。
3. **優花子さんの顔写真をAI生成しない**（背景・テクスチャのみ可）。
4. **差分は最小限**。他のエージェント/人の作業を上書きしない。
5. **画像は切り抜かず全体表示**（上記レスポンシブ方針）。
6. **里季サイトの内容を持ち込まない**。
7. **文体ガイドに従う**（上記）。

## 人物情報の確認先

プロフィール・経歴・SNS・SHOWROOM設定は `src/data/profile.ts` と各データの出典を確認する。このガイドへ年齢・現在の勤務状況・SNS一覧を複製して固定しない。演目・公演回・会場は `events.ts` の正式表記で照合する。

## 品質ゲートと完了報告

現行 `package.json` / `.github/workflows/ci.yml` に合わせ、次を確認する。

```bash
pnpm typecheck
pnpm test:add-news
pnpm test:gojet
pnpm build
node scripts/check-site-identity.mjs main
git diff --check                      # 未ステージの変更
git diff --cached --check             # ステージ済みの変更
git diff --check origin/main...HEAD   # コミット済みのPR差分（最新のbaseを取得後）
```

- このrepoに一般の `pnpm test` はない。feed等を変更したときは `test:portal-feed` など、対象の実在するテストを追加で実行する。
- 画像変更時は「画像を追加する手順」、UI変更時は担当指示書の390pxでの確認を通す。文書変更では参照先・コマンド・矛盾・不要差分を確認する。
- 実行できなかった検証は理由と代替確認を報告する。未実行を成功扱いせず、失敗を隠すためにテストやguardを弱めない。
- merge後はGitHubの `merged=true`・マージ日時・mainのcommitを確認し、Vercel本番の反映とは分けて報告する。closeだけをmergeと呼ばない。
- 完了報告には変更目的、PR、検証結果、未確認事項と次の一歩を書く。大きなPhase後は既存HANDOFFを更新し、長期判断は既存Decision Logへ残す。

## 公開リポジトリの境界

私的DM・非公開の人間関係・私的住所・連絡先・家族情報・認証情報を、コード・コメント・PR・文書へ持ち込まない。制作者の職業を特定する公開紹介は避ける。未確認の人物名や撮影場所を写真から補完しない。
