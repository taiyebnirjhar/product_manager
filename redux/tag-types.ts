export enum TAG_TYPES {
  GLOBAL = "global",
  PRODUCTS = "products",
  CATEGORIES = "categories",
}

export const tagTypesList = Object.values(TAG_TYPES).filter(
  (value) => typeof value === "string"
);
