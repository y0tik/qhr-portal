import { Link, useLocation } from "@remix-run/react";
import { ArrowRight, HelpCircle, LogOut, PinIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { MODULES, type MenuItemType, SIDEBAR_TOP_MENU } from "~/utils/const";
import { cn, extractModuleName } from "~/utils/utils";
import { ThemeSwitcherMenuItem } from "./ThemeToggle";

const LogoQHR = ({ className }: { className: string }) => {
  return (
    <svg className={className} viewBox="0 0 208 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M130.458 53C129.819 53 129.299 52.8099 128.9 52.4296C128.527 52.0223 128.341 51.4927 128.341 50.8408L128.281 2.16067C128.281 1.50885 128.467 0.992827 128.84 0.612603C129.24 0.205218 129.759 0.00152588 130.398 0.00152588C131.038 0.00152588 131.544 0.205218 131.917 0.612603C132.29 0.992827 132.476 1.50885 132.476 2.16067V23.7521H156.795V2.16067C156.795 1.50885 156.981 0.992827 157.354 0.612603C157.727 0.205218 158.233 0.00152588 158.872 0.00152588C159.512 0.00152588 160.018 0.205218 160.391 0.612603C160.79 0.992827 160.99 1.50885 160.99 2.16067L161.05 50.8408C161.05 51.4927 160.85 52.0223 160.45 52.4296C160.077 52.8099 159.571 53 158.932 53C158.293 53 157.787 52.8099 157.414 52.4296C157.041 52.0223 156.855 51.4927 156.855 50.8408L156.795 28.0296H132.476L132.536 50.8408C132.536 51.4927 132.349 52.0223 131.976 52.4296C131.603 52.8099 131.097 53 130.458 53Z" fill="#22333B" />
      <path d="M206.809 52.5949C206.223 52.948 205.691 53.0702 205.211 52.9616C204.732 52.8529 204.306 52.5135 203.933 51.9431L190.828 30.6776H176.165L176.225 50.8408C176.225 52.2803 175.532 53 174.147 53C172.736 53 172.03 52.2803 172.03 50.8408L171.97 2.16067C171.97 0.721239 172.676 0.00152588 174.088 0.00152588H192.786C197.341 0.00152588 200.777 1.19652 203.094 3.58651C205.438 5.97651 206.61 9.4936 206.61 14.1378V16.5821C206.61 20.6831 205.691 23.9014 203.853 26.2371C202.015 28.5728 199.298 29.9986 195.702 30.5147L207.489 49.6618C208.234 50.9111 208.008 51.8888 206.809 52.5949ZM176.165 26.4001H192.786C196.142 26.4001 198.579 25.626 200.097 24.078C201.642 22.5028 202.415 20.0041 202.415 16.5821V14.1378C202.415 10.6886 201.642 8.18997 200.097 6.6419C198.579 5.06668 196.142 4.27907 192.786 4.27907H176.165V26.4001Z" fill="#22333B" />
      <path d="M87.126 53C81.2626 53 76.98 51.6295 74.278 48.8884C71.576 46.1474 70.225 41.8028 70.225 35.8547V17.1058C70.225 11.1029 71.576 6.74462 74.278 4.03097C76.98 1.28991 81.2356 -0.0532081 87.0449 0.00161235H91.2523C97.1156 0.00161235 101.385 1.37214 104.06 4.1132C106.762 6.85426 108.113 11.1988 108.113 17.1469V35.8547C108.113 41.8028 106.762 46.1474 104.06 48.8884C101.385 51.6295 97.1156 53 91.2523 53H87.126ZM87.126 48.6828H91.2523C94.3596 48.6828 96.8319 48.2717 98.6693 47.4494C100.507 46.627 101.831 45.2839 102.641 43.42C103.452 41.5561 103.857 39.0343 103.857 35.8547V17.1469C103.857 13.9947 103.452 11.4867 102.641 9.62273C101.831 7.75881 100.507 6.41569 98.6693 5.59338C96.8319 4.74365 94.3596 4.31878 91.2523 4.31878H87.0449C83.9376 4.29137 81.4653 4.68882 79.6279 5.51114C77.8176 6.30605 76.5071 7.64917 75.6965 9.5405C74.8859 11.4044 74.4806 13.9262 74.4806 17.1058V35.8547C74.4806 39.0343 74.8859 41.5561 75.6965 43.42C76.5071 45.2839 77.8311 46.627 79.6684 47.4494C81.5058 48.2717 83.9916 48.6828 87.126 48.6828Z" fill="#22333B" />
      <path d="M115.959 53C114.391 53 113.608 52.1914 113.608 50.5742V49.0118C113.608 47.4494 114.391 46.6681 115.959 46.6681H117.458C118.998 46.6681 119.768 47.4494 119.768 49.0118V50.5742C119.768 52.1914 118.998 53 117.458 53H115.959Z" fill="#22333B" />
      <path d="M98.855 47.7702L88.9259 35.8547C87.915 34.7773 87.8448 33.1086 88.7616 31.9479C89.6724 30.7947 91.2805 30.4943 92.5371 31.2426L104.82 40.2203C105.585 40.6761 105.932 41.6124 105.651 42.466C105.583 42.6709 105.482 42.8628 105.351 43.0333L101.831 47.6204C101.593 47.9309 101.269 48.163 100.901 48.2874C100.178 48.5318 99.3804 48.3302 98.855 47.7702Z" fill="#22333B" />
      <path d="M36.6652 24.5578H50.35C49.886 18.5504 47.2892 12.9069 43.0287 8.64635C38.7681 4.38581 33.1246 1.78907 27.1172 1.32501V15.0099C29.5012 15.4175 31.6999 16.5548 33.41 18.265C35.1202 19.9752 36.2575 22.1739 36.6652 24.5578Z" fill="#5E503F" />
      <path d="M13.6887 28.4422H0.00388415H0C0.464054 34.4496 3.0608 40.0931 7.32134 44.3537C11.5819 48.6142 17.2254 51.211 23.2328 51.675V37.9902C20.8496 37.5818 18.6517 36.4441 16.9423 34.734C15.2329 33.0239 14.0961 30.8256 13.6887 28.4422Z" fill="#5E503F" />
      <path d="M50.35 28.4422C49.886 34.4496 47.2892 40.0931 43.0287 44.3537C38.7681 48.6142 33.1246 51.211 27.1172 51.675V37.9902C29.5012 37.5825 31.6999 36.4452 33.41 34.735C35.1202 33.0249 36.2575 30.8262 36.6652 28.4422H50.35ZM0.00388415 24.5578C0.467818 18.551 3.06401 12.908 7.32375 8.64754C11.5835 4.38709 17.2261 1.78995 23.2328 1.32501V15.0099C20.8488 15.4175 18.6501 16.5548 16.94 18.265C15.2298 19.9752 14.0925 22.1739 13.6849 24.5578H0H0.00388415Z" fill="#22333B" />
    </svg >

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
      <div className="-mt-2 transition-transform group-data-[pinned=true]:translate-y-2 group-hover:translate-y-0 -translate-y-8 overflow-hidden">
        <div
          className={cn(
            "text-muted-foreground pl-6 text-sm transition-[width] mb-2",
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
  "flex items-center whitespace-nowrap gap-4 px-6 transition-[color,background-color,transform] cursor-pointer";
const sidebarShrinkStyle =
  "group-data-[pinned=true]:w-full group-hover:w-full w-0 overflow-hidden transition-[width]";
const MenuItemStyle = {
  menu: {
    base: "py-3 hover:bg-primary-foreground/80 data-[active=true]:bg-primary-foreground data-[active=true]:font-semibold data-[active=true]:text-primary data-[active=true]:hover:bg-primary-foreground/80 text-sm",
    hover: "hover:bg-primary/15 data-[active]:hover:bg-primary/15",
    svgStyle: "flex-shrink-0 text-current transition-colors size-3.5",
  },
  module: {
    base: [
      "py-4 -mx-1 text-sm border-b-2 first-of-type:border-t-2 border-primary/10 bg-white font-semibold text-primary",
    ],
    hover: "hover:bg-primary/10",
    svgStyle: "flex-shrink-0 size-5",
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
      {type === "module" && active && <ArrowRight className="size-5" />}
    </Comp>
  );
};
