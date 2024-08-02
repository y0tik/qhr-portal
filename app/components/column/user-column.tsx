import { Link } from "@remix-run/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Ticket } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { HrUser } from "~/types";
import { UserNameWithAvatar } from "./common";

export const columns: ColumnDef<HrUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
    cell: ({ row }) => <UserNameWithAvatar name={row.original.username} />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   accessorKey: "role",
  //   header: "Role",
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     return (
  //       <Badge
  //         style={{
  //           color: roleColorMapping[user.role][1],
  //           background: roleColorMapping[user.role][0],
  //         }}
  //       >
  //         {user.role.toUpperCase()}
  //       </Badge>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     return (
  //       <div
  //         className={`font-semibold ${
  //           user.status === "Active" ? "text-green-700" : "text-red-700"
  //         }`}
  //       >
  //         {user.status}
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center justify-end gap-4">
          <Button asChild variant="outline" size="sm">
            <Link to={`/user/update/${user.id}`}>
              <Edit className="mr-3 h-4 w-4" />
              <span className="">Edit</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Ticket className="-rotate-45 mr-2 h-4 w-4" />
            <span className="">View Tickets</span>
          </Button>
          <DropdownMenu modal>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
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
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
