/** Normalize member URLs so hash targets match webringData entries. */
export function normalizeWebsiteUrl(input: string): string {
  try {
    const url = new URL(
      input.startsWith("http://") || input.startsWith("https://")
        ? input
        : `https://${input}`
    );
    const path = url.pathname.replace(/\/+$/, "") || "/";
    return `${url.origin.toLowerCase()}${path}`;
  } catch {
    return "";
  }
}

/**
 * If the hash requests prev/next navigation, return the destination URL.
 * Otherwise return null (show the directory).
 */
export function getWebringRedirectTarget(
  hash: string,
  siteUrls: readonly string[]
): string | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw.trim()) return null;

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    /* use raw */
  }

  let nav: string | null = null;
  let baseUrl = "";

  try {
    const href =
      decoded.startsWith("http://") || decoded.startsWith("https://")
        ? decoded
        : `https://${decoded}`;
    const url = new URL(href);
    nav = url.searchParams.get("nav");
    baseUrl = normalizeWebsiteUrl(url.origin + url.pathname);
  } catch {
    return null;
  }

  if (nav !== "prev" && nav !== "next") return null;

  const normalizedRing = siteUrls.map((u) => normalizeWebsiteUrl(u));
  const idx = normalizedRing.indexOf(baseUrl);
  if (idx < 0) return null;

  const n = siteUrls.length;
  const nextIdx = nav === "next" ? (idx + 1) % n : (idx - 1 + n) % n;
  return siteUrls[nextIdx] ?? null;
}
