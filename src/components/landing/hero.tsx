import { CATEGORIES } from "@/types";
import Link from "next/link";

export function Hero() {
  return (
    <section className="text-center space-y-6 py-16">
      <p className="text-violet-400 text-sm font-medium tracking-wide uppercase">
        登録不要 / 完全無料 / AI文章改善
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
        貼るだけで、
        <span className="text-violet-400">プロの文章</span>
        に。
      </h1>
      <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
        敬語の間違い、冗長な表現、読みにくい構成 ―
        <br className="hidden md:block" />
        AIが6カテゴリで分析し、品質スコア0-100で可視化。
      </p>
      <div className="flex items-center justify-center gap-6 pt-2 text-sm text-white/40">
        <span>10秒で結果</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span>登録不要</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span>完全無料</span>
      </div>
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
      <p className="text-white/30 text-xs pt-2">
        下のテキストエリアに文章を貼り付けて「分析する」をクリック
      </p>
    </section>
  );
}
