export type User = { username: string; email: string; role: Role };
export type HrUser = {
  id: number;
  username: string;
  email: string;
  company_id: number;
  password: string;
  created_at: string;
  updated_at: string;
};
export type Role = "admin" | "hr" | "employee";
export type AlertProp = { type: "error" | "success"; message: string };
