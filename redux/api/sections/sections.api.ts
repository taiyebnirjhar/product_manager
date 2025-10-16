/* eslint-disable @typescript-eslint/no-explicit-any */
import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import {
  ICreateSectionPayload,
  IMeta,
  IQuery,
  ISection,
  IUpdateSectionPayload,
} from "@/types";

const url = "/sections";

export const sectionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSection: builder.mutation({
      query: (arg: { data: Partial<ICreateSectionPayload> }) => ({
        url,
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.SECTIONS],
      onQueryStarted: createToastHandler({
        loading: "Creating section...",
        success: "Section created successfully",
        error: "Failed to create section",
      }),
    }),

    getSections: builder.query<
      { sections: ISection[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: any[]; meta: IMeta }) => {
        const sections: ISection[] = [];

        // console.log(response.data);

        response.data?.forEach((shift) => {
          shift.classes?.forEach((cls: any) => {
            cls.sections?.forEach((section: any) => {
              sections.push({
                ...section,
                class_id: cls._id,
                shift_id: shift._id,
                shift_name: shift.name,
                class_name: cls.name,
              });
            });
          });
        });

        return {
          sections,
          meta: response.meta,
        };
      },
      providesTags: [TAG_TYPES.SECTIONS],
    }),

    getSingleSection: builder.query<
      { section: Partial<ISection> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg.id}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: any }) => {
        let transformedSection: Partial<ISection> = {};

        // If response is nested inside shift > class > sections
        if (response.data?.classes) {
          for (const cls of response.data.classes) {
            for (const sec of cls.sections || []) {
              if (
                sec._id === response.data._id ||
                sec._id === response.data.section_id ||
                sec._id === response.data.id
              ) {
                transformedSection = {
                  ...sec,
                  class_id: cls._id,
                };
                break;
              }
            }
          }
        }

        // Fallback: assume response.data is already the section
        if (!transformedSection._id && response.data?._id) {
          transformedSection = response.data;
        }

        return { section: transformedSection };
      },
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.SECTIONS, id: arg.id },
      ],
    }),

    updateSection: builder.mutation({
      query: (arg: { id: string; data: Partial<IUpdateSectionPayload> }) => ({
        url: `${url}/${arg.id}`,
        method: "PUT",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.SECTIONS, id: arg.id },
        TAG_TYPES.SECTIONS,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating section...",
        success: "Section updated successfully",
        error: "Failed to update section",
      }),
    }),

    deleteSection: builder.mutation({
      query: (arg: { id: string }) => ({
        url: `${url}/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.SECTIONS],
      onQueryStarted: createToastHandler({
        loading: "Deleting section...",
        success: "Section deleted successfully",
        error: "Failed to delete section",
      }),
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useCreateSectionMutation,
  useGetSectionsQuery,
  useGetSingleSectionQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionsApi;
