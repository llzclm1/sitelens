import dns from "node:dns/promises";
import net from "node:net";

const MAX_REDIRECTS = 3;
const MAX_HTML_BYTES = 600_000;
const FETCH_TIMEOUT_MS = 12_000;

function isPrivateIp(address: string) {
  if (net.isIPv4(address)) {
    const octets = address.split(".").map(Number);
    const [first, second] = octets;
    return (
      first === 10 ||
      first === 127 ||
      (first === 169 && second === 254) ||
      (first === 172 && second >= 16 && second <= 31) ||
      (first === 192 && second === 168) ||
      (first === 100 && second >= 64 && second <= 127) ||
      address === "0.0.0.0"
    );
  }

  const normalized = address.toLowerCase();
  if (normalized.startsWith("::ffff:")) return isPrivateIp(normalized.slice(7));
  return normalized === "::1" || normalized === "::" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb");
}

async function assertSafeUrl(value: string) {
  const parsed = new URL(value);
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error("Use an http:// or https:// website URL.");
  if (parsed.username || parsed.password) throw new Error("URLs with usernames or passwords are not supported.");

  const hostname = parsed.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".local") || hostname.endsWith(".internal")) {
    throw new Error("Private or local websites are not supported.");
  }

  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new Error("Private or local websites are not supported.");
    return;
  }

  const addresses = await dns.lookup(hostname, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateIp(address))) {
    throw new Error("This website resolves to a private network and cannot be analyzed.");
  }
}

export function normalizeUrl(input: string) {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("Enter a website URL.");
  const value = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(value);
  if (!parsed.hostname) throw new Error("Enter a valid website URL.");
  parsed.hash = "";
  return parsed.toString();
}

async function readLimitedBody(response: Response) {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_HTML_BYTES) {
      await reader.cancel();
      throw new Error("This homepage is too large to analyze in Phase 0.");
    }
    chunks.push(value);
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

export async function fetchWebsite(startUrl: string) {
  let currentUrl = startUrl;

  for (let attempt = 0; attempt <= MAX_REDIRECTS; attempt += 1) {
    await assertSafeUrl(currentUrl);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(currentUrl, {
        redirect: "manual",
        signal: controller.signal,
        headers: { "user-agent": "SiteLens/0.1 (+https://sitelens.local)" },
      });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location || attempt === MAX_REDIRECTS) throw new Error("This website redirects too many times.");
        currentUrl = new URL(location, currentUrl).toString();
        continue;
      }

      if (!response.ok) throw new Error(`The website returned HTTP ${response.status}.`);
      const contentType = response.headers.get("content-type") ?? "";
      if (contentType && !contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
        throw new Error("That URL does not return an HTML homepage.");
      }

      return { finalUrl: currentUrl, html: await readLimitedBody(response) };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") throw new Error("The website took too long to respond.");
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error("The website could not be reached.");
}
