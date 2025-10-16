export const dataTablePaginationOptions = [5, 10, 20, 50, 100];

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export const dataTablePaginationDefaultState: PaginationState = {
  pageIndex: 0,
  pageSize: 5,
};
