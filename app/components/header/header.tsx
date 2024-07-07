import { Input } from "~/components/ui/input";
import { MainNav } from "./main-nav";
import { NAVIGATION_MENU } from "./navigation-menu";
import { UserNav } from "./user-nav";

const ExampleCompanyLogo = () => {
  return (
    <div className="relative z-20 flex items-center text-lg font-medium">
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

export default function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex-1">
          <ExampleCompanyLogo />
        </div>
        <MainNav links={NAVIGATION_MENU} className="justify-center" />
        <div className="flex-1 ml-auto flex items-center justify-end space-x-4">
          <div>
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            />
          </div>
          <UserNav />
        </div>
      </div>
    </div>
  );
}
