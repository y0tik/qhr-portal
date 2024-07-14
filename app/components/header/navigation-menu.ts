export interface MenuItem {
  to: string;
  name: string;
}

export const NAVIGATION_MENU: MenuItem[] = [
  { name: "Overview", to: "/overview" },
  { name: "User", to: "/user" },
  { name: "Alumni", to: "/alumni" },
];
