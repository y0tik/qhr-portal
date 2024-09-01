import { type LucideIcon, Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuItem } from "./Sidebar";
import { forwardRef } from "react";

export function ThemeToggle() {
  const [, setTheme] = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full" asChild>
        <Button variant="ghost" size="sm">
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          <span>Change Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeSwitcherMenuItem() {
  const [theme, setTheme] = useTheme();

  function toggle() {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <SidebarMenuItem
      onClick={toggle}
      data-lte={theme === Theme.LIGHT}
      type="menu"
      icon={ThemeToggleIcon}
      title={`Switch to ${theme === Theme.LIGHT ? "Dark" : "Light"}`}
      className="py-2 group"
    />
  );
}

// eslint-disable-next-line react/prop-types
const ThemeToggleIcon: LucideIcon = forwardRef(({ className }) => (
  <div className={className}>
    <Moon className="group-data-[lte=false]:opacity-0 group-data-[lte=true]:opacity-100 size-4 absolute" />
    <Sun className="absolute group-data-[lte=false]:opacity-100 group-data-[lte=true]:opacity-0 size-4" />
  </div>
));
ThemeToggleIcon.displayName = "ThemeToggleIcon";
