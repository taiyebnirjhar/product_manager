/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Breadcrumb } from "@/components/shared/bread-crumb/Breadcrumb";
import { useGetSingleProductQuery } from "@/redux/api/product/product.api";
import React from "react";
import { ProductDetails } from "./_components/product-details";

const breadcrumbs = [
  { name: "Products", href: "/products" },
  { name: "View product" },
];

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = React.use(params);

  const { data, isLoading, isError } = useGetSingleProductQuery({ slug });

  if (isLoading) return <div>Loading product...</div>;
  if (isError || !data) return <div>Failed to load product</div>;

  const { product } = data;

  return (
    <div className="w-full space-y-8 p-6">
      <Breadcrumb items={breadcrumbs} />
      <ProductDetails product={product} />
    </div>
  );
}
