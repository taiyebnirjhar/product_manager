"use client";

import { Checkbox } from "@/components/ui";
import { ICategory } from "@/types";
import type { ColumnDef, Table } from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
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
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      return (
        <div className="flex items-center justify-start">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={row.original.name || "Category image"}
              className="h-24 w-24 rounded-md object-cover border"
              width={96}
              height={96}
            />
          ) : (
            <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400 border">
              N/A
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
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
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.description || "N/A"}
      </span>
    ),
    enableSorting: false,
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
