import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

const pages: Array<{ path: string; lastModified: string }> = [
  { path: "/", lastModified: "2026-08-23" },
  { path: "/website-review", lastModified: "2026-08-16" },
  { path: "/ai-website-audit", lastModified: "2026-08-23" },
  { path: "/landing-page-review", lastModified: "2026-08-23" },
  { path: "/saas-website-analysis", lastModified: "2026-08-23" },
  { path: "/website-conversion-check", lastModified: "2026-08-23" },
  { path: "/pricing", lastModified: "2026-08-16" },
  { path: "/teardowns", lastModified: "2026-08-16" },
  { path: "/teardowns/stripe", lastModified: "2026-08-16" },
  { path: "/privacy", lastModified: "2026-08-16" },
  { path: "/terms", lastModified: "2026-08-16" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: page.lastModified,
  }));
}
