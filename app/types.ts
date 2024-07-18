export type User = { username: string; email: string; role: Role };
export type HrUser = {
  id: string;
  username: string;
  email: string;
  company_id: string;
  created_at: string;
  updated_at: string;
};
export type Role = "admin" | "hr" | "employee";
