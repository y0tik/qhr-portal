export type User = { username: string; email: string; role: Role };
export type HrUsers = {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
};
export type Role = "admin" | "hr" | "employee";
