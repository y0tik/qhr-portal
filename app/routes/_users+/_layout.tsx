import { Outlet, useLoaderData } from "@remix-run/react";
import UserHeader from "~/components/feature/user/header";
import { layoutSessionLoader } from "~/server/helper.server";

export const loader = layoutSessionLoader;

export default function UsersLayout() {
  const user = useLoaderData<typeof loader>();
  return (
    <>
      <header className="h-[64px]">
        <UserHeader user={user} />
      </header>
      <div className="h-[calc(100vh-64px)] px-12 py-4">
        <Outlet context={user} />
      </div>
    </>
  );
}
