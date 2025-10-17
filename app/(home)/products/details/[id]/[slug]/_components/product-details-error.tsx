"use client";

import { AlertCircle } from "lucide-react";

export function ProductDetailsError() {
  return (
    <div className="w-full bg-background">
      <main className="w-full">
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="flex flex-col items-center justify-center text-center max-w-md">
            {/* Error Icon */}
            <div className="mb-4 p-3 bg-destructive/10 rounded-full">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>

            {/* Error Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Failed to Load Product
            </h1>

            {/* Error Description */}
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              We couldn&apos;t load the product details. This might be due to a
              network issue or the product may no longer be available.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
