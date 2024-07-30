import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuthSession } from "~/server/auth-session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getAuthSession(request);
  if (session) {
    const redirectTo = session.data.role == "employee" ? "/me" : "/overview";
    return redirect(redirectTo);
  }
  return redirect("/login");
};

export default function Index() {
  return <div>Please visit the login page</div>;
}
