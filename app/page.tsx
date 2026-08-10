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

const methodPoints = [
  {
    title: "Clarity",
    copy: "Can a first-time visitor tell what you do, who it is for, and why it matters?",
  },
  {
    title: "Next step",
    copy: "Does the page make the next step clear before attention runs out?",
  },
  {
    title: "Proof",
    copy: "Does the page give a skeptical visitor a reason to continue?",
  },
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

      router.push(`/report/${body.id}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The page could not be analyzed.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="landing-page">
      <nav className="topbar shell" aria-label="Primary navigation">
        <a className="wordmark" href="/" aria-label="SiteLens home">
          <span className="wordmark-mark">S</span>
          <span>SiteLens</span>
        </a>
        <div className="nav-actions">
          <a className="nav-link" href="#method">The method</a>
          <a className="nav-cta" href="#analyze">Analyze a site <span aria-hidden="true">↗</span></a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">WEBSITE REVIEW / PAGE EVIDENCE</p>
          <h1>Find what blocks <em>signups.</em></h1>
          <p className="hero-lede">
            Paste your URL. We&apos;ll point to the first conversion problem worth fixing.
          </p>

          <form className="audit-form" id="analyze" onSubmit={handleSubmit} aria-busy={isSubmitting}>
            <div className="input-row">
              <label className="sr-only" htmlFor="url">Website URL</label>
              <input
                id="url"
                name="url"
                type="url"
                placeholder="https://yourproduct.com"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                autoComplete="url"
                aria-describedby="form-note"
                required
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Reading the page" : "Analyze a site"}
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
            <p className="form-note" id="form-note">
              {isSubmitting ? "Reading the page structure, copy, and calls to action." : "Free review. Three issues tied to your page. We do not estimate conversion rates."}
            </p>
          </form>
        </div>

        <figure className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
              alt="A laptop and annotated homepage audit notes on a dark desk"
              width="1200"
              height="900"
              fetchPriority="high"
            />
          </div>
          <figcaption>
            <span>WHAT WE READ</span>
            <strong>The difference between what you meant and what visitors see.</strong>
          </figcaption>
        </figure>
      </section>

      <section className="signal-band shell" aria-label="SiteLens analysis inputs">
        <p>We read the page before we suggest a change.</p>
        <div className="signal-list">
          <span>Page copy</span>
          <span>Page structure</span>
          <span>CTA signals</span>
          <span>Trust cues</span>
        </div>
      </section>

      <section className="method-section shell" id="method">
        <div className="section-heading">
          <p className="eyebrow">HOW THE REVIEW WORKS</p>
          <h2>Start with what visitors <em>can see.</em></h2>
        </div>
        <div className="method-layout">
          <div className="method-lead">
            <p className="method-statement">Start with the page.</p>
            <p>Each finding points to a detail on the page, explains the hesitation it may create, and suggests what to change next.</p>
            <a className="text-link" href="#analyze">Review your homepage <span aria-hidden="true">↗</span></a>
          </div>
          <div className="method-list">
            {methodPoints.map((point) => (
              <article key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section shell">
        <div>
          <p className="eyebrow">A BETTER FIRST MOVE</p>
          <h2>Know what to change <em>first.</em></h2>
        </div>
        <p>For founders who want to fix the page before adding more traffic, features, or copy.</p>
      </section>

      <footer className="footer shell">
        <span className="wordmark"><span className="wordmark-mark">S</span><span>SiteLens</span></span>
        <span>Website reviews based on the page.</span>
      </footer>
    </main>
  );
}
