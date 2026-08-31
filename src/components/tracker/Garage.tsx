"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CarDetails from "@/components/tracker/CarDetails";
import CarIdentifierModal from "@/components/tracker/CarIdentifierModal";
import CarList from "@/components/tracker/CarList";
import EmptyState from "@/components/tracker/EmptyState";
import type { Car } from "@/schemas/car";

export default function Garage({ cars, selectedId, onSelect, onDelete, onAdd, onRename, onAddSubmission, onDeleteSubmission }: { cars: Car[]; selectedId: string | null; onSelect: (id: string) => void; onDelete: (id: string) => void; onAdd: (identifier: string) => Promise<void>; onRename: (id: string, identifier: string) => Promise<void>; onAddSubmission: (carId: string, date: string, odometer: number) => Promise<void>; onDeleteSubmission: (carId: string, submissionId: string) => void }) {
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isCarModalOpen, setCarModalOpen] = useState(false);
  const car = cars.find((item) => item.id === selectedId) ?? cars[0] ?? null;

  function openAddCar() { setEditingCar(null); setCarModalOpen(true); }
  function openEditCar(item: Car) { onSelect(item.id); setEditingCar(item); setCarModalOpen(true); }
  async function saveCar(identifier: string) { if (editingCar) await onRename(editingCar.id, identifier); else await onAdd(identifier); setCarModalOpen(false); }

  return <>{!car ? <EmptyState onAdd={openAddCar} /> : <section><div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="mb-2 text-sm font-bold uppercase tracking-[.18em] text-[#4f8c64]">Your garage</p><h1 className="text-3xl font-black tracking-tight sm:text-4xl">Good to go.</h1></div><button onClick={openAddCar} aria-label={isCarModalOpen ? "Garage controls" : undefined} className="flex w-full items-center justify-center gap-2 rounded-full border border-[#b9cec0] px-4 py-2.5 text-sm font-bold text-[#20613d] hover:bg-white sm:w-auto"><Plus size={17} /> Add car</button></div><CarList cars={cars} selectedId={car.id} onSelect={onSelect} onEdit={openEditCar} onDelete={onDelete} /><CarDetails car={car} onAddSubmission={(date, odometer) => onAddSubmission(car.id, date, odometer)} onDeleteSubmission={(id) => onDeleteSubmission(car.id, id)} /></section>}{isCarModalOpen && <CarIdentifierModal key={editingCar?.id ?? "new"} car={editingCar} onClose={() => setCarModalOpen(false)} onSave={saveCar} />}</>;
}
