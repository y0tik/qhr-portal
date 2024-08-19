import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const categoryName = params.category;
  return json({ name: categoryName, files: [] });
};

export default function Page() {
  return (
    <div className="text-center text-muted-foreground text-xl border border-dashed rounded-md p-24">
      Please click on a category to view files
    </div>
  );
}
