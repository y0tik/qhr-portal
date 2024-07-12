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

type Alumni = {
  id: string;
  name: string;
  email: string;
  leavingDte: string;
  joiningDte: string;
  fileCount: number;
};

export const alumni: Alumni[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    leavingDte: "2020-06-15",
    joiningDte: "2015-09-10",
    fileCount: 25,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    leavingDte: "2019-12-31",
    joiningDte: "2014-08-20",
    fileCount: 18,
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    leavingDte: "2021-03-20",
    joiningDte: "2016-11-02",
    fileCount: 30,
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    leavingDte: "2018-07-10",
    joiningDte: "2013-10-15",
    fileCount: 15,
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    leavingDte: "2022-01-05",
    joiningDte: "2017-04-25",
    fileCount: 22,
  },
  {
    id: "6",
    name: "Sarah Martinez",
    email: "sarah.martinez@example.com",
    leavingDte: "2017-11-30",
    joiningDte: "2012-12-01",
    fileCount: 12,
  },
  {
    id: "7",
    name: "Christopher Davis",
    email: "christopher.davis@example.com",
    leavingDte: "2016-09-18",
    joiningDte: "2011-07-05",
    fileCount: 28,
  },
  {
    id: "8",
    name: "Jessica Rodriguez",
    email: "jessica.rodriguez@example.com",
    leavingDte: "2019-02-14",
    joiningDte: "2014-04-12",
    fileCount: 20,
  },
  {
    id: "9",
    name: "Kevin Moore",
    email: "kevin.moore@example.com",
    leavingDte: "2020-11-22",
    joiningDte: "2015-12-30",
    fileCount: 17,
  },
  {
    id: "10",
    name: "Amanda Taylor",
    email: "amanda.taylor@example.com",
    leavingDte: "2018-04-03",
    joiningDte: "2013-06-09",
    fileCount: 23,
  },
];

export const columns: ColumnDef<Alumni>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
    cell: ({ row }) => <UserNameWithAvatar name={row.original.name} />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "fileCount",
    header: "Files",
  },
  {
    accessorKey: "leavingDte",
    header: "Leaving Date",
    cell: ({ row }) => row.original.leavingDte,
  },
  {
    accessorKey: "joiningDte",
    header: "Joining Date",
    cell: ({ row }) => row.original.joiningDte,
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
                    navigator.clipboard.writeText(alumni.id);
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
