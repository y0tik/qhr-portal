import { useOutletContext } from "@remix-run/react";
import { AuthSessionData } from "~/server/auth-session.server";
import AdminOverview from "./admin-overview";
import HROverview from "./hr-overview";
export { ErrorBoundary } from "~/components/error-boundary";

export default function RenderOverview() {
  const session = useOutletContext<AuthSessionData>();
  switch (session.role) {
    case "admin":
      return <AdminOverview />;
    case "employee":
    default:
      return <HROverview />;
  }
}
