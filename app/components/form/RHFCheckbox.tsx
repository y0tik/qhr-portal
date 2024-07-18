import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Label } from "../ui/label";
import { forwardRef } from "react";

type RHFCheckboxProps = UseFormRegisterReturn &
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: FieldError;
    type?: string;
    displayName?: string;
    id?: string;
  };

export const RHFCheckbox = forwardRef<HTMLInputElement, RHFCheckboxProps>(
  ({ error, className, displayName, name, ...props }, ref) => {
    return (
      <div className={className}>
        <div className="cursor-pointer select-none inline-flex gap-2 font-normal">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            name={name}
            id={name}
            {...props}
            ref={ref}
            value="on"
          />
          <Label className="cursor-pointer" htmlFor={name}>
            {displayName ?? name.charAt(0).toUpperCase() + name.slice(1)}
          </Label>
        </div>
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
