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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = identifier.trim();
    if (value) await onSave(value);
  }

  return (
    <Modal title={car ? "Edit car" : "Add a car"} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label className="text-sm font-bold">
          How do you identify this car?
          <input
            autoFocus
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="e.g. Blue City — WXY 1234"
            className="mt-2 w-full rounded-xl border border-[#cedbd1] px-4 py-3 outline-none focus:border-[#4f8c64]"
          />
        </label>
        <button className="mt-6 w-full rounded-full bg-[#1d5c3b] py-3 font-bold text-white">
          {car ? "Save changes" : "Add car"}
        </button>
      </form>
    </Modal>
  );
}
