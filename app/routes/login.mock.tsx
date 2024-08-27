import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = async () => redirect("/login");

export const action = async ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("mock", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
