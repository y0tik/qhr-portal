import type { Role } from "~/utils/types";
import { authenticator } from "./auth.server";
import { redirect } from "@remix-run/react";

export type Permission =
  | "read:users"
  | "write:users"
  | "delete:users"
  | "read:alumni"
  | "write:alumni"
  | "delete:alumni"
  | "overview"
  | "crud:settings/company"
  | "self";

const PERMISSION_MAP: Record<Role, Array<Permission>> = {
  admin: [
    "overview",
    "read:users",
    "write:users",
    "delete:users",
    "crud:settings/company",
  ],
  hr: ["overview", "read:alumni", "write:alumni", "delete:alumni"],
  employee: ["self"],
};

export function hasPermissions(role: Role, permissions: Array<Permission>) {
  return permissions.every((permission) =>
    PERMISSION_MAP[role].includes(permission),
  );
}

export const requirePermission = async (
  request: Request,
  permissions: Array<Permission>,
) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) throw redirect("/login");
  if (!hasPermissions(user.role, permissions)) throw new Error("Unauthorized");
  return user;
};
