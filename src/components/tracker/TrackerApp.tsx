"use client";

import Garage from "@/components/tracker/Garage";
import TrackerHeader from "@/components/tracker/TrackerHeader";
import { useCars } from "@/hooks/useCars";

export default function TrackerApp() {
  const { cars, selectedId, setSelectedId, deleteCar, deleteSubmission, addCar, renameCar, addSubmission } = useCars();

  return <main className="shell fade"><TrackerHeader /><Garage cars={cars} selectedId={selectedId} onSelect={setSelectedId} onDelete={deleteCar} onAdd={addCar} onRename={renameCar} onAddSubmission={addSubmission} onDeleteSubmission={deleteSubmission} /></main>;
}
