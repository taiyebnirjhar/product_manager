/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ProductFormSkeleton } from "@/app/(home)/products/_components/skeletons/product-form-skeleton";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";
import { useGetCategoriesQuery } from "@/redux/api/category/category.api";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/api/product/product.api";
import { IUpdateProductPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategorySelectField } from "../../../../_components/form-fields/category/category-select-field";
import { ProductImagesField } from "../../../../_components/form-fields/images/product-images-field";
import { PriceFormField } from "../../../../_components/form-fields/price/price-form-field";
import {
  productFormSchema,
  ProductFormValues,
} from "../../../../_schemas/product-schema";

export default function EditProductsForm({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    data: fetchedData,
    isLoading: fetchedDataLoading,
    error: fetchError,
  } = useGetSingleProductQuery(
    {
      slug: slug,
    },
    {
      skip: !slug,
    }
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
  });

  const [update] = useUpdateProductMutation();
  const { data, isLoading: categoryLoading } = useGetCategoriesQuery({
    params: { limit: 100, offset: 0 },
  });

  const categories = data?.categories || [];

  // Function to handle form reset

  async function onSubmit(data: ProductFormValues) {
    console.log(data);
    const payload: Partial<IUpdateProductPayload> = {
      name: data.name,
      description: data.description,
      images: data.images,
      price: data.price,
      categoryId: data.categoryId,
    };

    setIsLoading(true);
    try {
      const response = await update({ data: payload, id }).unwrap();
      toast.success("product edited successfully");
      router.push("/products");
    } catch (error) {
      console.log(error);
      toast.success("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (fetchedData && !fetchedDataLoading) {
      const { product } = fetchedData;

      form.reset({
        name: product.name,
        categoryId: product?.category?.id,
        price: product.price,
        images: product.images,
        description: product.description,
      });
    }
  }, [fetchedData, fetchedDataLoading, form]);

  // Error handling for fetch
  React.useEffect(() => {
    if (fetchError) {
      toast.error("Failed to load product data. Please try again.");
    }
  }, [fetchError]);

  if (fetchedDataLoading) {
    return <ProductFormSkeleton />;
  }
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between md:items-center">
        <CardTitle className="text-xl font-semibold">Product Details</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit(data);
            })}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of your product."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Keep it clear and engaging.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <CategorySelectField
                control={form.control}
                name="categoryId"
                categories={categories}
                isLoading={categoryLoading}
                required
              />

              <PriceFormField
                control={form.control}
                name="price"
                label="Product Price"
                placeholder="Enter the product's price"
                description="Price must be between $0 and $999,999.99"
                required={true}
                showCurrency={true}
                currency="$"
              />
            </div>

            <ProductImagesField control={form.control} name="images" />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Craft compelling product descriptions."
                      className="resize-none"
                      {...field}
                      rows={8}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a short description for search engines.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                type="button"
                variant="ghost"
                className="col-span-1"
                disabled={isLoading}
                onClick={() => {}}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="col-span-1 bg-zinc-900 text-white hover:bg-zinc-800"
                disabled={isLoading}
              >
                Publish Now
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
