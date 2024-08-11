import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(timeout = 1000): Promise<void> {
  return new Promise((res) => setTimeout(res, timeout));
}

export const checkbox = () =>
  z.preprocess((value) => value === "true", z.boolean());

export const dateToFullString = (date: Date | string) => {
  return dayjs(date).format("MM/DD/YYYY - hh:mm A");
};
