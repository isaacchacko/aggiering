import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const memoryBuckets = new Map<string, number[]>();

function rateLimitMemory(ip: string): boolean {
  const now = Date.now();
  const arr = memoryBuckets.get(ip) ?? [];
  const recent = arr.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return false;
  }
  recent.push(now);
  memoryBuckets.set(ip, recent);
  return true;
}

let ratelimit: Ratelimit | null | undefined;

function getUpstashRatelimit(): Ratelimit | null {
  if (ratelimit !== undefined) {
    return ratelimit;
  }
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    ratelimit = null;
    return null;
  }
  const redis = new Redis({ url, token });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(MAX_PER_WINDOW, "1 h"),
    prefix: "aggiering:join",
  });
  return ratelimit;
}

export async function checkJoinRateLimit(ip: string): Promise<{ ok: boolean }> {
  const rl = getUpstashRatelimit();
  if (rl) {
    const { success } = await rl.limit(ip);
    return { ok: success };
  }
  return { ok: rateLimitMemory(ip) };
}
