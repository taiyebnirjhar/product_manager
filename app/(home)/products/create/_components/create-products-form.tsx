/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
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
  ResetAlert,
  Textarea,
} from "@/components/ui";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import { useGetCategoriesQuery } from "@/redux/api/category/category.api";
import { useCreateProductMutation } from "@/redux/api/product/product.api";
import { ICreateProductPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategorySelectField } from "../../_components/form-fields/category/category-select-field";
import { ProductImagesField } from "../../_components/form-fields/images/product-images-field";
import { PriceFormField } from "../../_components/form-fields/price/price-form-field";
import {
  productFormSchema,
  ProductFormValues,
} from "../../_schemas/product-schema";

export default function CreateProductsForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {},
  });

  const { clearSavedData } = useFormAutosave({
    form,
    key: "product-form-draft",
    debounceMs: 1000,
  });

  const [create] = useCreateProductMutation();
  const { data, isLoading: categoryLoading } = useGetCategoriesQuery({
    params: { limit: 100, offset: 0 },
  });

  const categories = data?.categories || [];

  // Function to handle form reset
  const handleReset = () => {
    // Clear saved data from storage
    clearSavedData();
    window.location.reload();
  };

  async function onSubmit(data: ProductFormValues) {
    console.log(data);
    const payload: Partial<ICreateProductPayload> = {
      name: data.name,
      description: data.description,
      images: data.images,
      price: data.price,
      categoryId: data.categoryId,
    };

    setIsLoading(true);
    try {
      const response = await create({ data: payload }).unwrap();
      toast.success("product created successfully");
      clearSavedData();
      router.push("/products");
    } catch (error) {
      console.log(error);
      toast.success("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between md:items-center">
        <CardTitle className="text-xl font-semibold">
          Product Details
          <CardDescription className="font-normal text-muted-foreground ">
            Your progress is auto-saved — no worries if you refresh. You’re
            welcome 😉
          </CardDescription>
        </CardTitle>

        <ResetAlert onConfirm={handleReset}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 transition-all hover:bg-muted hover:scale-105 md:flex hidden"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </ResetAlert>
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
                onClick={() => {
                  router.push("/products");
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="col-span-1 bg-zinc-900 text-white hover:bg-zinc-800"
                disabled={isLoading}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
