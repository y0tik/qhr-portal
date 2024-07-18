import type { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import AutoBreadcrumb from "~/components/auto-breadcrumb";
import UserForm, { UserFormData, userResolver } from "~/forms/UserForm";
import { requireAuth } from "~/server/auth-session.server";
import { requireFormData } from "~/server/helper.server";
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
  const { data, errors } = await requireFormData<UserFormData>(
    request,
    userResolver
  );
  if (!data) return json(errors);

  // +start API - POST - /auth/hr/$id
  // *payload {
  //   "username": "string",
  //   "email": "string",
  //   "company_id": "integer",
  //   "password": "string",
  // }
  // TODO :: remove hardcoded company
  const { api } = await requireAuth(request, ["write:users"]);
  const { error } = await api.put(`/hr/${data.id}`, {
    ...data,
    company_id: 2,
  });
  if (error) {
    return json({
      errors: {
        root: { message: "Error when updating user, Please try again later" },
      },
    });
  }
  // hr user successfully created, redirect them to list view
  return redirect("/user");
  // +end API - POST - /auth/hr/$id
};

export default function UserPage() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <>
      <AutoBreadcrumb skipSegment={1} />
      <UserForm
        defaultValues={{
          id: data.id,
          mode: "update",
          email: data.email,
          username: data.username,
          password: data.password,
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
