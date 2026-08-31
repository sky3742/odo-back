"use server";

import { z } from "zod";
import { carsSchema } from "@/schemas/car";
import {
  createCar,
  createSubmission,
  deleteCar,
  deleteSubmission,
  getCars,
  renameCar,
} from "@/services/cars";

const idSchema = z.string().min(1);
const identifierSchema = z.string().trim().min(1);
const submissionInputSchema = z.object({
  carId: idSchema,
  date: z.iso.date(),
  odometer: z.number().finite().nonnegative(),
});
const result = (value: unknown) => carsSchema.parse(value);

export async function getCarsAction() {
  return result(await getCars());
}
export async function createCarAction(identifier: string) {
  return result(await createCar(identifierSchema.parse(identifier)));
}
export async function renameCarAction(id: string, identifier: string) {
  return result(await renameCar(idSchema.parse(id), identifierSchema.parse(identifier)));
}
export async function deleteCarAction(id: string) {
  return result(await deleteCar(idSchema.parse(id)));
}
export async function createSubmissionAction(input: unknown) {
  const parsed = submissionInputSchema.parse(input);
  return result(await createSubmission(parsed.carId, parsed.date, parsed.odometer));
}
export async function deleteSubmissionAction(input: unknown) {
  const parsed = z.object({ id: idSchema, carId: idSchema }).parse(input);
  return result(await deleteSubmission(parsed.id, parsed.carId));
}
