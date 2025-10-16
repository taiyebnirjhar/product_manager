import { z } from "zod";

export const SectionSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Section name must be at least 1 characters long" }),
  class_id: z
    .string()
    .min(1, { message: "Class id must be at least 1 characters long" }),
});

export type SectionFormValues = z.infer<typeof SectionSchema>;
