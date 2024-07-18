import type { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { getValidatedFormData } from "remix-hook-form";
import AutoBreadcrumb from "~/components/auto-breadcrumb";
import UserForm, { userResolver } from "~/forms/UserForm";
import { requireAuth } from "~/server/auth-session.server";
import { HrUser } from "~/types";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) return redirect("/user");

  const { api } = await requireAuth(request, ["write:users"]);
  const { error, response } = await api.get<HrUser>(`/hr/${id}`);
  if (error) {
    return redirect("/user");
  }

  return json({ data: response });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { data, errors, receivedValues } = await getValidatedFormData(
    request,
    userResolver
  );
  // update user details
  console.log(data, errors, receivedValues);
  return null;
};

export default function UserPage() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <>
      <AutoBreadcrumb skipSegment={1} />
      <UserForm
        defaultValues={{
          mode: "update",
          email: data.email,
          username: data.username,
          perm_delete: false,
          perm_read: false,
          perm_write: false,
          role_hr: false,
          role_support: false,
        }}
      />
    </>
  );
}
