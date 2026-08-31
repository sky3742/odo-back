import { z } from "zod";

export const submissionSchema = z.object({
  id: z.string().min(1),
  date: z.iso.date(),
  odometer: z.number().finite().nonnegative(),
});

export const carSchema = z.object({
  id: z.string().min(1),
  identifier: z.string().trim().min(1),
  submissions: z.array(submissionSchema),
});

export const carsSchema = z.array(carSchema);
export type Submission = z.infer<typeof submissionSchema>;
export type Car = z.infer<typeof carSchema>;
