"use client";

import { useState } from "react";
import { CalendarDays, Fuel } from "lucide-react";
import { getStats, nextDate } from "@/services/car";
import type { Car } from "@/schemas/car";
import Stats from "@/components/tracker/Stats";
import SubmissionHistory from "@/components/tracker/SubmissionHistory";
import SubmissionModal from "@/components/tracker/SubmissionModal";
import TierLimits from "@/components/tracker/TierLimits";

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-MY", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(`${value}T00:00:00`),
  );

export default function CarDetails({
  car,
  onAddSubmission,
  onDeleteSubmission,
}: {
  car: Car;
  onAddSubmission: (date: string, odometer: number) => Promise<void>;
  onDeleteSubmission: (id: string) => void;
}) {
  const [isSubmissionModalOpen, setSubmissionModalOpen] = useState(false);
  const last = car.submissions.at(-1);
  const previous = car.submissions.at(-2);
  const stats = previous && last ? getStats(previous, last) : null;
  const elapsedToday = last
    ? Math.max(
        0,
        Math.floor(
          (new Date(`${today()}T00:00:00`).getTime() -
            new Date(`${last.date}T00:00:00`).getTime()) /
            86400000,
        ),
      )
    : 0;

  function removeSubmission(id: string) {
    if (window.confirm("Delete this submission?")) onDeleteSubmission(id);
  }

  return (
    <div className="mt-2">
      <h2 className="text-lg font-bold tracking-tight">{car.identifier}</h2>

      {stats ? (
        <Stats average={stats.average} tier={stats.tier} cashback={stats.cashback} />
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-emerald-800">Start with your first reading</p>
          <p className="mt-1 text-xs leading-relaxed text-emerald-600">
            Add a second reading at least 10 days later to see your average and tier.
          </p>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={14} className="text-gray-400" />
          {last ? (
            <span>
              Next:{" "}
              <span className="font-medium text-gray-700">{formatDate(nextDate(last.date))}</span>
            </span>
          ) : (
            <span>Ready when you are</span>
          )}
        </div>
        <button
          onClick={() => setSubmissionModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800"
        >
          <Fuel size={13} />
          Add
        </button>
      </div>

      {last && <TierLimits last={last} elapsedDays={elapsedToday} />}
      <SubmissionHistory car={car} onDelete={removeSubmission} />

      {isSubmissionModalOpen && (
        <SubmissionModal
          last={last}
          onClose={() => setSubmissionModalOpen(false)}
          onSave={async (date, odometer) => {
            await onAddSubmission(date, odometer);
            setSubmissionModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
