import { useOutletContext } from "@remix-run/react";
import { AuthSessionData } from "~/server/auth-session.server";
import AdminOverview from "./AdminOverview";
import HROverview from "./HROverview";
import EmployeeOverview from "./EmployeeOverview";
export { ErrorBoundary } from "~/components/error-boundary";

const roleComponents = {
  admin: AdminOverview,
  hr: HROverview,
  employee: EmployeeOverview,
};

export default function RenderOverview() {
  const session = useOutletContext<AuthSessionData>();
  const Comp = roleComponents[session.role] || EmployeeOverview;
  return <Comp />;
}
