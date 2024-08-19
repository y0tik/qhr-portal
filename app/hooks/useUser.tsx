import { useLoaderData } from "@remix-run/react";
import type { layoutSessionLoader } from "~/routes/_app+/_layout";

export const useUser = () => {
  const user = useLoaderData<typeof layoutSessionLoader>();
  if (!user) {
    throw new Error("Cannot find user");
  }
  return user;
};
