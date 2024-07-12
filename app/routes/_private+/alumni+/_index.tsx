import { DataTable } from "~/components/ui/data-table";
import { columns, alumni } from "~/components/column/alumni-column";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ENDPOINT_ALUMNI, PROJECT_NAME } from "~/constant";
import { Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: `Alumni List ${PROJECT_NAME}` },
];

export default function ListAlumniPage() {
  return (
    <>
      <div className="mt-4"></div>
      {/* Add a search button next to input */}
      {/* remove pagination */}
      <DataTable
        columns={columns}
        data={alumni}
        pageSize={7}
        renderActionRight={
          <div className="flex space-x-2">
            <Button variant="default" size="sm" asChild>
              <Link to={`${ENDPOINT_ALUMNI}/create`}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Alumni
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`${ENDPOINT_ALUMNI}/bulk`}>Bulk Upload</Link>
            </Button>
          </div>
        }
      />
    </>
  );
}
