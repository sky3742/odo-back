"use client";

import { useState } from "react";
import Modal from "@/components/tracker/Modal";
import { nextDate } from "@/services/car";
import type { Submission } from "@/schemas/car";

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-MY", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(`${value}T00:00:00`),
  );

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!odometer || dateTooSoon || readingTooLow) return;
    await onSave(date, value);
  }

  return (
    <Modal title="Add odometer reading" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-bold">
          Submission date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#cedbd1] px-4 py-3 outline-none"
          />
        </label>
        <label className="mt-4 block text-sm font-bold">
          Odometer reading (km)
          <input
            autoFocus
            type="number"
            min="0"
            step="1"
            value={odometer}
            onChange={(event) => setOdometer(event.target.value)}
            placeholder="e.g. 42,580"
            className="mt-2 w-full rounded-xl border border-[#cedbd1] px-4 py-3 outline-none focus:border-[#4f8c64]"
          />
        </label>
        {dateTooSoon && eligibleDate && (
          <p className="mt-3 text-sm text-[#a04e45]">
            The next reading must be on or after {formatDate(eligibleDate)}.
          </p>
        )}
        {readingTooLow && last && (
          <p className="mt-3 text-sm text-[#a04e45]">
            The new reading must be higher than {last.odometer.toLocaleString()} km.
          </p>
        )}
        <button className="mt-6 w-full rounded-full bg-[#1d5c3b] py-3 font-bold text-white">
          Save reading
        </button>
      </form>
    </Modal>
  );
}
