import * as React from "react";
import type { FieldError } from "react-hook-form";

import { cn } from "~/utils/utils";

const inputVariants = {
  xs: "h-8 text-xs px-2",
  sm: "h-9 text-xs px-2.5",
  normal: "h-10 text-2sm px-3 ",
};

type InputVariants = keyof typeof inputVariants;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  variant?: InputVariants;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, variant = "normal", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input bg-background py-2 file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
          error && "ring-1 ring-red-500",
          inputVariants[variant],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
