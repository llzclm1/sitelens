import type { Metadata } from "next";
import Script from "next/script";
import SiteAnalytics from "@/components/SiteAnalytics";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";

const siteUrlString = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");
const siteUrl = new URL(siteUrlString);
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SiteLens",
    title: "SiteLens | Evidence-based website reviews",
    description: "Find the first website change worth fixing with page-specific evidence.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
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
      logo: `${siteUrlString}/icon.svg`,
      knowsAbout: [
        "website positioning",
        "customer clarity",
        "trust signals",
        "conversion paths",
        "landing page reviews",
        "AI-assisted website analysis",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrlString}/#website`,
      name: "SiteLens",
      url: siteUrlString,
      publisher: { "@id": `${siteUrlString}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrlString}/#webpage`,
      url: siteUrlString,
      name: "SiteLens | Evidence-based website reviews",
      description: "Find the first website change worth fixing with page-specific evidence.",
      isPartOf: { "@id": `${siteUrlString}/#website` },
      about: { "@id": `${siteUrlString}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrlString}/#software`,
      name: "SiteLens",
      url: siteUrlString,
      description: "An AI-assisted website growth consultant that connects page evidence to a practical next move.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      featureList: [
        "Website positioning review",
        "Conversion path review",
        "Trust signal review",
        "Page-specific action plan",
      ],
      provider: { "@id": `${siteUrlString}/#organization` },
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          url: siteUrlString,
          name: "Free website review",
        },
        {
          "@type": "Offer",
          price: "29",
          priceCurrency: "USD",
          url: `${siteUrlString}/pricing`,
          name: "Deep Growth Report",
          description: "A one-time prioritized website growth report.",
        },
      ],
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
            <Script id="site-lens-ga4" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
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
