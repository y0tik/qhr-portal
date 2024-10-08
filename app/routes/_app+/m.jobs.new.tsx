import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { JobCreationView } from "~/feature/jobs/form";
import { requirePermission } from "~/services/permission.server";
import { PROJECT_NAME } from "~/utils/const";

export const meta: MetaFunction = () => [
  { title: `Post New Job: ${PROJECT_NAME}` },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["m:jobs:create"]);
  return json({ meta: {} });
};

export default function Page() {
  return (
    <div className="flex flex-col isolate gap-5 p-6">
      <JobCreationView />
    </div>
  );
}
