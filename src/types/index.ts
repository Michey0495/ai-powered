export type ToneType = "formal" | "semi-casual" | "casual";

export type CategoryId =
  | "keigo"
  | "readability"
  | "redundancy"
  | "tone"
  | "expression"
  | "logic";

export interface CategoryScore {
  id: CategoryId;
  name: string;
  score: number;
  issues: Issue[];
}

export interface Issue {
  original: string;
  suggested: string;
  reason: string;
}

export interface AnalysisResult {
  overallScore: number;
  categories: CategoryScore[];
  improvedText: string;
  summary: string;
}

export interface AnalyzeRequest {
  text: string;
  tone: ToneType;
}

export interface AnalyzeResponse {
  success: boolean;
  result?: AnalysisResult;
  error?: string;
}

export const CATEGORIES: Record<CategoryId, { name: string; description: string; slug: string }> = {
  keigo: {
    name: "敬語修正",
    description: "敬語の誤用を検出し、適切な敬語表現に修正します",
    slug: "keigo",
  },
  readability: {
    name: "読みやすさ",
    description: "一文の長さ、漢字比率、句読点の使い方を最適化します",
    slug: "readability",
  },
  redundancy: {
    name: "冗長表現削除",
    description: "不要な繰り返しや冗長な表現を簡潔にします",
    slug: "redundancy",
  },
  tone: {
    name: "トーン変換",
    description: "指定したトーンに合わせて文体を統一します",
    slug: "tone",
  },
  expression: {
    name: "表現の豊かさ",
    description: "単調な表現をより豊かで的確な表現に置き換えます",
    slug: "expression",
  },
  logic: {
    name: "論理構成",
    description: "文章の論理的なつながりと構成を改善します",
    slug: "logic",
  },
};
