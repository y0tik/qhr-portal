import type { FieldValues, Resolver } from "react-hook-form";
import { getValidatedFormData } from "remix-hook-form";

// return validated data or a react hook errors and default values
export const getFormData = async <T extends FieldValues>(
  request: Request,
  resolver: Resolver<T>,
) => {
  const data = await getValidatedFormData<T>(request, resolver);
  return {
    errors: {
      defaultValues: data.receivedValues,
      errors: data.errors,
    },
    data: data.data,
  };
};
