import { Breadcrumb } from "@/components/shared/bread-crumb/Breadcrumb";
import PageContainer from "@/components/shared/page-container/page-container";
import { Metadata } from "next";
import CreateProductsForm from "./_components/create-products-form";

export const metadata: Metadata = {
  title: "Create Product",
  description: "Create a new product with our easy-to-use form.",
};

const breadcrumbs = [
  { name: "Products", href: "/products" },
  { name: "Add Product" }, // No `href` for the current page
];

export default function CreateProductPage() {
  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbs} />
      <CreateProductsForm />
    </PageContainer>
  );
}
