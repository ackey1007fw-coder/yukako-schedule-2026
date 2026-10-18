# DECISION_LOG — yukako-schedule-2026

長く守る判断と、その理由。**追記のみ**（変更するときは新しい行で「D-xx を置き換え」と書く）。
2026-10-18 に、それまでのPR・`AGENTS.md`・`CLAUDE.md`・担当指示書に散らばっていた既存判断を集約して作成した。「日付」はそのルールが入ったおおよその時期。

| ID | 日付 | 判断 | 理由 | 影響範囲・根拠 |
| --- | --- | --- | --- | --- |
| D-01 | 2026-05 | 非公式の応援スケジュールサイト。「公式」「公認」と書かない | 本人運営と誤認させない | 全ページ / `AGENTS.md` 絶対ルール |
| D-02 | 2026-07 | 里季サイトとの1repo2ブランチ同居をやめ、独立repo化。`main` = 優花子サイト | 取り違え事故の根本対策 | repo構成 |
| D-03 | 2026-07-02 | Site Identity Guard（name / room_id / title / 本番URL ほか）と Image Overwrite Guard をCI必須に | 取り違え・同名上書きを機械で止める（#32 / #34） | `scripts/check-site-identity.mjs` / `.github/workflows/` |
| D-04 | 2026-07 | 配色はクリムゾン×ゴールド×アイボリー。白背景の金文字は `champagneInk`、暗い背景は `champagne`。里季サイトのピンク系は使わない | 2サイトの視覚的な差別化とWCAGコントラスト | `tailwind.config.ts` |
| D-05 | 2026-07 | 写真はトリミングしない（モバイル全体表示、PCのみ `object-cover`）。告知画像はサムネイルでも `object-contain`。顔のAI生成禁止 | 本人への敬意と、情報の読みやすさ | `AGENTS.md` 画像手順 |
| D-06 | 2026-07 | 本人スナップは `photos.ts`、#ゆかJET の告知画像は `gojetPromo.ts`。他公演の告知画像はその公演の特集データ（`events.ts` / `siteUpdates.ts` 等） | ギャラリーの性格を保つ | `docs/CODEX.md` 写真の振り分け |
| D-07 | 2026-07 | 文体ガイド（レポート調禁止・感情の代弁禁止・カギ括弧は原文のみ）をサイト上の全日本語に適用。alt は事実描写で別ルール | ファンが運営する温度のあるサイトにする | `AGENTS.md` 文体ガイド |
| D-08 | 2026-07 | Codex＝データ更新、Claude＝UI/レビュー/文言/CI の分担。レーンは最優先であって専有ではない | 速さと品質の両立 | `docs/CODEX.md` / `docs/SONNET.md` |
| D-09 | 2026-07-27 | CI green かつマージ前チェックリストを満たせば、AIが自分の判断で squash merge。オーナーの「マージして」は待たない。戻すときは revert PR | 更新を止めない（#125） | `AGENTS.md` PR / マージ方針 |
| D-10 | 2026-07 | `/api/*` は ESM。SHOWROOM は `room_id=347571` | `"type": "module"` で CJS は落ちる | `api/` |
| D-11 | 2026-08〜09 | 本人が自身の公開SNSへ投稿した元写真は、本人性と元投稿URLが確認できれば個別確認なしで掲載可。**二次素材（配信スクショ・切り抜き等）は素材ごと・掲載先ごとに本人承認が必要**、未承認は公開repo・PR・`public/` に置かない | 本人の意思と公開範囲を尊重する | `AGENTS.md` 写真・動画の掲載ルール |
| D-12 | 2026-08-19 | 親ポータル「応援アーカイブ」へ feed を提供、フッターに戻り導線 | 複数の応援サイトを横断で見られるように | `scripts/generate-portal-feed.mjs` / `pnpm test:portal-feed` |
| D-13 | 既知 | プロフィールの血液型「AB型」はオーナーが明示確認した事実。一次情報がWeb検索で見つからないことだけを理由に削除しない | オーナー判断の保持 | `src/data/profile.ts` |
| D-14 | 2026-10-18 | オーナーの明示依頼により Project Memory（HANDOFF / DECISION_LOG / SKILL）を導入 | 複数AI・複数チャットで説明し直しなく引き継ぐ | `docs/` |
