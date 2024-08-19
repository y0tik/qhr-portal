export type User = { uname: string; email: string; role: Role };
export interface MenuItem {
  to: string;
  name: string;
}
export type Role = "admin" | "hr" | "employee";
