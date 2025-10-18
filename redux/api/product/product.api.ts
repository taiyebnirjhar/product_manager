/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import {
  ICreateProductPayload,
  IMeta,
  IProduct,
  IQuery,
  IUpdateProductPayload,
} from "@/types";
import { toast } from "sonner";

const url = "/products";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Product
    createProduct: builder.mutation({
      query: (arg: { data: Partial<ICreateProductPayload> }) => ({
        url,
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.PRODUCTS],
    }),

    // Get Products with pagination/filtering
    getProducts: builder.query<
      { products: IProduct[]; meta: IMeta },
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
        products: response?.data?.map((item) => ({
          id: item?.id,
          name: item?.name,
          description: item?.description,
          images: item?.images,
          price: item?.price,
          slug: item?.slug,
          createdAt: item?.createdAt,
          updatedAt: item?.updatedAt,
          category: item?.category,
        })),
        meta: response.meta,
      }),
      providesTags: [TAG_TYPES.PRODUCTS],
    }),

    // Get Single Product
    getSingleProduct: builder.query<
      { product: IProduct },
      { slug: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg.slug}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: any }) => ({
        product: {
          id: response?.data?.id,
          name: response?.data?.name,
          description: response?.data?.description,
          images: response?.data?.images,
          price: response?.data?.price,
          slug: response?.data?.slug,
          createdAt: response?.data?.createdAt,
          updatedAt: response?.data?.updatedAt,
          category: response?.data?.category,
        },
      }),
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.PRODUCTS, id: arg.slug },
      ],
    }),

    // Update Product
    updateProduct: builder.mutation({
      query: (arg: { id: string; data: Partial<IUpdateProductPayload> }) => ({
        url: `${url}/${arg.id}`,
        method: "PUT",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.PRODUCTS, id: arg.id },
        TAG_TYPES.PRODUCTS,
      ],
    }),

    // Delete Product
    deleteProduct: builder.mutation({
      query: (arg: { id: string }) => ({
        url: `${url}/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.PRODUCTS],
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
