import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

const homepageUpdated = "2026-09-11";
const editorialUpdated = "2026-09-07";
const legalUpdated = "2026-09-11";

const pages: Array<{ path: string; lastModified: string }> = [
  { path: "/", lastModified: homepageUpdated },
  { path: "/website-review", lastModified: homepageUpdated },
  { path: "/ai-website-audit", lastModified: editorialUpdated },
  { path: "/landing-page-review", lastModified: editorialUpdated },
  { path: "/saas-website-analysis", lastModified: editorialUpdated },
  { path: "/website-conversion-check", lastModified: editorialUpdated },
  { path: "/why-saas-websites-dont-convert", lastModified: editorialUpdated },
  { path: "/why-websites-dont-convert", lastModified: editorialUpdated },
  { path: "/homepage-value-proposition-examples", lastModified: editorialUpdated },
  { path: "/saas-homepage-audit", lastModified: editorialUpdated },
  { path: "/ai-website-audit-vs-seo-checker", lastModified: editorialUpdated },
  { path: "/landing-page-conversion-review", lastModified: editorialUpdated },
  { path: "/website-messaging-audit", lastModified: editorialUpdated },
  { path: "/insights/homepage-patterns", lastModified: editorialUpdated },
  { path: "/pricing", lastModified: homepageUpdated },
  { path: "/teardowns", lastModified: editorialUpdated },
  { path: "/teardowns/stripe", lastModified: editorialUpdated },
  { path: "/teardowns/linear", lastModified: editorialUpdated },
  { path: "/teardowns/notion", lastModified: editorialUpdated },
  { path: "/teardowns/vercel", lastModified: editorialUpdated },
  { path: "/teardowns/figma", lastModified: editorialUpdated },
  { path: "/teardowns/slack", lastModified: editorialUpdated },
  { path: "/teardowns/webflow", lastModified: editorialUpdated },
  { path: "/teardowns/hubspot", lastModified: editorialUpdated },
  { path: "/privacy", lastModified: legalUpdated },
  { path: "/terms", lastModified: legalUpdated },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: page.lastModified,
  }));
}
