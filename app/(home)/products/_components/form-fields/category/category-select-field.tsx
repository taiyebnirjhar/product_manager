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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  categories?: Category[];
  isLoading?: boolean;
  required?: boolean;
}

export function CategorySelectField<T extends FieldValues>({
  control,
  name,
  label = "Category",
  description = "Select a product category",
  placeholder = "Select categories...",
  categories = [],
  isLoading = false,
  required = false,
}: CategorySelectFieldProps<T>) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchValue) return categories;
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [categories, searchValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedCategory = categories.find(
          (cat) => cat.id === field.value
        );

        return (
          <FormItem>
            <FormLabel>
              {label}
              {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-transparent"
                    disabled={isLoading}
                  >
                    <span className="truncate">
                      {selectedCategory?.name || placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0" align="start">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder={placeholder}
                      value={searchValue}
                      onValueChange={setSearchValue}
                      disabled={isLoading}
                    />

                    <CommandList>
                      {isLoading ? (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                          Loading categories...
                        </div>
                      ) : filteredCategories.length === 0 ? (
                        <CommandEmpty>
                          {searchValue
                            ? "No categories found."
                            : "No categories available."}
                        </CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {filteredCategories.map((category) => (
                            <CommandItem
                              key={category.id}
                              value={category.id}
                              onSelect={(currentValue) => {
                                field.onChange(
                                  currentValue === field.value
                                    ? ""
                                    : currentValue
                                );
                                setOpen(false);
                                setSearchValue("");
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === category.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
