import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Label } from "../ui/label";
import { forwardRef } from "react";
import { Checkbox } from "../ui/checkbox";

type RHFCheckboxProps = UseFormRegisterReturn &
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    error?: FieldError;
    type?: string;
    displayName?: string;
    id?: string;
  };

export const RHFCheckbox = forwardRef<HTMLButtonElement, RHFCheckboxProps>(
  ({ error, displayName, name, ...props }, ref) => {
    return (
      <div>
        <Label htmlFor={name}>
          {displayName ?? name.charAt(0).toUpperCase() + name.slice(1)}
        </Label>
        <Checkbox className="mt-1.5" name={name} {...props} ref={ref} />
        {error && (
          <div className="text-red-500 text-sm mt-1.5">
            {error.message ?? "Required"}
          </div>
        )}
      </div>
    );
  }
);

RHFCheckbox.displayName = "RHFCheckbox";
