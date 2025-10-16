import { IProduct } from "./api-response";

type ProductRequiredFields = Pick<
  IProduct,
  "name" | "description" | "images" | "price" | "slug"
> & { categoryId: string };

type ProductOptionalFields = Partial<
  Omit<IProduct, keyof ProductRequiredFields | "id" | "createdAt" | "updatedAt">
>;

export type ICreateProductPayload = ProductRequiredFields &
  ProductOptionalFields;

export type IUpdateProductPayload = Partial<ICreateProductPayload>;
