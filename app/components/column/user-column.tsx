import { Link } from "@remix-run/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Ticket } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { EntityUser } from "~/utils/types";
import { UserNameWithAvatar } from "./common";
import {
  ALUMNUX_USER_UPDATE,
  roleColorMapping,
  TICKETS_ASSIGNED_TO_USER,
} from "~/utils/const";
import { relativeTimeFromNow, capitalize } from "~/utils/utils";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<EntityUser>[] = [
  {
    accessorKey: "username",
    header: "Name",
    enableHiding: false,
    cell: ({ row }) => <UserNameWithAvatar name={row.original.username} />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Badge
          className="text-xs"
          style={{
            color: roleColorMapping[user.role === "hr" ? "hr" : "support"][1],
            background:
              roleColorMapping[user.role === "hr" ? "hr" : "support"][0],
          }}
        >
          {capitalize(user.role)}
        </Badge>
      );
    },
  },
  {
    header: "Last Login",
    cell: ({ row }) => {
      const user = row.original;
      return <div>{relativeTimeFromNow(user.last_login_at)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center justify-end gap-4">
          <Button asChild variant="outline" size="xs">
            <Link to={ALUMNUX_USER_UPDATE(user.id)}>
              <Edit className="size-3.5" />
              <span className="">Edit</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="xs">
            <Link to={TICKETS_ASSIGNED_TO_USER(user.id)}>
              <Ticket className="-rotate-45 size-3.5" />
              <span className="">View Tickets</span>
            </Link>
          </Button>
          <DropdownMenu modal>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="xs">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(String(user.id));
                  } catch (_error) {
                    /* empty */
                  }
                }}
              >
                Copy User ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
