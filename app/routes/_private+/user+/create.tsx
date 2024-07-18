import { getValidatedFormData } from "remix-hook-form";
import { ActionFunctionArgs } from "@remix-run/node";
import AutoBreadcrumb from "~/components/auto-breadcrumb";
import UserForm, { UserFormData, userResolver } from "~/forms/UserForm";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, receivedValues: defaultValues } =
    await getValidatedFormData<UserFormData>(request, userResolver);

  if (errors) {
    return { errors, defaultValues };
  }

  // Make Call to API
  // If Sucess - redirect
  // If error - show error message using a alert
};

export default function CreateUserPage() {
  return (
    <>
      <AutoBreadcrumb />
      <UserForm />
    </>
  );
}
