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
    default: "推敲AI - AI日本語文章改善ツール | 無料で文章校正・リライト",
    template: "%s | 推敲AI",
  },
  description:
    "テキストを貼り付けるだけで、AIが敬語・読みやすさ・冗長表現・トーン・表現力・論理構成の6カテゴリで文章を改善。品質スコア（0-100）で可視化。登録不要・完全無料の日本語Grammarly。",
  keywords: [
    "文章 校正 無料",
    "文章 チェック ツール",
    "文章 リライト AI",
    "敬語 チェック",
    "日本語 校正 AI",
    "推敲 ツール",
    "文章 添削",
    "文章力 向上",
    "ビジネスメール 校正",
    "冗長表現 削除",
    "AI 文章改善",
    "日本語 Grammarly",
  ],
  metadataBase: new URL("https://suikou.ezoai.jp"),
  alternates: {
    canonical: "https://suikou.ezoai.jp",
  },
  openGraph: {
    title: "推敲AI - 貼るだけで、プロの文章に。",
    description:
      "AIが6カテゴリで日本語文章を分析・改善。品質スコア（0-100）で文章力を可視化。登録不要・完全無料。",
    url: "https://suikou.ezoai.jp",
    siteName: "推敲AI",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "推敲AI - 貼るだけで、プロの文章に。",
    description:
      "AIが6カテゴリで日本語文章を分析・改善。品質スコア（0-100）で可視化。登録不要・無料。",
    creator: "@ghostfee_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "推敲AI",
      url: "https://suikou.ezoai.jp",
      description:
        "テキストを貼り付けるだけで、AIが敬語・読みやすさ・冗長表現・トーン・表現力・論理構成の6カテゴリで文章を改善。品質スコア（0-100）で可視化。",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
      },
      inLanguage: "ja",
      featureList:
        "敬語修正, 読みやすさ改善, 冗長表現削除, トーン変換, 表現力向上, 論理構成チェック",
      author: {
        "@type": "Organization",
        name: "Ghostfee",
        url: "https://github.com/Michey0495",
      },
      datePublished: "2026-03-05",
      dateModified: new Date().toISOString().split("T")[0],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "推敲AIは無料ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、推敲AIは完全無料で利用できます。登録も不要です。",
          },
        },
        {
          "@type": "Question",
          name: "どんな文章をチェックできますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ビジネスメール、レポート、ブログ記事、SNS投稿など、あらゆる日本語テキストを6カテゴリ（敬語・読みやすさ・冗長表現・トーン・表現力・論理構成）で分析・改善できます。",
          },
        },
        {
          "@type": "Question",
          name: "品質スコアとは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "文章の品質を0-100の数値で評価するスコアです。6つの分析カテゴリそれぞれでスコアが算出され、総合スコアで文章の改善度を客観的に把握できます。",
          },
        },
      ],
    },
  ];

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
