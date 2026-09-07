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
  { path: "/why-saas-websites-dont-convert", lastModified },
  { path: "/homepage-value-proposition-examples", lastModified },
  { path: "/saas-homepage-audit", lastModified },
  { path: "/ai-website-audit-vs-seo-checker", lastModified },
  { path: "/landing-page-conversion-review", lastModified },
  { path: "/website-messaging-audit", lastModified },
  { path: "/insights/homepage-patterns", lastModified },
  { path: "/pricing", lastModified },
  { path: "/teardowns", lastModified },
  { path: "/teardowns/stripe", lastModified },
  { path: "/teardowns/linear", lastModified },
  { path: "/teardowns/notion", lastModified },
  { path: "/teardowns/vercel", lastModified },
  { path: "/teardowns/figma", lastModified },
  { path: "/teardowns/slack", lastModified },
  { path: "/teardowns/webflow", lastModified },
  { path: "/teardowns/hubspot", lastModified },
  { path: "/privacy", lastModified },
  { path: "/terms", lastModified },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: page.lastModified,
  }));
}
