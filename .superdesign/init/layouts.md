# SiteLens 布局上下文

## 根布局

- 文件：`app/layout.tsx`
- 作用：加载 Geist 字体、全局 CSS、metadata、Google Search Console 验证和 GA4 脚本。

```tsx
import type { Metadata } from "next";
import Script from "next/script";
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
        {children}
      </body>
    </html>
  );
}
```

## 页面外壳

页面使用 `.shell`、`.topbar`、`.wordmark`、`.nav-cta`、`.footer` 等全局类名组合出公共外壳；没有单独的 Header、Footer 或 AppShell 文件。

