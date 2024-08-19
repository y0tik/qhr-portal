import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { dashboardURL } from "~/utils/const";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.authenticate("keycloak", request, {
    failureRedirect: "/login",
  });
  return redirect(dashboardURL(user.role));
};
