import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-white/40 text-sm">
          推敲AI by{" "}
          <Link
            href="https://github.com/Michey0495"
            className="text-white/60 hover:text-violet-400 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ghostfee
          </Link>
        </div>
        <div className="flex gap-6 text-sm text-white/40">
          <Link
            href="/llms.txt"
            className="hover:text-violet-400 transition-colors duration-200"
          >
            llms.txt
          </Link>
          <Link
            href="/.well-known/agent.json"
            className="hover:text-violet-400 transition-colors duration-200"
          >
            Agent Card
          </Link>
        </div>
      </div>
    </footer>
  );
}
