import Link from "next/link";

export default function NotFound() {
  return (
    <main className="teardown-page">
      <nav className="topbar shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="SiteLens home"><span className="wordmark-mark">S</span><span>SiteLens</span></Link>
        <Link className="nav-cta" href="/">Analyze a site <span aria-hidden="true">↗</span></Link>
      </nav>
      <header className="teardown-header shell">
        <p className="eyebrow">404 / PAGE NOT FOUND</p>
        <h1>This page took a wrong <em>turn.</em></h1>
        <p className="teardown-intro">The page is not available, but the next useful step is still close by.</p>
        <div className="teardown-source">
          <Link className="text-link" href="/">Review a website <span aria-hidden="true">↗</span></Link>
          <Link className="text-link" href="/teardowns">Read public teardowns <span aria-hidden="true">↗</span></Link>
        </div>
      </header>
      <footer className="footer shell"><Link className="wordmark" href="/"><span className="wordmark-mark">S</span><span>SiteLens</span></Link><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></footer>
    </main>
  );
}
