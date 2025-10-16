import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import {
  ICreateTeacherPayload,
  IMeta,
  IQuery,
  ITeacher,
  IUpdateTeacherPayload,
} from "@/types";

const url = "/teachers";

export const teachersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeacher: builder.mutation({
      query: (arg: { data: Partial<ICreateTeacherPayload> }) => ({
        url: url,
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.TEACHERS],
      onQueryStarted: createToastHandler({
        loading: "Creating teacher...",
        success: "Teacher created successfully",
        error: "Failed to create teacher",
      }),
    }),

    getTeachers: builder.query<
      { teachers: ITeacher[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url: url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: ITeacher[]; meta: IMeta }) => ({
        teachers: response.data,
        meta: response.meta,
      }),
      providesTags: [TAG_TYPES.TEACHERS],
    }),

    getSingleTeacher: builder.query<
      { teacher: Partial<ITeacher> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg.id}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: ITeacher }) => ({
        teacher: response.data,
      }),
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.TEACHERS, id: arg.id },
      ],
    }),

    updateTeacher: builder.mutation({
      query: (arg: { id: string; data: Partial<IUpdateTeacherPayload> }) => ({
        url: `${url}/${arg.id}`,
        method: "PUT",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.TEACHERS, id: arg.id },
        TAG_TYPES.TEACHERS,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating teacher...",
        success: "Teacher updated successfully",
        error: "Failed to update teacher",
      }),
    }),

    deleteTeacher: builder.mutation({
      query: (arg: { id: string }) => ({
        url: `${url}/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.TEACHERS],
      onQueryStarted: createToastHandler({
        loading: "Deleting teacher...",
        success: "Teacher deleted successfully",
        error: "Failed to delete teacher",
      }),
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useCreateTeacherMutation,
  useGetTeachersQuery,
  useGetSingleTeacherQuery,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teachersApi;
