/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MoreHorizontal } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@/components/ui";
import { DeleteAlert } from "@/components/ui/alert-dialog/delete-alert";
import { useDeleteProductMutation } from "@/redux/api/product/product.api";
import Link from "next/link";
import { toast } from "sonner";

interface DataTableRowActionsProps {
  row: any; // Replace 'any' with the actual type of your row data
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    const id = row.original.id;
    try {
      const toastId = toast.loading("Deleting the product ...");
      await deleteProduct({ id: id });
      toast.dismiss(toastId);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to product the article ");
      console.error("Error product the product:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 !cursor-pointer">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={"/products/details"}>
          <DropdownMenuItem>Details</DropdownMenuItem>
        </Link>

        <Link href={"/products/edit"}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <Separator />
        <DeleteAlert onConfirm={handleDelete}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DeleteAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
