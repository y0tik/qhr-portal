import type { FieldError } from "react-hook-form";

export const FormFieldError = ({
  error,
}: { error: FieldError | undefined }) => {
  return (
    error && (
      <div className="mt-1.5 text-red-500 text-sm">
        {error.message ?? "Required"}
      </div>
    )
  );
};
