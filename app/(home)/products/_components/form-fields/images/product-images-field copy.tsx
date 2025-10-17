/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@/components/ui/";
import { ImageIcon, Plus, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

interface ProductImagesFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
}

export function ProductImagesField<T extends FieldValues>({
  control,
  name,
  label = "Product Images",
  description = "Add product images to showcase your product",
}: ProductImagesFieldProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState("");
  const fieldRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Initialize from field value if it exists and hasn't been initialized yet
    if (
      fieldRef.current?.value &&
      Array.isArray(fieldRef.current.value) &&
      !isInitializedRef.current
    ) {
      setImages(fieldRef.current.value);
      isInitializedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.onChange(images);
    }
  }, [images]);

  const handleAddImage = async () => {
    setImageError("");

    if (!imageUrl.trim()) {
      setImageError("Please enter an image URL");
      return;
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch {
      setImageError("Please enter a valid URL");
      return;
    }

    // Check if image already exists
    if (images.includes(imageUrl)) {
      setImageError("This image URL is already added");
      return;
    }

    // Check max images limit
    if (images.length >= 10) {
      setImageError("Maximum 10 images allowed");
      return;
    }

    // Verify image loads
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const newImages = [...images, imageUrl];
      setImages(newImages);
      setImageUrl("");
      setImageError("");
      setIsOpen(false);
    };
    img.onerror = () => {
      setImageError("Failed to load image. Please check the URL.");
    };
    img.src = imageUrl;
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddImage();
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        fieldRef.current = field;

        return (
          <FormItem>
            <FormLabel>
              {label} <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <div className="space-y-4">
                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-input bg-muted"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  ))}

                  {/* Add Image Button */}
                  {images.length < 10 && (
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-input bg-muted/50 transition-colors hover:border-primary hover:bg-muted"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Plus className="h-6 w-6 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Add Image
                            </span>
                          </div>
                        </button>
                      </DialogTrigger>

                      {/* Modal Content */}
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <ImageIcon className="h-5 w-5" />
                            Add Product Image
                          </DialogTitle>
                          <DialogDescription>
                            Enter the URL of your product image. The image will
                            be previewed before adding.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          {/* URL Input */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Image URL
                            </label>
                            <Input
                              placeholder="https://example.com/image.jpg"
                              value={imageUrl}
                              onChange={(e) => {
                                setImageUrl(e.target.value);
                                setImageError("");
                              }}
                              onKeyPress={handleKeyPress}
                              className="text-sm"
                            />
                            {imageError && (
                              <p className="text-xs text-destructive">
                                {imageError}
                              </p>
                            )}
                          </div>

                          {/* Image Preview */}
                          {imageUrl && !imageError && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Preview
                              </label>
                              <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg border border-input bg-muted">
                                <img
                                  src={imageUrl || "/placeholder.svg"}
                                  alt="Preview"
                                  className="h-full w-full object-cover"
                                  crossOrigin="anonymous"
                                  onError={() =>
                                    setImageError(
                                      "Failed to load image preview"
                                    )
                                  }
                                />
                              </div>
                            </div>
                          )}

                          {/* Info */}
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-xs text-muted-foreground">
                              You can add up to 10 images. Supported formats:
                              JPG, PNG, WebP
                            </p>
                          </div>
                        </div>

                        <DialogFooter className="gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsOpen(false);
                              setImageUrl("");
                              setImageError("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={handleAddImage}
                            disabled={!imageUrl || !!imageError}
                          >
                            Add Image
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
