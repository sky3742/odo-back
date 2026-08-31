import { TIERS } from "@/services/car";
import type { Submission } from "@/schemas/car";

const tierColors = [
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-orange-50 text-orange-700 border-orange-200",
];

export default function TierLimits({
  last,
  elapsedDays,
}: {
  last: Submission;
  elapsedDays: number;
}) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Max odometer today
      </p>
      <div className="grid grid-cols-3 gap-2">
        {TIERS.map((tier, i) => (
          <div key={tier.label} className={`rounded-lg border p-2.5 ${tierColors[i]}`}>
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-bold uppercase">{tier.cashback}%</span>
            </div>
            <p className="mt-1 text-sm font-bold tabular-nums">
              {Math.round(last.odometer + tier.max * elapsedDays).toLocaleString()}
            </p>
            <p className="text-[10px] opacity-60">km</p>
          </div>
        ))}
      </div>
    </div>
  );
}
