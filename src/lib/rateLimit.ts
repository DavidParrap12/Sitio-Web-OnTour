/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * This is intentionally dependency-free. It protects the public quote
 * endpoint against casual abuse and accidental double submits. On
 * multi-instance/serverless deployments the counters are per instance, so it
 * should be complemented by a platform-level limiter (Vercel Firewall, WAF,
 * Cloudflare, etc.) for hard guarantees.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const MAX_TRACKED_KEYS = 10_000;

function pruneExpired(now: number) {
  if (buckets.size < MAX_TRACKED_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitRule = {
  /** Maximum number of requests allowed inside the window. */
  limit: number;
  /** Window duration in milliseconds. */
  windowMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the client may retry (0 when allowed). */
  retryAfter: number;
  /** Tightest remaining allowance across all rules. */
  remaining: number;
};

export function checkRateLimit(
  key: string,
  rules: RateLimitRule[],
  now: number = Date.now()
): RateLimitResult {
  if (rules.length === 0) {
    return { allowed: true, retryAfter: 0, remaining: Number.POSITIVE_INFINITY };
  }

  pruneExpired(now);

  let allowed = true;
  let retryAfter = 0;
  let remaining = Number.POSITIVE_INFINITY;

  rules.forEach((rule, index) => {
    const bucketKey = `${key}:${index}`;
    let bucket = buckets.get(bucketKey);

    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + rule.windowMs };
      buckets.set(bucketKey, bucket);
    }

    bucket.count += 1;

    const ruleRemaining = Math.max(0, rule.limit - bucket.count);
    remaining = Math.min(remaining, ruleRemaining);

    if (bucket.count > rule.limit) {
      allowed = false;
      retryAfter = Math.max(
        retryAfter,
        Math.ceil((bucket.resetAt - now) / 1000)
      );
    }
  });

  return { allowed, retryAfter, remaining };
}

/** Test helper — clears all buckets. */
export function resetRateLimits() {
  buckets.clear();
}

/** Best-effort client IP extraction behind common proxies. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
