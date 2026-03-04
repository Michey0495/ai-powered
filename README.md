# 推敲AI

AI-powered日本語文章品質改善ツール。テキストを貼り付けるだけで、AIが6カテゴリで文章を分析・改善。

## URL

- Production: https://suikou.ezoai.jp
- GitHub: https://github.com/Michey0495/ai-powered

## 技術スタック

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS + shadcn/ui
- Anthropic Claude API (Haiku)
- Vercel

## セットアップ

```bash
npm install
cp .env.example .env.local  # ANTHROPIC_API_KEY を設定
npm run dev
```

## 環境変数

| 変数名 | 説明 |
|--------|------|
| `ANTHROPIC_API_KEY` | Anthropic API キー |

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx              # トップページ（ランディング+エディター）
│   ├── layout.tsx            # ルートレイアウト（メタデータ）
│   ├── sitemap.ts            # 動的サイトマップ
│   ├── check/[category]/     # SEOランディングページ（6カテゴリ）
│   └── api/analyze/          # 文章分析APIエンドポイント
├── components/
│   ├── editor/               # テキストエディター・入力UI
│   ├── result/               # 分析結果表示
│   ├── landing/              # ランディングページ部品
│   └── ui/                   # shadcn/ui コンポーネント
├── lib/
│   ├── utils.ts              # ユーティリティ
│   └── prompts.ts            # AI分析プロンプト
└── types/
    └── index.ts              # 型定義
public/
├── llms.txt                  # AI向けサイト説明
├── robots.txt                # クローラー設定
└── .well-known/agent.json    # A2A Agent Card
```

## 機能

### MVP（v1）
- テキスト入力（1,000文字まで）
- 6カテゴリ同時分析: 敬語修正 / 読みやすさ / 冗長表現削除 / トーン変換 / 表現の豊かさ / 論理構成
- 品質スコア（0-100）
- カテゴリ別スコア・指摘リスト
- 改善版テキスト + コピー機能
- トーン選択（フォーマル / ややカジュアル / カジュアル）
- 6カテゴリのSEOランディングページ

## デザインシステム

- 背景: `#000000`（純黒）
- アクセント: `#a78bfa`（violet-400）
- カード: `bg-white/5 border border-white/10`
- フォント: 16px以上, line-height 1.5-1.75

## 開発状況

- [x] プロジェクト初期化
- [x] ページ構成・API設計
- [x] トップページ（ランディング+エディター）
- [x] 分析API (/api/analyze)
- [x] 結果表示UI
- [x] SEOランディングページ
- [x] AI公開チャネル (llms.txt, agent.json, robots.txt)
- [ ] ビルド確認・デプロイ
