import z from "zod";

// Validate Required Environment Vars
const EnvironmentSchema = z.object({
  ALUMNUX_COOKIE_SECRET: z.string().min(40),
  ALUMNUX_CORE_ENDPOINT: z.string().min(1).url(),
  ALUMNUX_OTP_STEP: z.coerce.boolean().default(false),
  ALUMNUX_USE_MOCK_LOGIN: z.coerce.boolean().default(false),
});

export const env = EnvironmentSchema.parse(process.env);
