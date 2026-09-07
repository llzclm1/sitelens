import Link from "next/link";
import type { TeardownReview as TeardownReviewData } from "@/lib/teardown-reviews";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

export function TeardownReview({ review }: { review: TeardownReviewData }) {
  const pageUrl = `${siteUrl}/teardowns/${review.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: review.title,
        description: review.description,
        datePublished: review.reviewed,
        dateModified: review.reviewed,
        author: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        citation: review.sourceUrl,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SiteLens", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Teardowns", item: `${siteUrl}/teardowns` },
          { "@type": "ListItem", position: 3, name: `${review.company} Homepage Teardown`, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="teardown-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="topbar shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <Link className="nav-cta" href="/teardowns">All teardowns <span aria-hidden="true">↗</span></Link>
      </nav>

      <header className="teardown-header shell">
        <p className="eyebrow">{review.label}</p>
        <h1>{review.title}</h1>
        <p className="teardown-intro">We read the public {review.company} homepage on {review.reviewed}. This is a qualitative review, not a conversion test.</p>
        <div className="teardown-source"><span>Source: <a href={review.sourceUrl} target="_blank" rel="noreferrer">{new URL(review.sourceUrl).hostname}</a></span><span>Reviewed: {review.reviewed}</span></div>
      </header>

      <section className="teardown-grid shell" aria-labelledby={`${review.slug}-read-title`}>
        <aside className="teardown-sidebar">
          <p className="eyebrow">PUBLIC EVIDENCE / {review.company.toUpperCase()}</p>
          <h2 id={`${review.slug}-read-title`}>What a first-time visitor sees</h2>
          <p>The page was read from the public homepage, without access to {review.company}&apos;s analytics, experiments, or private conversion data.</p>
        </aside>
        <div className="teardown-findings">
          <article className="teardown-finding">
            <p className="evidence-label">THE PAGE SAYS</p>
            <h2>{review.pageSays.heading}</h2>
            <p>{review.pageSays.copy}</p>
          </article>
          <article className="teardown-finding">
            <p className="evidence-label">PAGE EVIDENCE</p>
            <h2>The page backs up that promise.</h2>
            <ul>{review.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="teardown-finding">
            <p className="evidence-label">OUR READ</p>
            <h2>{review.read.heading}</h2>
            <p>{review.read.copy}</p>
          </article>
          <article className="teardown-finding">
            <p className="evidence-label">RECOMMENDATION</p>
            <h2>{review.recommendation.heading}</h2>
            <p>{review.recommendation.copy}</p>
          </article>
        </div>
      </section>

      <section className="teardown-action-plan shell" aria-label="Teardown action plan">
        {review.actions.map((action) => (
          <article key={action.label}>
            <span>{action.label}</span>
            <h3>{action.title}</h3>
            <p>{action.copy}</p>
          </article>
        ))}
      </section>

      <p className="teardown-disclaimer shell">We only used the public page. SiteLens has no access to {review.company}&apos;s private analytics, experiments, or conversion data. This is an interpretation, not a measured performance claim.</p>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Public reviews with the evidence shown.</span><Link href="/">Analyze your own site ↗</Link></footer>
    </main>
  );
}
