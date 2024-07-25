import { redirect, type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  // TODO check for session and redirect accordingly
  return redirect("/login");
};

export default function Index() {
  return <div>Please visit the login page</div>;
}
