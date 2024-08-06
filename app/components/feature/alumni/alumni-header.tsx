import { Link, useLocation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { ActionLogout } from "~/routes/action+/signout";
import type { MenuItem, User } from "~/types";
import { ExampleCompanyLogo } from "../user/header/header";

// Define mock icons (replace these with actual icons from lucide-react or similar)
export const ALUMNI_NAVIGATION_MENU: MenuItem[] = [
  { name: "Service Requests", to: "/me/tickets", role: [] },
  { name: "Settings", to: "/settings", role: [] },
];

type Props = {
  user: User;
};

export const AlumniHeader = ({ user: { uname: username } }: Props) => {
  const { pathname } = useLocation();
  return (
    <div className="sticky top-0 z-[100] border-b bg-secondary/70 backdrop-blur-lg">
      <div className="container grid h-16 grid-cols-5 items-center">
        <div className="col-span-2">
          <ExampleCompanyLogo />
        </div>
        <div className="col-span-3 text-right lg:col-span-1 lg:text-center">
          <Link to="/me" className="text-center text-lg text-primary">
            Welcome, <b>{username}</b>
          </Link>
        </div>
        <div className="col-span-2 hidden space-x-2 text-right lg:block">
          <Button asChild size="sm" variant="ghost">
            <Link to="/me">Home</Link>
          </Button>
          {ALUMNI_NAVIGATION_MENU.map((m) => (
            <Button
              asChild
              size="sm"
              variant="outline"
              className={
                pathname === m.to
                  ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : ""
              }
              key={m.to}
            >
              <Link to={m.to}>{m.name}</Link>
            </Button>
          ))}
          <ActionLogout>
            {(props) => (
              <Button {...props} size="sm" variant="outline">
                Logout
              </Button>
            )}
          </ActionLogout>
        </div>
      </div>
    </div>
  );
};
