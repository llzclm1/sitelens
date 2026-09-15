import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

const homepageUpdated = "2026-09-15";
const methodUpdated = "2026-09-11";
const editorialUpdated = "2026-09-07";
const conversionGuideUpdated = "2026-09-15";
const legalUpdated = "2026-09-11";
const intentUpdated = "2026-09-15";

const pages: Array<{ path: string; lastModified: string }> = [
  { path: "/", lastModified: homepageUpdated },
  { path: "/website-review", lastModified: methodUpdated },
  { path: "/ai-website-audit", lastModified: intentUpdated },
  { path: "/landing-page-review", lastModified: intentUpdated },
  { path: "/saas-website-analysis", lastModified: intentUpdated },
  { path: "/website-conversion-check", lastModified: intentUpdated },
  { path: "/why-saas-websites-dont-convert", lastModified: intentUpdated },
  { path: "/why-websites-dont-convert", lastModified: conversionGuideUpdated },
  { path: "/homepage-value-proposition-examples", lastModified: intentUpdated },
  { path: "/saas-homepage-audit", lastModified: intentUpdated },
  { path: "/ai-website-audit-vs-seo-checker", lastModified: intentUpdated },
  { path: "/landing-page-conversion-review", lastModified: intentUpdated },
  { path: "/website-messaging-audit", lastModified: intentUpdated },
  { path: "/insights/homepage-patterns", lastModified: editorialUpdated },
  { path: "/pricing", lastModified: methodUpdated },
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
