import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

const lastModified = "2026-09-07";

const pages: Array<{ path: string; lastModified: string }> = [
  { path: "/", lastModified },
  { path: "/website-review", lastModified },
  { path: "/ai-website-audit", lastModified },
  { path: "/landing-page-review", lastModified },
  { path: "/saas-website-analysis", lastModified },
  { path: "/website-conversion-check", lastModified },
  { path: "/insights/homepage-patterns", lastModified },
  { path: "/pricing", lastModified },
  { path: "/teardowns", lastModified },
  { path: "/teardowns/stripe", lastModified },
  { path: "/teardowns/linear", lastModified },
  { path: "/teardowns/notion", lastModified },
  { path: "/teardowns/vercel", lastModified },
  { path: "/teardowns/figma", lastModified },
  { path: "/privacy", lastModified },
  { path: "/terms", lastModified },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: page.lastModified,
  }));
}
