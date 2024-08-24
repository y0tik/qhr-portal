import {
  ActivityIcon,
  BriefcaseBusiness,
  CircleArrowRight,
  DotIcon,
  FoldersIcon,
  HelpingHand,
  HomeIcon,
  LeafyGreen,
  type LucideIcon,
  Settings,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

export const ticketColorMapping = {
  created: ["#4DB8FF", "#000000"], // Light blue background, black foreground
  ongoing: ["#FFB300", "#000000"], // Orange background, black foreground
  "not-resolved": ["#FF1744", "#FFFFFF"], // Red background, white foreground
  resolved: ["#4CAF50", "#000000"], // Green background, black foreground
};

export const roleColorMapping = {
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
  { title: "Jobs", to: "/m/jobs", icon: BriefcaseBusiness },
  { title: "Recruit", to: "/m/recruit", icon: ShieldCheckIcon },
  { title: "Training", to: "/m/training", icon: LeafyGreen },
  { title: "Alumnux", to: "/m/alumnux", icon: FoldersIcon },
  { title: "Helpdesk", to: "/m/helpdesk", icon: HelpingHand },
];

export type Moduleitem = {
  title: string;
  to: string;
  icon?: LucideIcon;
  children?: Moduleitem[];
};

export const MODULE_MENU_ALUMNUX: Moduleitem[] = [
  {
    title: "User",
    to: "/m/alumnux/user",
    icon: UserIcon,
    children: [{ title: "Create", to: "/m/alumnux/user/create" }],
  },
  {
    title: "Employee",
    to: "/m/alumnux/employee",
    icon: UserIcon,
    children: [{ title: "Create", to: "/m/alumnux/employee/create" }],
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
];
