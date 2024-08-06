import { Outlet, useLoaderData } from "@remix-run/react";
import { AlumniHeader } from "~/components/feature/alumni/alumni-header";
import { layoutSessionLoader } from "~/server/helper.server";

export const loader = layoutSessionLoader;

export default function AlumniLayout() {
  const user = useLoaderData<typeof loader>();
  return (
    <>
      <AlumniHeader user={user} />
      <div className="container py-4">
        <Outlet context={user} />
      </div>
    </>
  );
}
