import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, redirect, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/server/auth-session.server";
import { AlumniHeader } from "./me";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await requireAuth(request);
  if (user.role != "employee") {
    return redirect("/overview");
  }
  return json(user);
};

export default function AlumniLayout() {
  const session = useLoaderData<typeof loader>();
  return (
    <>
      <AlumniHeader />
      <Outlet context={session} />
    </>
  );
}
