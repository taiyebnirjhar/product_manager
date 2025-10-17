"use client";

import { Breadcrumb } from "@/components/shared/bread-crumb/Breadcrumb";
import React from "react";
import EditProductsForm from "./_components/edit-products-form";

const breadcrumbs = [
  { name: "Products", href: "/products" },
  { name: "Edit product" },
];

export default function ProductEditPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const resolvedParams = React.use(params); // unwrap the promise

  return (
    <div className="w-full space-y-8 p-6">
      <Breadcrumb items={breadcrumbs} />
      <EditProductsForm id={resolvedParams.id} slug={resolvedParams.slug} />
    </div>
  );
}
