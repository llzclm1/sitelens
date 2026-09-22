"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import type { SecuritySignals } from "@/lib/types";

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
    securitySignals?: SecuritySignals;
  };
  issues: ReportIssue[];
};

export default function ReportClient({ report }: { report: PublicReport }) {
  const securitySignals = report.snapshot.securitySignals ?? {
    https: false,
    contentSecurityPolicy: false,
    strictTransportSecurity: false,
    frameProtection: false,
    contentTypeProtection: false,
    referrerPolicy: false,
    mixedContentCount: 0,
    insecureFormCount: 0,
    thirdPartyScriptCount: 0,
  };
  const [shareMessage, setShareMessage] = useState("");
  const trackedReportId = useRef<string | null>(null);

  useEffect(() => {
    if (trackedReportId.current === report.id) return;
    trackedReportId.current = report.id;
    trackEvent("report_viewed", { analysis_mode: report.mode });
  }, [report.id, report.mode]);

  async function shareReport() {
    const shareUrl = `${window.location.origin}/report/${encodeURIComponent(report.id)}?utm_source=share&utm_medium=referral&utm_campaign=report_share`;
    const shareData = {
      title: `${report.host} website review | SiteLens`,
      text: `SiteLens found a ${report.score}/100 website review for ${report.host}.`,
      url: shareUrl,
    };

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        trackEvent("report_shared", { share_method: "native" });
        setShareMessage("Review shared.");
        return;
      }

      await navigator.clipboard.writeText(`${shareData.text}\nSee the evidence and first fix: ${shareUrl}`);
      trackEvent("report_shared", { share_method: "clipboard", share_payload: "note_and_link" });
      setShareMessage("Share note copied.");
    } catch {
      setShareMessage("Copy was cancelled. The report link is still in your address bar.");
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
          <p className="eyebrow">PUBLIC HOMEPAGE REVIEW <span>RULE-BASED READ</span></p>
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

      <section className="report-share-strip shell" aria-label="Share this review">
        <div>
          <p className="eyebrow">MAKE THE EVIDENCE USEFUL</p>
          <p>Send this page to a teammate, designer, or founder who needs to see the same first fix.</p>
        </div>
        <div className="report-share-action">
          <button type="button" className="share-button" onClick={shareReport}>Share this review <span aria-hidden="true">↗</span></button>
          <Link
            className="report-recipient-link"
            href="/?utm_source=report&utm_medium=referral&utm_campaign=report_recipient#analyze"
            onClick={() => trackEvent("report_recipient_cta")}
          >
            Analyze your own site <span aria-hidden="true">↗</span>
          </Link>
          <a className="text-link report-feedback-link" href="https://github.com/llzclm1/sitelens/discussions?utm_source=report&utm_medium=community&utm_campaign=feedback" target="_blank" rel="noreferrer">Tell us what was useful <span aria-hidden="true">↗</span></a>
          {shareMessage ? <span className="share-message" role="status">{shareMessage}</span> : null}
        </div>
      </section>

      <section className="security-signals shell" aria-labelledby="security-signals-title">
        <div className="security-signals-intro">
          <p className="eyebrow">PUBLIC SECURITY SIGNALS</p>
          <h2 id="security-signals-title">A baseline read of what the public page <em>reveals.</em></h2>
          <p>These are observable response and markup signals, not a penetration test or a complete security audit.</p>
        </div>
        <div className="security-signal-grid">
          <div><span>Transport</span><strong>{securitySignals.https ? "HTTPS" : "HTTP"}</strong><small>{securitySignals.https ? "Encrypted transport detected" : "Encrypted transport not detected"}</small></div>
          <div><span>Content policy</span><strong>{securitySignals.contentSecurityPolicy ? "Present" : "Not found"}</strong><small>Content-Security-Policy response header</small></div>
          <div><span>Frame protection</span><strong>{securitySignals.frameProtection ? "Present" : "Not found"}</strong><small>X-Frame-Options or frame-ancestors</small></div>
          <div><span>HSTS</span><strong>{securitySignals.strictTransportSecurity ? "Present" : "Not found"}</strong><small>Strict-Transport-Security response header</small></div>
          <div><span>Content type</span><strong>{securitySignals.contentTypeProtection ? "Present" : "Not found"}</strong><small>X-Content-Type-Options: nosniff</small></div>
          <div><span>Referrer policy</span><strong>{securitySignals.referrerPolicy ? "Present" : "Not found"}</strong><small>Referrer-Policy response header</small></div>
          <div><span>Mixed content</span><strong>{securitySignals.mixedContentCount}</strong><small>HTTP resources on an HTTPS page</small></div>
          <div><span>Insecure forms</span><strong>{securitySignals.insecureFormCount}</strong><small>Forms posting to HTTP destinations</small></div>
          <div><span>External scripts</span><strong>{securitySignals.thirdPartyScriptCount}</strong><small>Scripts hosted outside this hostname</small></div>
        </div>
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

      <section className="unlock-section shell report-complete-section">
        <div className="unlock-copy">
          <p className="eyebrow">FULL REVIEW / NO PAYWALL</p>
          <h2>Everything is included<br />in this <em>report.</em></h2>
          <p>SiteLens is free during the public beta. The rule engine shows the evidence, impact, and first fix in one report, with no account, email, or payment required.</p>
          <div className="locked-list"><span>01</span>Page evidence <span>02</span>Priority and confidence <span>03</span>Suggested change and rewrite direction</div>
        </div>
        <article className="upgrade-card included-card">
          <div className="upgrade-price"><span>PUBLIC BETA ACCESS</span><strong>FREE</strong></div>
          <p>Use the report as a first-pass decision aid. It is based on observable page signals and does not claim measured conversion lift.</p>
          <Link className="nav-cta" href="/">Review another site <span aria-hidden="true">↗</span></Link>
          <small>No subscription, checkout, or email collection.</small>
        </article>
      </section>

      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span>Report ID / {report.id} · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></footer>
    </main>
  );
}
