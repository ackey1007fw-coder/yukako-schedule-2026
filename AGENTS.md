# 吉井優花子 応援スケジュールサイト — エージェント向けガイド

このリポジトリ（`ackey1007fw-coder/yukako-schedule-2026`）を保守・改善するAIエージェント（Codex / Claude など）向けの共通ガイドです。
ファン「あっきー」と一緒に、吉井優花子（よしい ゆかこ）さんの**非公式の応援スケジュールサイト**をよくしていきます。

> かつては里季サイト（`riri-schedule-2026`）と1リポジトリ2ブランチで同居していましたが、
> **2026年7月に独立リポジトリになりました**。今は `main` ブランチ＝優花子サイトです。
> 里季（夏凪里季）サイトは別リポジトリ `ackey1007fw-coder/riri-schedule-2026`。人物・SNS・演目・画像すべて別物なので混同しない。

## ⚠️ 作業前チェック（サイト取り違え防止）

1. `git remote -v` が `yukako-schedule-2026` を指していること。
2. `grep -m1 name src/data/profile.ts` が **`吉井 優花子`** であること。
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
- すべての変更は **`main` 宛ての PR** として提出する（Draft 可）。
- **AIエージェントは絶対にマージしない**。CI が成功しても、人間のオーナーによる明確な承認を待つ。
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
git config user.email "ackey1007fw@gmail.com"
git config user.name "ackey1007fw-coder"
pnpm install
pnpm dev   # http://127.0.0.1:5173 でローカル確認
```
- パッケージマネージャは **pnpm**（`pnpm-lock.yaml` 基準）。`npm install` で lock を作り直さない。
- push 認証は**自分の GitHub 認証／トークンを使う**。トークンを会話やファイルに平文で書かない。

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
- `src/data/news.ts` … トップのお知らせバー。新しいものを**配列の先頭**に。
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
1. 画像を `public/images/` に保存（命名: `yukako-なにか.jpg`）。動画は `public/videos/`（`tiktok-YYYY-MM-DD.mp4` 等）。
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
- 新規スタイルの直書き hex もこのパレットに合わせる。ピンク/ラベンダー系（里季の色）は使わない。

## 絶対ルール
1. **「公式」「公認」と書かない** →「応援スケジュール」「Fan Schedule」「ファン制作」と表記。
2. **未確認情報を書かない**（出演歴等は Wikipedia 等で裏取りした事実のみ）。
3. **優花子さんの顔写真をAI生成しない**（背景・テクスチャのみ可）。
4. **差分は最小限**。他のエージェント/人の作業を上書きしない。
5. **画像は切り抜かず全体表示**（上記レスポンシブ方針）。
6. **里季サイトの内容を持ち込まない**。
7. **文体ガイドに従う**（上記）。

## 事実メモ（吉井優花子 / よしい ゆかこ / Yoshii Yukako）
- 1997年4月27日生まれ、秋田県秋田市出身、身長161cm、AB型。
- 俳優・タレント・モデル・SHOWROOMライバー。元・秋田の公務員。
- 経歴: 大学卒業後 秋田で公務員 → 2021年 ミス浴衣コンテスト準グランプリ → SHOWROOM開始
  → 2022年3月退職・上京 → 2022年12月 舞台『悪魔の涙』デビュー → 現在は法律事務所勤務と並行して舞台・プロデュース活動。
- Baby Shark Live 全国公演シンガー / プロデュース公演 **#ゆかJET**（GO,JET!GO!GO! シリーズ）主宰。
- 受賞: Miss Grand Japan 2025 MISS PEACE賞 / Miss Cosmo Japan 2024 TOP5。
- SNS: X個人 `@mokoopy` / Xプロデュース `@yukako_produce` / Instagram `@yoppy_777` /
  TikTok `@yukakoyoshii` / SHOWROOM「秋田の優花子(ゆかこ)」`room_id=347571`。
- SNSからの画像自動取得は基本できない（bot遮断・署名URL失効）。画像は手元から `public/images/` に自己ホストする。

## 着手前に
README と `src/data/*.ts`・`src/components/` を読んで現状を把握してから作業する。
可能ならローカル（`pnpm dev`）か Vercel のプレビューで見た目を確認し、**PR として提出してオーナーの承認を待つ**（エージェント自身はマージしない）。
