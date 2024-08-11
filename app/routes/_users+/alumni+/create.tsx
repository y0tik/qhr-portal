import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import dayjs from "dayjs";
import AutoBreadcrumb from "~/components/ui/auto-breadcrumb";
import AlumniForm, {
  type AlumniFormData,
  alumniResolver,
} from "~/forms/AlumniForm";
import { requirePermission } from "~/server/auth-session.server";
import { requireFormData } from "~/server/helper.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { api } = await requirePermission(request, ["write:alumni"]);

  const { data, errors } = await requireFormData<AlumniFormData>(
    request,
    alumniResolver,
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
    joining_date: dayjs(data.joining_date).format("yyyy-MM-dd"),
    last_working_date: dayjs(data.last_working_date).format("yyyy-MM-dd"),
  };
  const { error } = await api.post(
    "/employees",
    { ...updatedData, company_id: 2 },
    true,
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
