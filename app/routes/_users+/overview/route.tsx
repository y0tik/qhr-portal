import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useOutletContext } from "@remix-run/react";
import {
  type AuthSessionData,
  requireAuth,
} from "~/server/auth-session.server";
import AdminOverview from "./admin-overview";
import HROverview from "./hr-overview";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAuth(request, ["overview"]);
  return null;
};

export default function RenderOverview() {
  const session = useOutletContext<AuthSessionData>();
  switch (session.role) {
    case "admin":
      return <AdminOverview />;
    default:
      return <HROverview />;
  }
}
