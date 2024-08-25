import * as React from "react";
import type { FieldError } from "react-hook-form";

import { cn } from "~/utils/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-2sm file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
          error && "ring-2 ring-red-500",
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
