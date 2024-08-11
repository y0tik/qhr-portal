import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, json, useLoaderData } from "@remix-run/react";
import { Grid2x2, ListIcon } from "lucide-react";
import {
  CategoryListRaw,
  categories,
} from "~/components/feature/alumni/categories-card";
import { Button } from "~/components/ui/button";
import { requirePermission } from "~/server/auth-session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["self"]);
  return json({ categories });
};

export default function DocumentsListView() {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="mx-auto">
        <div className="py-3 -mt-4 mb-5 border-b flex justify-between items-center text-primary font-semibold">
          <div className="-mb-0.5">Documents By Categories</div>
          {/* TODO filter layout using query params */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm-icon">
              <Grid2x2 className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm-icon">
              <ListIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-4 items-center relative [&>:hover]:scale-[0.98] [&_a]:grayscale [&_[data-active=true]]:grayscale-0 *:shadow-none [&_[data-active=true]]:-translate-y-1 [&_[data-active=true]]:shadow-lg  *:transition-[filter,transform,shadow] *:will-change-transform [&>:hover]:grayscale-0  [&>:hover]:opacity-70">
          <CategoryListRaw categories={categories} />
        </div>
        <div className="mt-6 relative">
          <Outlet />
        </div>
      </div>
    </>
  );
}
