import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "SiteLens — Find the first thing costing you a signup",
  description:
    "Evidence-based homepage diagnosis for indie SaaS founders. Find the clearest conversion blockage and what to change first.",
  alternates: siteUrl ? { canonical: "/" } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
