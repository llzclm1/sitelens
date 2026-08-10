import Link from "next/link";

export const metadata = {
  title: "Privacy",
  description: "How SiteLens handles website review, analytics, checkout and report data.",
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
        <p className="legal-updated">Last updated: August 10, 2026</p>
        <h2>What we collect</h2>
        <p>When you request a review, we process the website URL, the product description, the target audience and the resulting report. When you start checkout, we store the email address and payment intent needed to create and reconcile the order.</p>
        <h2>How we use it</h2>
        <p>We use this information to fetch the submitted page, generate the review, show the report, process payment and provide the paid report. The submitted page is analyzed for the purpose you requested. If an AI provider is configured, SiteLens sends a limited page snapshot and your supplied context to that provider for report refinement; it does not send payment credentials.</p>
        <h2>Analytics and payments</h2>
        <p>SiteLens uses Google Analytics 4 to understand visits and product usage. Google may set analytics cookies or similar identifiers according to its own policies. Checkout is handled by Waffo Pancake; SiteLens does not receive or store your full card number.</p>
        <h2>Storage and requests</h2>
        <p>Reports and payment records are stored in the SiteLens database for operating the service. To request removal of a report or checkout record, use the merchant contact shown in your checkout receipt and include the report or payment reference.</p>
        <h2>Boundaries</h2>
        <p>Do not submit confidential information in the product or audience fields, and only submit websites you are authorized to have analyzed. SiteLens is not an analytics processor for your customers and does not promise a conversion result.</p>
      </article>
      <footer className="footer"><Link href="/terms">Terms</Link><Link href="/">Back to SiteLens</Link></footer>
    </main>
  );
}
