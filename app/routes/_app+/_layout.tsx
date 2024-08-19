import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import { AlumniHeader } from "~/components/AlumniHeader";
import AppContainer from "~/components/MainContainer";
import { requirePermission } from "~/services/permission.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requirePermission(request, ["self"]);
  return json(user);
};

export const layoutSessionLoader = loader;

export default function AlumniLayout() {
  return (
    <AppContainer>
      <AlumniHeader />
      <div className="container min-h-[calc(100vh-4rem-2px)] py-4">
        <Outlet />
      </div>
    </AppContainer>
  );
}
