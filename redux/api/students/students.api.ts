import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import {
  ICreateStudentPayload,
  IMeta,
  IQuery,
  IStudentResponse,
  IUpdateStudentPayload,
} from "@/types";

const url = "/students";

export const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (arg: { data: Partial<ICreateStudentPayload> }) => ({
        url: url,
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.STUDENTS],
      onQueryStarted: createToastHandler({
        loading: "Creating student...",
        success: "Student created successfully",
        error: "Failed to create student",
      }),
    }),

    getStudents: builder.query<
      { students: IStudentResponse[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url: url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: {
        data: IStudentResponse[];
        meta: IMeta;
      }) => ({
        students: response.data,
        meta: response.meta,
      }),
      providesTags: [TAG_TYPES.STUDENTS],
    }),

    getSingleStudent: builder.query<
      { student: Partial<IStudentResponse> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg.id}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: IStudentResponse }) => ({
        student: response.data,
      }),
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.STUDENTS, id: arg.id },
      ],
    }),

    updateStudent: builder.mutation({
      query: (arg: { id: string; data: Partial<IUpdateStudentPayload> }) => ({
        url: `${url}/${arg.id}`,
        method: "PUT",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.STUDENTS, id: arg.id },
        TAG_TYPES.STUDENTS,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating student...",
        success: "Student updated successfully",
        error: "Failed to update student",
      }),
    }),

    deleteStudent: builder.mutation({
      query: (arg: { id: string }) => ({
        url: `${url}/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.STUDENTS],
      onQueryStarted: createToastHandler({
        loading: "Deleting student...",
        success: "Student deleted successfully",
        error: "Failed to delete student",
      }),
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useCreateStudentMutation,
  useGetStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
