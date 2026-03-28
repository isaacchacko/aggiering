import { extractWebsiteUrlsFromSource } from "./webringFileEdit";

const MAX_NAME_LEN = 120;

/**
 * Normalize for duplicate checks: https, lowercase host, trim trailing slash on non-root paths.
 */
export function canonicalizeWebsiteUrl(website: string): string {
  const u = new URL(website);
  if (u.protocol !== "https:") {
    throw new Error("URL must use https");
  }
  const host = u.hostname.toLowerCase();
  let path = u.pathname || "/";
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return `https://${host}${path}`;
}

export type JoinFields = { name: string; website: string; year: string };

export type ValidationResult =
  | { ok: true; normalized: JoinFields }
  | { ok: false; error: string };

export function validateJoinInput(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request" };
  }
  const { name, website, year } = body as Record<string, unknown>;

  if (typeof name !== "string" || typeof website !== "string" || typeof year !== "string") {
    return { ok: false, error: "Invalid request" };
  }

  const trimmedName = name.trim();
  const trimmedYear = year.trim();

  if (trimmedName.length === 0 || trimmedName.length > MAX_NAME_LEN) {
    return { ok: false, error: "Please enter a valid name" };
  }

  if (!/^\d{4}$/.test(trimmedYear)) {
    return { ok: false, error: "Year must be a four-digit year" };
  }

  let parsed: URL;
  try {
    parsed = new URL(website.trim());
  } catch {
    return { ok: false, error: "Please enter a valid https URL" };
  }

  if (parsed.protocol !== "https:") {
    return { ok: false, error: "Website must use https" };
  }

  const hostname = parsed.hostname.toLowerCase();
  if (!hostname || hostname === "localhost" || hostname.endsWith(".localhost")) {
    return { ok: false, error: "Please enter a public website URL" };
  }

  let websiteCanonical: string;
  try {
    websiteCanonical = canonicalizeWebsiteUrl(parsed.href);
  } catch {
    return { ok: false, error: "Please enter a valid https URL" };
  }

  return {
    ok: true,
    normalized: {
      name: trimmedName,
      website: websiteCanonical,
      year: trimmedYear,
    },
  };
}

/** Returns true if this canonical URL is already present in the file source. */
export function isDuplicateWebsite(existingSource: string, candidateCanonical: string): boolean {
  const urls = extractWebsiteUrlsFromSource(existingSource);
  for (const u of urls) {
    try {
      if (canonicalizeWebsiteUrl(u) === candidateCanonical) {
        return true;
      }
    } catch {
      continue;
    }
  }
  return false;
}
