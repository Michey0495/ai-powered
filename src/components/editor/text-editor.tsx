"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ToneType, AnalysisResult } from "@/types";

const TONES: { value: ToneType; label: string }[] = [
  { value: "formal", label: "フォーマル" },
  { value: "semi-casual", label: "ややカジュアル" },
  { value: "casual", label: "カジュアル" },
];

const MAX_CHARS = 1000;

interface TextEditorProps {
  onResult: (result: AnalysisResult) => void;
}

export function TextEditor({ onResult }: TextEditorProps) {
  const [text, setText] = useState("");
  const [tone, setTone] = useState<ToneType>("formal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;

  async function handleAnalyze() {
    if (!text.trim() || isOverLimit) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "エラーが発生しました");
        return;
      }

      onResult(data.result);
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="改善したい文章をここに貼り付けてください..."
          className="min-h-[200px] bg-white/5 border-white/10 text-white placeholder:text-white/30 text-base leading-relaxed resize-none"
        />
        <div
          className={`absolute bottom-3 right-3 text-sm ${
            isOverLimit ? "text-red-400" : "text-white/40"
          }`}
        >
          {charCount} / {MAX_CHARS}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className={`px-3 py-1.5 rounded-md text-sm transition-all duration-200 cursor-pointer ${
                tone === t.value
                  ? "bg-violet-400/20 text-violet-400 border border-violet-400/30"
                  : "bg-white/5 text-white/50 border border-white/10 hover:text-white/70"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isOverLimit || loading}
          className="bg-violet-500 hover:bg-violet-600 text-white px-8 cursor-pointer transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "分析中..." : "推敲する"}
        </Button>
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
}
