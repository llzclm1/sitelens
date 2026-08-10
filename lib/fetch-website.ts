import dns from "node:dns/promises";
import net from "node:net";

const MAX_REDIRECTS = 3;
const MAX_HTML_BYTES = 600_000;
const FETCH_TIMEOUT_MS = 12_000;

function isPrivateIpv4(address: string) {
  const octets = address.split(".").map(Number);
  const [first, second] = octets;
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && (second === 0 || second === 168)) ||
    (first === 198 && (second === 18 || second === 19 || second === 51)) ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 203 && second === 0) ||
    first >= 224
  );
}

function parseIpv6(address: string) {
  const clean = address.split("%")[0].toLowerCase();
  if (clean.startsWith("::ffff:") && clean.slice(7).includes(".")) return undefined;
  const sides = clean.split("::");
  if (sides.length > 2) return undefined;
  const left = sides[0] ? sides[0].split(":").map((part) => Number.parseInt(part || "0", 16)) : [];
  const right = sides.length === 2 && sides[1] ? sides[1].split(":").map((part) => Number.parseInt(part || "0", 16)) : [];
  if (left.some((part, index) => !/^[0-9a-f]{1,4}$/i.test(sides[0]?.split(":")[index] ?? "") || !Number.isInteger(part) || part < 0 || part > 0xffff) || right.some((part, index) => !/^[0-9a-f]{1,4}$/i.test(sides[1]?.split(":")[index] ?? "") || !Number.isInteger(part) || part < 0 || part > 0xffff)) return undefined;
  if (sides.length === 1 && left.length !== 8) return undefined;
  const missing = 8 - left.length - right.length;
  if (missing < 0 || (sides.length === 2 && missing === 0)) return undefined;
  return [...left, ...(sides.length === 2 ? Array.from({ length: missing }, () => 0) : []), ...right];
}

function isPrivateIp(address: string) {
  if (net.isIPv4(address)) {
    return isPrivateIpv4(address);
  }

  if (address.toLowerCase().startsWith("::ffff:") && address.slice(7).includes(".")) return isPrivateIpv4(address.slice(7));

  const parts = parseIpv6(address);
  if (!parts) return false;
  const [first, second] = parts;
  const isMappedIpv4 = first === 0 && parts[1] === 0 && parts[2] === 0 && parts[3] === 0 && parts[4] === 0 && parts[5] === 0xffff;
  if (isMappedIpv4) {
    const mapped = `${parts[6] >> 8}.${parts[6] & 0xff}.${parts[7] >> 8}.${parts[7] & 0xff}`;
    return isPrivateIpv4(mapped);
  }

  return (
    (first & 0xfe00) === 0xfc00 ||
    (first & 0xffc0) === 0xfe80 ||
    (first & 0xff00) === 0xff00 ||
    (first === 0 && second === 0)
  );
}

async function assertSafeUrl(value: string) {
  const parsed = new URL(value);
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error("Use an http:// or https:// website URL.");
  if (parsed.username || parsed.password) throw new Error("URLs with usernames or passwords are not supported.");

  const hostname = parsed.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local") || hostname.endsWith(".internal")) {
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
