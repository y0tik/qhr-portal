import { Outlet } from "@remix-run/react";
import Header from "~/components/header";

export default function App() {
  return (
    <>
      <Header />
      <div className="px-8">
        <Outlet />
      </div>
    </>
  );
}
