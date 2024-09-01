import { Link, useLocation } from "@remix-run/react";
import { ArrowRight, HelpCircle, LogOut, PinIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { MODULES, type MenuItemType, SIDEBAR_TOP_MENU } from "~/utils/const";
import { cn, extractModuleName } from "~/utils/utils";
import { ThemeSwitcherMenuItem } from "./ThemeToggle";

const LogoQHR = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 74 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.11098 15.8039H13.2554L15.3389 18.5615L17.3886 21.0178L21.2515 26H16.7016L14.0438 22.6399L12.681 20.6471L9.11098 15.8039ZM21.6006 12.189C21.6006 14.7766 21.1238 16.978 20.1703 18.7932C19.2243 20.6084 17.9329 21.995 16.2962 22.9528C14.6669 23.9029 12.835 24.3779 10.8003 24.3779C8.7506 24.3779 6.91113 23.899 5.28189 22.9412C3.65265 21.9834 2.36503 20.5969 1.41902 18.7816C0.473005 16.9664 0 14.7689 0 12.189C0 9.60131 0.473005 7.39988 1.41902 5.58467C2.36503 3.76946 3.65265 2.38681 5.28189 1.43672C6.91113 0.478907 8.7506 0 10.8003 0C12.835 0 14.6669 0.478907 16.2962 1.43672C17.9329 2.38681 19.2243 3.76946 20.1703 5.58467C21.1238 7.39988 21.6006 9.60131 21.6006 12.189ZM16.6565 12.189C16.6565 10.5128 16.4125 9.09923 15.9245 7.94831C15.444 6.79739 14.7645 5.92454 13.8861 5.32977C13.0076 4.735 11.979 4.43761 10.8003 4.43761C9.62153 4.43761 8.59293 4.735 7.71449 5.32977C6.83605 5.92454 6.15282 6.79739 5.6648 7.94831C5.18429 9.09923 4.94403 10.5128 4.94403 12.189C4.94403 13.8651 5.18429 15.2787 5.6648 16.4296C6.15282 17.5805 6.83605 18.4534 7.71449 19.0481C8.59293 19.6429 9.62153 19.9403 10.8003 19.9403C11.979 19.9403 13.0076 19.6429 13.8861 19.0481C14.7645 18.4534 15.444 17.5805 15.9245 16.4296C16.4125 15.2787 16.6565 13.8651 16.6565 12.189Z"
        fill="currentColor"
      />
      <path
        d="M26.4714 24.3547C25.7281 24.3547 25.0899 24.0844 24.5569 23.5437C24.0313 22.9952 23.7685 22.3387 23.7685 21.574C23.7685 20.817 24.0313 20.1682 24.5569 19.6275C25.0899 19.0868 25.7281 18.8164 26.4714 18.8164C27.1922 18.8164 27.8229 19.0868 28.3634 19.6275C28.904 20.1682 29.1743 20.817 29.1743 21.574C29.1743 22.0838 29.0467 22.5511 28.7914 22.9759C28.5436 23.3931 28.217 23.7291 27.8116 23.984C27.4062 24.2311 26.9594 24.3547 26.4714 24.3547Z"
        fill="currentColor"
      />
      <path
        d="M33.9916 24.0535V0.324421H36.7846V10.8913H49.0828V0.324421H51.8757V24.0535H49.0828V13.4403H36.7846V24.0535H33.9916Z"
        fill="currentColor"
      />
      <path
        d="M57.4673 24.0535V0.324421H65.2607C67.0626 0.324421 68.5417 0.641117 69.6979 1.27451C70.8541 1.90018 71.7101 2.76144 72.2656 3.85829C72.8212 4.95514 73.099 6.20262 73.099 7.60071C73.099 8.99881 72.8212 10.2386 72.2656 11.32C71.7101 12.4014 70.8579 13.251 69.7092 13.869C68.5604 14.4792 67.0926 14.7843 65.3057 14.7843H58.999V12.189H65.2156C66.4469 12.189 67.438 12.0036 68.1888 11.6328C68.9471 11.262 69.4952 10.7368 69.833 10.057C70.1784 9.36958 70.3511 8.5508 70.3511 7.60071C70.3511 6.65062 70.1784 5.82026 69.833 5.10963C69.4877 4.39899 68.9358 3.85057 68.1775 3.46435C67.4192 3.07041 66.4169 2.87344 65.1706 2.87344H60.2603V24.0535H57.4673ZM68.3239 13.3939L74 24.0535H70.7565L65.1706 13.3939H68.3239Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const Sidebar = () => {
  const [pinned, setPinned] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (pinned === undefined) {
      setPinned(
        localStorage.getItem("qhr-user-pref-sidebar-pinned") === "true",
      );
    } else {
      localStorage.setItem("qhr-user-pref-sidebar-pinned", String(pinned));
    }
  }, [pinned]);

  return (
    <div
      data-pinned={pinned}
      className={cn(
        "flex sticky top-0 flex-shrink-0 transition-all group w-[var(--sidebar-width)] flex-col gap-7 duration-200 border-r bg-accent text-accent-foreground",
        pinned
          ? "[--sidebar-width:240px]"
          : "[--sidebar-width:60px] hover:w-[220px]",
      )}
    >
      <div className="px-6 pt-8 flex justify-between items-center relative">
        <div className="relative flex-shrink-0 w-6 h-8 -translate-x-1.5 transition-[transform,width] overflow-hidden group-data-[pinned=true]:w-20 group-hover:w-20 group-data-[pinned=true]:translate-x-0 group-hover:translate-x-0">
          <LogoQHR className="h-8 w-20 absolute left-0 inset-y-0 text-primary dark:text-purple-500" />
        </div>
        <button
          type="button"
          className="bg-primary/20 p-1 rounded text-primary opacity-0 group-hover:opacity-100 group-data-[pinned=true]:opacity-100"
          onClick={() => setPinned((p) => !p)}
        >
          <PinIcon className="w-4 h-4 group-data-[pinned=true]:rotate-45 transition-transform" />
        </button>
      </div>
      <SideBarMenu menus={SIDEBAR_TOP_MENU} />
      <div className="-mt-2 space-y-2 transition-transform group-data-[pinned=true]:translate-y-2 group-hover:translate-y-0 -translate-y-8 overflow-hidden">
        <div
          className={cn(
            "text-muted-foreground pl-6 transition-[width]",
            sidebarShrinkStyle,
          )}
        >
          Modules
        </div>
        <SideBarModules menus={MODULES} />
      </div>
      <div className="flex-1" />
      <div className="pb-4">
        <ThemeSwitcherMenuItem />
        <SidebarMenuItem
          type="menu"
          icon={LogOut}
          title="Signout"
          className="py-2"
        />
        <SidebarMenuItem
          type="menu"
          icon={HelpCircle}
          title="Help"
          className="py-2"
        />
      </div>
    </div>
  );
};

