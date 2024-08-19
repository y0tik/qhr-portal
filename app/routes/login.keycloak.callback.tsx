import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate("keycloak", request, {
    successRedirect: "/me",
    failureRedirect: "/login",
  });
};
