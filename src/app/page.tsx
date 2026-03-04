import { Hero } from "@/components/landing/hero";
import { EditorSection } from "@/components/editor/editor-section";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-4xl mx-auto px-4">
        <Hero />
        <EditorSection />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