const SideBarModules = ({ menus }: { menus: MenuItemType[] }) => {
  return menus.map((el) => (
    <SidebarMenuItem type="module" key={el.to} {...el} />
  ));
};

export const SideBarMenu = ({ menus }: { menus: MenuItemType[] }) => {
  return (
    <div>
      {menus.map((el) => (
        <SidebarMenuItem type="menu" key={el.to} {...el} />
      ))}
    </div>
  );
};

const baseStyle =
  "flex items-center whitespace-nowrap gap-3 px-6 transition-[color,background-color,transform] cursor-pointer";
const sidebarShrinkStyle =
  "group-data-[pinned=true]:w-full group-hover:w-full w-0 overflow-hidden transition-[width]";
const MenuItemStyle = {
  menu: {
    base: "py-3 hover:bg-primary-foreground/80 data-[active=true]:bg-primary-foreground data-[active=true]:font-semibold data-[active=true]:text-primary data-[active=true]:hover:bg-primary-foreground/80 text-sm",
    hover: "hover:bg-primary/15 data-[active]:hover:bg-primary/15",
    svgStyle: "flex-shrink-0 text-current transition-colors size-3.5",
  },
  module: {
    base: "group-data-[pinned=true]:translate-x-0 py-4 group-data-[pinned=true]:mr-0 -mr-1.5 group-hover:mr-0 -translate-x-1.5 group-hover:translate-x-0",
    hover: "bg-primary hover:bg-primary/80 text-white",
    svgStyle: "flex-shrink-0",
  },
};

export const SidebarMenuItem = ({
  type,
  to = "#",
  icon: Icon,
  title,
  onClick,
  element,
  className,
  ...rest
}: MenuItemType & {
  type: keyof typeof MenuItemStyle;
  element?: "a" | "button";
  className?: string;
  onClick?: () => void;
}) => {
  const style = MenuItemStyle[type];
  const Comp = element ?? Link;
  const { pathname } = useLocation();
  const active =
    type === "menu"
      ? pathname === to
      : extractModuleName(to) === extractModuleName(pathname);

  return (
    <Comp
      to={to}
      data-active={active}
      className={cn(baseStyle, style.base, style.hover, className)}
      onClick={onClick}
      {...rest}
    >
      <Icon className={style.svgStyle} />
      <span className={sidebarShrinkStyle}>{title}</span>
      {type === "module" && active && <ArrowRight className="size-6" />}
    </Comp>
  );
};
