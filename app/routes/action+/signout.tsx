import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import type { ReactNode } from "react";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  return authenticator.logout(request, { redirectTo: "/login" });
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
      children({ disabled: state !== "idle" })
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
