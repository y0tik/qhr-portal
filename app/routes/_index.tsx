import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/services/session.server";
import { dashboardURL } from "~/utils/const";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request);
  return redirect(
    session?.data.role ? dashboardURL(session.data.role) : "/login",
  );
};

export default function Index() {
  return <div>Please visit the login page</div>;
}
