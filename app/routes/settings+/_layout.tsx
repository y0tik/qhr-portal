import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { AlumniHeader } from "~/components/feature/alumni/alumni-header";
import UserHeader from "~/components/feature/user/header";
import { layoutSessionLoader } from "~/server/helper.server";
import type { MenuItem } from "~/types";

export const loader = layoutSessionLoader;

const SETTINGS_MENU: MenuItem[] = [
  {
    name: "General",
    to: "/settings/general",
    role: ["admin", "employee", "hr"],
  },
  { name: "Company", to: "/settings/company", role: ["admin"] },
];

export default function SettingsIndexPage() {
  const location = useLocation();
  const user = useLoaderData<typeof loader>();
  const menus = SETTINGS_MENU.filter((item) => item.role.includes(user.role));
  const header =
    user.role === "employee" ? (
      <AlumniHeader user={user} />
    ) : (
      <UserHeader user={user} />
    );
  return (
    <>
      {header}
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="font-semibold text-3xl">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="*:-ml-4 grid text-muted-foreground text-sm *:mr-12 *:rounded *:px-4 *:py-2 *:transition-colors [&_a:hover]:bg-secondary">
            {menus.map((menu) => (
              <Link
                key={menu.to}
                to={menu.to}
                className={
                  location.pathname === menu.to
                    ? "font-semibold text-primary"
                    : ""
                }
              >
                {menu.name}
              </Link>
            ))}
          </nav>
          <div className="grid gap-6">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
