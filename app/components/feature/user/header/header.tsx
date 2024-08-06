import { Input } from "~/components/ui/input";
import type { User } from "~/types";
import { MainNav } from "./main-nav";
import { NAVIGATION_MENU } from "./navigation-menu";
import { UserNav } from "./user-nav";

export const ExampleCompanyLogo = () => {
  return (
    <div className="relative z-20 flex items-center font-medium text-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-6 w-6"
      >
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
      </svg>
      Acme Inc
    </div>
  );
};

type HeaderProps = {
  user: User;
};

export default function UserHeader({ user }: HeaderProps) {
  const user_menu = NAVIGATION_MENU.filter((m) => m.role.includes(user.role));
  return (
    <div className="bg-secondary/80">
      <div className="relative flex h-16 items-center justify-between px-12 after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:bg-gray-200">
        <div className="flex-1">
          <ExampleCompanyLogo />
        </div>
        <MainNav links={user_menu} className="justify-center" />
        <div className="ml-auto flex flex-1 items-center justify-end space-x-4">
          <div>
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            />
          </div>
          <UserNav {...user} />
        </div>
      </div>
    </div>
  );
}
