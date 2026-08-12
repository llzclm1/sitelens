import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using SiteLens website reviews and paid reports.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="legal-page shell">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <Link className="nav-cta" href="/">Analyze a site <span aria-hidden="true">↗</span></Link>
      </nav>
      <article className="legal-copy">
        <p className="eyebrow">SITE LENS / TERMS</p>
        <h1>Use the review as a decision aid, not a promise.</h1>
        <p className="legal-updated">Last updated: August 10, 2026</p>
        <h2>What SiteLens provides</h2>
        <p>SiteLens provides qualitative website reviews based on the submitted page and the context you provide. Free reports are automated. Paid reports add a structured action plan and rewrite directions. SiteLens does not promise a conversion lift, search ranking, revenue result or business outcome.</p>
        <h2>Your responsibility</h2>
        <p>You must own or be authorized to submit a website for analysis. Do not use SiteLens to probe private systems, bypass access controls, or submit confidential data. You are responsible for deciding whether a recommendation is suitable for your business.</p>
        <h2>Paid reports</h2>
        <p>The one-time Deep Growth Report is priced at $29 when shown at checkout. Payment is handled by Waffo Pancake. The paid report is unlocked in the original SiteLens report after the payment provider confirms the order. A payment return page alone is not proof of payment.</p>
        <h2>Availability</h2>
        <p>SiteLens may change, pause or remove features. Automated analysis can be incomplete or inaccurate, especially when a page blocks automated access or relies on client-side rendering. The public teardown library is editorial and does not represent private analytics or experiment results.</p>
        <h2>Acceptable use</h2>
        <p>Do not overload the service, automate requests beyond the published limits, attempt to access another user&apos;s payment reference, or use the service for unlawful activity.</p>
      </article>
      <footer className="footer"><Link href="/privacy">Privacy</Link><Link href="/">Back to SiteLens</Link></footer>
    </main>
  );
}
