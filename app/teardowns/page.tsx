import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Public Teardowns",
  description: "Public website reviews from SiteLens, with the evidence behind each recommendation.",
  alternates: { canonical: "/teardowns" },
};

const teardownCards = [
  {
    label: "01 / PUBLIC CASE",
    title: "Stripe homepage",
    description: "A qualitative read of positioning, clarity, trust signals, and the next decision a visitor has to make.",
    meta: "Source: stripe.com · qualitative review",
    href: "/teardowns/stripe",
    linkLabel: "Read the full teardown",
  },
  {
    label: "02 / EXAMPLE CASE",
    title: "AI workspace homepage",
    description: "The promise sounds ambitious, but the first screen makes the visitor work to identify the workflow and outcome.",
    meta: "Illustrative example · no measured results",
    href: "/#audit-form",
    linkLabel: "Analyze a similar page",
  },
  {
    label: "03 / EXAMPLE CASE",
    title: "B2B service homepage",
    description: "A polished service page can still leave the buying decision vague when proof and the next step arrive too late.",
    meta: "Illustrative example · no measured results",
    href: "/#audit-form",
    linkLabel: "Analyze a similar page",
  },
  {
    label: "04 / EXAMPLE CASE",
    title: "Creator tool homepage",
    description: "The page needs to show the before-and-after moment before asking a visitor to start or sign up.",
    meta: "Illustrative example · no measured results",
    href: "/#audit-form",
    linkLabel: "Analyze a similar page",
  },
];

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

      <section className="teardown-grid shell" aria-labelledby="teardown-library-title">
        <aside className="teardown-sidebar">
          <p className="eyebrow">04 / CASE LIBRARY</p>
          <h2 id="teardown-library-title">One page.<br />Four decisions.</h2>
          <p>Each card connects what a visitor sees to the next decision the page needs to make. One is a public review; the rest are illustrative examples.</p>
        </aside>
        <div className="teardown-findings">
          {teardownCards.map((card) => (
            <article className="teardown-finding" key={card.title}>
              <p className="evidence-label">{card.label}</p>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <p className="teardown-card-meta">{card.meta}</p>
              <Link className="text-link" href={card.href}>{card.linkLabel} <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
      </section>

      <p className="teardown-disclaimer shell">These are qualitative reviews. SiteLens does not have access to private analytics or experiment results.</p>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Public reviews with the evidence included.</span></footer>
    </main>
  );
}
