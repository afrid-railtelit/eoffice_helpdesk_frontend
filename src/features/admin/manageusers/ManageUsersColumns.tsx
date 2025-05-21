;

import { ColumnDef } from "@tanstack/react-table";
import { UserDataType } from "@/types/userDataTypes";
import { formatDateTime } from "@/apputils/appUtils";
import ManageUserActions from "./ManageUserActions";

export const userColumns: ColumnDef<UserDataType>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
  },
  {
    accessorKey: "emailId",
    header: "Email ID",
  },

  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => (
      <p className="flex flex-col ">
        <span>{formatDateTime(row?.getValue("createdAt")).date}</span>
        <span>{formatDateTime(row?.getValue("createdAt")).time}</span>
      </p>
    ),
  },
  {
    accessorKey: "disabled",
    header: "Active status",
    cell: ({ row }) => <ManageUserActions userData={row.original} />,
  },
];
