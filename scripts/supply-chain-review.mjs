import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const lockPath = path.join(root, "package-lock.json");
const findings = [];

function finding(severity, message) {
  findings.push({ severity, message });
}

if (!fs.existsSync(lockPath)) {
  finding("FAIL", "package-lock.json is missing; reproducible npm ci installs are not guaranteed");
} else {
  const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
  if (lock.lockfileVersion !== 3) finding("FAIL", `package-lock.json uses lockfileVersion ${lock.lockfileVersion}, expected 3`);
  const packages = Object.entries(lock.packages ?? {}).filter(([key, value]) => key && value?.resolved);
  const missingIntegrity = packages.filter(([, value]) => !value.integrity);
  if (missingIntegrity.length) finding("FAIL", `${missingIntegrity.length} resolved packages have no integrity hash`);
}

const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
for (const [name, version] of Object.entries(dependencies)) {
  if (version === "*" || version === "latest" || String(version).includes("@latest")) {
    finding("FAIL", `${name} uses an unbounded/latest version: ${version}`);
  }
}

const trackedWorkflow = fs.existsSync(path.join(root, ".github/workflows/site-qa.yml"))
  ? fs.readFileSync(path.join(root, ".github/workflows/site-qa.yml"), "utf8")
  : "";
if (!trackedWorkflow.includes("npm ci")) finding("FAIL", "GitHub Actions does not use npm ci");
if (/uses:\s+[^\s@]+@latest/.test(trackedWorkflow)) finding("FAIL", "GitHub Actions references an @latest action");

const failures = findings.filter((item) => item.severity === "FAIL");
console.log("Supply-chain Review");
if (!findings.length) console.log("[PASS] Lockfile, package versions, and CI install policy passed");
for (const item of findings) console.log(`[${item.severity}] ${item.message}`);
console.log(`Summary: ${failures.length ? "FAIL" : "PASS"}`);
if (failures.length) process.exitCode = 1;
