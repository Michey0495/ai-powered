import { MetadataRoute } from "next";
import { CATEGORIES } from "@/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://suikou.ezoai.jp";

  const categoryPages = Object.values(CATEGORIES).map((cat) => ({
    url: `${baseUrl}/check/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryPages,
  ];
}
