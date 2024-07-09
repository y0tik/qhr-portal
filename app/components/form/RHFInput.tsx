import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { forwardRef } from "react";

type RHFInputProps = UseFormRegisterReturn &
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: FieldError;
    type?: string;
    displayName?: string;
    id?: string;
  };

export const RHFInput = forwardRef<HTMLInputElement, RHFInputProps>(
  ({ error, displayName, name, ...props }, ref) => {
    return (
      <div>
        <Label htmlFor={name}>
          {displayName ?? name.charAt(0).toUpperCase() + name.slice(1)}
        </Label>
        <Input
          className="mt-1.5"
          name={name}
          error={error}
          {...props}
          ref={ref}
        />
        {error && (
          <div className="text-red-500 text-sm mt-1.5">
            {error.message ?? "Required"}
          </div>
        )}
      </div>
    );
  }
);

RHFInput.displayName = "RHFInput";
