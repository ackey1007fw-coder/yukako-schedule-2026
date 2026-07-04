# CLAUDE.md

このブランチ（`yukako/main`）は **吉井優花子（よしいゆかこ）さんの応援スケジュールサイト**です。
保守ルール・規約は **[AGENTS.md](./AGENTS.md)** に集約しています。作業前に必ず読んでください。

> 1リポジトリに2サイトが同居。**`yukako/main`＝優花子サイト / `main`＝里季サイト**。混同しない。
> **⚠️ 取り違え防止**: 2サイトは同じリポジトリで**ブランチ**が違うだけ（`git remote -v` では区別不可）。
> 優花子の作業は必ず `yukako/main` を基点にし、編集前に `grep -m1 name src/data/profile.ts` が
> 「吉井 優花子」であることを確認（「夏凪 里季」なら里季＝取り違え、止めて報告）。詳細は AGENTS.md。

要点（詳細は AGENTS.md）:
- `yukako/main` → Vercel 自動デプロイ（本番 https://yukako-schedule-2026.vercel.app/）。
  - ⚠️ yukako-schedule-2026 プロジェクトの **Production Branch = `yukako/main`** であること（ダッシュボード設定）。
- 編集する元データ: `src/data/events.ts` / `profile.ts` / `highlights.ts` / `photos.ts` / `news.ts` / `clips.ts`。
- **画像追加**は AGENTS.md「画像を追加する手順」を参照（`public/images/yukako-*.jpg` に自己ホスト →
  `npm install` → `node scripts/generate-responsive-images.mjs` で WebP 生成 + manifest 自動更新）。
- **写真はトリミングしない**：モバイルは `block w-full`（全体表示）、PCのみ `object-cover`。
- **配色テーマ**: クリムゾン×ゴールド×アイボリー（里季サイトと差別化）。`rosefog`=#c8385a /
  `champagne`=#c29a4a / `porcelain`=#fffdf7、見出し欧文は Playfair Display。里季のピンク系は使わない。
- ルール: 「公式/公認」と書かない・未確認情報を書かない・顔をAI生成しない・差分最小・里季の内容を持ち込まない。
- **共同管理**: Codex 自動レビュー（リポジトリ全体で有効）＋ Claude の PR 監視。
  作業ブランチ → PR（`yukako/main` 宛て）→ Codex レビュー + Claude 対応 → マージ → 自動デプロイ。
  PRは確認不要で即マージOK（本番に関わる大きな変更・曖昧な指摘はオーナーに確認）。
- `/api/*` は ESM（`export default handler`）で書く。`module.exports` は使わない。SHOWROOM は `room_id=347571`。

## モデル采配ルール（全プロジェクト共通）

メイン（このセッションのモデル）は采配役。
計画・分解・統合・最終レビューのみ直接行い、実作業はサブエージェントへ委譲する。

- 推論の重いフェーズ（設計・複雑なデバッグ・アルゴリズム設計）
  → deep-reasoner（Opus）

- 機械的作業（ファイル探索・grep・定型変換・単純修正）
  → fast-worker（Haiku）

- 実装・執筆・調査まとめ
  → Agent呼び出し時に model: sonnet を指定

- 高リスクの判断
  → deep-reasoner と Codex に同じ問題を並列で出し、互いの回答を見せず統合する

- Codexはレビュアーではなく、別視点を持つ対等なピアとして扱う

- 例外:
  仕様が会話中に確定していく作業、会話の文脈が必要な作業はメインが直接行う

- Fable 5は「判断・設計・統合」に限定し、ファイル探索・grep・単純変換には使わない

- 通常時のeffortはhighまで。
  maxは難問、設計崩壊、重大判断のときだけ使う

- Claude側の使用率を守りたい場合、Codexに逃がせる判断はCodexへ逃がす。
  ただしCodex側の利用条件・課金は別枠で確認する
