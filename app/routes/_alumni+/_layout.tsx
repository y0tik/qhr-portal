import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, redirect, useLoaderData } from "@remix-run/react";
import { AlumniHeader } from "~/components/feature/alumni/alumni-header";
import { requireAuth } from "~/server/auth-session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({
    uname: "emp",
    email: "test@test.com",
    atoken: "",
    id: "12",
    role: "employee",
    cid: "",
  });
  const { user } = await requireAuth(request);
  if (user.role != "employee") {
    return redirect("/overview");
  }
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
