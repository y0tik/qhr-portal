import { type LoaderFunctionArgs, replace } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/me",
    failureRedirect: "/login",
  });
};

export default function Index() {
  return <div>Please visit the login page</div>;
}
