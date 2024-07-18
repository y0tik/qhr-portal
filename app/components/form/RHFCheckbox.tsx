import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "../ui/label";

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
      <div className="cursor-pointer select-none inline-flex gap-2 font-normal">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, name, ref } }) => {
            console.log(value);
            return (
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                name={name}
                id={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                ref={ref}
              />
            );
          }}
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
};

RHFCheckbox.displayName = "RHFCheckbox";
