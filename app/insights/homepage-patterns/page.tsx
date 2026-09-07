import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

const findings = [
  {
    label: "01 / FIRST DECISION",
    title: "A broad promise needs a smaller entry point.",
    copy: "Stripe, Linear, and Vercel lead with a category-level promise. Each page then asks visitors to choose a more specific path, such as a business type, workflow, or product area. The broad line creates context, but the next choice makes it useful.",
    move: "After the hero, give visitors one clear way to choose where to start.",
    links: [
      ["Stripe", "/teardowns/stripe"],
      ["Linear", "/teardowns/linear"],
      ["Vercel", "/teardowns/vercel"],
    ],
  },
  {
    label: "02 / PRODUCT BREADTH",
    title: "Product breadth works better when it follows a job.",
    copy: "Notion presents knowledge, projects, search, and AI as parts of one workspace. Figma connects design, code, collaboration, and AI through a shared canvas. In both cases, the suite has a clear idea behind it, but a new visitor still needs a job based route into the product.",
    move: "Let visitors choose the problem they came to solve before showing the full product map.",
    links: [
      ["Notion", "/teardowns/notion"],
      ["Figma", "/teardowns/figma"],
    ],
  },
  {
    label: "03 / PROOF",
    title: "Proof is strongest beside the decision it supports.",
    copy: "The five pages use customer names, adoption figures, scale statements, or customer quotes. Those details matter most when they sit near the workflow or product choice they help explain. A proof block at the bottom of a page asks the visitor to remember a claim for too long.",
    move: "Place the most relevant proof beside the first choice, not only in a later trust section.",
    links: [
      ["Linear", "/teardowns/linear"],
      ["Notion", "/teardowns/notion"],
      ["Figma", "/teardowns/figma"],
    ],
  },
  {
    label: "04 / LANGUAGE",
    title: "A product metaphor can unify a suite, but it cannot choose for the visitor.",
    copy: "Notion uses the idea of a shared workspace. Figma uses the canvas. These ideas make a large product family easier to remember, but they do not tell every visitor which product or workflow to open first.",
    move: "Keep the umbrella idea, then translate it into a role, job, or use case.",
    links: [
      ["Notion", "/teardowns/notion"],
      ["Figma", "/teardowns/figma"],
    ],
  },
  {
    label: "05 / NEXT ACTION",
    title: "The next action should match the promise.",
    copy: "A page about product infrastructure can lead to deployment or a sales conversation. A page about a product system can lead to a workflow. A page for a broad financial platform can lead to a choice between business paths. The button makes the promise concrete.",
    move: "Name the action in the language of the visitor's next decision, not the company's internal navigation.",
    links: [
      ["Stripe", "/teardowns/stripe"],
      ["Linear", "/teardowns/linear"],
      ["Vercel", "/teardowns/vercel"],
    ],
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${siteUrl}/insights/homepage-patterns#article`,
      url: `${siteUrl}/insights/homepage-patterns`,
      headline: "Five homepage patterns from public product reviews",
      description: "A qualitative comparison of five public product homepages and the first decision each page asks a visitor to make.",
      datePublished: "2026-09-07",
      dateModified: "2026-09-07",
      author: { "@id": `${siteUrl}/#organization` },
      publisher: { "@id": `${siteUrl}/#organization` },
      isPartOf: { "@id": `${siteUrl}/#website` },
      citation: [
        "https://stripe.com/",
        "https://linear.app/",
        "https://www.notion.com/",
        "https://vercel.com/",
        "https://www.figma.com/",
      ],
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/insights/homepage-patterns#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "SiteLens", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/insights/homepage-patterns` },
        { "@type": "ListItem", position: 3, name: "Five Homepage Patterns", item: `${siteUrl}/insights/homepage-patterns` },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Five Homepage Patterns from Public Product Reviews",
  description: "A qualitative comparison of five public product homepages and the first decision each page asks a visitor to make.",
  alternates: { canonical: "/insights/homepage-patterns" },
};

export default function HomepagePatternsPage() {
  return (
    <main className="teardown-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="topbar shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <div className="nav-actions">
          <Link className="nav-link" href="/teardowns">Teardowns</Link>
          <Link className="nav-cta" href="/ai-website-audit">Review a site <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>

      <header className="teardown-header shell">
        <p className="eyebrow">INSIGHT / HOMEPAGE REVIEW PATTERNS</p>
        <h1>Five homepage patterns, one <em>first decision.</em></h1>
        <p className="teardown-intro">We compared five public product homepages to see how they explain a broad offer, guide a first choice, and use proof. This is a qualitative analysis, not a conversion study.</p>
        <div className="teardown-source"><span>Sample: Stripe, Linear, Notion, Vercel, Figma</span><span>Reviewed: August 10 to September 7, 2026</span></div>
      </header>

      <section className="teardown-grid shell" aria-labelledby="comparison-boundary">
        <aside className="teardown-sidebar">
          <p className="eyebrow">HOW TO READ THIS</p>
          <h2 id="comparison-boundary">A comparison of page choices, not <em>outcomes.</em></h2>
          <p>We read the public homepages and recorded what each page says, supports, and asks visitors to do next. We did not use private analytics, experiments, or conversion data.</p>
        </aside>
        <div className="teardown-findings">
          {findings.map((finding) => (
            <article className="teardown-finding" key={finding.label}>
              <p className="evidence-label">{finding.label}</p>
              <h2>{finding.title}</h2>
              <p>{finding.copy}</p>
              <p className="evidence-copy"><strong>SiteLens read:</strong> {finding.move}</p>
              <p className="teardown-card-meta">Cases: {finding.links.map(([label, href], index) => <span key={href}>{index > 0 ? " · " : ""}<Link href={href}>{label}</Link></span>)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="teardown-action-plan shell" aria-label="Apply the comparison to your homepage">
        <article><span>01 / CATEGORY</span><h3>Name what the product is</h3><p>Use the first line to place the offer before you explain the full product.</p></article>
        <article><span>02 / FIRST JOB</span><h3>Give visitors a place to start</h3><p>Route the next click through a role, workflow, or problem the visitor recognizes.</p></article>
        <article><span>03 / PROOF</span><h3>Put evidence beside the choice</h3><p>Use the proof that answers the hesitation created by the decision in front of the visitor.</p></article>
      </section>

      <section className="review-faq shell" aria-labelledby="source-title">
        <div>
          <p className="eyebrow">CASE SOURCES</p>
          <h2 id="source-title">Read the five <em>page reviews.</em></h2>
        </div>
        <div className="faq-list">
          <article><h3><Link href="/teardowns/stripe">Stripe homepage teardown</Link></h3><p>Reviewed August 10, 2026. Source: <a href="https://stripe.com/" target="_blank" rel="noreferrer">stripe.com</a>.</p></article>
          <article><h3><Link href="/teardowns/linear">Linear homepage teardown</Link></h3><p>Reviewed September 7, 2026. Source: <a href="https://linear.app/" target="_blank" rel="noreferrer">linear.app</a>.</p></article>
          <article><h3><Link href="/teardowns/notion">Notion homepage teardown</Link></h3><p>Reviewed September 7, 2026. Source: <a href="https://www.notion.com/" target="_blank" rel="noreferrer">notion.com</a>.</p></article>
          <article><h3><Link href="/teardowns/vercel">Vercel homepage teardown</Link></h3><p>Reviewed September 7, 2026. Source: <a href="https://vercel.com/" target="_blank" rel="noreferrer">vercel.com</a>.</p></article>
          <article><h3><Link href="/teardowns/figma">Figma homepage teardown</Link></h3><p>Reviewed September 7, 2026. Source: <a href="https://www.figma.com/" target="_blank" rel="noreferrer">figma.com</a>.</p></article>
        </div>
      </section>

      <p className="teardown-disclaimer shell">This comparison is based on public pages and dated observations. It does not claim that any page produces a measured conversion result.</p>

      <footer className="footer shell">
        <Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <span><Link href="/website-review">Website review</Link> · <Link href="/ai-website-audit">AI website audit</Link> · <Link href="/pricing">Pricing</Link></span>
      </footer>
    </main>
  );
}
