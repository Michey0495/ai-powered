"use client";

import { useState } from "react";
import { TextEditor } from "./text-editor";
import { AnalysisResultView } from "@/components/result/analysis-result";
import type { AnalysisResult } from "@/types";

export function EditorSection() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  return (
    <section className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <TextEditor onResult={setResult} />
      </div>
      {result && <AnalysisResultView result={result} />}
    </section>
  );
}
