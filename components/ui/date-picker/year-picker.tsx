"use client";

import { CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/";
import { cn } from "@/lib/utils";

interface YearPickerProps {
  selectedYear?: number;
  onYearSelect: (year: number | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function YearPicker({
  selectedYear,
  onYearSelect,
  placeholder = "Select year",
  className,
}: YearPickerProps) {
  const [open, setOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  // ±50 years around current year
  const years = useMemo(() => {
    const range = 50;
    const start = currentYear - range;
    const end = currentYear + range;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentYear]);

  const handleYearChange = (value: string) => {
    const year = Number.parseInt(value, 10);
    onYearSelect(isNaN(year) ? undefined : year);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedYear && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {selectedYear ? selectedYear.toString() : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Select
          value={selectedYear?.toString() || ""}
          onValueChange={handleYearChange}
          open={open}
          onOpenChange={setOpen}
        >
          <SelectTrigger className="sr-only" />
          <SelectContent position="popper" className="max-h-60 overflow-auto">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}
