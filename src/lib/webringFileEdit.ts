/**
 * Append one member to the webringData array in webringData.ts source.
 * Expects the standard repo layout ending with `];` closing `export const webringData`.
 */
export function appendMemberToWebringSource(
  fileContent: string,
  member: { name: string; website: string; year: string },
): string {
  const trimmed = fileContent.replace(/\s+$/, "");
  const closeIdx = trimmed.lastIndexOf("\n];");
  if (closeIdx === -1) {
    throw new Error("webringData.ts: could not find closing ];");
  }

  const block = [
    "  {",
    `    name: ${JSON.stringify(member.name)},`,
    `    website: ${JSON.stringify(member.website)},`,
    `    year: ${JSON.stringify(member.year)}`,
    "  },",
  ].join("\n");

  return `${trimmed.slice(0, closeIdx)}\n${block}\n];\n`;
}

/** Extract every `website: "..."` string literal from file source (webring list). */
export function extractWebsiteUrlsFromSource(source: string): string[] {
  const urls: string[] = [];
  const re = /website:\s*"([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    urls.push(m[1]);
  }
  return urls;
}
