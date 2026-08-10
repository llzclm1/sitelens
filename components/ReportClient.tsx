"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type ReportIssue = {
  id: string;
  category: string;
  title: string;
  severity: "high" | "medium" | "low";
  evidence: string;
  confidence: "high" | "medium" | "low";
};

type PublicReport = {
  id: string;
  url: string;
  host: string;
  createdAt: string;
  score: number;
  mode: "heuristic" | "ai";
  summary: string;
  snapshot: {
    title: string;
    description: string;
    h1: string[];
    ctaCount: number;
    proofSignals: string[];
    imageCount: number;
    missingAltCount: number;
  };
  issues: ReportIssue[];
};

export default function ReportClient({ report }: { report: PublicReport }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState("");
  const [upgradeError, setUpgradeError] = useState("");

  async function requestDeepReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUpgradeError("");
    setUpgradeMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: report.id, email }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "The request could not be saved.");
      if (body.checkoutUrl) window.location.assign(body.checkoutUrl);
      setUpgradeMessage(body.message);
    } catch (error) {
      setUpgradeError(error instanceof Error ? error.message : "The request could not be saved.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="report-page">
      <nav className="topbar shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <span className="report-nav-label">GROWTH REPORT / {report.host}</span>
      </nav>

      <section className="report-header shell">
        <div>
          <p className="eyebrow">PUBLIC HOMEPAGE REVIEW <span>{report.mode === "ai" ? "AI + EVIDENCE" : "EVIDENCE DRAFT"}</span></p>
          <h1>{report.host}<br /><em>has a first move.</em></h1>
          <p className="report-summary">{report.summary}</p>
        </div>
        <div className="score-block">
          <div className="score-ring" style={{ "--score": `${report.score * 3.6}deg` } as React.CSSProperties}>
            <div><strong>{report.score}</strong><span>/100</span></div>
          </div>
          <span className="score-label">conversion clarity</span>
        </div>
      </section>

      <section className="evidence-strip shell" aria-label="Page evidence summary">
        <div><span>Page title</span><strong>{report.snapshot.title || "Not found"}</strong></div>
        <div><span>H1 headings</span><strong>{report.snapshot.h1.length}</strong></div>
        <div><span>Signup signals</span><strong>{report.snapshot.ctaCount}</strong></div>
        <div><span>Proof signals</span><strong>{report.snapshot.proofSignals.length}</strong></div>
      </section>

      <section className="issues-section shell">
        <div className="section-heading report-section-heading">
          <p className="eyebrow">THE FREE READ</p>
          <h2>Three things worth<br /><em>looking at first.</em></h2>
        </div>
        <div className="issues-list">
          {report.issues.map((issue, index) => (
            <article className={`issue-card severity-${issue.severity}`} key={issue.id}>
              <div className="issue-card-number">0{index + 1}</div>
              <div className="issue-card-content">
                <div className="issue-card-meta"><span>{issue.category}</span><b>{issue.confidence} confidence</b></div>
                <h3>{issue.title}</h3>
                <p className="evidence-label">PAGE EVIDENCE</p>
                <p className="evidence-copy">{issue.evidence}</p>
              </div>
              <span className="severity-mark" aria-label={`${issue.severity} priority`} />
            </article>
          ))}
        </div>
      </section>

      <section className="unlock-section shell">
        <div className="unlock-copy">
          <p className="eyebrow">THE NEXT LAYER</p>
          <h2>Knowing the blockage<br />is only half the job.</h2>
          <p>Get the why, the rewrite, and a homepage sequence you can actually ship. Every recommendation is checked by a human before delivery.</p>
          <div className="locked-list"><span>01</span>Root-cause explanation <span>02</span>Hero + CTA rewrite <span>03</span>24-hour action plan</div>
        </div>
        <form className="upgrade-card" onSubmit={requestDeepReport}>
          <div className="upgrade-price"><span>DEEP GROWTH REPORT</span><strong>$29</strong></div>
          <p>One homepage. One prioritized diagnosis. Delivered within 24 hours.</p>
          <label htmlFor="email">Where should we send it?</label>
          <input id="email" type="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={isSubmitting} />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving request…" : "Request the deep report ↗"}</button>
          {upgradeMessage ? <p className="form-success" role="status">{upgradeMessage}</p> : null}
          {upgradeError ? <p className="form-error" role="alert">{upgradeError}</p> : null}
          <small>No automatic conversion-rate promises. Just page-specific evidence and a clear next move.</small>
        </form>
      </section>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Report ID / {report.id}</span></footer>
    </main>
  );
}
