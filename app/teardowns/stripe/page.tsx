import Link from "next/link";

export const metadata = {
  title: "Stripe Homepage Teardown | SiteLens",
  description: "A public, evidence-backed qualitative teardown of Stripe's homepage.",
};

export default function StripeTeardownPage() {
  return (
    <main className="teardown-page">
      <nav className="topbar shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <Link className="nav-cta" href="/teardowns">All teardowns <span aria-hidden="true">↗</span></Link>
      </nav>

      <header className="teardown-header shell">
        <p className="eyebrow">PUBLIC TEARDOWN / STRIPE</p>
        <h1>Stripe&apos;s homepage makes a broad <em>promise.</em></h1>
        <p className="teardown-intro">A page-level read of stripe.com on August 10, 2026. This is a qualitative teardown, not a measured conversion test.</p>
        <div className="teardown-source"><span>Source: <a href="https://stripe.com/" target="_blank" rel="noreferrer">stripe.com</a></span><span>Reviewed: 2026-08-10</span></div>
      </header>

      <section className="teardown-grid shell" aria-labelledby="stripe-read-title">
        <aside className="teardown-sidebar">
          <p className="eyebrow">CASE 01 / STRIPE</p>
          <h2 id="stripe-read-title">A first-time visitor read</h2>
          <p>The page was read from the public homepage, without access to Stripe&apos;s analytics, experiments, or private conversion data.</p>
        </aside>
        <div className="teardown-findings">
          <article className="teardown-finding">
            <p className="evidence-label">THE PAGE SAYS</p>
            <h2>Financial infrastructure to grow your revenue.</h2>
            <p>Stripe leads with a broad revenue outcome, then introduces payments, financial services, and custom revenue models. The proposition is clear at the category level.</p>
          </article>
          <article className="teardown-finding">
            <p className="evidence-label">PAGE EVIDENCE</p>
            <h2>The page earns the broad promise with specific proof.</h2>
            <ul>
              <li>The hero names payments, financial services, and custom revenue models.</li>
              <li>The page shows 135+ currencies and payment methods, US$1.9tn in 2025 payment volume, and 99.999% historical uptime.</li>
              <li>Customer stories include Hertz, URBN, Instacart, and Le Monde.</li>
            </ul>
          </article>
          <article className="teardown-finding">
            <p className="evidence-label">OUR READ</p>
            <h2>The next decision could be easier for a smaller team.</h2>
            <p>The page serves enterprises, startups, platforms, and many product categories at once. That breadth supports Stripe&apos;s positioning, but a smaller team may still need to decide which path applies before it understands the first useful step.</p>
          </article>
          <article className="teardown-finding">
            <p className="evidence-label">RECOMMENDATION</p>
            <h2>Route visitors by business model immediately after the hero.</h2>
            <p>Keep the broad promise, then offer a short choice such as startups, platforms, or larger businesses. The recommendation is about reducing the next decision, not changing Stripe&apos;s positioning.</p>
          </article>
        </div>
      </section>

      <section className="teardown-action-plan shell" aria-label="Teardown action plan">
        <article><span>01 / POSITIONING</span><h3>Keep the category promise</h3><p>The headline makes the business outcome legible before the product list begins.</p></article>
        <article><span>02 / CLARITY</span><h3>Add an audience route</h3><p>Help a smaller team choose the most relevant path without scanning every solution.</p></article>
        <article><span>03 / TRUST</span><h3>Bring proof closer to the choice</h3><p>Use the existing numbers and customer stories where a visitor is deciding what to explore.</p></article>
      </section>

      <p className="teardown-disclaimer shell">SiteLens does not have access to Stripe&apos;s analytics, experiments, or conversion data. This is a public-page interpretation, not a measured performance claim.</p>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Public analysis, with the evidence left in.</span><Link href="/">Analyze your own site ↗</Link></footer>
    </main>
  );
}
