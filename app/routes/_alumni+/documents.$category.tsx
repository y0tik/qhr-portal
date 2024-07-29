// import type { LoaderFunctionArgs } from "@remix-run/node";
// import { json, useLoaderData } from "@remix-run/react";

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//   const categoryName = params.category;
//   return json({ name: categoryName, files: [] });
// };

// export default function DocumentCategoryListView() {
//   const { name, files } = useLoaderData<typeof loader>();
//   return (
//     <div className="container justify-center flex py-4 gap-4 flex-1">
//       <div className="w-3/12">

//       </div>
//       <div className="w-6/12 rounded-md border">Files : {files.length}</div>
//     </div>
//   );
// }
