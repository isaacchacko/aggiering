import { Octokit } from "octokit";
import { appendMemberToWebringSource } from "./webringFileEdit";
import { isDuplicateWebsite } from "./joinValidation";
import { SITE_ORIGIN } from "./site";

const WEBRING_PATH = "src/data/webringData.ts";

function branchName(): string {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `join/${id}`;
}

export class DuplicateWebsiteError extends Error {
  constructor() {
    super("DUPLICATE_WEBSITE");
    this.name = "DuplicateWebsiteError";
  }
}

export async function createJoinPullRequest(params: {
  octokit: InstanceType<typeof Octokit>;
  owner: string;
  repo: string;
  member: { name: string; website: string; year: string };
  /** For PR description only; not written to webringData. */
  verificationProfileUrl: string;
}): Promise<{ htmlUrl: string }> {
  const { octokit, owner, repo, member, verificationProfileUrl } = params;

  const { data: file } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: WEBRING_PATH,
    ref: "main",
  });

  if (!("content" in file) || Array.isArray(file) || file.type !== "file") {
    throw new Error("webringData.ts not found on main");
  }

  const sha = file.sha;
  const content = Buffer.from(file.content, "base64").toString("utf8");

  if (isDuplicateWebsite(content, member.website)) {
    throw new DuplicateWebsiteError();
  }

  const newContent = appendMemberToWebringSource(content, member);
  const branch = branchName();

  const { data: mainRef } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: "heads/main",
  });
  const mainSha = mainRef.object.sha;

  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branch}`,
    sha: mainSha,
  });

  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: WEBRING_PATH,
    message: `Add webring member: ${member.name}`,
    content: Buffer.from(newContent, "utf8").toString("base64"),
    branch,
    sha,
  });

  const { data: pr } = await octokit.rest.pulls.create({
    owner,
    repo,
    title: `Add webring: ${member.name}`,
    head: branch,
    base: "main",
    body: `Submitted via [aggier.ing](${SITE_ORIGIN}) join form.

- **Name:** ${member.name}
- **Website:** ${member.website}
- **Year:** ${member.year}
- **Verification profile:** ${verificationProfileUrl}`,
  });

  return { htmlUrl: pr.html_url };
}
