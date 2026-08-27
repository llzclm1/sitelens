"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

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

const frameworkItems = ["Positioning", "Clarity", "Trust", "Conversion", "Authority"];
const analysisSteps = [
  "Understanding your product",
  "Reviewing the headline",
  "Checking trust elements",
  "Reading the conversion path",
  "Writing page-specific recommendations",
];

export default function HomePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [error, setError] = useState("");
  const requestController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isSubmitting) {
      setAnalysisStep(0);
      return;
    }

    const timer = window.setInterval(() => {
      setAnalysisStep((current) => Math.min(current + 1, analysisSteps.length - 1));
    }, 900);

    return () => window.clearInterval(timer);
  }, [isSubmitting]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const controller = new AbortController();
    requestController.current = controller;
    trackEvent("analyze_started");
    let statusCode = 0;

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, product, audience }),
        signal: controller.signal,
      });
      statusCode = response.status;
      const body = await response.json() as AnalysisResponse & { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "The page could not be analyzed.");
      }

      trackEvent("analyze_completed", { analysis_mode: body.mode });
      requestController.current = null;
      router.push(`/report/${body.id}`);
    } catch (submitError) {
      requestController.current = null;
      if (submitError instanceof DOMException && submitError.name === "AbortError") {
        setIsSubmitting(false);
        return;
      }
      trackEvent("analyze_failed", { status_code: statusCode });
      setError(submitError instanceof Error ? submitError.message : "The page could not be analyzed.");
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    requestController.current?.abort();
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
          <a className="nav-link" href="/website-review">Website review</a>
          <a className="nav-link nav-link-secondary" href="/teardowns">Teardowns</a>
          <a className="nav-cta" href="#analyze">Analyze a site <span aria-hidden="true">↗</span></a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">WEBSITE REVIEW / PAGE EVIDENCE</p>
          <h1>Find what blocks <em>conversions.</em></h1>
          <p className="hero-lede">
            Paste a public URL. We&apos;ll point to the first conversion problem worth fixing.
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
                  aria-describedby="form-note"
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
                  aria-describedby="form-note"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            <p className="form-note" id="form-note">
              {isSubmitting ? "Reading the page structure, copy, and calls to action." : "Free review: 3 page-specific findings. Public pages only. Deep Growth Report: $29 one time."}
            </p>
            {isSubmitting ? (
              <div className="analysis-process" aria-live="polite" aria-label="Analysis progress">
                <p className="process-label">WHILE WE READ</p>
                <ol>
                  {analysisSteps.map((step, index) => (
                    <li className={index < analysisStep ? "is-done" : index === analysisStep ? "is-active" : ""} key={step}>
                      <span aria-hidden="true">{index < analysisStep ? "✓" : `0${index + 1}`}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="process-actions">
                  <button className="process-cancel" type="button" onClick={handleCancel}>Stop waiting</button>
                </div>
              </div>
            ) : null}
          </form>
        </div>

        <figure className="hero-visual">
          <div className="hero-image-frame">
            <article className="hero-evidence-card" aria-label="Sample SiteLens finding from the public Stripe teardown">
              <header className="hero-evidence-header">
                <div>
                  <p className="evidence-label">PUBLIC TEARDOWN</p>
                  <strong>STRIPE / HOMEPAGE</strong>
                </div>
                <span>QUALITATIVE</span>
              </header>
              <div className="hero-evidence-main">
                <p className="evidence-label">THE PAGE SAYS</p>
                <h2>Financial infrastructure to grow your revenue.</h2>
              </div>
              <div className="hero-evidence-read">
                <p className="evidence-label">OUR READ</p>
                <p>A broad promise supports the category, but a smaller team may still need help choosing where to start.</p>
              </div>
              <footer className="hero-evidence-next">
                <span>NEXT MOVE</span>
                <strong>Give visitors a business model choice after the hero.</strong>
              </footer>
            </article>
          </div>
          <figcaption>
            <span>PUBLIC EVIDENCE</span>
            <strong>A sample finding: page detail, interpretation, and the next move.</strong>
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

      <section className="framework-section shell" aria-labelledby="framework-title">
        <div className="framework-intro">
          <p className="eyebrow">SITELENS GROWTH FRAMEWORK</p>
          <h2 id="framework-title">You can see how we reached the <em>recommendation.</em></h2>
          <p>Every review uses the same five questions. They feed three free findings: clarity, next step, and proof.</p>
          <div className="framework-bridge" aria-label="How the framework maps to the free review">
            <span>FREE REVIEW OUTPUT</span>
            <strong>Clarity · Next step · Proof</strong>
          </div>
        </div>
        <ol className="framework-list">
          {frameworkItems.map((item, index) => (
            <li key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="method-section shell" id="method">
        <div className="section-heading">
          <p className="eyebrow">HOW FINDINGS ARE FORMED</p>
          <h2>Five questions. Three <em>useful moves.</em></h2>
        </div>
        <div className="method-layout">
          <div className="method-lead">
            <p className="method-statement">Read the page first.</p>
            <p>The five framework questions become three page-specific findings. Each starts with a detail on the page, explains why it may create hesitation, then suggests the next change.</p>
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

      <section className="teardown-teaser shell" aria-labelledby="teardown-title">
        <div>
          <p className="eyebrow">PUBLIC TEARDOWN LIBRARY</p>
          <h2 id="teardown-title">Read one public <em>review.</em></h2>
        </div>
        <div>
          <p>We read Stripe&apos;s homepage and keep the evidence, interpretation, and next move together.</p>
          <a className="text-link" href="/teardowns/stripe">Read the Stripe teardown <span aria-hidden="true">↗</span></a>
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
        <span>Reviews based on the page itself. · <a href="/website-review">Website review</a> · <a href="/pricing">Pricing</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></span>
      </footer>
    </main>
  );
}
