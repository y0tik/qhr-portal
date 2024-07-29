import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { ReactNode } from "react";
import { sessionStore } from "~/server/auth-session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStore.getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStore.destroySession(session),
    },
  });
};

type Props = {
  className?: string;
  children:
    | ReactNode
    | ((props: React.ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode);
};

export const ActionLogout = ({ children, className }: Props) => {
  const { state } = useNavigation();
  const component =
    typeof children === "function" ? (
      children({ disabled: state != "idle" })
    ) : (
      <button disabled={state !== "idle"} className={className} type="submit">
        {children}
      </button>
    );
  return (
    <Form
      method="POST"
      replace
      action="/action/signout"
      className={`inline-flex ${className}`}
    >
      {component}
    </Form>
  );
};
