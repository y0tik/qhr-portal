import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import type { User } from "~/utils/types";
import { features } from "~/utils/features.server";
import { useVerifyOTP } from "~/utils/otp.cookie.server";
import { KeycloakStrategy } from "remix-auth-keycloak";
import { env } from "~/env.server";

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form, request }) => {
    // TODO :: fix me
    const _verifyOTP = await useVerifyOTP(request);

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    const { getMockUser } = features.enableMockLogin();
    return getMockUser();
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass",
);

const keycloakStrategy = new KeycloakStrategy(
  {
    useSSL: env.QHR_KEYCLOAK_USE_SSL,
    domain: env.QHR_KEYCLOAK_DOMAIN,
    realm: env.QHR_KEYCLOAK_REALM,
    clientID: env.QHR_KEYCLOAK_CLIENT_ID,
    clientSecret: env.QHR_KEYCLOAK_CLIENT_SECRET,
    callbackURL: env.QHR_KEYCLOAK_CALLBACK_URL,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // TODO call backend for meta info
    console.log({ accessToken, refreshToken, extraParams, profile });
    const { getMockUser } = features.enableMockLogin();
    return {
      ...getMockUser(profile.name.givenName),
      email: profile.emails[0].value,
    };
  },
);

authenticator.use(keycloakStrategy, "keycloak");
