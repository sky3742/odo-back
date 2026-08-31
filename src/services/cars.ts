import { nextDate } from "@/services/car";
import { insertCar, insertSubmission, listCars, removeCar, removeSubmission, updateCar } from "@/repositories/cars";

export async function getCars() { return listCars(); }
export async function createCar(identifier: string) { await insertCar(crypto.randomUUID(), identifier); return listCars(); }
export async function renameCar(id: string, identifier: string) { await updateCar(id, identifier); return listCars(); }
export async function deleteCar(id: string) { await removeCar(id); return listCars(); }
export async function createSubmission(carId: string, date: string, odometer: number) {
  const car = (await listCars()).find((item) => item.id === carId);
  const last = car?.submissions.at(-1);
  if (!car) throw new Error("Car not found");
  if (last && (date < nextDate(last.date) || odometer <= last.odometer)) throw new Error("Submission must be at least 10 days later with a higher odometer reading");
  await insertSubmission(crypto.randomUUID(), carId, date, odometer);
  return listCars();
}
export async function deleteSubmission(id: string, carId: string) { await removeSubmission(id, carId); return listCars(); }
