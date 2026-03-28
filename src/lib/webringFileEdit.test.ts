import { describe, expect, it } from "vitest";
import { appendMemberToWebringSource, extractWebsiteUrlsFromSource } from "./webringFileEdit";

const FIXTURE = `export type WebringMember = {
  name: string;
  website: string;
  year: string;
};

export const webringData: WebringMember[] = [
  {
    name: "Test User",
    website: "https://example.com",
    year: "2028"
  },
];
`;

describe("appendMemberToWebringSource", () => {
  it("appends a member before ]; with trailing comma style", () => {
    const out = appendMemberToWebringSource(FIXTURE, {
      name: "New Person",
      website: "https://new.example/",
      year: "2026",
    });
    expect(out).toContain('"New Person"');
    expect(out).toContain('"https://new.example/"');
    expect(out).toContain('"2026"');
    expect(out.trim().endsWith("];")).toBe(true);
    expect(out).toMatch(/New Person[\s\S]*"2026"/);
  });

  it("throws if ]; is missing", () => {
    expect(() =>
      appendMemberToWebringSource("export const x = 1", {
        name: "a",
        website: "https://a.com",
        year: "2028",
      }),
    ).toThrow();
  });
});

describe("extractWebsiteUrlsFromSource", () => {
  it("collects website fields", () => {
    expect(extractWebsiteUrlsFromSource(FIXTURE)).toEqual(["https://example.com"]);
  });
});
