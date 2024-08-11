import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { columns } from "~/components/column/alumni-column";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { ENDPOINT_ALUMNI, PROJECT_NAME } from "~/constant";
import { requirePermission } from "~/server/auth-session.server";
import type { AlumniUser } from "~/types";

export const meta: MetaFunction = () => [
  { title: `Alumni List ${PROJECT_NAME}` },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { api } = await requirePermission(request, ["read:alumni"]);

  const { error, response } = await api.get<AlumniUser[]>("/employees");
  if (error) {
    return json({
      alumni: null,
      error: "Cannot fetch alumni's, please try again later",
    });
  }

  return json({ alumni: response, error: null });
};

export default function AlumniListPage() {
  const { error, alumni } = useLoaderData<typeof loader>();

  return (
    <>
      {error && <div>WIP SHOW ALERT - {error}</div>}
      {/* TODO :: Add a search button next to input */}
      {/* TODO :: remove pagination */}
      {alumni && (
        <DataTable
          columns={columns}
          data={alumni}
          pageSize={7}
          renderActionRight={
            <div className="flex space-x-2">
              <Button variant="default" size="sm" asChild>
                <Link to={`${ENDPOINT_ALUMNI}/create`}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Alumni
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to={`${ENDPOINT_ALUMNI}/bulk`}>Bulk Upload</Link>
              </Button>
            </div>
          }
        />
      )}
    </>
  );
}
