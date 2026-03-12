# Changelog

## 2026-03-13 (2回目)

### Bug Fixes
- feedback API: GitHub API失敗時にエラーレスポンスを返すよう修正（従来はサイレント成功）
- feedback API: repoパラメータをエンコードしてパストラバーサルを防止
- feedback widget: alert()をインラインエラー表示に置換

### Improvements
- JSON-LD: dateModifiedフィールドを動的生成に変更
- 依存パッケージ: @types/node, eslint パッチアップデート適用

### Maintenance
- ビルド正常、TypeScriptエラーなし、ESLintクリーン
- npm audit: 脆弱性0件
- AI公開ファイル（robots.txt, llms.txt, agent.json）確認済み
- GitHub Issues: なし

## 2026-03-13

### Security
- express-rate-limit: IPv4-mapped IPv6 addresses bypass修正 (8.2.0→8.2.1+)
- hono: parseBody prototype pollution修正 (<4.12.7→4.12.7+)

### Maintenance
- 定期ヘルスチェック実施: ビルド正常、TypeScriptエラーなし
- AI公開ファイル（robots.txt, llms.txt, agent.json）確認済み
- GitHub Issues: なし
