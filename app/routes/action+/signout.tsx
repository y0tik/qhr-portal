import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { PropsWithChildren } from "react";
import { sessionStore } from "~/server/auth-session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStore.getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStore.destroySession(session),
    },
  });
};

export const ActionLogout = ({ children }: PropsWithChildren) => {
  const { state } = useNavigation();
  return (
    <Form method="POST" replace action="/action/signout">
      <button disabled={state !== "idle"} className="w-full" type="submit">
        {children}
      </button>
    </Form>
  );
};
