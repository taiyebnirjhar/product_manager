import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import {
  ICreateCommitteePayload,
  IMeta,
  IQuery,
  ICommittee,
  IUpdateCommitteePayload,
} from "@/types";

const url = "/committees";

export const committeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCommittee: builder.mutation({
      query: (arg: { data: Partial<ICreateCommitteePayload> }) => ({
        url: url,
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.COMMITTEES],
      onQueryStarted: createToastHandler({
        loading: "Creating committee...",
        success: "Committee created successfully",
        error: "Failed to create committee",
      }),
    }),

    getCommittees: builder.query<
      { committees: ICommittee[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url: url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: ICommittee[]; meta: IMeta }) => ({
        committees: response.data,
        meta: response.meta,
      }),
      providesTags: [TAG_TYPES.COMMITTEES],
    }),

    getSingleCommittee: builder.query<
      { committee: Partial<ICommittee> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg.id}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: ICommittee }) => ({
        committee: response.data,
      }),
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.COMMITTEES, id: arg.id },
      ],
    }),

    updateCommittee: builder.mutation({
      query: (arg: { id: string; data: Partial<IUpdateCommitteePayload> }) => ({
        url: `${url}/${arg.id}`,
        method: "PUT",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.COMMITTEES, id: arg.id },
        TAG_TYPES.COMMITTEES,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating committee...",
        success: "Committee updated successfully",
        error: "Failed to update committee",
      }),
    }),

    deleteCommittee: builder.mutation({
      query: (arg: { id: string }) => ({
        url: `${url}/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.COMMITTEES],
      onQueryStarted: createToastHandler({
        loading: "Deleting committee...",
        success: "Committee deleted successfully",
        error: "Failed to delete committee",
      }),
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useCreateCommitteeMutation,
  useGetCommitteesQuery,
  useGetSingleCommitteeQuery,
  useUpdateCommitteeMutation,
  useDeleteCommitteeMutation,
} = committeeApi;
