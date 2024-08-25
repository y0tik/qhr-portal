import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import AlumniForm, {
  type AlumniFormData,
  alumniResolver,
} from "~/components/forms/AlumniForm";
import { Button } from "~/components/ui/button";
import { requirePermission } from "~/services/permission.server";
import { ALUMNUX_ALUMNI } from "~/utils/const";
import { useFormData } from "~/utils/formdata.server";
import { useProbability } from "~/utils/mockData.server";
import { sleep } from "~/utils/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  await requirePermission(request, ["write:alumni"]);

  const { data, errors } = await useFormData<AlumniFormData>(
    request,
    alumniResolver,
  );
  if (!data) return json(errors);

  await sleep(1000);
  useProbability(
    90,
    () => {},
    new Error(
      "This is Mockerror, Error when updating alumni, Please try again later, Probability: 90%",
    ),
  );
  return redirect(ALUMNUX_ALUMNI);
};

export default function Page() {
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
        <div className="text-sm text-muted-foreground">Alumni Creation</div>
      </div>
      <AlumniForm />
    </div>
  );
}
