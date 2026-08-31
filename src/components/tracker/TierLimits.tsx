import { TIERS } from "@/services/car";
import type { Submission } from "@/schemas/car";

export default function TierLimits({ last, elapsedDays }: { last: Submission; elapsedDays: number }) {
  return <div className="mt-6 sm:mt-7"><p className="mb-3 text-sm font-bold">Maximum odometer today</p><div className="grid gap-2 sm:grid-cols-3">{TIERS.map((tier) => <div key={tier.label} className="border border-[#e1eae2] p-3"><div className="flex justify-between text-xs font-bold"><span style={{ color: tier.color }}>{tier.label}</span><span>{tier.cashback}%</span></div><p className="mt-2 text-lg font-black">{Math.round(last.odometer + tier.max * elapsedDays).toLocaleString()} km</p></div>)}</div></div>;
}
