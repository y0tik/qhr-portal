import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/_app+/_layout";

export const useUser = () => {
  const user = useRouteLoaderData<typeof loader>("routes/_app+/_layout");
  if (!user) {
    throw new Error("Cannot find user");
  }
  return user;
};
