import { CATEGORIES } from "@/types";
import Link from "next/link";

export function Hero() {
  return (
    <section className="text-center space-y-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
        貼るだけで、
        <span className="text-violet-400">プロの文章</span>
        に。
      </h1>
      <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
        AIが6つのカテゴリで日本語文章を分析・改善。
        品質スコアで可視化し、ワンクリックで改善版を取得。
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {Object.values(CATEGORIES).map((cat) => (
          <Link
            key={cat.slug}
            href={`/check/${cat.slug}`}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-white/50 hover:text-violet-400 hover:border-violet-400/30 transition-all duration-200 cursor-pointer"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
