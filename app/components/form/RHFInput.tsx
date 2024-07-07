import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { forwardRef } from "react";

type RHFInputProps = UseFormRegisterReturn & {
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
          className="mt-2"
          name={name}
          error={error}
          {...props}
          ref={ref}
        />
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error.message ?? "Required"}
          </div>
        )}
      </div>
    );
  }
);

RHFInput.displayName = "RHFInput";
