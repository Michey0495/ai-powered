"use client";

import { useState } from "react";
import type { AnalysisResult, CategoryScore } from "@/types";

function ScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80
      ? "#4ade80"
      : score >= 60
        ? "#facc15"
        : score >= 40
          ? "#fb923c"
          : "#f87171";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="100" height="100" className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-white">{score}</span>
    </div>
  );
}

function CategoryBar({ category }: { category: CategoryScore }) {
  const color =
    category.score >= 80
      ? "bg-green-400"
      : category.score >= 60
        ? "bg-yellow-400"
        : category.score >= 40
          ? "bg-orange-400"
          : "bg-red-400";

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-white/70">{category.name}</span>
        <span className="text-white font-medium">{category.score}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${category.score}%` }}
        />
      </div>
    </div>
  );
}

function IssueList({ category }: { category: CategoryScore }) {
  if (category.issues.length === 0) {
    return (
      <p className="text-white/40 text-sm py-2">問題は検出されませんでした</p>
    );
  }

  return (
    <div className="space-y-3">
      {category.issues.map((issue, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2"
        >
          <div className="flex gap-2 text-sm">
            <span className="text-red-400/80 line-through">{issue.original}</span>
            <span className="text-white/30">→</span>
            <span className="text-green-400">{issue.suggested}</span>
          </div>
          <p className="text-white/50 text-xs">{issue.reason}</p>
        </div>
      ))}
    </div>
  );
}

interface AnalysisResultViewProps {
  result: AnalysisResult;
}

export function AnalysisResultView({ result }: AnalysisResultViewProps) {
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(result.improvedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-6">
          <ScoreRing score={result.overallScore} />
          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-semibold text-white">品質スコア</h3>
            <p className="text-white/50 text-sm">{result.summary}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">カテゴリ別スコア</h3>
        {result.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setActiveCategory(activeCategory === cat.id ? null : cat.id)
            }
            className="w-full text-left cursor-pointer"
          >
            <CategoryBar category={cat} />
            {activeCategory === cat.id && (
              <div className="mt-3 ml-1">
                <IssueList category={cat} />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">改善後テキスト</h3>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-sm bg-violet-400/20 text-violet-400 border border-violet-400/30 rounded-md cursor-pointer transition-all duration-200 hover:bg-violet-400/30"
          >
            {copied ? "コピー済み" : "コピー"}
          </button>
        </div>
        <p className="text-white/80 text-base leading-relaxed whitespace-pre-wrap">
          {result.improvedText}
        </p>
      </div>
    </div>
  );
}
