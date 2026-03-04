import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-white/60 text-lg">
          ページが見つかりませんでした
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-all duration-200"
        >
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}
