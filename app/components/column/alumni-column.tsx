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
import type { EntityAlumni } from "~/utils/types";
import { formatDateShort, relativeTimeFromNow } from "~/utils/utils";
import { ALUMNUX_ALUMNI_UPDATE, TICKETS_BY_USER } from "~/utils/const";

export const columns: ColumnDef<EntityAlumni>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
    cell: ({ row }) => {
      const alumni = row.original;
      return <div>{alumni.username}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    header: "Last Login",
    cell: ({ row }) => {
      const alumni = row.original;
      return <div>{relativeTimeFromNow(alumni.last_login_at)}</div>;
    },
  },
  {
    header: "Files",
    accessorFn: (a) => a.fileCount,
  },
  {
    header: "Requests",
    accessorFn: (a) => a.requestCount,
  },
  {
    header: "Leaving Date",
    cell: ({ row }) => formatDateShort(row.original.last_working_date),
  },
  // {
  //   accessorKey: "joiningDte",
  //   header: "Joining Date",
  //   cell: ({ row }) => formatDateShort(row.original.joining_date),
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const alumni = row.original;
      return (
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" size="xs" asChild>
            <Link to={ALUMNUX_ALUMNI_UPDATE(alumni.id)}>
              <Edit className="size-3.5" />
              <span>Edit</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="xs">
            <Link to={TICKETS_BY_USER(alumni.id)}>
              <Ticket className="-rotate-45 size-3.5" />
              <span>View Requests</span>
            </Link>
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
                  } catch (_error) {
                    /* empty */
                  }
                }}
              >
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Reset Password</DropdownMenuItem>
              <DropdownMenuItem>Upload Files</DropdownMenuItem>
              <DropdownMenuItem>Raise Request</DropdownMenuItem>
              <DropdownMenuItem>Archive Account</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
