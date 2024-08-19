import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import type { User } from "~/utils/types";
import { features } from "~/utils/features.server";
import { useVerifyOTP } from "~/utils/otp.cookie.server";
import { redirect } from "@remix-run/react";

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form, request }) => {
    // TODO :: fix me
    const verifyOTP = await useVerifyOTP(request);

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    const { getMockUser } = features.enableMockLogin();
    const mockUser = getMockUser(verifyOTP?.username);
    return mockUser;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass",
);
