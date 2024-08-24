import z from "zod";

// Correctly Parse TRUE & FALSE from environment variables
const envBoolType = z
  .string()
  .toLowerCase()
  .transform((x) => x === "true")
  .pipe(z.boolean());

// Validate Required Environment Vars
const EnvironmentSchema = z.object({
  QHR_COOKIE_SECRET: z.string().min(40),
  QHR_CORE_ENDPOINT: z.string().min(1).url(),
  QHR_MOCK_LOGIN: envBoolType,

  // KEYCLOAK
  QHR_KEYCLOAK_CALLBACK_URL: z.string().min(1),
  QHR_KEYCLOAK_CLIENT_ID: z.string().min(1),
  QHR_KEYCLOAK_CLIENT_SECRET: z.string().min(1),
  QHR_KEYCLOAK_REALM: z.string().min(1),
  QHR_KEYCLOAK_DOMAIN: z.string().min(1),
  QHR_KEYCLOAK_USE_SSL: z
    .string()
    .toLowerCase()
    .transform((x) => x === "true")
    .pipe(z.boolean()),
});

export const env = EnvironmentSchema.parse(process.env);
