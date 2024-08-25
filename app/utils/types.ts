export type SessionUser = {
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
export type Role = "admin" | "hr" | "employee" | "support";

export type EntityUser = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  last_login_at: string;
  role: Role;
};
