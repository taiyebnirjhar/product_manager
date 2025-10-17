"use client";

import { Checkbox } from "@/components/ui/";
import type { IProduct } from "@/types";
import type { ColumnDef, Row, Table } from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
import { ProductImagePlaceholder } from "../placeholder/product-image-placeholder";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<IProduct>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
          disabled
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => <ProductImageCell row={row} />,
    enableSorting: false,
    size: 150,
  },

  {
    accessorKey: "Product Info",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Info" />
    ),
    cell: ({ row }) => {
      const description = row.original.description || "N/A";
      const truncatedDescription =
        description.length > 80
          ? description.substring(0, 80) + "..."
          : description;

      return (
        <div className="flex flex-col gap-2 max-w-xs">
          <div className="font-semibold text-foreground truncate">
            {row.original.name || "N/A"}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {truncatedDescription}
          </div>
        </div>
      );
    },
    enableSorting: false,
    size: 250,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.category ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
            {row.original.category.name}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">N/A</span>
        )}
      </div>
    ),
    enableSorting: false,
    size: 150,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-foreground">
        {row.original.price ? `$${row.original.price}` : "N/A"}
      </span>
    ),
    enableSorting: false,
    size: 100,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];

export function SelectAllCheckbox({ table }: { table: Table<IProduct> }) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleChange = (value: boolean | "indeterminate") => {
    if (value === "indeterminate") return;
    const rows = table.getRowModel().rows;

    rows.forEach((row) => {
      row.toggleSelected(value);
      setSelectedRows((prev) =>
        value
          ? [...prev, row.original.id]
          : prev.filter((id) => id !== row.original.id)
      );
    });
  };

  return (
    <Checkbox
      checked={selectedRows.length > 0}
      onCheckedChange={handleChange}
      aria-label="Select all"
      className="translate-y-[2px]"
      disabled
    />
  );
}

function ProductImageCell({ row }: { row: Row<IProduct> }) {
  const [imageError, setImageError] = useState(false);

  // Ensure the URL is a valid absolute URL
  let imageUrl: string | null = row.original.images?.[0] || null;
  try {
    if (imageUrl) {
      // Will throw if invalid
      new URL(imageUrl);
    } else {
      imageUrl = null;
    }
  } catch {
    imageUrl = null;
  }

  return (
    <div className="flex items-center justify-start">
      {imageUrl && !imageError ? (
        <Image
          src={imageUrl}
          alt={row.original.name || "Product image"}
          className="h-32 w-32 rounded-lg object-cover border border-border"
          width={120}
          height={120}
          onError={() => setImageError(true)}
        />
      ) : (
        <ProductImagePlaceholder
          productName={row.original.name || "Product"}
          size={120}
        />
      )}
    </div>
  );
}
