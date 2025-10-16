import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import {
  ICreateShiftPayload,
  IMeta,
  IQuery,
  IShift,
  IUpdateShiftPayload,
} from "@/types";

const url = "/shifts";

export const shiftsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShift: builder.mutation({
      query: (arg: { data: Partial<ICreateShiftPayload> }) => ({
        url: url,
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.SHIFTS],
      onQueryStarted: createToastHandler({
        loading: "Creating shift...",
        success: "Shift created successfully",
        error: "Failed to create shift",
      }),
    }),

    getShifts: builder.query<
      { shifts: IShift[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url: url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: IShift[]; meta: IMeta }) => ({
        shifts: response.data,
        meta: response.meta,
      }),
      providesTags: [TAG_TYPES.SHIFTS],
    }),

    getSingleShift: builder.query<
      { shift: Partial<IShift> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg.id}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: IShift }) => ({
        shift: response.data,
      }),
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.SHIFTS, id: arg.id },
      ],
    }),

    updateShift: builder.mutation({
      query: (arg: { id: string; data: Partial<IUpdateShiftPayload> }) => ({
        url: `${url}/${arg.id}`,
        method: "PUT",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.SHIFTS, id: arg.id },
        TAG_TYPES.SHIFTS,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating shift...",
        success: "Shift updated successfully",
        error: "Failed to update shift",
      }),
    }),

    deleteShift: builder.mutation({
      query: (arg: { id: string }) => ({
        url: `${url}/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.SHIFTS],
      onQueryStarted: createToastHandler({
        loading: "Deleting shift...",
        success: "Shift deleted successfully",
        error: "Failed to delete shift",
      }),
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useCreateShiftMutation,
  useGetShiftsQuery,
  useGetSingleShiftQuery,
  useUpdateShiftMutation,
  useDeleteShiftMutation,
} = shiftsApi;
