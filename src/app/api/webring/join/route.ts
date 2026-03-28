import { Octokit } from "octokit";
import { NextRequest, NextResponse } from "next/server";
import { createJoinPullRequest, DuplicateWebsiteError } from "@/lib/createJoinPullRequest";
import { validateJoinInput } from "@/lib/joinValidation";
import { checkJoinRateLimit } from "@/lib/rateLimitJoin";
import { getGithubRepoParts } from "@/lib/site";
import { verifyTurnstile } from "@/lib/verifyTurnstile";

export const runtime = "nodejs";

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

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production" && !process.env.TURNSTILE_SECRET_KEY) {
    console.error("join: TURNSTILE_SECRET_KEY missing in production");
    return NextResponse.json({ error: "Service misconfigured" }, { status: 503 });
  }

  const ip = clientIp(request);

  const { ok: rateOk } = await checkJoinRateLimit(ip);
  if (!rateOk) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const validated = validateJoinInput(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const turnstileToken =
    typeof body === "object" && body !== null && "turnstileToken" in body
      ? (body as { turnstileToken?: unknown }).turnstileToken
      : undefined;

  const tokenStr = typeof turnstileToken === "string" ? turnstileToken : "";

  if (process.env.TURNSTILE_SECRET_KEY && tokenStr.length === 0) {
    return NextResponse.json({ error: "Please complete the verification" }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstile(tokenStr, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }

  const ghToken = process.env.GITHUB_TOKEN;
  if (!ghToken) {
    console.error("join: GITHUB_TOKEN not set");
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  let owner = process.env.GITHUB_REPO_OWNER;
  let repo = process.env.GITHUB_REPO_NAME;
  if (!owner || !repo) {
    try {
      const parts = getGithubRepoParts();
      owner = parts.owner;
      repo = parts.repo;
    } catch {
      return NextResponse.json({ error: "Service misconfigured" }, { status: 503 });
    }
  }

  const octokit = new Octokit({ auth: ghToken });

  try {
    const { htmlUrl } = await createJoinPullRequest({
      octokit,
      owner,
      repo,
      member: validated.normalized,
    });
    return NextResponse.json({ prUrl: htmlUrl });
  } catch (err) {
    if (err instanceof DuplicateWebsiteError) {
      return NextResponse.json({ error: "That website is already on the list" }, { status: 409 });
    }
    console.error("join PR error:", err);
    return NextResponse.json({ error: "Could not open pull request" }, { status: 500 });
  }
}
