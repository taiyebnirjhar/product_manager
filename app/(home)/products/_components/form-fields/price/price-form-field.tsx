"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/";

import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { PriceInput } from "./price-input";

interface PriceFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  showCurrency?: boolean;
  currency?: string;
}

export function PriceFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label = "Price",
  placeholder = "Enter the product's price",
  description,
  required = true,
  showCurrency = true,
  currency = "$",
  ...props
}: PriceFormFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <PriceInput
              {...field}
              placeholder={placeholder}
              showCurrency={showCurrency}
              currency={currency}
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value ? Number.parseFloat(value) : "");
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
