import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildAnalysisPrompt } from "@/lib/prompts";
import type { AnalyzeRequest, AnalysisResult, AnalyzeResponse } from "@/types";

const MAX_CHARS = 1000;

const client = new Anthropic();

export async function POST(req: NextRequest): Promise<NextResponse<AnalyzeResponse>> {
  try {
    const body = (await req.json()) as AnalyzeRequest;

    if (!body.text || body.text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "テキストを入力してください" },
        { status: 400 }
      );
    }

    if (body.text.length > MAX_CHARS) {
      return NextResponse.json(
        { success: false, error: `テキストは${MAX_CHARS}文字以内にしてください` },
        { status: 400 }
      );
    }

    const tone = body.tone || "formal";
    const prompt = buildAnalysisPrompt(body.text, tone);

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json(
        { success: false, error: "AI応答の形式が不正です" },
        { status: 500 }
      );
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { success: false, error: "AI応答の解析に失敗しました" },
        { status: 500 }
      );
    }

    const result: AnalysisResult = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { success: false, error: "分析中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
