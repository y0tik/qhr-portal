import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(timeout: number = 1000): Promise<void> {
  return new Promise((res) => setTimeout(res, timeout));
}
