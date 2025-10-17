"use client";

import PageContainer from "@/components/shared/page-container/page-container";
import { DataTableSkeleton } from "@/components/shared/skeletons/data-table-skeleton";
import { dataTablePaginationDefaultState } from "@/constants/data-table";

import { useGetProductsQuery } from "@/redux/api/product/product.api";
import { IProduct } from "@/types/api-response";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { columns } from "./_components/data-table/columns";
import { DataTable } from "./_components/data-table/data-table";

export default function ProductsPage() {
  return (
    <Suspense fallback={<DataTableSkeleton showToolbar={true} />}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;

  const [pagination, setPagination] = useState(dataTablePaginationDefaultState);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [products, setProducts] = useState<IProduct[]>([] as IProduct[]);

  const sort =
    sorting.length > 0
      ? sorting
          .map((sort) => {
            return `${sort.desc ? "-" : ""}${sort.id}`;
          })
          .join(",")
      : "-createdAt";

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filterObj: Record<string, string> = {};

  if (columnFilters.length > 0) {
    columnFilters.forEach((filter) => {
      filterObj[filter.id as string] = filter.value as string;
    });
  }

  const offset = pagination.pageIndex * pagination.pageSize;

  const { data, isLoading, isFetching } = useGetProductsQuery({
    params: {
      offset,
      limit: pagination.pageSize,
      sort,
      search,
      ...filterObj,
    },
  });

  useEffect(() => {
    if (data?.products) {
      setProducts(data?.products);
    }
  }, [data]);

  return (
    <PageContainer>
      <DataTable
        columns={columns}
        data={products}
        pagination={pagination}
        setPagination={setPagination}
        // totalDocumentCount={data?.meta?.total || 0}
        totalDocumentCount={
          products.length < pagination.pageSize
            ? pagination.pageIndex * pagination.pageSize + products.length
            : (pagination.pageIndex + 2) * pagination.pageSize
        }
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </PageContainer>
  );
}
