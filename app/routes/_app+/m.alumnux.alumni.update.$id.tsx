import { useNavigate, useParams } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import AutoBreadcrumb from "~/components/ui/auto-breadcrumb";
import UserForm, {
  type UserFormData,
  userResolver,
} from "~/components/forms/UserForm";
import { requirePermission } from "~/services/permission.server";
import { ALUMNUX_ALUMNI, ALUMNUX_USER } from "~/utils/const";
import { mockData, useProbability } from "~/utils/mockData.server";
import { useFormData } from "~/utils/formdata.server";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { sleep } from "~/utils/utils";
import AlumniForm, {
  type AlumniFormData,
  alumniResolver,
} from "~/components/forms/AlumniForm";
import dayjs from "dayjs";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) return redirect(ALUMNUX_ALUMNI);
  await requirePermission(request, ["read:alumni", "write:alumni"]);

  const data = mockData.alumni.find((el) => el.id === Number(id));
  if (!data) throw new Error("Alumni not found");

  return json({ data });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await requirePermission(request, ["read:alumni", "write:alumni"]);

  const { data, errors } = await useFormData<AlumniFormData>(
    request,
    alumniResolver,
  );
  if (!data) return json(errors);

  await sleep(500);
  useProbability(
    90,
    () => {},
    new Error(
      "This is Mockerror, Error when updating alumni, Please try again later, Probability: 90%",
    ),
  );

  mockData.alumni = mockData.alumni.map((el) =>
    el.id === data.id
      ? {
          username: data.username,
          email: data.email,
          fileCount: el.fileCount,
          requestCount: el.requestCount,
          created_at: el.created_at,
          id: el.id,
          updated_at: new Date().toISOString(),
          joining_date: dayjs(data.joining_date).toISOString(),
          last_working_date: dayjs(data.last_working_date).toISOString(),
          last_login_at: el.last_login_at,
          emp_id: el.emp_id,
        }
      : el,
  );

  return redirect(ALUMNUX_USER);
};

export default function Page() {
  const { data } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="border-dashed rounded-lg h-full flex flex-col px-4 py-2">
      <div className="flex mb-4 gap-2 items-center">
        <Button
          variant="ghost"
          className="size-6 p-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div className="text-sm text-muted-foreground">Updating User</div>
      </div>
      <AlumniForm
        defaultValues={{
          id: data.id,
          mode: "update",
          email: data.email,
          username: data.username,
          last_working_date: dayjs(data.last_working_date).toDate(),
          joining_date: dayjs(data.joining_date).toDate(),
          emp_id: data.emp_id,
        }}
      />
    </div>
  );
}
