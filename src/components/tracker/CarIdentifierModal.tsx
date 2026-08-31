"use client";

import { useState } from "react";
import Modal from "@/components/tracker/Modal";
import type { Car } from "@/schemas/car";

export default function CarIdentifierModal({
  car,
  onClose,
  onSave,
}: {
  car: Car | null;
  onClose: () => void;
  onSave: (identifier: string) => Promise<void>;
}) {
  const [identifier, setIdentifier] = useState(car?.identifier ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = identifier.trim();
    if (value) await onSave(value);
  }

  return (
    <Modal title={car ? "Edit car" : "Add a car"} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700">
          How do you identify this car?
          <input
            autoFocus
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. Blue City — WXY 1234"
            className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500/20"
          />
        </label>
        <button className="mt-5 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800">
          {car ? "Save changes" : "Add car"}
        </button>
      </form>
    </Modal>
  );
}
