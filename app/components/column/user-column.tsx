import { Edit, MoreHorizontal, Ticket } from "lucide-react";
import { Badge } from "~/components/ui/badge";
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
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { roleColorMapping } from "~/constant";

type User = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: "hr" | "support";
  status: "Active" | "Inactive";
};

export const users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "support",
    department: "Customer Support",
    status: "Active",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Inactive",
  },
  {
    id: "4",
    name: "David Lee",
    email: "david@example.com",
    role: "support",
    department: "Customer Support",
    status: "Active",
  },
  {
    id: "5",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: "6",
    name: "Frank Thomas",
    email: "frank@example.com",
    role: "support",
    department: "Customer Support",
    status: "Inactive",
  },
  {
    id: "7",
    name: "Grace Wilson",
    email: "grace@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: "8",
    name: "Henry Garcia",
    email: "henry@example.com",
    role: "support",
    department: "Customer Support",
    status: "Active",
  },
  {
    id: "9",
    name: "Ivy Martinez",
    email: "ivy@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Inactive",
  },
  {
    id: "10",
    name: "Jack Robinson",
    email: "jack@example.com",
    role: "support",
    department: "Customer Support",
    status: "Active",
  },
  {
    id: "11",
    name: "Kate Adams",
    email: "kate@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: "12",
    name: "Leo Clark",
    email: "leo@example.com",
    role: "support",
    department: "Customer Support",
    status: "Inactive",
  },
  {
    id: "13",
    name: "Mia White",
    email: "mia@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: "14",
    name: "Noah Hall",
    email: "noah@example.com",
    role: "support",
    department: "Customer Support",
    status: "Active",
  },
  {
    id: "15",
    name: "Olivia Harris",
    email: "olivia@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Inactive",
  },
  {
    id: "16",
    name: "Peter King",
    email: "peter@example.com",
    role: "support",
    department: "Customer Support",
    status: "Active",
  },
  {
    id: "17",
    name: "Quinn Young",
    email: "quinn@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: "18",
    name: "Ryan Scott",
    email: "ryan@example.com",
    role: "support",
    department: "Customer Support",
    status: "Inactive",
  },
  {
    id: "19",
    name: "Samantha Green",
    email: "samantha@example.com",
    role: "hr",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: "20",
    name: "Tommy Baker",
    email: "tommy@example.com",
    role: "support",
    department: "Customer Support",
    status: "Active",
  },
];

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const initials = user.name.split(" ").map((e) => e[0]);
      return (
        <div className="flex gap-2 items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="@admin" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </div>
      );
    },
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
          style={{
            color: roleColorMapping[user.role][1],
            background: roleColorMapping[user.role][0],
          }}
        >
          {user.role.toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div
          className={`font-semibold ${
            user.status === "Active" ? "text-green-700" : "text-red-700"
          }`}
        >
          {user.status}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center justify-end gap-4">
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
                    navigator.clipboard.writeText(user.id);
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
