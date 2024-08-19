export type User = {
  uname: string;
  email: string;
  role: Role;
  id: string;
  cid: string;
};
export interface MenuItem {
  to: string;
  name: string;
}
export type Role = "admin" | "hr" | "employee";
