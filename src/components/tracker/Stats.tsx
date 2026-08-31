export default function Stats({
  average,
  tier,
  cashback,
}: {
  average: number;
  tier: string;
  cashback: number;
}) {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Avg/day</p>
        <p className="mt-1 text-base font-bold tabular-nums">{average.toFixed(1)} km</p>
      </div>
      <div className="rounded-lg bg-emerald-50 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Tier</p>
        <p className="mt-1 text-base font-bold text-emerald-700">{tier}</p>
      </div>
      <div className="rounded-lg bg-emerald-50 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
          Cashback
        </p>
        <p className="mt-1 text-base font-bold text-emerald-700">{cashback}%</p>
      </div>
    </div>
  );
}
