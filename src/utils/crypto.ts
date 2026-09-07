import { timingSafeEqual } from "crypto";

export const timingSafeCompare = (a: string, b: string) =>
  a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
