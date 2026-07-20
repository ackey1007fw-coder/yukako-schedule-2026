# CLAUDE.md

このリポジトリ（`ackey1007fw-coder/yukako-schedule-2026`）は **吉井優花子（よしいゆかこ）さんの応援スケジュールサイト**です。
保守ルール・規約は **[AGENTS.md](./AGENTS.md)**、あなた（Claude/Sonnet）の役割は **[docs/SONNET.md](./docs/SONNET.md)** にまとめています。作業前に必ず読んでください。

> **⚠️ 取り違え防止**: 里季（夏凪里季）サイトは**別リポジトリ** `riri-schedule-2026`。人物・SNS・演目・画像すべて別物。
> 編集前に `grep -m1 name src/data/profile.ts` が「吉井 優花子」であることを確認
> （「夏凪 里季」なら里季＝取り違え、止めて報告）。CI の Site Identity Guard も混入を検知する。

要点（詳細は AGENTS.md）:
- `main` → Vercel 自動デプロイ（本番 https://yukako-schedule-2026.vercel.app/）。
- 編集する元データ: `src/data/events.ts` / `profile.ts` / `highlights.ts` / `photos.ts`（本人スナップのみ）/
  `gojetPromo.ts`（#ゆかJET特集・告知画像はこちら）/ `news.ts` / `ojosamaBand.ts` / `clips.ts`。
- **文体ガイド**（AGENTS.md）: レポート調「〜を投稿。」「〜と伝えています」禁止・感想の代弁禁止・
  カギ括弧は正確な引用のみ・「〜を確認できます」連発禁止。サイトに載せる日本語はすべて対象。
- **画像追加**は AGENTS.md「画像を追加する手順」を参照（`public/images/yukako-*.jpg` に自己ホスト →
  `node scripts/generate-responsive-images.mjs` で WebP 生成 + manifest 自動更新）。
- **写真はトリミングしない**：モバイルは `block w-full`（全体表示）、PCのみ `object-cover`。
  告知画像（フライヤー等）はサムネイルでも `object-contain`。
- **配色**: クリムゾン×ゴールド×アイボリー。白背景の文字は `champagneInk`=#8a6d2e、
  暗い背景は `champagne`=#c29a4a。里季のピンク系は使わない。
- **レイアウト注意**: モーダルは `createPortal`（`SectionReveal` の transform 対策）。
  横スクロール帯の親には `min-w-0`（ないとページが横に伸びる）。
- ルール: 「公式/公認」と書かない・未確認情報を書かない・顔をAI生成しない・差分最小・里季の内容を持ち込まない。
- **共同管理**: Codex＝データ更新（docs/CODEX.md）、Claude＝実装・レビュー・文言（docs/SONNET.md）。
  作業ブランチ → PR（`main` 宛て・Draft可）→ CI → **オーナー承認後にマージ** → 自動デプロイ。
  **AIは自律的にマージしない**。オーナーが対象PRを特定して明確にマージ指示した場合のみ、
  CI・競合・レビュー状態を確認して squash merge 可（詳細は AGENTS.md の PR / マージ方針）。
- `/api/*` は ESM（`export default handler`）で書く。`module.exports` は使わない。SHOWROOM は `room_id=347571`。
