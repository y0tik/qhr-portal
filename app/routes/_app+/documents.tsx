import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Outlet, json, useLoaderData } from "@remix-run/react";
import { Grid2x2, ListIcon } from "lucide-react";
import { useState } from "react";
import {
  CategoryListRaw,
  categories,
} from "~/components/cards/categories-card";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/utils";
import { requirePermission } from "~/services/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["self"]);
  return json({ categories });
};

export default function DocumentsListView() {
  const { categories } = useLoaderData<typeof loader>();
  const [listView, setListView] = useState(false);

  return (
    <div className="mx-auto">
      <div className="py-3 -mt-4 border-b flex justify-between items-center text-primary font-semibold">
        <div className="-mb-2">Document Categories</div>
        <Form className="flex gap-2" action=".">
          <Button
            variant={listView ? "outline" : "default"}
            size="sm-icon"
            onClick={() => setListView(false)}
          >
            <Grid2x2 className="w-5 h-5" />
          </Button>
          <Button
            variant={listView ? "default" : "outline"}
            size="sm-icon"
            onClick={() => setListView(true)}
          >
            <ListIcon className="w-5 h-5" />
          </Button>
        </Form>
      </div>
      <div className={listView ? "flex gap-6" : "pt-8"}>
        <div
          className={cn("grid items-center relative text-sm", {
            "grid-cols-4 gap-6 gap-y-8": !listView,
            "w-1/5 overflow-clip rounded-lg border shadow-inner divide-y mt-5":
              listView,
          })}
        >
          <CategoryListRaw
            categories={categories}
            compact={listView ? "tight" : "relaxed"}
            hover={listView ? "normal" : "grayscale"}
          />
        </div>
        <div className={cn("mt-6 relative", listView && "mt-3 w-4/5")}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
