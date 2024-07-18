import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(timeout: number = 1000): Promise<void> {
  return new Promise((res) => setTimeout(res, timeout));
}

export const checkbox = () =>
  z.preprocess((value) => value === "on", z.boolean());
