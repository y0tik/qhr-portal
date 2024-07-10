import { DataTable } from "~/components/ui/data-table";
import { columns, users } from "~/components/column/user-column";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ENDPOINT_USER, PROJECT_NAME } from "~/constant";
import { Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: `User List ${PROJECT_NAME}` },
];

export default function UserPage() {
  return (
    <>
      <div className="mt-4"></div>
      <DataTable
        columns={columns}
        data={users}
        pageSize={7}
        renderActionRight={
          <div className="flex space-x-2">
            <Button variant="default" size="sm" asChild>
              <Link to={`${ENDPOINT_USER}/new`}>
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
    </>
  );
}
