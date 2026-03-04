import { ToneType } from "@/types";

const TONE_DESCRIPTIONS: Record<ToneType, string> = {
  formal: "フォーマル（ビジネス・公式文書向け）",
  "semi-casual": "ややカジュアル（社内メール・ブログ向け）",
  casual: "カジュアル（SNS・チャット向け）",
};

export function buildAnalysisPrompt(text: string, tone: ToneType): string {
  return `あなたは日本語文章の品質改善の専門家です。以下のテキストを分析し、6つのカテゴリで改善してください。

## 入力テキスト
${text}

## 目標トーン
${TONE_DESCRIPTIONS[tone]}

## 分析カテゴリと評価基準

1. **keigo（敬語修正）**: 敬語の誤用（二重敬語、尊敬語と謙譲語の混同など）を検出
2. **readability（読みやすさ）**: 一文の長さ（60文字以上は減点）、漢字比率（30-40%が理想）、句読点の適切さ
3. **redundancy（冗長表現削除）**: 「〜することができる」→「〜できる」等の冗長表現、不要な繰り返し
4. **tone（トーン変換）**: 目標トーンとの一致度、文体の統一性（です/ます調 vs だ/である調の混在）
5. **expression（表現の豊かさ）**: 同じ語句の繰り返し、より的確な語彙への置き換え
6. **logic（論理構成）**: 接続詞の適切さ、段落間のつながり、主張と根拠の関係

## 出力フォーマット（JSON）

以下のJSON形式で出力してください。JSONのみを出力し、他のテキストは含めないでください。

{
  "overallScore": <0-100の整数>,
  "categories": [
    {
      "id": "keigo",
      "name": "敬語修正",
      "score": <0-100の整数>,
      "issues": [
        {
          "original": "<問題のある原文部分>",
          "suggested": "<改善案>",
          "reason": "<改善理由を簡潔に>"
        }
      ]
    },
    {
      "id": "readability",
      "name": "読みやすさ",
      "score": <0-100>,
      "issues": [...]
    },
    {
      "id": "redundancy",
      "name": "冗長表現削除",
      "score": <0-100>,
      "issues": [...]
    },
    {
      "id": "tone",
      "name": "トーン変換",
      "score": <0-100>,
      "issues": [...]
    },
    {
      "id": "expression",
      "name": "表現の豊かさ",
      "score": <0-100>,
      "issues": [...]
    },
    {
      "id": "logic",
      "name": "論理構成",
      "score": <0-100>,
      "issues": [...]
    }
  ],
  "improvedText": "<全ての改善を適用した改善版テキスト>",
  "summary": "<改善の要約を1-2文で>"
}

## 注意事項
- overallScoreは各カテゴリスコアの加重平均（readabilityとlogicを重視）
- issuesが無いカテゴリはissues: []（空配列）にしてスコアを高めに
- improvedTextは全ての改善を反映した最終版
- 日本語固有の品質指標（漢字比率、一文長、敬語の正確さ）を重視`;
}
