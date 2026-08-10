"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AnalysisResponse = {
  id: string;
  url: string;
  host: string;
  score: number;
  mode: "heuristic" | "ai";
};

const sampleIssues = [
  ["01", "Positioning", "Your first sentence makes the visitor decode the product"],
  ["02", "Conversion", "The signup path is not the loudest action on the page"],
  ["03", "Trust", "There is no proof close to the moment of decision"],
];

export default function HomePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, product, audience }),
      });
      const body = await response.json() as AnalysisResponse & { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "The page could not be analyzed.");
      }

      const result = body as AnalysisResponse;
      router.push(`/report/${result.id}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The page could not be analyzed.");
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <nav className="topbar shell" aria-label="Primary navigation">
        <a className="wordmark" href="/" aria-label="SiteLens home">
          <span className="wordmark-mark">S</span>
          <span>SiteLens</span>
        </a>
        <div className="nav-meta">
          <span className="status-dot" />
          <span>Phase 0 / evidence-led review</span>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">AI WEBSITE GROWTH CONSULTANT <span>FIELD NOTE 01</span></p>
          <h1>
            Find the first thing
            <br />
            costing you a <em>signup.</em>
          </h1>
          <p className="hero-lede">
            SiteLens reads your public SaaS homepage like a conversion consultant: what is clear, what creates hesitation,
            and the one change worth making first.
          </p>

          <form className="audit-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <label className="sr-only" htmlFor="url">Website URL</label>
              <input
                id="url"
                name="url"
                type="url"
                placeholder="https://yourproduct.com"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                required
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Reading page…" : "Read my homepage"}
                <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div className="context-row">
              <div>
                <label htmlFor="product">What does it do?</label>
                <input
                  id="product"
                  name="product"
                  type="text"
                  placeholder="e.g. turns support tickets into docs"
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="audience">Who is it for?</label>
                <input
                  id="audience"
                  name="audience"
                  type="text"
                  placeholder="e.g. small SaaS teams"
                  value={audience}
                  onChange={(event) => setAudience(event.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            <p className="form-note">Free report · 3 evidence-backed issues · no conversion-rate promises</p>
          </form>
        </div>

        <div className="hero-art" aria-label="A sample SiteLens report preview">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="report-card sample-card">
            <div className="report-card-topline">
              <span>HOMEPAGE / REVIEW</span>
              <span>01:32</span>
            </div>
            <div className="sample-score-row">
              <div className="score-number">62<span>/100</span></div>
              <div>
                <p className="mini-label">FIRST READ</p>
                <p className="score-caption">A visitor sees activity.<br />They do not see the outcome.</p>
              </div>
            </div>
            <div className="signal-line"><span /> <span /> <span className="muted" /></div>
            <div className="sample-issues">
              {sampleIssues.map(([number, category, issue]) => (
                <div className="sample-issue" key={number}>
                  <span className="issue-number">{number}</span>
                  <div><span className="issue-category">{category}</span><p>{issue}</p></div>
                  <span className="issue-arrow">↗</span>
                </div>
              ))}
            </div>
            <div className="card-footer"><span>evidence collected</span><strong>03 / 03</strong></div>
          </div>
          <div className="annotation annotation-top">page evidence<br /><strong>not vibes</strong></div>
          <div className="annotation annotation-bottom">one clear<br /><strong>next move</strong></div>
        </div>
      </section>

      <section className="principle-band shell">
        <div className="principle-copy">
          <span className="section-label">THE OPERATING PRINCIPLE</span>
          <p>Every observation connects three dots:</p>
        </div>
        <div className="principle-chain" aria-label="SiteLens analysis principle">
          <span>Page evidence</span><b>→</b><span>Why it matters</span><b>→</b><span className="chain-highlight">What to change</span>
        </div>
      </section>

      <section className="how-section shell" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">NO SCORE WITHOUT A REASON</p>
          <h2>A useful review should leave<br /><em>less to guess.</em></h2>
        </div>
        <div className="steps-grid">
          <article><span>01</span><h3>We read the page</h3><p>HTML, copy, headings, metadata, links, and CTA signals form the evidence layer.</p></article>
          <article><span>02</span><h3>We name the blockage</h3><p>Three prioritized observations, with the exact page detail that led us there.</p></article>
          <article><span>03</span><h3>You choose the move</h3><p>Upgrade for the full rewrite and a 24-hour human-reviewed action plan.</p></article>
        </div>
      </section>

      <footer className="footer shell">
        <span className="wordmark"><span className="wordmark-mark">S</span><span>SiteLens</span></span>
        <span>Built for founders who want fewer opinions and one better homepage.</span>
      </footer>
    </main>
  );
}
