# chizuru-schedule-2026 セットアップキット

伊東千鶴（いとう ちづる）さんの非公式応援・活動アーカイブサイト用の新リポジトリ
`ackey1007fw-coder/chizuru-schedule-2026` を立ち上げるための一式です。

> **なぜここにあるか**: Claude Code の GitHub 連携（GitHub App）にはリポジトリ新規作成の権限がなく、
> API 経由の作成が 403 で拒否されたため、オーナーが手動で作成する前提のキットとして
> `yukako-schedule-2026` のこのブランチに置いています。**このフォルダは優花子サイト本体とは無関係**で、
> 新リポジトリへコピーしたら削除して構いません。

## 同梱ファイル

| ファイル | 用途 |
|---|---|
| `PROMPT.md` | **メイン成果物**。ChatGPT / Claude（Sonnet 等）にそのまま渡す実装プロンプト全文 |
| `CLAUDE.md` | 新リポジトリのルートに置く運用ルール（Claude Code 用） |

## セットアップ手順

1. GitHub で新規リポジトリを作成
   - https://github.com/new を開く
   - Repository name: `chizuru-schedule-2026`
   - 公開設定はお好みで（姉妹サイト yukako / riri / mako はいずれも public）
   - 「Add a README file」にチェックを入れて作成
2. 作成したリポジトリに、このフォルダの `PROMPT.md` と `CLAUDE.md` をルート直下へコピーしてコミット
3. 実装させる
   - **Claude Code の場合**: 新しいセッションで `chizuru-schedule-2026` を開き（または「add repo chizuru-schedule-2026」でセッションに追加し）、「PROMPT.md を読んで、その指示どおりにサイトを実装して」と依頼
   - **ChatGPT の場合**: `PROMPT.md` の全文を貼り付けて依頼
4. 実装エージェントはまず「調査報告」（PROMPT.md 第19節）を出してから実装に入る流れになっています
5. デプロイは Vercel で `main` ブランチを接続（姉妹サイトと同じ運用）

## 注意

- 本人写真は**使用許可のあるもの**が用意できてから追加してください。それまでは写真なしで成立するデザインで進める指示になっています。
- PROMPT.md 内の活動歴は「候補」であり、実装エージェントが一次情報と照合して `verified` / `needs-confirmation` に分類する前提です。未確認のまま断定掲載しないルールが組み込まれています。
