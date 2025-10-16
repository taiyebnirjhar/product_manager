/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camelCaseToTitle(str: string): string {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function toCapitalizedName(name: string): string {
  return name
    .toLowerCase()
    .split(" ")
    .filter(Boolean) // in case of double spaces
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDateToDayMonthYear(
  dateInput: Date | string | undefined
): string | null {
  if (!dateInput) return null;

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function getErrorMessage(err: unknown): string {
  if (Array.isArray(err)) {
    // If the error is array of strings, join and return
    return err.join("\n");
  }
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null) {
    const message = (err as any).message;
    if (Array.isArray(message)) {
      return message.join("\n");
    }
    if (typeof message === "string") {
      return message;
    }
    if ("error" in err && typeof (err as any).error?.message === "string") {
      return (err as any).error.message;
    }
  }
  return "Something went wrong.";
}
