"use client";

import { useState } from "react";
import { getStats, nextDate } from "@/services/car";
import type { Car } from "@/schemas/car";
import Stats from "@/components/tracker/Stats";
import SubmissionHistory from "@/components/tracker/SubmissionHistory";
import SubmissionModal from "@/components/tracker/SubmissionModal";
import TierLimits from "@/components/tracker/TierLimits";

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
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
    <div className="border-b border-[#dce5df] pb-8">
      <p className="text-sm text-[#66736f]">Tracking</p>
      <h2 className="mt-1 break-words text-xl font-black sm:text-2xl">{car.identifier}</h2>
      {stats ? (
        <Stats average={stats.average} tier={stats.tier} cashback={stats.cashback} />
      ) : (
        <div className="mt-6 bg-[#f3f7f1] p-4 sm:mt-8 sm:p-5">
          <p className="font-bold">Start with your first reading</p>
          <p className="mt-1 text-sm leading-6 text-[#66736f]">
            Add a second reading at least 10 days later to see your average and cashback tier.
          </p>
        </div>
      )}
      <div className="mt-6 flex flex-col gap-3 border-t border-[#e7eee8] pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#66736f]">
            {last ? "Next eligible submission" : "First submission"}
          </p>
          <p className="mt-1 font-bold">
            {last ? formatDate(nextDate(last.date)) : "Whenever you’re ready"}
          </p>
        </div>
        <button
          onClick={() => setSubmissionModalOpen(true)}
          className="w-full rounded-full bg-[#c9edcf] px-4 py-3 text-sm font-bold text-[#1d5c3b] hover:bg-[#b7e6be] sm:w-auto"
        >
          Add reading
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
