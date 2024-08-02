import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Label } from "~/components/ui/label";

type RHFCheckboxProps<T extends FieldValues> = {
  error?: FieldError;
  type?: string;
  displayName?: string;
  id?: string;
  control: Control<T>;
  name: Path<T>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

export const RHFCheckbox = <T extends FieldValues>({
  control,
  name,
  className,
  displayName,
  error,
}: RHFCheckboxProps<T>) => {
  return (
    <div className={className}>
      <div className="inline-flex cursor-pointer select-none gap-2 font-normal">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer"
              name={name}
              id={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              ref={ref}
            />
          )}
        />
        <Label className="cursor-pointer" htmlFor={name}>
          {displayName ?? name.charAt(0).toUpperCase() + name.slice(1)}
        </Label>
      </div>
      {error && (
        <div className="mt-1.5 text-red-500 text-sm">
          {error.message ?? "Required"}
        </div>
      )}
    </div>
  );
};

RHFCheckbox.displayName = "RHFCheckbox";
