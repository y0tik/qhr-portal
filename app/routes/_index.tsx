import type { LoaderFunctionArgs } from "@remix-run/node";
import { env } from "~/env.server";
import { authenticator } from "~/services/auth.server";
import { features } from "~/utils/features.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/me",
    failureRedirect: "/login",
  });
};

export default function Index() {
  return <div>Please visit the login page</div>;
}
