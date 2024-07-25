import type { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { format } from "date-fns/format";
import AutoBreadcrumb from "~/components/auto-breadcrumb";
import AlumniForm, { AlumniFormData, alumniResolver } from "~/forms/AlumniForm";
import { requireAuth } from "~/server/auth-session.server";
import { requireFormData } from "~/server/helper.server";
import { AlumniUser } from "~/types";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) return redirect("/alumni");

  const { api } = await requireAuth(request, ["read:alumni"]);
  const { error, response } = await api.get<AlumniUser>(`/employees/${id}`);
  if (error) {
    return redirect("/alumni");
  }

  return json({ data: response });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { api } = await requireAuth(request, ["write:alumni"]);

  const { data, errors } = await requireFormData<AlumniFormData>(
    request,
    alumniResolver
  );
  if (!data) return json(errors);

  // +start API - PUT - /employees/$id
  // TODO :: remove hardcoded company
  // delete the field for API
  if (!data.password) delete data.password;

  const updatedData = {
    ...data,
    joining_date: format(data.joining_date, "yyyy-MM-dd"),
    last_working_date: format(data.last_working_date, "yyyy-MM-dd"),
  };
  const { error } = await api.put(`/hr/${updatedData.id}`, {
    ...updatedData,
    company_id: 2,
  });
  if (error) {
    return json({
      errors: {
        root: { message: "Error when updating alumni, Please try again later" },
      },
    });
  }
  // hr alumni successfully updated, redirect them to list view
  return redirect("/alumni");
  // +end API - PUT - /employees/$id
};

export default function UserPage() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <>
      <AutoBreadcrumb skipSegment={1} />
      <AlumniForm
        defaultValues={{
          id: data.id,
          mode: "update",
          email: data.email,
          username: data.username,
          emp_id: "random_internal_id",
          last_working_date: new Date(),
          joining_date: new Date(),
        }}
      />
    </>
  );
}
