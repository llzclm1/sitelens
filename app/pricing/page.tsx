import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${siteUrl}/pricing#deep-growth-report`,
  name: "SiteLens Deep Growth Report",
  description: "A one-time, page-specific website growth report with prioritized diagnosis, rewrite directions, and an action plan.",
  brand: { "@type": "Brand", name: "SiteLens" },
  category: "Website conversion review",
  offers: {
    "@type": "Offer",
    url: `${siteUrl}/pricing/`,
    priceCurrency: "USD",
    price: "29",
    availability: "https://schema.org/InStock",
  },
};

export const metadata: Metadata = {
  title: "Pricing",
  description: "SiteLens pricing: a free website review and a $29 one-time Deep Growth Report.",
  alternates: { canonical: "/pricing/" },
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
        <p className="eyebrow">PRICING / DEEP GROWTH REPORT</p>
        <h1>A report that tells you what to change <em>first.</em></h1>
        <p className="teardown-intro">Start with a free page-specific review. If you need a more complete homepage direction, unlock the Deep Growth Report once for $29.</p>
      </header>

      <section className="evidence-strip shell" aria-label="SiteLens pricing summary">
        <div><span>FREE REVIEW</span><strong>$0</strong></div>
        <div><span>DEEP REPORT</span><strong>$29 one time</strong></div>
        <div><span>DELIVERY</span><strong>On the report page</strong></div>
        <div><span>GUARANTEE</span><strong>No outcome promise</strong></div>
      </section>

      <section className="unlock-section shell" aria-labelledby="deep-report-title">
        <div className="unlock-copy">
          <p className="eyebrow">DEEP GROWTH REPORT</p>
          <h2 id="deep-report-title">Specific changes for <em>this page.</em></h2>
          <p>The paid report turns the free findings into a prioritized homepage direction. It stays tied to the evidence SiteLens found on the submitted page.</p>
          <ul className="pricing-list">
            <li><span>01</span><strong>Prioritized diagnosis</strong></li>
            <li><span>02</span><strong>Hero and CTA rewrite directions</strong></li>
            <li><span>03</span><strong>Three-week action plan</strong></li>
          </ul>
        </div>
        <article className="upgrade-card pricing-card">
          <div className="upgrade-price"><span>ONE-TIME REPORT</span><strong>$29</strong></div>
          <p>One homepage and one evidence-based growth diagnosis, unlocked after secure payment confirmation.</p>
          <Link className="nav-cta" href="/">Start with a free review <span aria-hidden="true">↗</span></Link>
          <small>No subscription required. SiteLens does not access private analytics or guarantee conversion, search ranking, or revenue results.</small>
        </article>
      </section>

      <p className="teardown-disclaimer shell">Payment is handled by Waffo Pancake through the SiteLens checkout flow. The paid report is unlocked on the original report page after the payment provider confirms the order. <Link href="/pricing.md">Machine-readable pricing ↗</Link></p>

      <footer className="footer shell">
        <Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <span><Link href="/website-review">Website review</Link> · <Link href="/teardowns">Teardowns</Link> · <Link href="/privacy">Privacy</Link></span>
      </footer>
    </main>
  );
}
