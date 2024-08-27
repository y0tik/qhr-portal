import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { columns } from "~/components/column/user-column";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { requirePermission } from "~/services/permission.server";
import {
  ALUMNUX_USER_BULK_CREATE,
  ALUMNUX_USER_CREATE,
  PROJECT_NAME,
} from "~/utils/const";
import { mockData, runWithProbability } from "~/utils/mockData.server";

// TODO: Add proper meta data
export const meta: MetaFunction = () => [
  { title: `User List ${PROJECT_NAME}` },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["read:users"]);

  const users = runWithProbability(
    90,
    () => mockData.users,
    new Error(
      "Please ignore, this is a mock error message. Should be hit 10 percent of the time, please refresh the page",
    ),
  );

  return json({ users });
};

export default function Page() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div className="border-dashed rounded-lg h-full px-2">
      <DataTable
        columns={columns}
        data={users}
        pageSize={8}
        renderActionRight={
          <div className="flex space-x-2">
            <Button variant="default" size="sm" asChild>
              <Link to={ALUMNUX_USER_CREATE}>
                <PlusCircle className="size-3.5" />
                Create User
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={ALUMNUX_USER_BULK_CREATE}>Bulk Upload</Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
