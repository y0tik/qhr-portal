import type { ReactNode } from "react";
import { Link, useNavigation } from "@remix-run/react";
import { BellIcon, Loader2 } from "lucide-react";
import { CommandMenu } from "~/components/ComandMenu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUser } from "~/hooks/useUser";
import { ActionLogout } from "~/routes/action+/signout";
import { cn } from "~/utils/utils";
import { ThemeToggle } from "./ThemeToggle";

export const HeaderContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-14 border-b flex justify-between items-center px-4 flex-shrink-0">
      {children}
    </div>
  );
};

export const AppStatus = () => {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <Loader2
      className={cn(
        "size-4 animate-spin transition-opacity",
        isLoading ? "opacity-100" : "opacity-0",
      )}
    />
  );
};

export const HeaderUserGroup = () => {
  return (
    <div className="flex gap-3 items-center">
      <AppStatus />
      <CommandMenu />
      <UserNotification />
      <UserProfile />
    </div>
  );
};

export const UserNotification = () => {
  return (
    <div>
      <div className="rounded-full h-8 w-8 grid text-primary place-items-center border ">
        <BellIcon className="w-4 h-4 text-current" />
      </div>
    </div>
  );
};

export const UserProfile = () => {
  const { uname: username, email } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="@admin" />
            <AvatarFallback className="bg-gray-200">
              {(username.charAt(0) + username.charAt(1)).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{username}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/settings/general">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/m/support">Support</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ActionLogout className="w-full">
          <DropdownMenuItem className="w-full">Logout</DropdownMenuItem>
        </ActionLogout>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
