import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { FeedbackWidget } from "@/components/feedback-widget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "推敲AI - AI日本語文章改善ツール",
    template: "%s | 推敲AI",
  },
  description:
    "テキストを貼り付けるだけで、AIが敬語・読みやすさ・冗長表現・トーン・表現力・論理構成の6カテゴリで文章を改善。品質スコアで可視化。無料で使える日本語Grammarly。",
  keywords: [
    "文章 校正 無料",
    "文章 チェック ツール",
    "文章 リライト AI",
    "敬語 チェック",
    "日本語 校正 AI",
    "推敲 ツール",
  ],
  metadataBase: new URL("https://suikou.ezoai.jp"),
  openGraph: {
    title: "推敲AI - AI日本語文章改善ツール",
    description:
      "貼り付けるだけで、プロの文章に。6カテゴリのAI分析で文章品質を可視化・改善。",
    url: "https://suikou.ezoai.jp",
    siteName: "推敲AI",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "推敲AI - AI日本語文章改善ツール",
    description:
      "貼り付けるだけで、プロの文章に。6カテゴリのAI分析で文章品質を可視化・改善。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FeedbackWidget repoName="ai-powered" />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
