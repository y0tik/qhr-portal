import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet } from "@remix-run/react";
import { requirePermission } from "~/services/permission.server";
import { Sidebar } from "../../components/Sidebar";
import type { ReactNode } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requirePermission(request, []);
  return json(user);
};

export default function AlumniLayout() {
  return (
    <div className="h-screen flex flex-row">
      <Sidebar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </div>
  );
}

const MainContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex-grow flex flex-col">{children}</div>;
};
