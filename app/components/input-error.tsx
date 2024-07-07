import { FieldError } from "react-hook-form";

export default function InputError({
  error,
}: {
  error: FieldError | undefined;
}) {
  if (!error) return null;
  return (
    <div className="text-red-500 text-sm -mt-1">
      {error.message ?? "Required"}
    </div>
  );
}
