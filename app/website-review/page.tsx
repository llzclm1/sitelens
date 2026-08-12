import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitelens.win").replace(/\/$/, "");

const faqItems = [
  {
    question: "What is a SiteLens website review?",
    answer: "A SiteLens website review is an evidence-based reading of a public homepage. It checks whether visitors can understand the offer, trust the company, and see a clear next step, then connects each finding to a specific page detail and suggested change.",
  },
  {
    question: "Who is the website review for?",
    answer: "It is built for indie hackers, SaaS founders, small business owners, designers, and marketers who need a fast second opinion on a homepage before spending more on traffic, features, or copy.",
  },
  {
    question: "Does SiteLens measure conversion rates?",
    answer: "No. SiteLens reviews public page content and structure, but it does not access private analytics or run experiments. The score and recommendations are qualitative signals, not a measured conversion forecast.",
  },
  {
    question: "What does the $29 Deep Growth Report include?",
    answer: "The one-time Deep Growth Report adds a prioritized diagnosis, homepage structure guidance, hero and CTA rewrite directions, and a three-week action plan. It is unlocked on the original report page after payment confirmation.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/website-review#webpage`,
      url: `${siteUrl}/website-review`,
      name: "Website Review | SiteLens",
      description: "What a SiteLens evidence-based website review checks and how the recommendations are formed.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/website-review#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export const metadata: Metadata = {
  title: "Website Review",
  description: "An evidence-based website review for clarity, trust, and conversion problems, with a concrete next move.",
  alternates: { canonical: "/website-review" },
};

export default function WebsiteReviewPage() {
  return (
    <main className="teardown-page review-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="topbar shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <div className="nav-actions">
          <Link className="nav-link" href="/teardowns">Teardowns</Link>
          <Link className="nav-cta" href="/">Review a site <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>

      <header className="teardown-header shell">
        <p className="eyebrow">WEBSITE REVIEW / CONVERSION CLARITY</p>
        <h1>Understand why your website <em>loses visitors.</em></h1>
        <p className="teardown-intro">SiteLens reads the public page itself and explains what a first-time visitor can understand, trust, and do next. The result is a focused review, not a generic checklist.</p>
        <div className="teardown-source"><span>Free review: 3 page-specific findings</span><span>Deep Growth Report: $29 one time</span></div>
      </header>

      <section className="review-answer shell" aria-labelledby="review-definition">
        <div className="review-answer-copy">
          <p className="eyebrow">WHAT IS A WEBSITE REVIEW?</p>
          <h2 id="review-definition">A page review that connects evidence to a <em>next move.</em></h2>
          <p>A website review is a structured evaluation of a public homepage. SiteLens checks positioning, customer clarity, trust signals, conversion paths, and copy, then explains why each observed detail may slow a decision.</p>
          <Link className="text-link" href="/">Review your homepage <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="review-evidence">
          <article>
            <p className="evidence-label">01 / INPUT</p>
            <h3>We read the page visitors actually see.</h3>
            <p>Submit a public URL, what the product does, and who it is for. The review uses the page content and structure as its starting evidence.</p>
          </article>
          <article>
            <p className="evidence-label">02 / METHOD</p>
            <h3>Five questions keep the analysis consistent.</h3>
            <p>Every review follows Positioning, Clarity, Trust, Conversion, and Authority so the recommendation is traceable instead of invented from a blank prompt.</p>
          </article>
          <article>
            <p className="evidence-label">03 / OUTPUT</p>
            <h3>Each finding ends with a practical change.</h3>
            <p>The report shows the problem, why it matters, the page evidence, and a suggested direction for the next edit.</p>
          </article>
        </div>
      </section>

      <section className="teardown-action-plan shell" aria-label="What the review covers">
        <article><span>POSITIONING</span><h3>What is being offered?</h3><p>Can a new visitor identify the product, audience, and outcome without decoding a slogan?</p></article>
        <article><span>CONVERSION</span><h3>What happens next?</h3><p>Does the page make one useful next step visible before attention moves on?</p></article>
        <article><span>TRUST</span><h3>Why continue?</h3><p>Does the page provide proof, specificity, or context for a skeptical visitor?</p></article>
      </section>

      <section className="review-faq shell" aria-labelledby="review-faq-title">
        <div>
          <p className="eyebrow">COMMON QUESTIONS</p>
          <h2 id="review-faq-title">Before you send a <em>homepage.</em></h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="teardown-disclaimer shell">SiteLens does not access private analytics, run experiments, or promise a conversion lift. Public reviews are qualitative interpretations of the page and include their evidence boundary.</p>

      <footer className="footer shell">
        <Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <span><Link href="/pricing">Pricing</Link> · <Link href="/teardowns">Teardowns</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span>
      </footer>
    </main>
  );
}
