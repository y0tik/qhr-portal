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
import { ALUMNUX_USER } from "~/utils/const";
import { mockData, runWithProbability } from "~/utils/mockData.server";
import { getFormData } from "~/utils/formdata.server";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { sleep } from "~/utils/utils";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) return redirect(ALUMNUX_USER);
  await requirePermission(request, ["read:users", "write:users"]);

  const data = mockData.users.find((el) => el.id === Number(id));
  if (!data) throw new Error("User not found");

  return json({ data });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await requirePermission(request, ["read:users", "write:users"]);

  const { data, errors } = await getFormData<UserFormData>(
    request,
    userResolver,
  );
  if (!data) return json(errors);

  await sleep(500);
  runWithProbability(
    90,
    () => {},
    new Error(
      "This is Mockerror, Error when updating user, Please try again later, Probability: 90%",
    ),
  );

  mockData.users = mockData.users.map((el) =>
    el.id === data.id
      ? {
          username: data.username,
          email: data.email,
          id: data.id,
          created_at: el.created_at,
          updated_at: new Date().toISOString(),
          last_login_at: el.last_login_at,
          role: data.role_hr ? "hr" : "support",
        }
      : el,
  );

  return redirect(ALUMNUX_USER);
};

export default function Page() {
  const { data } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="border-dashed rounded-lg flex flex-col px-3">
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
      <UserForm
        defaultValues={{
          id: data.id,
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
    </div>
  );
}
