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
  | "m:jobs:all"
  | "m:jobs:create"
  | "m:jobs:update"
  | "m:jobs:delete"
  | "self";

const PERMISSION_MAP: Record<Role, Array<Permission>> = {
  admin: [
    "read:users",
    "write:users",
    "delete:users",
    "read:alumni",
    "write:alumni",
    "delete:alumni",
    "m:jobs:all",
    "m:jobs:create",
    "m:jobs:update",
    "m:jobs:delete",
  ],
  hr: ["read:alumni", "write:alumni", "delete:alumni"],
  employee: ["self"],
  support: [],
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
