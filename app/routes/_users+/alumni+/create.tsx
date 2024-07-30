import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { format } from "date-fns";
import AutoBreadcrumb from "~/components/ui/auto-breadcrumb";
import AlumniForm, { AlumniFormData, alumniResolver } from "~/forms/AlumniForm";
import { requireAuth } from "~/server/auth-session.server";
import { requireFormData } from "~/server/helper.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { api } = await requireAuth(request, ["write:alumni"]);

  const { data, errors } = await requireFormData<AlumniFormData>(
    request,
    alumniResolver
  );
  if (!data) return json(errors);

  // +start API - POST - /employees
  // *payload {
  //   "username": "string",
  //   "email": "string",
  //   "company_id": 0,
  //   "password": "string",
  //   "joining_date": "YYYY-MM-dd",
  //   "last_working_date": "YYYY-MM-dd"
  // }
  // TODO :: remove hardcoded company
  // TODO :: @backend accept utc and iso dates
  const updatedData = {
    ...data,
    joining_date: format(data.joining_date, "yyyy-MM-dd"),
    last_working_date: format(data.last_working_date, "yyyy-MM-dd"),
  };
  const { error } = await api.post(
    "/employees",
    { ...updatedData, company_id: 2 },
    true
  );
  if (error) {
    return json({
      errors: {
        root: { message: "Error when creating alumni, Please try again later" },
      },
    });
  }
  // employee user successfully created, redirect them to list view
  return redirect("/alumni");
  // +end API - POST - /employees
};

export default function AlumniCreatePage() {
  return (
    <>
      <AutoBreadcrumb />
      <AlumniForm />
    </>
  );
}
