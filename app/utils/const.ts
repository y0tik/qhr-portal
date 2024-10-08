import {
  BriefcaseBusiness,
  CircleArrowRight,
  DotIcon,
  FoldersIcon,
  HelpingHand,
  HomeIcon,
  LayoutDashboardIcon,
  LeafyGreen,
  type LucideIcon,
  Settings,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import type React from "react";

export const PERFS_SIDEBAR = "qhr-sb-ky";

export const ticketColorMapping = {
  created: ["#4DB8FF", "#000000"], // Light blue background, black foreground
  ongoing: ["#FFB300", "#000000"], // Orange background, black foreground
  "not-resolved": ["#FF1744", "#FFFFFF"], // Red background, white foreground
  resolved: ["#4CAF50", "#000000"], // Green background, black foreground
};

type EmittedRole = "hr" | "support";
export const roleColorMapping: Record<EmittedRole, [string, string]> = {
  hr: ["#FFC107", "#000000"], // Amber background, black foreground
  support: ["#9C27B0", "#FFFFFF"], // Purple background, white foreground
};

export const PROJECT_NAME = "Q.HR";
export const formatProjectTitle = (name: string) => `${name} - ${PROJECT_NAME}`;
export const getModuleRootPath = (name?: string) =>
  name ? `/m/${name}` : "/m";
export const getDashboardPath = () => "/dashboard";

// URLs

// MENUS
export const SIDEBAR_TOP_MENU = [
  { title: "Home", to: "Home", icon: HomeIcon },
  { title: "Settings", to: "Settings", icon: Settings },
  { title: "Users", to: "Users", icon: UsersIcon },
];

export type MenuItemType = {
  title: string;
  to?: string;
  icon: LucideIcon;
};

export const LOWER_MENUS = [
  { title: "Sign Out", to: "Sign Out", icon: HomeIcon },
  { title: "DarkMode", to: "DarkMode", icon: Settings },
  { title: "Help", to: "Help", icon: UsersIcon },
];

export const MODULES = [
  { title: "Alumnux", to: "/m/alumnux", icon: FoldersIcon },
  { title: "Jobs", to: "/m/jobs", icon: BriefcaseBusiness },
  { title: "Recruit", to: "/m/recruit", icon: ShieldCheckIcon },
  { title: "Training", to: "/m/training", icon: LeafyGreen },
  { title: "Helpdesk", to: "/m/helpdesk", icon: HelpingHand },
];

export type Moduleitem = {
  title: string;
  to: string;
  icon?: LucideIcon;
  children?: Moduleitem[];
  activeType?: "exact" | "prefix";
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dashboardURL = (_r?: string) => "/dashboard";
export const ALUMNUX_USER = "/m/alumnux/user";
export const ALUMNUX_USER_CREATE = "/m/alumnux/user/create";
export const ALUMNUX_USER_BULK_CREATE = "/m/alumnux/user/create/bulk";
export const ALUMNUX_USER_UPDATE = (id: string | number) =>
  `/m/alumnux/user/update/${id}`;
export const TICKETS_ASSIGNED_TO_USER = (id: string | number) =>
  `/m/tickets/user/${id}`;

export const ALUMNUX_ALUMNI = "/m/alumnux/alumni";
export const ALUMNUX_ALUMNI_CREATE = "/m/alumnux/alumni/create";
export const ALUMNUX_ALUMNI_UPDATE = (id: string | number) =>
  `/m/alumnux/alumni/update/${id}`;
export const TICKETS_BY_USER = (id: string | number) => `/m/tickets/user/${id}`;

export const MODULE_MENU_ALUMNUX: Moduleitem[] = [
  {
    title: "Overview",
    to: "/m/alumnux",
    icon: LayoutDashboardIcon,
    activeType: "exact",
  },
  {
    title: "User",
    to: ALUMNUX_USER,
    icon: UserIcon,
    children: [{ title: "Create", to: ALUMNUX_USER_CREATE }],
  },
  {
    title: "Alumni",
    to: ALUMNUX_ALUMNI,
    icon: UserIcon,
    children: [{ title: "Create", to: ALUMNUX_ALUMNI_CREATE }],
  },
];

export const JOBS_INDEX = "/m/jobs";
export const JOBS_ALL = "/m/jobs/all";
export const JOBS_CREATE = "/m/jobs/new";
export const JOBS_UPDATE = (id: string) => `/m/jobs/update/${id}`;

export const MODULE_MENU_JOBS: Moduleitem[] = [
  {
    title: "Overview",
    to: JOBS_INDEX,
    icon: LayoutDashboardIcon,
    activeType: "exact",
  },
  {
    title: "All Jobs",
    to: JOBS_ALL,
    icon: UserIcon,
  },
];

const convertModuleToCommandList = (items: Moduleitem[]) => {
  const flattenItems: {
    title: string;
    to: string;
    icon: LucideIcon;
  }[] = [];
  for (const item of items) {
    flattenItems.push({
      icon: item.icon ?? DotIcon,
      to: item.to,
      title: item.title,
    });
    (item.children ?? []).map((el) => {
      flattenItems.push({
        title: `${item.title} / ${el.title}`,
        to: el.to,
        icon: el.icon ?? CircleArrowRight,
      });
    });
  }
  return flattenItems;
};

export const ModulesCommandItems = {};

export const MODULE_COMMAND_MENU = [
  {
    category: "Alumnux",
    items: convertModuleToCommandList(MODULE_MENU_ALUMNUX),
  },
  {
    category: "Jobs",
    items: convertModuleToCommandList(MODULE_MENU_JOBS),
  },
];
