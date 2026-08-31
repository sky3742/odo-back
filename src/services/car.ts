import type { Submission } from "@/schemas/car";

export const TIERS = [
  { label: "Tier 1", range: "0–14 km/day", max: 14, cashback: 30, color: "#43a66b" },
  { label: "Tier 2", range: "14.01–28 km/day", max: 28, cashback: 20, color: "#e0a331" },
  { label: "Tier 3", range: "28.01–42 km/day", max: 42, cashback: 10, color: "#e2764b" },
] as const;

export function getStats(previous: Submission, current: Submission) {
  const days = Math.round((new Date(`${current.date}T00:00:00`).getTime() - new Date(`${previous.date}T00:00:00`).getTime()) / 86400000);
  const distance = current.odometer - previous.odometer;
  const average = days > 0 ? distance / days : 0;
  const tier = TIERS.find((item) => average <= item.max);
  return { days, distance, average, tier: tier?.label ?? "Not eligible", cashback: tier?.cashback ?? 0 };
}

export function nextDate(date: string) {
  const next = new Date(`${date}T00:00:00`); next.setDate(next.getDate() + 10);
  const month = String(next.getMonth() + 1).padStart(2, "0");
  const day = String(next.getDate()).padStart(2, "0");
  return `${next.getFullYear()}-${month}-${day}`;
}
