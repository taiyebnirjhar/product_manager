import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { IInstituteInfoResponse, IQuery } from "@/types";

const url = "/institution/institution-info";

export const instituteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInstitute: builder.query<
      { institute: IInstituteInfoResponse },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: IInstituteInfoResponse }) => ({
        institute: response.data,
      }),
      providesTags: () => [{ type: TAG_TYPES.INSTITUTE }],
    }),

    updateInstitute: builder.mutation({
      query: (arg) => ({
        url: `${url}`,
        method: "PATCH",
        data: arg.data,
      }),
      invalidatesTags: () => [
        { type: TAG_TYPES.INSTITUTE },
        TAG_TYPES.INSTITUTE,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating institute...",
        success: "Institute updated successfully",
        error: "Failed to update institute",
      }),
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const { useGetInstituteQuery, useUpdateInstituteMutation } =
  instituteApi;
