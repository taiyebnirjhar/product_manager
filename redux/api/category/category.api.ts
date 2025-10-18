/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { ICategory, IMeta, IQuery } from "@/types";
import { toast } from "sonner";

const url = "/categories";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query<
      { categories: ICategory[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => {
        const { search, ...restParams } = arg?.params || {};

        if (search) {
          return {
            url: `${url}/search`,
            method: "GET",
            params: { searchedText: search, ...restParams },
          };
        }

        return {
          url,
          method: "GET",
          params: restParams,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.message ?? "Something went wrong. Please try again."
          );
        }
      },
      transformResponse: (response: { data: any[]; meta: IMeta }) => ({
        categories: response?.data?.map((item) => ({
          id: item?.id,
          name: item?.name,
          description: item?.description,
          image: item?.image,
          createdAt: item?.createdAt,
        })),
        meta: response.meta,
      }),
      providesTags: [TAG_TYPES.CATEGORIES],
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const { useGetCategoriesQuery } = categoriesApi;
