import { Edit, MoreHorizontal, Ticket, Upload } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { UserNameWithAvatar } from "./common";
import { AlumniUser } from "~/types";

export const columns: ColumnDef<AlumniUser>[] = [
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
  //   accessorKey: "fileCount",
  //   header: "Files",
  // },
  {
    accessorKey: "leavingDte",
    header: "Leaving Date",
    cell: ({ row }) => row.original.last_working_date,
  },
  {
    accessorKey: "joiningDte",
    header: "Joining Date",
    cell: ({ row }) => row.original.joining_date,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const alumni = row.original;
      return (
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-3" />
            <span className="">Upload Files</span>
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-3" />
            <span className="">Edit Details</span>
          </Button>
          <Button variant="outline" size="sm">
            <Ticket className="-rotate-45 h-4 w-4 mr-2" />
            <span className="">View Tickets</span>
          </Button>
          <DropdownMenu>
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
                    navigator.clipboard.writeText(String(alumni.id));
                  } catch (error) {
                    /* empty */
                  }
                }}
              >
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Reset Password</DropdownMenuItem>
              <DropdownMenuItem>Archive Account</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
