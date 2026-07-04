# CLAUDE.md

このリポジトリの `main` ブランチは **吉井優花子（よしいゆかこ）さんの応援ポータル**です。
保守ルール・規約は **[AGENTS.md](./AGENTS.md)** に集約しています。作業前に必ず読んでください。

> このリポジトリは優花子サイト専用です。夏凪里季さんのサイトは別リポジトリに独立済みです。
> **⚠️ 取り違え防止**: 移行の経緯上、里季さんのデータが誤ってコピー混入しないよう、CI の Site Identity Guard（`scripts/check-site-identity.mjs`）で検証しています。
> 優花子の作業は `main` を基点に作業ブランチを切り、PR は `main` に向けます。編集前に `grep -m1 name src/data/profile.ts` が
> 「吉井 優花子」であることを確認してください。詳細は AGENTS.md。

要点（詳細は AGENTS.md）:
- `main` → Vercel 自動デプロイ（本番 https://yukako-schedule-2026.vercel.app/）。
  - ⚠️ yukako-schedule-2026 プロジェクトの **Production Branch = `main`** であること（ダッシュボード設定）。
- 編集する元データ: `src/data/events.ts` / `profile.ts` / `highlights.ts` / `photos.ts` / `news.ts` / `clips.ts`。
- **画像追加**は AGENTS.md「画像を追加する手順」を参照（`public/images/yukako-*.jpg` に自己ホスト →
  `npm install` → `node scripts/generate-responsive-images.mjs` で WebP 生成 + manifest 自動更新）。
- **写真はトリミングしない**：モバイルは `block w-full`（全体表示）、PCのみ `object-cover`。
- **配色テーマ**: クリムゾン×ゴールド×アイボリー。`rosefog`=#c8385a /
  `champagne`=#c29a4a / `porcelain`=#fffdf7、見出し欧文は Playfair Display。
- ルール: 運営元によるものと誤解される表現は使わない・未確認情報を書かない・顔をAI生成しない・差分最小・別リポジトリのサイト内容を持ち込まない。
- **共同管理**: Codex 自動レビュー（リポジトリ全体で有効）＋ Claude の PR 監視。
  作業ブランチ → PR（`main` 宛て）→ Codex レビュー + Claude 対応 → マージ → 自動デプロイ。
  PRは確認不要で即マージOK（本番に関わる大きな変更・曖昧な指摘はオーナーに確認）。
- `/api/*` は ESM（`export default handler`）で書く。`module.exports` は使わない。SHOWROOM は `room_id=347571`。
