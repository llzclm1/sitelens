"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

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

type DeepReport = {
  executiveSummary: string;
  heroRewrite: { before: string; after: string };
  ctaRewrite: { before: string; after: string };
  actionPlan: Array<{ week: number; focus: string; action: string; evidence: string }>;
};

export default function ReportClient({ report }: { report: PublicReport }) {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState("");
  const [upgradeError, setUpgradeError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "paid" | "failed" | null>(null);
  const [deepReport, setDeepReport] = useState<DeepReport | null>(null);
  const trackedReportId = useRef<string | null>(null);
  const trackedPayment = useRef<{ intentId: string | null; confirmed: boolean; failed: boolean; unlocked: boolean }>({ intentId: null, confirmed: false, failed: false, unlocked: false });
  const intentId = searchParams.get("intent");
  const paymentReturned = searchParams.get("payment") === "success";

  useEffect(() => {
    if (trackedReportId.current === report.id) return;
    trackedReportId.current = report.id;
    trackEvent("report_viewed", { analysis_mode: report.mode });
  }, [report.id, report.mode]);

  useEffect(() => {
    if (!paymentReturned || !intentId) return;
    const paymentIntentId = intentId;
    if (trackedPayment.current.intentId !== paymentIntentId) {
      trackedPayment.current = { intentId: paymentIntentId, confirmed: false, failed: false, unlocked: false };
    }
    let cancelled = false;
    let attempts = 0;
    async function checkPayment() {
      const response = await fetch(`/api/payments/${encodeURIComponent(paymentIntentId)}`, { cache: "no-store" });
      if (!response.ok || cancelled) return;
      const body = await response.json() as { status?: "pending" | "paid" | "failed"; deepReport?: DeepReport | null };
      if (body.status) setPaymentStatus(body.status);
      if (body.status === "paid" && !trackedPayment.current.confirmed) {
        trackedPayment.current.confirmed = true;
        trackEvent("payment_confirmed", { value: 29, currency: "USD" });
      }
      if (body.status === "failed" && !trackedPayment.current.failed) {
        trackedPayment.current.failed = true;
        trackEvent("payment_failed", { value: 29, currency: "USD" });
      }
      if (body.deepReport) {
        setDeepReport(body.deepReport);
        if (!trackedPayment.current.unlocked) {
          trackedPayment.current.unlocked = true;
          trackEvent("deep_report_unlocked", { value: 29, currency: "USD" });
        }
      }
      attempts += 1;
      if ((body.status === "pending" || (body.status === "paid" && !body.deepReport)) && attempts < 10) window.setTimeout(checkPayment, 1000);
    }
    void checkPayment();
    return () => { cancelled = true; };
  }, [intentId, paymentReturned]);

  async function requestDeepReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUpgradeError("");
    setUpgradeMessage("");
    setIsSubmitting(true);
    let statusCode = 0;

    try {
      const response = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: report.id, email }),
      });
      statusCode = response.status;
      const body = await response.json() as { error?: string; checkoutUrl?: string };
      if (!response.ok) throw new Error(body.error ?? "The request could not be saved.");
      trackEvent("email_submitted");
      if (body.checkoutUrl) {
        setUpgradeMessage("Opening secure checkout…");
        trackEvent("checkout_started", { value: 29, currency: "USD" });
        window.location.assign(body.checkoutUrl);
      }
    } catch (error) {
      trackEvent("checkout_failed", { status_code: statusCode });
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

      {paymentReturned ? <div className={`payment-banner shell payment-${paymentStatus ?? "pending"}`} role="status">{paymentStatus === "paid" ? "Payment confirmed. Your deep report is unlocked below." : paymentStatus === "failed" ? "Payment was not confirmed. Please contact support before trying again." : "The payment return has been received. We are waiting for confirmation."}</div> : null}

      {deepReport ? (
        <section className="deep-report shell" aria-labelledby="deep-report-title">
          <div className="deep-report-heading">
            <p className="eyebrow">PAID DEEP REPORT</p>
            <h2 id="deep-report-title">A clearer first move for <em>this page.</em></h2>
            <p>{deepReport.executiveSummary}.</p>
          </div>
          <div className="deep-report-rewrites">
            <article>
              <span>Hero direction</span>
              <p className="rewrite-before">{deepReport.heroRewrite.before}</p>
              <strong>{deepReport.heroRewrite.after}</strong>
            </article>
            <article>
              <span>CTA direction</span>
              <p className="rewrite-before">{deepReport.ctaRewrite.before}</p>
              <strong>{deepReport.ctaRewrite.after}</strong>
            </article>
          </div>
          <ol className="deep-report-plan">
            {deepReport.actionPlan.map((item) => (
              <li key={`${item.week}-${item.focus}`}>
                <span>WEEK 0{item.week}</span>
                <div>
                  <strong>{item.focus}</strong>
                  <p>{item.action}</p>
                  <small>Evidence: {item.evidence}</small>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

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
          <p>One homepage and one prioritized diagnosis, unlocked on this page after secure payment.</p>
          <label htmlFor="email">Email for checkout</label>
          <input id="email" type="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={isSubmitting} />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Opening checkout…" : "Pay $29 and continue ↗"}</button>
          {upgradeMessage ? <p className="form-success" role="status">{upgradeMessage}</p> : null}
          {upgradeError ? <p className="form-error" role="alert">{upgradeError}</p> : null}
          <small>Your paid report opens on this page. It uses page-specific evidence and does not promise a conversion rate.</small>
        </form>
      </section>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Report ID / {report.id} · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></footer>
    </main>
  );
}
