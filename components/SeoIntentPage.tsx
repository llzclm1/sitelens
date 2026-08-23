import Link from "next/link";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

export type SeoIntentPageConfig = {
  slug: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
  intro: string;
  checks: ReadonlyArray<{ label: string; title: string; copy: string }>;
  faq: ReadonlyArray<{ question: string; answer: string }>;
};

export function SeoIntentPage({ config }: { config: SeoIntentPageConfig }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/${config.slug}#webpage`,
        url: `${siteUrl}/${config.slug}`,
        name: config.title,
        description: config.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/${config.slug}#faq`,
        mainEntity: config.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SiteLens", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: config.title, item: `${siteUrl}/${config.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="teardown-page seo-intent-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="topbar shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <div className="nav-actions">
          <Link className="nav-link" href="/website-review">Website review</Link>
          <Link className="nav-link" href="/teardowns">Teardowns</Link>
          <Link className="nav-cta" href="/#analyze">Review a site <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>

      <header className="teardown-header shell">
        <p className="eyebrow">{config.eyebrow}</p>
        <h1>{config.title} <em>{config.emphasis}</em></h1>
        <p className="teardown-intro">{config.intro}</p>
        <div className="teardown-source"><span>Free review: three page-specific findings</span><span>Deep Growth Report: $29 one time</span></div>
      </header>

      <section className="teardown-grid shell" aria-labelledby={`${config.slug}-checks`}>
        <aside className="teardown-sidebar">
          <p className="eyebrow">SITE LENS / METHOD</p>
          <h2 id={`${config.slug}-checks`}>A useful review starts with what the page <em>shows.</em></h2>
          <p>SiteLens reads public page content and structure. It does not access private analytics, run experiments, or claim a measured conversion lift.</p>
        </aside>
        <div className="teardown-findings">
          {config.checks.map((check) => (
            <article className="teardown-finding" key={check.label}>
              <p className="evidence-label">{check.label}</p>
              <h2>{check.title}</h2>
              <p>{check.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="teardown-action-plan shell" aria-label="How to use the review">
        <article><span>01 / INPUT</span><h3>Share the public page</h3><p>Add the URL, what the product does, and who it is for.</p></article>
        <article><span>02 / EVIDENCE</span><h3>See the first friction</h3><p>Each finding points to a page detail before it explains the business impact.</p></article>
        <article><span>03 / NEXT MOVE</span><h3>Make one useful edit</h3><p>Start with the change most likely to improve visitor understanding.</p></article>
      </section>

      <section className="review-faq shell" aria-labelledby={`${config.slug}-faq`}>
        <div>
          <p className="eyebrow">COMMON QUESTIONS</p>
          <h2 id={`${config.slug}-faq`}>Before you change the <em>page.</em></h2>
        </div>
        <div className="faq-list">
          {config.faq.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="teardown-disclaimer shell">SiteLens provides qualitative page analysis. It does not estimate a conversion rate or replace private analytics and experiments.</p>

      <footer className="footer shell">
        <Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <span><Link href="/website-review">Website review</Link> · <Link href="/teardowns">Teardowns</Link> · <Link href="/pricing">Pricing</Link> · <Link href="/privacy">Privacy</Link></span>
      </footer>
    </main>
  );
}
