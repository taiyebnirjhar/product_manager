import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(2, { message: "Please enter a valid name" }),
  description: z
    .string()
    .min(2, { message: "Please enter a valid description" }),
  categoryId: z
    .string()
    .uuid({ message: "Please provide a valid category ID" }),
  images: z
    .array(z.string().url({ message: "Please provide valid image URLs" }))
    .min(1, { message: "At least one image is required" }),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, { message: "Price must be a positive number" }),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
