/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { ICategory, IMeta, IQuery } from "@/types";

const url = "/categories";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query<
      { categories: ICategory[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: any[]; meta: IMeta }) => ({
        categories: response.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          createdAt: item.createdAt,
        })),
        meta: response.meta,
      }),
      providesTags: [TAG_TYPES.CATEGORIES],
    }),

    // Search categories
    searchCategories: builder.query<
      { categories: ICategory[] },
      { searchedText: string }
    >({
      query: (arg) => ({
        url: `${url}/search`,
        method: "GET",
        params: { searchedText: arg.searchedText },
      }),
      transformResponse: (response: any[]) => ({
        categories: response.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          createdAt: item.createdAt,
        })),
      }),
      providesTags: [TAG_TYPES.CATEGORIES],
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const { useGetCategoriesQuery, useSearchCategoriesQuery } =
  categoriesApi;
