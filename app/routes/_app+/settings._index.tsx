import { redirect } from "@remix-run/react";

export const loader = () => {
  return redirect("/settings/general");
};
