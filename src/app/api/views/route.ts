import { NextRequest, NextResponse } from "next/server";
import { getPageViewsRedis, memoryStore, TOTAL_KEY } from "@/lib/pageViewsStore";

export const runtime = "nodejs";

const DEDUPE_WINDOW_SEC = 15;
const BUCKET_MS = 5000;

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) {
    return forwarded;
  }
  const real = request.headers.get("x-real-ip");
  if (real) {
    return real;
  }
  return "unknown";
}

function normalizePathname(raw: unknown): string {
  if (typeof raw !== "string" || raw.length === 0) {
    return "/";
  }
  try {
    const u = new URL(raw, "https://aggier.ing");
    return u.pathname || "/";
  } catch {
    return "/";
  }
}

export async function GET() {
  const r = getPageViewsRedis();
  if (r) {
    const v = await r.get(TOTAL_KEY);
    const n = typeof v === "number" ? v : parseInt(String(v ?? "0"), 10) || 0;
    return NextResponse.json({ count: n });
  }
  return NextResponse.json({ count: memoryStore.total });
}

export async function POST(request: NextRequest) {
  let pathname = "/";
  try {
    const body = (await request.json()) as { pathname?: unknown };
    pathname = normalizePathname(body.pathname);
  } catch {
    pathname = "/";
  }

  const ip = clientIp(request);
  const bucket = Math.floor(Date.now() / BUCKET_MS);
  const dedupeKey = `aggiering:view:dedupe:${ip}:${pathname}:${bucket}`;

  const r = getPageViewsRedis();
  if (r) {
    const first = await r.set(dedupeKey, "1", { ex: DEDUPE_WINDOW_SEC, nx: true });
    let count: number;
    if (first === "OK") {
      count = await r.incr(TOTAL_KEY);
    } else {
      const v = await r.get(TOTAL_KEY);
      count = typeof v === "number" ? v : parseInt(String(v ?? "0"), 10) || 0;
    }
    return NextResponse.json({ count });
  }

  const memKey = `${ip}:${pathname}:${bucket}`;
  const now = Date.now();
  for (const [k, exp] of memoryStore.dedupe) {
    if (exp < now) {
      memoryStore.dedupe.delete(k);
    }
  }
  if (!memoryStore.dedupe.has(memKey)) {
    memoryStore.dedupe.set(memKey, now + DEDUPE_WINDOW_SEC * 1000);
    memoryStore.total += 1;
  }
  return NextResponse.json({ count: memoryStore.total });
}
