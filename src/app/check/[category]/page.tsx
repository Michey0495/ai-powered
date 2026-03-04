import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CATEGORIES, CategoryId } from "@/types";
import { EditorSection } from "@/components/editor/editor-section";
import { Footer } from "@/components/landing/footer";
import Link from "next/link";

const CATEGORY_SEO: Record<CategoryId, { title: string; h1: string; description: string; content: string }> = {
  keigo: {
    title: "敬語チェック・修正ツール（無料）",
    h1: "AIで敬語を自動チェック・修正",
    description: "二重敬語、尊敬語と謙譲語の混同など、敬語の誤用をAIが自動検出。正しい敬語表現に修正します。ビジネスメール・報告書の品質向上に。",
    content: "ビジネスシーンで敬語の間違いは信頼を損ないます。推敲AIは、二重敬語（「おっしゃられる」→「おっしゃる」）、尊敬語と謙譲語の混同（「ご覧になっていただく」→「ご覧いただく」）、過剰敬語など、日本語特有の敬語エラーをAIが検出し、適切な表現を提案します。",
  },
  readability: {
    title: "文章の読みやすさチェックツール（無料）",
    h1: "AIで文章の読みやすさを分析・改善",
    description: "一文の長さ、漢字比率、句読点の使い方をAIが分析。読みやすく分かりやすい文章に改善します。",
    content: "読みやすい文章には法則があります。一文60文字以内、漢字比率30-40%、適切な句読点。推敲AIはこれらの指標をAIが自動分析し、読みやすさスコアで可視化。長すぎる文の分割、漢字の適切なひらがな化、句読点の追加を提案します。",
  },
  redundancy: {
    title: "冗長表現削除ツール（無料）",
    h1: "AIで冗長な表現を検出・削除",
    description: "「することができる」「という」等の冗長表現をAIが検出。簡潔で力強い文章に改善します。",
    content: "「することができる」→「できる」、「ということ」→削除、「基本的に」→削除。日本語には多くの冗長表現パターンがあります。推敲AIは冗長表現を自動検出し、簡潔な代替表現を提案。文字数を削減しながら、伝わりやすい文章に改善します。",
  },
  tone: {
    title: "文体・トーン変換ツール（無料）",
    h1: "AIで文章のトーンを自動変換",
    description: "フォーマル・カジュアルなど、目的に合わせて文体を変換。です/ます調とだ/である調の混在も修正。",
    content: "ビジネスメールにはフォーマルな文体、ブログにはカジュアルな文体。推敲AIは目標トーンに合わせて文体を統一します。です/ます調とだ/である調の混在を検出し、指定したトーンに揃えます。",
  },
  expression: {
    title: "表現力向上ツール（無料）",
    h1: "AIで文章の表現力を向上",
    description: "同じ語句の繰り返しを検出し、より的確で豊かな表現に置き換え。文章の質を高めます。",
    content: "同じ単語の繰り返しは文章を単調にします。推敲AIは語彙の多様性を分析し、より的確な類語や表現を提案。「良い」→「優れた」「効果的な」「有益な」など、文脈に応じた最適な語彙選択をAIがサポートします。",
  },
  logic: {
    title: "論理構成チェックツール（無料）",
    h1: "AIで文章の論理構成を分析・改善",
    description: "接続詞の適切さ、段落のつながり、主張と根拠の関係をAIが分析。説得力のある文章に。",
    content: "説得力のある文章には論理的な構成が不可欠です。推敲AIは接続詞の適切な使用、段落間のつながり、主張と根拠の整合性をAIが分析。「しかし」「したがって」等の接続詞の誤用を修正し、論理の飛躍を指摘します。",
  },
};

const validCategories = Object.keys(CATEGORIES);

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!validCategories.includes(category)) return {};
  const seo = CATEGORY_SEO[category as CategoryId];
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: `${seo.title} | 推敲AI`,
      description: seo.description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!validCategories.includes(category)) notFound();

  const seo = CATEGORY_SEO[category as CategoryId];
  const catInfo = CATEGORIES[category as CategoryId];

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-4xl mx-auto px-4">
        <section className="py-16 space-y-6">
          <Link
            href="/"
            className="text-violet-400 text-sm hover:text-violet-300 transition-colors duration-200"
          >
            ← 推敲AI トップ
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {seo.h1}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
            {seo.content}
          </p>
        </section>

        <EditorSection />

        <section className="py-16 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            {catInfo.name}とは
          </h2>
          <p className="text-white/60 leading-relaxed">
            {catInfo.description}。推敲AIの{catInfo.name}
            機能は、AIが自動的に問題点を検出し、具体的な改善案を提示します。
            スコアで現在の品質を可視化し、どこを改善すべきかが一目で分かります。
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(CATEGORIES)
              .filter(([key]) => key !== category)
              .map(([key, cat]) => (
                <Link
                  key={key}
                  href={`/check/${cat.slug}`}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-white/50 hover:text-violet-400 hover:border-violet-400/30 transition-all duration-200 cursor-pointer"
                >
                  {cat.name}
                </Link>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
