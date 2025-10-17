"use client";

import {
  Badge,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/";
import { Check, RotateCcw, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ICategory {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt?: string;
  description?: string | null;
}

interface IProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
}

interface ProductDetailsProps {
  product: IProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="w-full bg-background">
      {/* Main Content */}
      <main className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Main Image */}
            <div className="w-full bg-muted rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center aspect-square">
              <Image
                src={
                  product.images?.[selectedImage] ||
                  "/placeholder.svg?height=600&width=600&query=product"
                }
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 w-full overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={
                        image ||
                        "/placeholder.svg?height=80&width=80&query=thumbnail"
                      }
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Category & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <Badge variant="secondary" className="text-xs font-medium w-fit">
                {product.category.name}
              </Badge>
            </div>

            {/* Title & SKU */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 text-balance">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                SKU: <span className="font-mono">{product.slug}</span>
              </p>
            </div>

            {/* Price Section */}
            <div className="border-y border-border py-4 sm:py-6">
              <div className="flex items-baseline gap-2 sm:gap-3 mb-2 flex-wrap">
                <p className="text-3xl sm:text-4xl font-bold text-foreground">
                  {formattedPrice}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                Save 17% today
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 uppercase tracking-wide">
                About this product
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance">
                {product.description}
              </p>
            </div>

            {/* Product Meta Information */}
            <div className="space-y-2 sm:space-y-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-xs sm:text-sm">
                    In Stock
                  </p>
                  <p className="text-xs text-muted-foreground">Ready to ship</p>
                </div>
              </div>
              <Separator className="my-1.5 sm:my-2" />
              <div className="flex items-start gap-2 sm:gap-3">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-xs sm:text-sm">
                    Free Shipping
                  </p>
                  <p className="text-xs text-muted-foreground">
                    On orders over $100
                  </p>
                </div>
              </div>
              <Separator className="my-1.5 sm:my-2" />
              <div className="flex items-start gap-2 sm:gap-3">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-xs sm:text-sm">
                    30-Day Returns
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Hassle-free returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 sm:my-12" />

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-auto">
            <TabsTrigger
              value="details"
              className="text-xs sm:text-sm py-2 sm:py-3"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="text-xs sm:text-sm py-2 sm:py-3"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="text-xs sm:text-sm py-2 sm:py-3"
            >
              Shipping
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                Product Specifications
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between py-2 border-b border-border text-xs sm:text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">
                    {product.category.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border text-xs sm:text-sm">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-mono font-medium text-foreground">
                    {product.slug}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border text-xs sm:text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium text-foreground">
                    {formattedPrice}
                  </span>
                </div>
                <div className="flex justify-between py-2 text-xs sm:text-sm">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    In Stock
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                Customer Reviews
              </h3>
              <p className="text-sm text-muted-foreground">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-3 sm:space-y-4">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">
                  Shipping Information
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We offer free shipping on all orders over $100. Standard
                  shipping takes 2-3 business days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">
                  Return Policy
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you&apos;re not
                  satisfied with your purchase, simply return it for a full
                  refund.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
