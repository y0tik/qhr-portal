import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import type { ReactNode } from "react";
import type { MenuItem } from "~/utils/types";

const SETTINGS_MENU: MenuItem[] = [
  { name: "General", to: "/settings/general" },
];

const SettingsSideNav = () => {
  const location = useLocation();
  return (
    <div className="sticky top-[calc(7.5rem+1px)]">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="font-semibold text-3xl">Settings</h1>
      </div>
      <nav className="*:-ml-4 mt-6 grid text-muted-foreground text-sm *:mr-12 *:rounded *:px-4 *:py-2 *:transition-colors [&_a:hover]:bg-secondary">
        {SETTINGS_MENU.map((menu) => (
          <Link
            key={menu.to}
            to={menu.to}
            className={
              location.pathname === menu.to ? "font-semibold text-primary" : ""
            }
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const SettingsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto mt-6 grid w-full flex-grow p-4 md:gap-8 md:px-10 max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      {children}
    </div>
  );
};

export default function Page() {
  return (
    <SettingsContainer>
      <SettingsSideNav />
      <Outlet />
    </SettingsContainer>
  );
}
