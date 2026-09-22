import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/pricing#webpage`,
  name: "SiteLens free access",
  description: "SiteLens provides a complete rule-based website review at no cost during the public beta.",
  url: `${siteUrl}/pricing`,
};

export const metadata: Metadata = {
  title: "Free Access",
  description: "SiteLens is free during the public beta. Every website review includes the page evidence, score, and first fixes.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="teardown-page pricing-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="topbar shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <Link className="nav-cta" href="/">Analyze a site <span aria-hidden="true">↗</span></Link>
      </nav>

      <header className="teardown-header shell">
        <p className="eyebrow">ACCESS / PUBLIC BETA</p>
        <h1>Every useful finding is <em>included.</em></h1>
        <p className="teardown-intro">SiteLens is free during the public beta. There is no checkout, subscription, account, or email gate between a public URL and its rule-based review.</p>
      </header>

      <section className="evidence-strip shell" aria-label="SiteLens access summary">
        <div><span>REVIEW</span><strong>Free</strong></div>
        <div><span>INPUT</span><strong>One public URL</strong></div>
        <div><span>OUTPUT</span><strong>Score + 3 findings</strong></div>
        <div><span>METHOD</span><strong>Observable rules</strong></div>
      </section>

      <section className="unlock-section shell" aria-labelledby="included-title">
        <div className="unlock-copy">
          <p className="eyebrow">WHAT IS INCLUDED</p>
          <h2 id="included-title">A complete first read of <em>the page.</em></h2>
          <p>The report checks positioning, clarity, trust, conversion path, page structure, metadata, image accessibility, and public security signals. Each finding includes the evidence, why it matters, and a first fix.</p>
          <ul className="pricing-list">
            <li><span>01</span><strong>Page-specific score and priority</strong></li>
            <li><span>02</span><strong>Evidence and business impact</strong></li>
            <li><span>03</span><strong>Suggested change and rewrite direction</strong></li>
          </ul>
        </div>
        <article className="upgrade-card pricing-card">
          <div className="upgrade-price"><span>PUBLIC BETA</span><strong>FREE</strong></div>
          <p>Use the complete report immediately. SiteLens does not collect an email or ask for payment to reveal the findings.</p>
          <Link className="nav-cta" href="/#analyze">Review your site <span aria-hidden="true">↗</span></Link>
          <small>The review is qualitative. It does not access private analytics, run experiments, or guarantee conversion, search ranking, or revenue results.</small>
        </article>
      </section>

      <p className="teardown-disclaimer shell">Rule-based means the same observable page signals are evaluated consistently. SiteLens shows its evidence and limits so you can decide what to test next.</p>

      <footer className="footer shell">
        <Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <span><Link href="/website-review">Website review</Link> · <Link href="/teardowns">Teardowns</Link> · <Link href="/privacy">Privacy</Link></span>
      </footer>
    </main>
  );
}
