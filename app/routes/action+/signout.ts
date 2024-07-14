import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { sessionStore } from "~/server/auth-session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStore.getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStore.destroySession(session),
    },
  });
};
