# 推敲AI - アーキテクチャ設計

## 概要

推敲AIは、AI（Claude API）を使って日本語文章の品質を分析・改善するWebアプリケーション。
フリーミアムモデルで、無料ティアは1日3回・1,000文字まで利用可能。

## ページ構成

| パス | 種別 | 説明 |
|------|------|------|
| `/` | SSR + Client | トップページ（ヒーロー + エディター + 機能紹介） |
| `/check/[category]` | SSG | カテゴリ別SEOランディングページ（6ページ） |
| `/api/analyze` | API Route | 文章分析エンドポイント |

## コンポーネント設計

```
page.tsx (Server)
├── Hero (Server) - ヒーローセクション、カテゴリバッジリンク
├── EditorSection (Client) - 状態管理ラッパー
│   ├── TextEditor (Client) - テキスト入力、トーン選択、送信
│   └── AnalysisResultView (Client) - スコア表示、カテゴリ別結果、改善テキスト
├── Features (Server) - 6カテゴリ紹介グリッド
└── Footer (Server) - フッターリンク
```

## データフロー

```
[TextEditor] → POST /api/analyze { text, tone }
                      ↓
              [API Route] → Claude API (Haiku)
                      ↓
              [AnalysisResult] ← { overallScore, categories[], improvedText, summary }
                      ↓
         [AnalysisResultView] → スコア表示 + カテゴリ詳細 + 改善テキスト
```

## API設計

### POST /api/analyze

テキストを分析し、6カテゴリのスコアと改善案を返す。

**Request:**
```json
{
  "text": "分析対象のテキスト（最大1000文字）",
  "tone": "formal" | "semi-casual" | "casual"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "overallScore": 72,
    "categories": [
      {
        "id": "keigo",
        "name": "敬語修正",
        "score": 65,
        "issues": [
          {
            "original": "おっしゃられました",
            "suggested": "おっしゃいました",
            "reason": "二重敬語。「おっしゃる」自体が尊敬語"
          }
        ]
      }
    ],
    "improvedText": "改善後の全文...",
    "summary": "敬語の誤用が2箇所、冗長表現が3箇所検出されました"
  }
}
```

## MCP Server 設計（v2）

v2でMCPサーバーエンドポイントを `/api/mcp` に実装予定。

### ツール定義

| ツール名 | 説明 | パラメータ |
|----------|------|-----------|
| `analyze_text` | 日本語テキストを分析・改善 | `text` (string, required), `tone` (enum, optional) |
| `get_score` | テキストの品質スコアのみ取得 | `text` (string, required) |
| `improve_category` | 特定カテゴリの改善のみ実行 | `text` (string), `category` (enum) |

### プロトコル

- JSON-RPC 2.0 over HTTP POST
- SSE対応（ストリーミング分析結果）
- 認証: API Key (Business plan)

## SEO戦略

6カテゴリ × 用途別で静的生成されたランディングページ:
- `/check/keigo` - 「敬語 チェック」
- `/check/readability` - 「文章 読みやすさ」
- `/check/redundancy` - 「冗長 表現 削除」
- `/check/tone` - 「文体 変換」
- `/check/expression` - 「表現力 向上」
- `/check/logic` - 「論理 構成 チェック」

各ページにエディターを配置し、そのカテゴリに特化したCTAと解説コンテンツを提供。

## デザイン方針

- 背景色: `#000000`（純黒）
- アクセント: `#a78bfa`（violet-400）
- カード: `bg-white/5 border border-white/10`
- テキスト: `text-white`（メイン）, `text-white/50-70`（サブ）
- フォント: 16px以上, line-height 1.5-1.75
- アニメーション: `transition-all duration-200`
