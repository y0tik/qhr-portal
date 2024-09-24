import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet } from "@remix-run/react";
import { DefaultLayout } from "~/components/layout/DefaultLayout";
import { requirePermission } from "~/services/permission.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requirePermission(request, []);
  return json(user);
};

export default function Layout() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
