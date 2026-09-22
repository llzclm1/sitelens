import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How SiteLens handles website review, analytics, and report data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page shell">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <Link className="nav-cta" href="/">Analyze a site <span aria-hidden="true">↗</span></Link>
      </nav>
      <article className="legal-copy">
        <p className="eyebrow">SITE LENS / PRIVACY</p>
        <h1>What happens to the information you give us.</h1>
        <p className="legal-updated">Last updated: September 11, 2026</p>
        <h2>What we collect</h2>
        <p>When you request a review, we process the website URL, the product description, the target audience, and the resulting report. SiteLens does not require an account, email address, or payment to show the report.</p>
        <h2>How we use it</h2>
        <p>We use this information to fetch the submitted page, apply the rule-based review, and show the report. The submitted page is analyzed for the purpose you requested. The analysis uses observable HTML, metadata, copy, links, and response signals; it is not sent to an AI provider for report generation.</p>
        <h2>Analytics</h2>
        <p>SiteLens uses Google Analytics 4 to understand visits and product usage. Google may set analytics cookies or similar identifiers according to its own policies. SiteLens does not collect payment details because the public-beta review has no checkout.</p>
        <h2>Storage and requests</h2>
        <p>Reports are stored in the SiteLens database for operating the service. A report link is intentionally shareable, but report pages and report API responses are marked not to be indexed or cached. To request removal of a report, contact the SiteLens operator and include the report reference.</p>
        <h2>Boundaries</h2>
        <p>Do not submit confidential information in the product or audience fields, and only submit websites you are authorized to have analyzed. SiteLens is not an analytics processor for your customers and does not promise a conversion result.</p>
      </article>
      <footer className="footer"><Link href="/terms">Terms</Link><Link href="/">Back to SiteLens</Link></footer>
    </main>
  );
}
