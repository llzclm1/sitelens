import Link from "next/link";

export const metadata = {
  title: "Public Teardowns",
  description: "Public website reviews from SiteLens, with the evidence behind each recommendation.",
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
        <h1>Public website <em>reviews.</em></h1>
        <p className="teardown-intro">These are qualitative page reviews, not claims about measured conversion lift. Each review connects what we saw on the page to a recommended next move.</p>
      </header>

      <section className="teardown-grid shell" aria-labelledby="stripe-teardown-title">
        <aside className="teardown-sidebar">
          <p className="eyebrow">01 / PUBLIC CASE</p>
          <h2 id="stripe-teardown-title">Stripe homepage</h2>
          <p>We read one page through the SiteLens framework. The page includes the review date and source.</p>
        </aside>
        <div className="teardown-findings">
          <article className="teardown-finding">
            <p className="evidence-label">CASE STUDY</p>
            <h2>Stripe homepage teardown</h2>
            <p>A public page review that looks at positioning, clarity, trust signals, and the next decision a visitor has to make.</p>
            <Link className="text-link" href="/teardowns/stripe/">Read the full teardown <span aria-hidden="true">↗</span></Link>
          </article>
        </div>
      </section>

      <p className="teardown-disclaimer shell">These are qualitative reviews. SiteLens does not have access to private analytics or experiment results.</p>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Public reviews with the evidence included.</span></footer>
    </main>
  );
}
