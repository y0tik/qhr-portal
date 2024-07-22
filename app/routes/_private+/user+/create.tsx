import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import AutoBreadcrumb from "~/components/auto-breadcrumb";
import UserForm, { UserFormData, userResolver } from "~/forms/UserForm";
import { requireFormData } from "~/server/helper.server";
import { requireAuth } from "~/server/auth-session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { api } = await requireAuth(request, ["write:users"]);

  const { data, errors } = await requireFormData<UserFormData>(
    request,
    userResolver
  );
  if (!data) return json(errors);

  // +start API - POST - /hr
  // *payload {
  //   "username": "string",
  //   "email": "string",
  //   "company_id": "integer",
  //   "password": "string",
  // }
  // TODO :: remove hardcoded company
  const { error } = await api.post("/hr", { ...data, company_id: 2 });
  if (error) {
    return json({
      errors: {
        root: { message: "Error when creating user, Please try again later" },
      },
    });
  }
  // hr user successfully created, redirect them to list view
  return redirect("/user");
  // +end API - POST - /hr
};

export default function CreateUserPage() {
  return (
    <>
      <AutoBreadcrumb />
      <UserForm />
    </>
  );
}
