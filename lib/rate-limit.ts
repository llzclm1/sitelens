import { getCloudflareContext } from "@opennextjs/cloudflare";
import { clientIp } from "@/lib/request";

type CounterRow = { count: number };
type MemoryCounter = { count: number; expiresAt: number };

const memoryCounters = new Map<string, MemoryCounter>();

function memoryRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = memoryCounters.get(key);
  if (!current || current.expiresAt <= now) {
    memoryCounters.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, retryAfter: Math.ceil(windowMs / 1000) };
  }

  current.count += 1;
  return {
    allowed: current.count <= limit,
    retryAfter: Math.max(1, Math.ceil((current.expiresAt - now) / 1000)),
  };
}

async function database() {
  try {
    return (await getCloudflareContext({ async: true })).env.DB as D1Database | undefined;
  } catch {
    return undefined;
  }
}

export async function enforceRateLimit(request: Request, scope: string, limit: number, windowMs = 60_000) {
  const key = clientIp(request);
  const bucket = Math.floor(Date.now() / windowMs);
  const databaseBinding = await database();

  if (!databaseBinding) {
    return memoryRateLimit(`${scope}:${key}:${bucket}`, limit, windowMs);
  }

  const row = await databaseBinding
    .prepare(
      `INSERT INTO rate_limit_counters (scope, key, bucket, count)
       VALUES (?, ?, ?, 1)
       ON CONFLICT(scope, key, bucket) DO UPDATE SET count = count + 1
       RETURNING count`,
    )
    .bind(scope, key, bucket)
    .first<CounterRow>();

  if (!row) return { allowed: false, retryAfter: Math.ceil(windowMs / 1000) };

  if (bucket % 10 === 0) {
    await databaseBinding.prepare("DELETE FROM rate_limit_counters WHERE bucket < ?").bind(bucket - 120).run();
  }

  return {
    allowed: row.count <= limit,
    retryAfter: Math.ceil(windowMs / 1000),
  };
}
