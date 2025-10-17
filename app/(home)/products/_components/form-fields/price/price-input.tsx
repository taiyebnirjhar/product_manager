"use client";

import type React from "react";

import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/";
import { forwardRef } from "react";

interface PriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showCurrency?: boolean;
  currency?: string;
}

const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  ({ showCurrency = true, currency = "$", ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Allow only numbers and one decimal point
      value = value.replace(/[^\d.]/g, "");

      // Prevent multiple decimal points
      const parts = value.split(".");
      if (parts.length > 2) {
        value = parts[0] + "." + parts.slice(1).join("");
      }

      // Limit to 2 decimal places
      if (parts[1]?.length > 2) {
        value = parts[0] + "." + parts[1].slice(0, 2);
      }

      e.target.value = value;
      props.onChange?.(e);
    };

    if (showCurrency) {
      return (
        <InputGroup>
          <InputGroupAddon>{currency}</InputGroupAddon>
          <InputGroupInput
            ref={ref}
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            min="0"
            step="0.01"
            onChange={handleChange}
            {...props}
          />
        </InputGroup>
      );
    }

    return (
      <Input
        ref={ref}
        type="number"
        inputMode="decimal"
        placeholder="0.00"
        min="0"
        step="0.01"
        onChange={handleChange}
        {...props}
      />
    );
  }
);

PriceInput.displayName = "PriceInput";

export { PriceInput };
