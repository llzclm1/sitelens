"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type ReportIssue = {
  id: string;
  category: string;
  title: string;
  severity: "high" | "medium" | "low";
  evidence: string;
  whyItMatters: string;
  firstFix: string;
  rewrite?: { before: string; after: string };
  confidence: "high" | "medium" | "low";
};

const frameworkItems = ["Positioning", "Clarity", "Trust", "Conversion", "Authority"];

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
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState("");
  const [upgradeError, setUpgradeError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "paid" | "failed" | null>(null);
  const intentId = searchParams.get("intent");
  const paymentReturned = searchParams.get("payment") === "success";

  useEffect(() => {
    if (!paymentReturned || !intentId) return;
    const paymentIntentId = intentId;
    let cancelled = false;
    let attempts = 0;
    async function checkPayment() {
      const response = await fetch(`/api/payments/${encodeURIComponent(paymentIntentId)}`, { cache: "no-store" });
      if (!response.ok || cancelled) return;
      const body = await response.json() as { status?: "pending" | "paid" | "failed" };
      if (body.status) setPaymentStatus(body.status);
      attempts += 1;
      if (body.status === "pending" && attempts < 5) window.setTimeout(checkPayment, 1000);
    }
    void checkPayment();
    return () => { cancelled = true; };
  }, [intentId, paymentReturned]);

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
      const body = await response.json() as { error?: string; checkoutUrl?: string };
      if (!response.ok) throw new Error(body.error ?? "The request could not be saved.");
      if (body.checkoutUrl) {
        setUpgradeMessage("Opening secure checkout…");
        window.location.assign(body.checkoutUrl);
      }
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

      {paymentReturned ? <div className={`payment-banner shell payment-${paymentStatus ?? "pending"}`} role="status">{paymentStatus === "paid" ? "Payment confirmed. Your deep report is now in the review queue." : paymentStatus === "failed" ? "Payment was not confirmed. Please contact support before trying again." : "The payment return has been received. We are waiting for confirmation."}</div> : null}

      <section className="report-header shell">
        <div>
          <p className="eyebrow">PUBLIC HOMEPAGE REVIEW <span>{report.mode === "ai" ? "AI-ASSISTED READ" : "RULE-BASED READ"}</span></p>
          <h1>What {report.host}<br /><em>should fix first.</em></h1>
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

      <section className="framework-section report-framework shell" aria-labelledby="report-framework-title">
        <div className="framework-intro">
          <p className="eyebrow">SITELENS GROWTH FRAMEWORK</p>
          <h2 id="report-framework-title">The score is only a summary. The review shows how we reached each <em>recommendation.</em></h2>
          <p>The review uses five questions before it recommends a change.</p>
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

      <section className="issues-section shell">
        <div className="section-heading report-section-heading">
          <p className="eyebrow">FREE REVIEW</p>
          <h2>Three issues to<br /><em>look at first.</em></h2>
        </div>
        <div className="issues-list">
          {report.issues.map((issue, index) => (
            <article className={`issue-card severity-${issue.severity}`} key={issue.id}>
              <div className="issue-card-number">0{index + 1}</div>
              <div className="issue-card-content">
                <div className="issue-card-meta"><span>{issue.category}</span><b>{issue.confidence} confidence</b></div>
                <h3>{issue.title}</h3>
                <div className="evidence-block">
                  <p className="evidence-label">WHY IT MATTERS</p>
                  <p>{issue.whyItMatters}</p>
                </div>
                <div className="evidence-block">
                  <p className="evidence-label">PAGE EVIDENCE</p>
                  <p>{issue.evidence}</p>
                </div>
                <div className="evidence-block">
                  <p className="evidence-label">WHAT TO CHANGE</p>
                  <p>{issue.firstFix}</p>
                  {issue.rewrite ? (
                    <div className="rewrite-block">
                      <div><span>Current direction</span><p>{issue.rewrite.before}</p></div>
                      <div><span>Suggested direction</span><p>{issue.rewrite.after}</p></div>
                    </div>
                  ) : null}
                </div>
              </div>
              <span className="severity-mark" aria-label={`${issue.severity} priority`} />
            </article>
          ))}
        </div>
      </section>

      <section className="unlock-section shell">
        <div className="unlock-copy">
          <p className="eyebrow">DEEP REPORT</p>
          <h2>The next step is deciding<br />what to change.</h2>
          <p>The deep report explains the issue, rewrites the hero and CTA, and lays out a homepage sequence. SiteLens does not promise a conversion lift.</p>
          <div className="locked-list"><span>01</span>Root-cause explanation <span>02</span>Hero + CTA rewrite <span>03</span>24-hour action plan</div>
        </div>
        <form className="upgrade-card" onSubmit={requestDeepReport}>
          <div className="upgrade-price"><span>DEEP GROWTH REPORT</span><strong>$29</strong></div>
          <p>One homepage and one prioritized diagnosis, delivered within 24 hours after secure payment.</p>
          <label htmlFor="email">Where should we send it?</label>
          <input id="email" type="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={isSubmitting} />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Opening checkout…" : "Pay $29 and continue ↗"}</button>
          {upgradeMessage ? <p className="form-success" role="status">{upgradeMessage}</p> : null}
          {upgradeError ? <p className="form-error" role="alert">{upgradeError}</p> : null}
          <small>The report uses page-specific evidence and gives you a next move. It does not promise a conversion rate.</small>
        </form>
      </section>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Report ID / {report.id}</span></footer>
    </main>
  );
}
