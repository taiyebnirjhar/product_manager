"use client";

import { Checkbox } from "@/components/ui";
import { ICategory } from "@/types";
import type { ColumnDef, Row, Table } from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
import { CategoryImagePlaceholder } from "../placeholder/category-image-placeholder";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<ICategory>[] = [
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
    cell: ({ row }) => <CategoryImageCell row={row} />,
    enableSorting: false,
    size: 150,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.name || "N/A"}</span>
    ),
    enableSorting: false,
    size: 150,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <span className="text-sm ">{row.original.description || "N/A"}</span>
    ),
    enableSorting: false,
    size: 250,
  },
];

export function SelectAllCheckbox({ table }: { table: Table<ICategory> }) {
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

function CategoryImageCell({ row }: { row: Row<ICategory> }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = row.original.image;

  return (
    <div className="flex items-center justify-start">
      {imageUrl && !imageError ? (
        <Image
          src={imageUrl}
          alt={row.original.name || "Category image"}
          className="h-32 max-w-32 rounded-lg object-cover border border-border min-w-32"
          width={120}
          height={120}
          onError={() => setImageError(true)}
        />
      ) : (
        <CategoryImagePlaceholder
          categoryName={row.original.name || "Category"}
          size={120}
        />
      )}
    </div>
  );
}
