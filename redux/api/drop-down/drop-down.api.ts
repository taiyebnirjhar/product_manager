/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { IMeta, IQuery, ISectionResponse } from "@/types";

const url = "/sections";

export const dropDownApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDropDownData: builder.query<
      { sections: ISectionResponse[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: any[]; meta: IMeta }) => {
        return {
          sections: response.data,
          meta: response.meta,
        };
      },
      providesTags: [TAG_TYPES.SECTIONS, TAG_TYPES.CLASSES, TAG_TYPES.SHIFTS],
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const { useGetDropDownDataQuery } = dropDownApi;
