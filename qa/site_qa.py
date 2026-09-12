"""SiteLens black-box browser QA runner.

The runner intentionally tests the public site through a real Chromium page.
It does not write to production APIs: the homepage analysis request is sent to
the local server and the report is verified through the local fallback store.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from pathlib import Path
from typing import Any
from urllib.error import URLError
from urllib.request import urlopen

from playwright.sync_api import Browser, Page, TimeoutError as PlaywrightTimeoutError, sync_playwright


PUBLIC_PATHS = [
    "/",
    "/website-review",
    "/ai-website-audit",
    "/landing-page-review",
    "/saas-website-analysis",
    "/website-conversion-check",
    "/why-saas-websites-dont-convert",
    "/why-websites-dont-convert",
    "/homepage-value-proposition-examples",
    "/saas-homepage-audit",
    "/ai-website-audit-vs-seo-checker",
    "/landing-page-conversion-review",
    "/website-messaging-audit",
    "/insights/homepage-patterns",
    "/pricing",
    "/teardowns",
    "/teardowns/stripe",
    "/teardowns/linear",
    "/teardowns/notion",
    "/teardowns/vercel",
    "/teardowns/figma",
    "/teardowns/slack",
    "/teardowns/webflow",
    "/teardowns/hubspot",
    "/privacy",
    "/terms",
]


class SiteQA:
    def __init__(self, base_url: str, artifact_dir: Path) -> None:
        self.base_url = base_url.rstrip("/")
        self.origin = self.base_url.split("/", 3)[0] + "//" + self.base_url.split("/", 3)[2]
        self.artifact_dir = artifact_dir
        self.findings: list[dict[str, Any]] = []
        self.warnings: list[dict[str, Any]] = []

    def fail(self, scope: str, message: str, path: str | None = None) -> None:
        self.findings.append({"scope": scope, "path": path, "message": message})

    def attach_browser_listeners(self, page: Page, scope: str) -> None:
        page.on("console", lambda message: self._on_console(message, scope, page))
        page.on("pageerror", lambda error: self.fail(scope, f"pageerror: {error}", page.url))
        page.on("requestfailed", lambda request: self._on_request_failed(request, scope, page))
        page.on("response", lambda response: self._on_response(response, scope, page))

    def _on_console(self, message: Any, scope: str, page: Page) -> None:
        if message.type == "error":
            self.fail(scope, f"console.error: {message.text}", page.url)

    def _on_request_failed(self, request: Any, scope: str, page: Page) -> None:
        if request.url.startswith(self.origin) and request.failure != "net::ERR_ABORTED":
            self.fail(scope, f"requestfailed: {request.method} {request.url} ({request.failure})", page.url)

    def _on_response(self, response: Any, scope: str, page: Page) -> None:
        if response.url.startswith(self.origin) and response.status >= 400:
            self.fail(scope, f"same-origin HTTP {response.status}: {response.request.method} {response.url}", page.url)

    def wait_for_ready(self, page: Page) -> None:
        try:
            page.wait_for_load_state("networkidle", timeout=10000)
        except PlaywrightTimeoutError:
            self.warnings.append({"scope": "runtime", "path": page.url, "message": "networkidle timeout; page was inspected after the timeout"})
        page.wait_for_timeout(250)

    def check_accessibility_basics(self, page: Page, path: str) -> None:
        if page.locator("main").count() != 1:
            self.fail("accessibility", "expected exactly one main landmark", path)
        if page.locator("h1").count() != 1:
            self.fail("accessibility", "expected exactly one h1", path)
        if page.locator("h1").first.inner_text().strip() == "":
            self.fail("accessibility", "h1 has no readable text", path)

        for index in range(page.locator("a, button").count()):
            element = page.locator("a, button").nth(index)
            accessible_name = (
                element.get_attribute("aria-label")
                or element.get_attribute("title")
                or element.inner_text()
            ).strip()
            if not accessible_name:
                self.fail("accessibility", f"interactive element {index + 1} has no accessible name", path)

        for index in range(page.locator("input").count()):
            element = page.locator("input").nth(index)
            element_id = element.get_attribute("id")
            labelled = bool(
                element.get_attribute("aria-label")
                or element.get_attribute("aria-labelledby")
                or (element_id and page.locator(f'label[for="{element_id}"]').count())
            )
            if not labelled:
                self.fail("accessibility", f"input {index + 1} has no associated label", path)

        for index in range(page.locator("img").count()):
            if page.locator("img").nth(index).get_attribute("alt") is None:
                self.fail("accessibility", f"image {index + 1} is missing alt text", path)

    def check_layout(self, page: Page, path: str) -> None:
        has_overflow = page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        if has_overflow:
            self.fail("layout", "horizontal overflow detected", path)

    def screenshot(self, page: Page, name: str) -> None:
        safe_name = re.sub(r"[^a-zA-Z0-9_-]+", "-", name.strip("/")) or "home"
        page.screenshot(path=str(self.artifact_dir / f"{safe_name}.png"), full_page=True)

    def run_public_pages(self, browser: Browser) -> None:
        for path in PUBLIC_PATHS:
            scope = f"page:{path}"
            page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
            self.attach_browser_listeners(page, scope)
            try:
                page.goto(f"{self.base_url}{path}", wait_until="domcontentloaded", timeout=15000)
                self.wait_for_ready(page)
                if page.locator("h1").count() != 1:
                    self.fail(scope, "page did not render one h1", path)
                self.check_accessibility_basics(page, path)
                self.check_layout(page, path)
                self.screenshot(page, path)
            except Exception as error:  # noqa: BLE001 - preserve a screenshot and continue through all routes
                self.fail(scope, f"unexpected browser failure: {error}", path)
                try:
                    self.screenshot(page, f"failure-{path}")
                except Exception:
                    pass
            finally:
                page.close()

    def run_interactions(self, browser: Browser) -> None:
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        self.attach_browser_listeners(page, "interaction")
        try:
            page.goto(f"{self.base_url}/?debug_mode=1", wait_until="domcontentloaded", timeout=15000)
            self.wait_for_ready(page)

            page.locator("#url").focus()
            page.wait_for_timeout(16000)
            event_names = page.evaluate(
                """() => (window.dataLayer || [])
                    .filter((entry) => entry && entry[0] === 'event')
                    .map((entry) => entry[1])""",
            )
            for expected_event in ("analysis_form_started", "qualified_session"):
                if expected_event not in event_names:
                    self.fail("analytics", f"missing client event: {expected_event}", "/")

            page.locator("#url").fill("https://sitelens.win")
            page.locator("#product").fill("turn support tickets into searchable docs")
            page.locator("#audience").fill("small SaaS teams")
            page.get_by_role("button", name=re.compile("Analyze a site")).click()
            try:
                page.wait_for_url("**/report/*", timeout=15000)
                if page.get_by_role("heading", name=re.compile("What sitelens.win should fix first")).count() != 1:
                    self.fail("interaction", "report page rendered without the expected heading", page.url)
                if page.get_by_role("heading", name=re.compile("baseline read of what the public page")).count() != 1:
                    self.fail("interaction", "report page is missing the public security signals section", page.url)
            except PlaywrightTimeoutError:
                self.fail("interaction", f"analysis submission did not navigate to report: {page.url}", "/")
            self.screenshot(page, "flow-report-navigation")
        except Exception as error:  # noqa: BLE001
            self.fail("interaction", f"analysis flow failed: {error}", "/")
            try:
                self.screenshot(page, "failure-interaction")
            except Exception:
                pass
        finally:
            page.close()

        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        self.attach_browser_listeners(page, "navigation")
        try:
            page.goto(self.base_url, wait_until="domcontentloaded", timeout=15000)
            self.wait_for_ready(page)
            page.get_by_role("link", name="Teardowns", exact=True).first.click()
            page.wait_for_url("**/teardowns", timeout=5000)
            self.wait_for_ready(page)
            for card_name in ("Slack homepage", "Webflow homepage", "HubSpot homepage"):
                if page.get_by_text(card_name, exact=True).count() != 1:
                    self.fail("navigation", f"missing teardown card: {card_name}", "/teardowns")
            page.get_by_role("link", name=re.compile("Read the cross-case analysis")).click()
            page.wait_for_url("**/insights/homepage-patterns", timeout=5000)
            self.screenshot(page, "flow-teardown-to-insight")
        except Exception as error:  # noqa: BLE001
            self.fail("navigation", f"navigation flow failed: {error}", page.url)
            try:
                self.screenshot(page, "failure-navigation")
            except Exception:
                pass
        finally:
            page.close()

    def run_mobile_check(self, browser: Browser) -> None:
        page = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
        self.attach_browser_listeners(page, "mobile")
        try:
            page.goto(self.base_url, wait_until="domcontentloaded", timeout=15000)
            self.wait_for_ready(page)
            self.check_layout(page, "/")
            if not page.get_by_role("button", name=re.compile("Analyze a site")).is_visible():
                self.fail("mobile", "primary analyze button is not visible", "/")
            self.screenshot(page, "mobile-home")
        except Exception as error:  # noqa: BLE001
            self.fail("mobile", f"mobile check failed: {error}", "/")
            try:
                self.screenshot(page, "failure-mobile-home")
            except Exception:
                pass
        finally:
            page.close()


def wait_for_server(base_url: str, timeout_seconds: int = 30) -> None:
    deadline = time.time() + timeout_seconds
    last_error: Exception | None = None
    while time.time() < deadline:
        try:
            with urlopen(base_url, timeout=3) as response:
                if response.status < 500:
                    return
        except (OSError, URLError) as error:
            last_error = error
        time.sleep(0.5)
    raise RuntimeError(f"server did not become ready: {last_error}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Run SiteLens browser QA against a local or deployed URL.")
    parser.add_argument("--base-url", default="http://127.0.0.1:3000")
    parser.add_argument("--artifacts", default="output/playwright")
    args = parser.parse_args()

    artifact_dir = Path(args.artifacts)
    artifact_dir.mkdir(parents=True, exist_ok=True)
    wait_for_server(args.base_url)
    qa = SiteQA(args.base_url, artifact_dir)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            qa.run_public_pages(browser)
            qa.run_interactions(browser)
            qa.run_mobile_check(browser)
        finally:
            browser.close()

    summary = {
        "baseUrl": args.base_url.rstrip("/"),
        "pagesChecked": len(PUBLIC_PATHS),
        "artifacts": str(artifact_dir),
        "findingCount": len(qa.findings),
        "warningCount": len(qa.warnings),
        "warnings": qa.warnings,
        "findings": qa.findings,
    }
    (artifact_dir / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))
    return 1 if qa.findings else 0


if __name__ == "__main__":
    sys.exit(main())
