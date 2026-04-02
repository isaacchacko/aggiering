import { Redis } from "@upstash/redis";

const TOTAL_KEY = "aggiering:pageviews";

let redis: Redis | null | undefined;

export function getPageViewsRedis(): Redis | null {
  if (redis !== undefined) {
    return redis;
  }
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    redis = null;
    return null;
  }
  redis = new Redis({ url, token });
  return redis;
}

export { TOTAL_KEY };

/** In-memory fallback when Upstash is not configured (local dev). */
export const memoryStore = {
  total: 0,
  /** key -> expiry ms */
  dedupe: new Map<string, number>(),
};
