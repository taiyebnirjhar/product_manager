/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Input } from "@/components/ui";
import { useDebounced } from "@/hooks/use-debounced";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { search, ...rest } = queryParams;

  const isFiltered = table.getState().columnFilters.length > 0;

  const [searchKey, setSearchKey] = useState<string>(search || "");

  const debouncedTerm = useDebounced({ string: searchKey, delay: 700 });

  useEffect(() => {
    const newQuery = { ...rest };

    if (debouncedTerm) {
      newQuery.search = debouncedTerm;
    } else {
      delete newQuery.search;
    }

    router.replace(`?${new URLSearchParams(newQuery as any).toString()}`);
  }, [debouncedTerm]);

  return (
    <div className="flex items-center justify-between gap-x-3">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search "
          defaultValue={search}
          onChange={(e) => setSearchKey(e.target.value)}
          className="h-8 w-full"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
