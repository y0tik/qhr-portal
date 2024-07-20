import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/header";
import { requireAuth } from "~/server/auth-session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user: session } = await requireAuth(request);
  return json(session);
};

export default function App() {
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
      <div className="py-4 px-12 h-[calc(100vh-64px)]">
        <Outlet context={session} />
      </div>
    </>
  );
}
