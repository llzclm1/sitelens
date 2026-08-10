import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiteLens — Find the first thing costing you a signup",
  description:
    "Evidence-based homepage diagnosis for indie SaaS founders. Find the clearest conversion blockage and what to change first.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
