/** Canonical site URL for widgets, metadata, and Open Graph. */
export const SITE_ORIGIN = "https://www.aggier.ing";

/** Set this to your GitHub repository (source + PRs). Repo slug may differ from the public domain. */
export const GITHUB_REPO = "https://github.com/isaacchacko/aggiering";

/** `src/data/webringData.ts` on GitHub (edit / pencil icon → fork → PR). */
export const GITHUB_WEBRING_DATA = `${GITHUB_REPO}/blob/main/src/data/webringData.ts`;

export const GITHUB_PULLS = `${GITHUB_REPO}/blob/main/README.md`;

/** Texas A&M University */
export const TAMU_URL = "https://www.tamu.edu/";

/** Owner and repo name parsed from `GITHUB_REPO` (override with env in server code if needed). */
export function getGithubRepoParts(): { owner: string; repo: string } {
  const m = GITHUB_REPO.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/|$)/);
  if (!m) {
    throw new Error("Invalid GITHUB_REPO");
  }
  return { owner: m[1], repo: m[2] };
}
