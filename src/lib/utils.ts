import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Malaysian Ringgit */
export function formatRM(amount: number): string {
  return `RM ${amount.toLocaleString("en-MY", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

/** Format large integers with thousands separators */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}
