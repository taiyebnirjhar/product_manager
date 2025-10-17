import { Separator } from "@/components/ui/";

export function ProductDetailsSkeleton() {
  return (
    <div className="w-full bg-background">
      <main className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Main Image Skeleton */}
            <div className="w-full bg-muted rounded-lg sm:rounded-xl overflow-hidden aspect-square animate-pulse" />

            {/* Thumbnail Gallery Skeleton */}
            <div className="flex gap-2 sm:gap-3 w-full overflow-x-auto pb-2">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Category Badge Skeleton */}
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />

            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded animate-pulse" />
              <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded animate-pulse mt-3" />
            </div>

            {/* Price Section Skeleton */}
            <div className="border-y border-border py-4 sm:py-6 space-y-2">
              <div className="h-10 w-40 bg-muted rounded animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            </div>

            {/* Product Meta Information Skeleton */}
            <div className="space-y-2 sm:space-y-3 bg-muted/50 rounded-lg p-4">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-muted rounded animate-pulse flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                  {index < 2 && <Separator className="my-1.5 sm:my-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 sm:my-12" />

        {/* Tabs Skeleton */}
        <div className="w-full">
          <div className="grid w-full grid-cols-3 mb-6 sm:mb-8 gap-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-10 bg-muted rounded animate-pulse"
              />
            ))}
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="h-6 w-40 bg-muted rounded animate-pulse" />
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-muted rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
