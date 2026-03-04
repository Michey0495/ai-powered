import { CATEGORIES } from "@/types";

export function Features() {
  return (
    <section className="py-16 space-y-8">
      <h2 className="text-2xl font-bold text-white text-center">
        6つの分析カテゴリ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(CATEGORIES).map((cat) => (
          <div
            key={cat.slug}
            className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2 hover:border-violet-400/30 transition-all duration-200"
          >
            <h3 className="text-white font-semibold">{cat.name}</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              {cat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
