import { MenuItem } from "~/types";

export const NAVIGATION_MENU: MenuItem[] = [
  { name: "Overview", to: "/overview", role: ["admin", "employee", "hr"] },
  { name: "User", to: "/user", role: ["admin"] },
  { name: "Alumni", to: "/alumni", role: ["hr"] },
];
