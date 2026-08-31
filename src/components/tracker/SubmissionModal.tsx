"use client";

import { useState } from "react";
import Modal from "@/components/tracker/Modal";
import { nextDate } from "@/services/car";
import { today, formatDate } from "@/utils/date";
import type { Submission } from "@/schemas/car";

export default function SubmissionModal({
  last,
  onClose,
  onSave,
}: {
  last?: Submission;
  onClose: () => void;
  onSave: (date: string, odometer: number) => Promise<void>;
}) {
  const [date, setDate] = useState(today);
  const [odometer, setOdometer] = useState("");
  const value = Number(odometer);
  const eligibleDate = last ? nextDate(last.date) : null;
  const dateTooSoon = eligibleDate ? date < eligibleDate : false;
  const readingTooLow = Boolean(last && odometer && value <= last.odometer);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!odometer || dateTooSoon || readingTooLow) return;
    await onSave(date, value);
  }

  return (
    <Modal title="Add reading" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Submission date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500/20"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Odometer reading (km)
          <input
            autoFocus
            type="number"
            min="0"
            step="1"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
            placeholder="e.g. 42580"
            className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500/20"
          />
        </label>
        {dateTooSoon && eligibleDate && (
          <p className="text-xs text-red-500">Must be on or after {formatDate(eligibleDate)}.</p>
        )}
        {readingTooLow && last && (
          <p className="text-xs text-red-500">
            Must be higher than {last.odometer.toLocaleString()} km.
          </p>
        )}
        <button className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800">
          Save reading
        </button>
      </form>
    </Modal>
  );
}
