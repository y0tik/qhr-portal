import type { FieldError } from "react-hook-form";

export const FormFieldError = ({
  error,
}: { error: FieldError | undefined | string }) => {
  return (
    error && (
      <div className="mt-1.5 text-red-500 text-sm">
        {typeof error === "string" ? error : error.message ?? "Required"}
      </div>
    )
  );
};
