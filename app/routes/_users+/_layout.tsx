import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, json, redirect, useLoaderData } from "@remix-run/react";
import Header from "~/components/feature/user/header";
import { requireAuth } from "~/server/auth-session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await requireAuth(request);
  if (user.role === "employee") {
    return redirect("/me");
  }
  return json(user);
};

export default function UsersLayout() {
  const session = useLoaderData<typeof loader>();
  return (
    <>
      <header className="h-[64px]">
        <Header
          user={{
            email: session.email,
            username: session.uname,
            role: session.role,
          }}
        />
      </header>
      <div className="h-[calc(100vh-64px)] px-12 py-4">
        <Outlet context={session} />
      </div>
    </>
  );
}
