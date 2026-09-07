import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Public Teardowns",
  description: "Public SiteLens website reviews that show the page evidence behind each recommendation.",
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
    label: "02 / PUBLIC CASE",
    title: "Linear homepage",
    description: "A product development system with a clear category promise and several possible starting workflows.",
    meta: "Source: linear.app · reviewed 2026-09-07",
    href: "/teardowns/linear",
    linkLabel: "Read the full teardown",
  },
  {
    label: "03 / PUBLIC CASE",
    title: "Notion homepage",
    description: "A broad workspace promise that turns into a choice between knowledge, projects, and AI work.",
    meta: "Source: notion.com · reviewed 2026-09-07",
    href: "/teardowns/notion",
    linkLabel: "Read the full teardown",
  },
  {
    label: "04 / PUBLIC CASE",
    title: "Vercel homepage",
    description: "Infrastructure for apps and agents, organized around a broad product map and concrete use cases.",
    meta: "Source: vercel.com · reviewed 2026-09-07",
    href: "/teardowns/vercel",
    linkLabel: "Read the full teardown",
  },
  {
    label: "05 / PUBLIC CASE",
    title: "Figma homepage",
    description: "A shared canvas that reaches from design into code, AI, and the wider product process.",
    meta: "Source: figma.com · reviewed 2026-09-07",
    href: "/teardowns/figma",
    linkLabel: "Read the full teardown",
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
        <p className="teardown-intro">These are qualitative page reviews. They do not claim measured conversion lift. Each one connects something visible on the page to a next move.</p>
      </header>

      <section className="teardown-grid shell" aria-labelledby="teardown-library-title">
        <aside className="teardown-sidebar">
          <p className="eyebrow">05 / CASE LIBRARY</p>
          <h2 id="teardown-library-title">Five pages.<br />Five decisions.</h2>
          <p>Each review starts with what a visitor can see and ends with the next decision the page should support. Every case uses a public homepage and includes its source and review date.</p>
          <Link className="text-link" href="/insights/homepage-patterns">Read the cross-case analysis <span aria-hidden="true">↗</span></Link>
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

      <p className="teardown-disclaimer shell">These are qualitative reviews. We did not use private analytics or experiment results.</p>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Public reviews with the evidence shown.</span></footer>
    </main>
  );
}
