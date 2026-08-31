"use client";

import { useState } from "react";

import CarDetails from "@/components/tracker/CarDetails";
import CarIdentifierModal from "@/components/tracker/CarIdentifierModal";
import CarPicker from "@/components/tracker/CarPicker";
import EmptyState from "@/components/tracker/EmptyState";
import type { Car } from "@/schemas/car";

export default function Garage({
  cars,
  selectedId,
  onSelect,
  onDelete,
  onAdd,
  onRename,
  onAddSubmission,
  onDeleteSubmission,
}: {
  cars: Car[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (identifier: string) => Promise<void>;
  onRename: (id: string, identifier: string) => Promise<void>;
  onAddSubmission: (carId: string, date: string, odometer: number) => Promise<void>;
  onDeleteSubmission: (carId: string, submissionId: string) => void;
}) {
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isCarModalOpen, setCarModalOpen] = useState(false);
  const car = cars.find((item) => item.id === selectedId) ?? cars[0] ?? null;

  function openAddCar() {
    setEditingCar(null);
    setCarModalOpen(true);
  }

  function openEditCar(item: Car) {
    onSelect(item.id);
    setEditingCar(item);
    setCarModalOpen(true);
  }

  async function saveCar(identifier: string) {
    if (editingCar) await onRename(editingCar.id, identifier);
    else await onAdd(identifier);
    setCarModalOpen(false);
  }

  return (
    <>
      {!car ? (
        <EmptyState onAdd={openAddCar} />
      ) : (
        <>
          <CarPicker
            cars={cars}
            selectedId={car.id}
            onSelect={onSelect}
            onEdit={openEditCar}
            onDelete={onDelete}
            onAdd={openAddCar}
          />

          <CarDetails
            car={car}
            onAddSubmission={(date, odometer) => onAddSubmission(car.id, date, odometer)}
            onDeleteSubmission={(id) => onDeleteSubmission(car.id, id)}
          />
        </>
      )}

      {isCarModalOpen && (
        <CarIdentifierModal
          key={editingCar?.id ?? "new"}
          car={editingCar}
          onClose={() => setCarModalOpen(false)}
          onSave={saveCar}
        />
      )}
    </>
  );
}
