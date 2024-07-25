import { Role } from "~/types";

// TODO EXPORT FROM COMMON
export interface MenuItem {
  to: string;
  name: string;
  role: Role[];
}

export const NAVIGATION_MENU: MenuItem[] = [
  { name: "Overview", to: "/overview", role: ["admin", "employee", "hr"] },
  { name: "User", to: "/user", role: ["admin"] },
  { name: "Alumni", to: "/alumni", role: ["hr"] },
];
