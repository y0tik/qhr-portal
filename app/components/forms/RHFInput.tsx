import { forwardRef } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { FormFieldError } from "./form-primitives";

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
          id={name}
          name={name}
          error={error}
          {...props}
          ref={ref}
        />
        <FormFieldError error={error} />
      </div>
    );
  },
);

RHFInput.displayName = "RHFInput";
