import type { Metadata } from "next";
import Script from "next/script";
import SiteAnalytics from "@/components/SiteAnalytics";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined;
const siteUrlString = (siteUrl?.toString() ?? "https://sitelens.win").replace(/\/$/, "");
const productionGaMeasurementId = "G-YNQ8J06W7D";
const productionGoogleSiteVerification = "G0fGVxpzCXqA8jnCV35SO76-hjApPFKsSOXbZCdNQVc";
const gaMeasurementId = process.env.GA_MEASUREMENT_ID?.match(/^G-[A-Z0-9]+$/)?.[0] ?? (process.env.NODE_ENV === "production" ? productionGaMeasurementId : undefined);
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.match(/^[A-Za-z0-9_-]+$/)?.[0] ?? (process.env.NODE_ENV === "production" ? productionGoogleSiteVerification : undefined);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "SiteLens | Evidence-based website reviews",
    template: "%s | SiteLens",
  },
  description:
    "SiteLens reviews websites for clarity, trust, and conversion problems, then points to the first change worth fixing.",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SiteLens",
    title: "SiteLens | Evidence-based website reviews",
    description: "Find the first website change worth fixing with page-specific evidence.",
  },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrlString}/#organization`,
      name: "SiteLens",
      url: siteUrlString,
      description: "Evidence-based website reviews for founders and small teams.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrlString}/#website`,
      name: "SiteLens",
      url: siteUrlString,
      publisher: { "@id": `${siteUrlString}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {googleSiteVerification ? (
          <meta name="google-site-verification" content={googleSiteVerification} />
        ) : null}
        {gaMeasurementId ? (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="site-lens-ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
        ) : null}
      </head>
      <body>
        <SiteAnalytics />
        {children}
      </body>
    </html>
  );
}
