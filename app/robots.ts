import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: "GPTBot", allow: "/", disallow: "/api/" },
      { userAgent: "ChatGPT-User", allow: "/", disallow: "/api/" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/api/" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/api/" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/api/" },
      { userAgent: "Googlebot", allow: "/", disallow: "/api/" },
      { userAgent: "bingbot", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
