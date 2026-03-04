import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildAnalysisPrompt } from "@/lib/prompts";
import type { ToneType, AnalysisResult } from "@/types";

const MAX_CHARS = 1000;
const client = new Anthropic();

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

interface Tool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

const TOOLS: Tool[] = [
  {
    name: "analyze_text",
    description:
      "日本語テキストを6カテゴリ（敬語・読みやすさ・冗長表現・トーン・表現力・論理構成）で分析し、品質スコアと改善案を返す",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "分析対象の日本語テキスト（最大1000文字）",
        },
        tone: {
          type: "string",
          enum: ["formal", "semi-casual", "casual"],
          description:
            "目標トーン。formal=ビジネス、semi-casual=ブログ、casual=SNS",
          default: "formal",
        },
      },
      required: ["text"],
    },
  },
  {
    name: "get_score",
    description: "日本語テキストの品質スコア（0-100）のみを取得する",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "分析対象の日本語テキスト（最大1000文字）",
        },
      },
      required: ["text"],
    },
  },
];

function jsonRpcResponse(id: string | number, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

function jsonRpcError(
  id: string | number | null,
  code: number,
  message: string
) {
  return NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } });
}

async function analyzeText(
  text: string,
  tone: ToneType = "formal"
): Promise<AnalysisResult> {
  const prompt = buildAnalysisPrompt(text, tone);
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Invalid AI response");

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse AI response");

  return JSON.parse(jsonMatch[0]) as AnalysisResult;
}

async function handleMethod(method: string, params: Record<string, unknown>) {
  switch (method) {
    case "initialize":
      return {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: {
          name: "suikou-ai",
          version: "1.0.0",
        },
      };

    case "tools/list":
      return { tools: TOOLS };

    case "tools/call": {
      const toolName = params.name as string;
      const args = (params.arguments ?? {}) as Record<string, unknown>;

      if (toolName === "analyze_text") {
        const text = args.text as string;
        if (!text || text.length > MAX_CHARS) {
          return {
            content: [
              {
                type: "text",
                text: `テキストは1〜${MAX_CHARS}文字で入力してください`,
              },
            ],
            isError: true,
          };
        }
        const result = await analyzeText(
          text,
          (args.tone as ToneType) || "formal"
        );
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      }

      if (toolName === "get_score") {
        const text = args.text as string;
        if (!text || text.length > MAX_CHARS) {
          return {
            content: [
              {
                type: "text",
                text: `テキストは1〜${MAX_CHARS}文字で入力してください`,
              },
            ],
            isError: true,
          };
        }
        const result = await analyzeText(text);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                overallScore: result.overallScore,
                summary: result.summary,
              }),
            },
          ],
        };
      }

      return {
        content: [{ type: "text", text: `Unknown tool: ${toolName}` }],
        isError: true,
      };
    }

    default:
      throw { code: -32601, message: `Method not found: ${method}` };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as JsonRpcRequest;

    if (body.jsonrpc !== "2.0" || !body.method) {
      return jsonRpcError(null, -32600, "Invalid JSON-RPC request");
    }

    const result = await handleMethod(body.method, body.params ?? {});
    return jsonRpcResponse(body.id, result);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      "message" in error
    ) {
      return jsonRpcError(
        null,
        error.code as number,
        error.message as string
      );
    }
    console.error("MCP error:", error);
    return jsonRpcError(null, -32603, "Internal error");
  }
}

export async function GET() {
  return NextResponse.json({
    name: "suikou-ai",
    version: "1.0.0",
    description: "推敲AI - AI日本語文章改善ツールのMCPサーバー",
    tools: TOOLS,
  });
}
