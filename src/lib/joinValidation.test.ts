import { describe, expect, it } from "vitest";
import { canonicalizeWebsiteUrl, validateJoinInput } from "./joinValidation";

describe("canonicalizeWebsiteUrl", () => {
  it("normalizes host and trailing slash on paths", () => {
    expect(canonicalizeWebsiteUrl("https://WWW.Example.COM/foo/")).toBe("https://www.example.com/foo");
  });

  it("keeps root path as slash", () => {
    expect(canonicalizeWebsiteUrl("https://example.com/")).toBe("https://example.com/");
  });
});

describe("validateJoinInput", () => {
  it("accepts valid payload", () => {
    const r = validateJoinInput({
      name: "Test",
      website: "https://example.com",
      year: "2026",
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.normalized.name).toBe("Test");
      expect(r.normalized.year).toBe("2026");
    }
  });

  it("rejects http", () => {
    const r = validateJoinInput({
      name: "Test",
      website: "http://example.com",
      year: "2026",
    });
    expect(r.ok).toBe(false);
  });

  it("rejects bad year", () => {
    const r = validateJoinInput({
      name: "Test",
      website: "https://example.com",
      year: "26",
    });
    expect(r.ok).toBe(false);
  });
});
