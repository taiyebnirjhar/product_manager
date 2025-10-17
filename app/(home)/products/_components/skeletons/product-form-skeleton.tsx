export function ProductFormSkeleton() {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="border-b border-border px-6 py-4 flex flex-col md:flex-row justify-between md:items-center">
        <h2 className="text-xl font-semibold h-6 w-40 bg-muted rounded animate-pulse" />
      </div>

      <div className="px-6 py-4">
        <div className="space-y-6">
          {/* Name field skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
            <div className="h-10 w-full bg-muted rounded animate-pulse" />
            <div className="h-3 w-32 bg-muted rounded animate-pulse" />
          </div>

          {/* Category and Price grid skeleton */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
              <div className="h-3 w-40 bg-muted rounded animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
            </div>
          </div>

          {/* Product images field skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-muted rounded animate-pulse" />
            <div className="h-64 w-full bg-muted rounded animate-pulse" />
            <div className="h-3 w-52 bg-muted rounded animate-pulse" />
          </div>

          {/* Description field skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-32 w-full bg-muted rounded animate-pulse" />
            <div className="h-3 w-56 bg-muted rounded animate-pulse" />
          </div>

          {/* Buttons skeleton */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="h-10 w-full bg-muted rounded animate-pulse" />
            <div className="h-10 w-full bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
