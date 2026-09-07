"use server";

import { z } from "zod";
import { carsSchema } from "@/schemas/car";
import { nextDate } from "@/services/car";
import {
  insertCar,
  insertSubmission,
  listCars,
  removeCar,
  removeSubmission,
  updateCar,
} from "@/repositories/cars";

const idSchema = z.string().min(1);
const identifierSchema = z.string().trim().min(1);
const submissionInputSchema = z.object({
  carId: idSchema,
  date: z.iso.date(),
  odometer: z.number().finite().nonnegative(),
});
const result = (value: unknown) => carsSchema.parse(value);

export async function getCarsAction() {
  return result(await listCars());
}
export async function createCarAction(identifier: string) {
  await insertCar(crypto.randomUUID(), identifierSchema.parse(identifier));
  return result(await listCars());
}
export async function renameCarAction(id: string, identifier: string) {
  await updateCar(idSchema.parse(id), identifierSchema.parse(identifier));
  return result(await listCars());
}
export async function deleteCarAction(id: string) {
  await removeCar(idSchema.parse(id));
  return result(await listCars());
}
export async function createSubmissionAction(input: unknown) {
  const parsed = submissionInputSchema.parse(input);
  const car = (await listCars()).find((item) => item.id === parsed.carId);
  const last = car?.submissions.at(-1);
  if (!car) throw new Error("Car not found");
  if (last && (parsed.date < nextDate(last.date) || parsed.odometer <= last.odometer))
    throw new Error("Submission must be at least 10 days later with a higher odometer reading");
  await insertSubmission(crypto.randomUUID(), parsed.carId, parsed.date, parsed.odometer);
  return result(await listCars());
}
export async function deleteSubmissionAction(input: unknown) {
  const parsed = z.object({ id: idSchema, carId: idSchema }).parse(input);
  await removeSubmission(parsed.id, parsed.carId);
  return result(await listCars());
}
