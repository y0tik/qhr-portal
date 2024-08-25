import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData, useRouteError } from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { columns } from "~/components/column/user-column";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { requirePermission } from "~/services/permission.server";
import {
  ALUMNUX_BULK_CREATE,
  ALUMNUX_USER_CREATE,
  PROJECT_NAME,
} from "~/utils/const";
import {
  mockData,
  returnDataOrThrowErrorOnProbability,
} from "~/utils/mockData.server";

// TODO: Add proper meta data
export const meta: MetaFunction = () => [
  { title: `User List ${PROJECT_NAME}` },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["read:users"]);

  const users = returnDataOrThrowErrorOnProbability(
    90,
    mockData.users,
    new Error(
      "Please ignore, this is a mock error message. Should be hit 10 percent of the time, please refresh the page",
    ),
  );

  return json({ users });
};

export default function Page() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div className="border-dashed rounded-lg h-full p-2">
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
              <Link to={ALUMNUX_BULK_CREATE}>Bulk Upload</Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = "An unexpected error occurred when fetching users";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="border-dashed rounded-lg border border-destructive h-full p-4 bg-red-100">
      <div className="h-full grid place-items-center">
        <div>
          <div className="text-xl -mt-24 text-muted-foreground">
            Alumnux Module
          </div>
          <div className="text-red-500 text-3xl mt-1 mb-5 font-semibold -mx-0.5">
            Something went wrong, please try again later
          </div>
          <div className="max-w-lg text-balance">
            <b>Details :</b>
            <br />
            {errorMessage}
          </div>
        </div>
      </div>
    </div>
  );
}
