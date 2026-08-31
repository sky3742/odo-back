"use client";

import { useEffect, useState } from "react";
import { createCarAction, createSubmissionAction, deleteCarAction, deleteSubmissionAction, getCarsAction, renameCarAction } from "@/app/actions/cars";
import { carsSchema, type Car } from "@/schemas/car";

const STORAGE_KEY = "odoback-cars";

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    getCarsAction().then((items) => {
      setCars(items);
      setSelectedId((current) => current ?? items[0]?.id ?? null);
    }).catch(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const result = carsSchema.safeParse(JSON.parse(saved));
      if (result.success) {
        setCars(result.data);
        setSelectedId((current) => current ?? result.data[0]?.id ?? null);
      }
    });
  }, []);
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(cars)), [cars]);

  function deleteCar(id: string) {
    deleteCarAction(id).then((items) => { setCars(items); setSelectedId((current) => current === id ? (items[0]?.id ?? null) : current); }).catch(() => undefined);
  }

  function deleteSubmission(carId: string, submissionId: string) {
    deleteSubmissionAction({ carId, id: submissionId }).then(setCars).catch(() => undefined);
  }

  function addCar(identifier: string): Promise<void> { return createCarAction(identifier).then((items) => { setCars(items); const created = items[0]; if (created) setSelectedId(created.id); }); }
  function renameCar(id: string, identifier: string): Promise<void> { return renameCarAction(id, identifier).then((items) => { setCars(items); }); }
  function addSubmission(carId: string, date: string, odometer: number): Promise<void> { return createSubmissionAction({ carId, date, odometer }).then((items) => { setCars(items); }); }

  return { cars, selectedId, setSelectedId, deleteCar, deleteSubmission, addCar, renameCar, addSubmission };
}
