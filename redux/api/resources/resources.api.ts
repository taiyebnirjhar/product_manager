import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import {
  ICreateResourcePayload,
  IQuery,
  IResource,
  IUpdateResourcePayload,
} from "@/types";

const url = "/resources";

export const resourceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createResource: builder.mutation({
      query: (arg: { data: Partial<ICreateResourcePayload> }) => ({
        url: url,
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.RESOURCES],
      onQueryStarted: createToastHandler({
        loading: "Creating resource...",
        success: "resource created successfully",
        error: "Failed to create resource",
      }),
    }),

    updateResource: builder.mutation({
      query: (arg: { id: string; data: Partial<IUpdateResourcePayload> }) => ({
        url: `${url}/${arg.id}`,
        method: "PUT",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.RESOURCES, id: arg.id },
        TAG_TYPES.RESOURCES,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating Resource...",
        success: "Resource updated successfully",
        error: "Failed to update resource",
      }),
    }),

    getSingleResource: builder.query<
      { resource: Partial<IResource> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg.id}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: IResource }) => ({
        resource: response.data,
      }),
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.RESOURCES, id: arg.id },
      ],
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useGetSingleResourceQuery,
} = resourceApi;
