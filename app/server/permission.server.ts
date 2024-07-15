import { Role } from "~/types";

export type Permission =
  | "read:users"
  | "write:users"
  | "delete:users"
  | "read:alumni"
  | "write:alumni"
  | "delete:alumni";

const PERMISSION_MAP: Record<Role, Array<Permission>> = {
  admin: ["read:users", "write:users", "delete:users"],
  hr: ["read:alumni", "write:alumni", "delete:alumni"],
  employee: [],
};

export function hasPermissions(role: Role, permissions: Array<Permission>) {
  return permissions.every((permission) =>
    PERMISSION_MAP[role].includes(permission)
  );
}
