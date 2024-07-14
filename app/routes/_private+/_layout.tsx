import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/header";
import { requireAuth } from "~/server/auth-session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireAuth(request);
  return json({
    email: session.email,
    username: session.username,
  });
};

export default function App() {
  const user = useLoaderData<typeof loader>();
  return (
    <>
      <Header user={user} />
      <div className="h-full px-8">
        <Outlet />
      </div>
    </>
  );
}
