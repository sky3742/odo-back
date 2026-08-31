import { Trash2 } from "lucide-react";
import { getStats } from "@/services/car";
import { formatDate } from "@/utils/date";
import { cn } from "@/lib/cn";
import type { Car } from "@/schemas/car";

export default function SubmissionHistory({
  car,
  onDelete,
}: {
  car: Car;
  onDelete: (id: string) => void;
}) {
  const entries = [...car.submissions].reverse();

  return (
    <div className="mt-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Submission history
      </p>
      {entries.length ? (
        <div className="overflow-hidden rounded-xl border border-gray-100">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className={cn(
                "flex items-center gap-3 px-3.5 py-3",
                index > 0 && "border-t border-gray-100",
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
                  <span className="text-sm font-semibold tabular-nums">
                    {entry.odometer.toLocaleString()} km
                  </span>
                </div>
                {index < entries.length - 1 && (
                  <p className="mt-0.5 text-right text-[11px] text-emerald-600">
                    {getStats(
                      car.submissions[car.submissions.length - 2 - index],
                      entry,
                    ).average.toFixed(1)}{" "}
                    km/day
                  </p>
                )}
              </div>
              <button
                onClick={() => onDelete(entry.id)}
                title="Delete submission"
                className="shrink-0 rounded-lg p-2 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-gray-200 p-4 text-center text-sm text-gray-400">
          No readings yet.
        </p>
      )}
    </div>
  );
}
