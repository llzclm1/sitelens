import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined;
const productionGaMeasurementId = "G-YNQ8J06W7D";
const productionGoogleSiteVerification = "G0fGVxpzCXqA8jnCV35SO76-hjApPFKsSOXbZCdNQVc";
const gaMeasurementId = process.env.GA_MEASUREMENT_ID?.match(/^G-[A-Z0-9]+$/)?.[0] ?? (process.env.NODE_ENV === "production" ? productionGaMeasurementId : undefined);
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.match(/^[A-Za-z0-9_-]+$/)?.[0] ?? (process.env.NODE_ENV === "production" ? productionGoogleSiteVerification : undefined);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "SiteLens - Find what blocks signups",
  description:
    "A practical homepage review for indie SaaS founders. Find the first conversion problem worth fixing.",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {googleSiteVerification ? (
          <meta name="google-site-verification" content={googleSiteVerification} />
        ) : null}
        {gaMeasurementId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
