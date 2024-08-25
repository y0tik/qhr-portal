import { isRouteErrorResponse } from "@remix-run/react";
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

type extractErrorReturn = {
  message: string;
  detailed_description: undefined | string;
  status: "404" | "501" | "Ooops!";
};

export const extractErrorType = (error: unknown): extractErrorReturn => {
  const _default: extractErrorReturn = {
    message: "Something went wrong. Please try again later.",
    status: "Ooops!",
    detailed_description: undefined,
  };
  if (error instanceof Error && error.message.includes("E#20BPL4")) {
    _default.message = error.message.replace("E#20BPL4", "");
    return _default;
  }

  if (process.env.NODE_ENV === "development") {
    _default.detailed_description = (error as Error)?.message;
  }

  if (!isRouteErrorResponse(error)) return _default;
  if (error.status >= 500) _default.status = "501";
  if (error.status === 404) _default.status = "404";
  return _default;
};

export function extractModuleName(url: string) {
  const safeURL = url.replace(/\/+/g, "/");
  let moduleString = safeURL.slice(safeURL.indexOf("/m/") + 3);
  if (moduleString.indexOf("/") >= 0) {
    moduleString = moduleString.slice(0, moduleString.indexOf("/"));
  }
  return moduleString;
}

export function uppercase(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}
