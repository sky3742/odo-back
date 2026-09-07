import { and, desc, eq } from "drizzle-orm";
import { createDb } from "@/db";
import { cars, submissions } from "@/db/schema";

const db = createDb();

export async function listCars() {
  const records = await db.select().from(cars).orderBy(desc(cars.createdAt));
  const readings = await db.select().from(submissions).orderBy(submissions.date);
  return records.map((car) => ({
    id: car.id,
    identifier: car.identifier,
    submissions: readings
      .filter((item) => item.carId === car.id)
      .map(({ id, date, odometer }) => ({ id, date, odometer })),
  }));
}

export async function insertCar(id: string, identifier: string) {
  await db.insert(cars).values({ id, identifier, createdAt: new Date() });
}
export async function updateCar(id: string, identifier: string) {
  await db.update(cars).set({ identifier }).where(eq(cars.id, id));
}
export async function removeCar(id: string) {
  await db.delete(cars).where(eq(cars.id, id));
}
export async function insertSubmission(id: string, carId: string, date: string, odometer: number) {
  await db.insert(submissions).values({ id, carId, date, odometer, createdAt: new Date() });
}
export async function removeSubmission(id: string, carId: string) {
  await db.delete(submissions).where(and(eq(submissions.id, id), eq(submissions.carId, carId)));
}
