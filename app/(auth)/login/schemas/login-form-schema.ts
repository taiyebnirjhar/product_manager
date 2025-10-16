import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type loginFormValues = z.infer<typeof loginFormSchema>;
