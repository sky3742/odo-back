import { describe, expect, it } from "vitest";
import { getStats, nextDate } from "@/services/car";

const reading = (date: string, odometer: number) => ({ id: "test", date, odometer });

describe("OdoBack mileage rules", () => {
  it("calculates average daily mileage and the cashback tier", () => {
    expect(getStats(reading("2026-01-01", 10000), reading("2026-01-11", 10140))).toMatchObject({
      days: 10,
      distance: 140,
      average: 14,
      tier: "Tier 1",
      cashback: 30,
    });
  });

  it("returns the next eligible date after ten days", () => {
    expect(nextDate("2026-01-01")).toBe("2026-01-11");
  });

  it("marks mileage over 42 km per day as ineligible", () => {
    expect(getStats(reading("2026-01-01", 10000), reading("2026-01-11", 10500)).tier).toBe(
      "Not eligible",
    );
  });
});
