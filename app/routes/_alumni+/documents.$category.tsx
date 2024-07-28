import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const categoryName = params.category;
  console.log(params);
  return json({ name: categoryName, files: [] });
};

export default function DocumentCategoryListView() {
  const { name, files } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>WIP : Showing files for category, {name}</div>
      <div>Files : {files.length}</div>
    </div>
  );
}
