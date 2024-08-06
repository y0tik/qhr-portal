export type User = { uname: string; email: string; role: Role };
export type HrUser = {
  id: number;
  username: string;
  email: string;
  company_id: number;
  password: string;
  created_at: string;
  updated_at: string;
};
export type AlumniUser = {
  id: number;
  username: string;
  email: string;
  company_id: number;
  last_working_date: string;
  joining_date: string;
  created_at: string;
  updated_at: string;
};
export interface MenuItem {
  to: string;
  name: string;
  role: Role[];
}
export type Role = "admin" | "hr" | "employee";
export type Ticket = {
  id: string;
  subject: string;
  description: string;
  category: string;
  subCategory: string;
  created_on: Date;
  created_by: string;
  created_by_img: string;
  assigned_to: string;
  assigned_to_img: string;
  status: "created" | "ongoing" | "not-resolved" | "resolved";
};
export type AlertProp = { type: "error" | "success"; message: string };
