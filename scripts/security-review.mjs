import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const trackedFiles = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean);
const checks = [];

function check(name, passed, evidence) {
  checks.push({ name, status: passed ? "PASS" : "FAIL", evidence });
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const committedEnvFiles = trackedFiles.filter((file) => /^\.env(?:\.|$)/.test(file) && file !== ".env.example");
check("Committed environment files", committedEnvFiles.length === 0, committedEnvFiles.length ? committedEnvFiles.join(", ") : "Only .env.example is tracked");

const sourceFiles = trackedFiles.filter((file) => /^(app|components|lib)\/|^(next\.config\.ts|wrangler\.jsonc)$/.test(file));
const sourceText = sourceFiles.map((file) => read(file)).join("\n");
const secretPatterns = [
  /\b(?:sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:api[_-]?key|secret|token|password|private[_-]?key)\s*[:=]\s*["'][^"'\n]{12,}["']/i,
];
const secretMatch = secretPatterns.find((pattern) => pattern.test(sourceText));
check("Hardcoded credentials", !secretMatch, secretMatch ? `Matched ${secretMatch}` : "No credential literal found in application/config source");

const dangerousPatterns = [/\beval\s*\(/, /\bnew Function\s*\(/, /from ["']node:(?:child_process|vm)["']/];
const dangerousMatch = dangerousPatterns.find((pattern) => pattern.test(sourceText));
check("Dynamic code or shell execution", !dangerousMatch, dangerousMatch ? `Matched ${dangerousMatch}` : "No eval, Function constructor, or child_process/vm import found");

const nextConfig = read("next.config.ts");
const requiredHeaders = ["Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Content-Security-Policy"];
const missingHeaders = requiredHeaders.filter((header) => !nextConfig.includes(`key: "${header}"`));
check("Security response headers", missingHeaders.length === 0, missingHeaders.length ? `Missing ${missingHeaders.join(", ")}` : `${requiredHeaders.length} baseline headers configured`);

const analyzeRoute = read("app/api/analyze/route.ts");
check("Analysis body limit", analyzeRoute.includes("readJsonBody"), "Analysis route reads JSON through the bounded request helper");
check("Analysis rate limit", analyzeRoute.includes("enforceRateLimit"), "Analysis route enforces a server-side rate limit");

const fetchSource = read("lib/fetch-website.ts");
check("SSRF boundary", fetchSource.includes("await assertSafeUrl(currentUrl)") && fetchSource.includes('redirect: "manual"'), "URL safety is checked before each fetch and redirects are handled manually");

const storeSource = read("lib/store.ts");
check("Parameterized D1 access", storeSource.includes(".bind("), "D1 statements bind request-derived values instead of interpolating them");

const failures = checks.filter((item) => item.status === "FAIL");
console.log("Security Review");
for (const item of checks) console.log(`[${item.status}] ${item.name}: ${item.evidence}`);
console.log(`Summary: ${checks.length - failures.length}/${checks.length} checks passed`);
if (failures.length) process.exitCode = 1;
