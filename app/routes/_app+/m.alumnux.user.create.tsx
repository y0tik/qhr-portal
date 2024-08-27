import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import UserForm, {
  type UserFormData,
  userResolver,
} from "~/components/forms/UserForm";
import { requirePermission } from "~/services/permission.server";
import { getFormData } from "~/utils/formdata.server";
import { sleep } from "~/utils/utils";
import { ALUMNUX_USER } from "~/utils/const";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import { runWithProbability } from "~/utils/mockData.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  await requirePermission(request, ["write:users"]);

  const { data, errors } = await getFormData<UserFormData>(
    request,
    userResolver,
  );
  if (!data) return json(errors);

  await sleep(1000);
  runWithProbability(
    90,
    () => {},
    new Error(
      "This is Mockerror, Error when updating user, Please try again later, Probability: 90%",
    ),
  );
  return redirect(ALUMNUX_USER);
};

export default function Page() {
  const navigate = useNavigate();
  return (
    <div className="border-dashed rounded-lg h-full px-3">
      <div className="flex mb-4 gap-2 items-center">
        <Button
          variant="ghost"
          className="size-6 p-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div className="text-sm text-muted-foreground">User Creation</div>
      </div>
      <UserForm />
    </div>
  );
}
