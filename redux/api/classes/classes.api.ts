/* eslint-disable @typescript-eslint/no-explicit-any */
import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import {
  IClass,
  ICreateClassPayload,
  IMeta,
  IQuery,
  IUpdateClassPayload,
} from "@/types";

const url = "/classes";

export const classesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createClass: builder.mutation({
      query: (arg: { data: Partial<ICreateClassPayload> }) => ({
        url,
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.CLASSES],
      onQueryStarted: createToastHandler({
        loading: "Creating class...",
        success: "Class created successfully",
        error: "Failed to create class",
      }),
    }),

    getClasses: builder.query<
      { classes: IClass[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: any[]; meta: IMeta }) => {
        console.log(response.data);
        return {
          classes: response.data?.map((item) => {
            return {
              _id: item._id,
              name: item.name,
              shift_id: item.shift_id?._id || "",
              shift_name: item.shift_id?.name || "",
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              institute_id: item.institute_id,
            };
          }),
          meta: response.meta,
        };
      },
      providesTags: [TAG_TYPES.CLASSES],
    }),

    getSingleClass: builder.query<
      { class: Partial<IClass> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg.id}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: any }) => ({
        class: {
          _id: response.data._id,
          name: response.data.name,
          shift_id: response.data.shift_id?._id || "",
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          institute_id: response.data.institute_id,
        },
      }),
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.CLASSES, id: arg.id },
      ],
    }),

    updateClass: builder.mutation({
      query: (arg: { id: string; data: Partial<IUpdateClassPayload> }) => ({
        url: `${url}/${arg.id}`,
        method: "PUT",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.CLASSES, id: arg.id },
        TAG_TYPES.CLASSES,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating class...",
        success: "Class updated successfully",
        error: "Failed to update class",
      }),
    }),

    deleteClass: builder.mutation({
      query: (arg: { id: string }) => ({
        url: `${url}/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.CLASSES],
      onQueryStarted: createToastHandler({
        loading: "Deleting class...",
        success: "Class deleted successfully",
        error: "Failed to delete class",
      }),
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useCreateClassMutation,
  useGetClassesQuery,
  useGetSingleClassQuery,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classesApi;
