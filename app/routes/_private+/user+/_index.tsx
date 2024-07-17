import { DataTable } from "~/components/ui/data-table";
import { columns } from "~/components/column/user-column";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ENDPOINT_USER, PROJECT_NAME } from "~/constant";
import { json, Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { requireAuth } from "~/server/auth-session.server";
import { APIWithToken } from "~/server/api.server";
import { HrUsers } from "~/types";

export const meta: MetaFunction = () => [
  { title: `User List ${PROJECT_NAME}` },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { atoken } = await requireAuth(request, ["read:users"]);
  const api = APIWithToken(atoken);

  const { error, response } = await api.get<HrUsers[]>("/hr");
  if (error) return json({ error: "Cannot Fetch User Details", users: null });

  return json({ users: response, error: null });
};

export default function ListUserPage() {
  const { error, users } = useLoaderData<typeof loader>();

  return (
    <>
      {error && <div>WIP SHOW ALERT - {error}</div>}
      {users && (
        <DataTable
          columns={columns}
          data={users}
          pageSize={7}
          renderActionRight={
            <div className="flex space-x-2">
              <Button variant="default" size="sm" asChild>
                <Link to={`${ENDPOINT_USER}/create`}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create User
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to={`${ENDPOINT_USER}/bulk`}>Bulk Upload</Link>
              </Button>
            </div>
          }
        />
      )}
    </>
  );
}
