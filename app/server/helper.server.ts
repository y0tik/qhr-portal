import { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import { getValidatedFormData } from "remix-hook-form";

// Check if the required environment variable is set
if (!process.env.ALUMNI_CLIENT_CORE_ENDPOINT) {
  console.error("Error: ALUMNI_CLIENT_CORE_ENDPOINT is not set.");
  process.exit(1); // Exit the process with an error code
}

export const API_ENDPOINT = process.env.ALUMNI_CLIENT_CORE_ENDPOINT!;

const CODE_MAP: { [key: string]: string } = {
  "1ZVGUE": "Please login to continue",
  "207H2L": "Session expired, Please login to continue",
  default: "Please try again later",
};

export const friendlyMsgForCode = (code: string | null) => {
  if (!code) return "";
  return CODE_MAP[code] ? CODE_MAP[code] : CODE_MAP.default;
};

// helper for formdata
export const requireFormData = async <T extends FieldValues>(
  request: Request,
  resolver: Resolver<T>
): Promise<
  | {
      errors: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        defaultValues: Record<any, any>;
        errors: FieldErrors<T>;
      };
      data: undefined;
    }
  | {
      errors: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        defaultValues: Record<any, any>;
        errors: undefined;
      };
      data: T;
    }
> => {
  const data = await getValidatedFormData<T>(request, resolver);
  if (data.errors) {
    return {
      errors: {
        defaultValues: data.receivedValues, // Assuming receivedValues contains default values
        errors: data.errors,
      },
      data: undefined,
    };
  } else {
    return {
      errors: {
        defaultValues: data.receivedValues, // Assuming receivedValues contains default values
        errors: undefined,
      },
      data: data.data as T, // Since data should be of type T if errors is undefined
    };
  }
};
