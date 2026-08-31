"use client";

import { useState } from "react";
import { CarFront, ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import Modal from "@/components/tracker/Modal";
import { cn } from "@/lib/cn";
import type { Car } from "@/schemas/car";

export default function CarPicker({
  cars,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  onAdd,
}: {
  cars: Car[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}) {
  const [open, setOpen] = useState(false);
  const current = cars.find((item) => item.id === selectedId);

  function select(id: string) {
    onSelect(id);
    setOpen(false);
  }

  return (
    <>
      <button
        data-testid="car-picker-trigger"
        onClick={() => setOpen(true)}
        className="mb-4 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-left transition-colors hover:border-gray-300"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <CarFront size={16} className="shrink-0 text-emerald-600" />
          <span className="truncate text-sm font-semibold">
            {current?.identifier ?? "Select car"}
          </span>
        </div>
        <ChevronDown size={16} className="shrink-0 text-gray-400" />
      </button>

      {open && (
        <Modal title="Your cars" onClose={() => setOpen(false)}>
          <div className="max-h-[50vh] -mx-6 overflow-y-auto px-6">
            {cars.map((item) => (
              <div
                data-testid="car-row"
                key={item.id}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-3 transition-colors",
                  item.id === selectedId
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-transparent hover:bg-gray-50",
                )}
              >
                <button
                  onClick={() => select(item.id)}
                  className="flex min-h-10 min-w-0 flex-1 items-center gap-2.5 text-left"
                >
                  <CarFront
                    size={16}
                    className={cn(
                      "shrink-0",
                      item.id === selectedId ? "text-emerald-600" : "text-gray-400",
                    )}
                  />
                  <span className="truncate text-sm font-semibold">{item.identifier}</span>
                </button>
                <button
                  onClick={() => {
                    onEdit(item);
                    setOpen(false);
                  }}
                  title="Edit car"
                  className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  title="Delete car"
                  className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              onAdd();
              setOpen(false);
            }}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700"
          >
            <Plus size={14} /> Add another car
          </button>
        </Modal>
      )}
    </>
  );
}
