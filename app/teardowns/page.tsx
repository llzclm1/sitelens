import Link from "next/link";

export const metadata = {
  title: "Public Teardowns | SiteLens",
  description: "Page-specific website reviews that show the SiteLens method in public.",
};

export default function TeardownsPage() {
  return (
    <main className="teardown-page">
      <nav className="topbar shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <Link className="nav-cta" href="/">Analyze a site <span aria-hidden="true">↗</span></Link>
      </nav>

      <header className="teardown-header shell">
        <p className="eyebrow">PUBLIC TEARDOWN LIBRARY</p>
        <h1>See the method on <em>real pages.</em></h1>
        <p className="teardown-intro">These are qualitative page reviews, not claims about measured conversion lift. Each one keeps the observation, the page evidence, and the recommended next move together.</p>
      </header>

      <section className="teardown-grid shell" aria-labelledby="stripe-teardown-title">
        <aside className="teardown-sidebar">
          <p className="eyebrow">01 / PUBLIC CASE</p>
          <h2 id="stripe-teardown-title">Stripe homepage</h2>
          <p>One page read through the SiteLens framework. The analysis date and source are included so the context is clear.</p>
        </aside>
        <div className="teardown-findings">
          <article className="teardown-finding">
            <p className="evidence-label">CASE STUDY</p>
            <h2>Stripe homepage teardown</h2>
            <p>A public-page review of positioning, clarity, trust signals, and the next decision a visitor has to make.</p>
            <Link className="text-link" href="/teardowns/stripe/">Read the full teardown <span aria-hidden="true">↗</span></Link>
          </article>
        </div>
      </section>

      <p className="teardown-disclaimer shell">Public teardowns are qualitative reads. SiteLens does not have access to private analytics or experiment results.</p>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Public analysis, with the evidence left in.</span></footer>
    </main>
  );
}
