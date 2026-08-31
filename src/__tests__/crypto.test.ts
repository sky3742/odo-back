import { describe, expect, it } from "vitest";
import { timingSafeCompare } from "@/utils/crypto";

describe("timingSafeCompare", () => {
  it("returns true for equal strings", () => {
    expect(timingSafeCompare("hello", "hello")).toBe(true);
  });

  it("returns false for different strings", () => {
    expect(timingSafeCompare("hello", "world")).toBe(false);
  });

  it("returns false for different lengths", () => {
    expect(timingSafeCompare("abc", "abcd")).toBe(false);
  });

  it("returns false for empty vs non-empty", () => {
    expect(timingSafeCompare("", "a")).toBe(false);
  });

  it("returns true for both empty", () => {
    expect(timingSafeCompare("", "")).toBe(true);
  });
});
