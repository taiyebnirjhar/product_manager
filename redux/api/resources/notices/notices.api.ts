import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { IMeta, IQuery, IResource } from "@/types";

const url = "/resources/notices";

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query<
      { notices: IResource[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url: url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: IResource[]; meta: IMeta }) => ({
        notices: response.data,
        meta: response.meta,
      }),
      providesTags: [TAG_TYPES.RESOURCES],
    }),

    getSingleNotice: builder.query<
      { notice: Partial<IResource> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg.id}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: IResource }) => ({
        notice: response.data,
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

export const { useGetNoticesQuery, useGetSingleNoticeQuery } = noticeApi;
