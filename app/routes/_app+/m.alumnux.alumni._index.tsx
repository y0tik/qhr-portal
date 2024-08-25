import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData, useRouteError } from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { columns } from "~/components/column/alumni-column";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { requirePermission } from "~/services/permission.server";
import { ALUMNUX_ALUMNI_CREATE, PROJECT_NAME } from "~/utils/const";
import {
  mockData,
  returnDataOrThrowErrorOnProbability,
} from "~/utils/mockData.server";

// TODO: Add proper meta data
export const meta: MetaFunction = () => [
  { title: `Employee List ${PROJECT_NAME}` },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["read:alumni"]);

  const list = returnDataOrThrowErrorOnProbability(
    90,
    mockData.alumni,
    new Error(
      "Please ignore, this is a mock error message. Should be hit 10 percent of the time, please refresh the page.",
    ),
  );

  return json({ list });
};

export default function Page() {
  const { list } = useLoaderData<typeof loader>();

  return (
    <div className="border-dashed rounded-lg h-full p-2">
      <DataTable
        columns={columns}
        data={list}
        pageSize={8}
        renderActionRight={
          <div className="flex space-x-2">
            <Button variant="default" size="sm" asChild>
              <Link to={ALUMNUX_ALUMNI_CREATE}>
                <PlusCircle className="size-3.5" />
                Create Alumni
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
