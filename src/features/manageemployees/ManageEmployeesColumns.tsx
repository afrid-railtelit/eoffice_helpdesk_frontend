import { ColumnDef } from "@tanstack/react-table";
import { UserDataType } from "@/types/userDataTypes";
import { formatDateTime } from "@/apputils/appUtils";
import ManageUserActions from "./ManageEmployeeActions";
import { MdVerified } from "react-icons/md";
import { X } from "lucide-react";

export const employeeColumns: ColumnDef<UserDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <p>{row?.original?.firstName + " " + (row?.original?.lastName ?? "")}</p>
    ),
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
    accessorKey: "initialLogin",
    header: "Email verified",
    cell: ({ row }) => {
      return (
        <div>
          {!row?.original?.initialLogin ? (
            <div className="text-constructive flex items-center gap-1">
              Verified <MdVerified className="text-constructive  w-4 h-4" />
            </div>
          ) : (
            <div className="text-destructive flex items-center gap-1">
              Not verified <X className="text-destructive w-4 h-4" />
            </div>
          )}
        </div>
      );
    },
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
    header: "Actions",
    cell: ({ row }) => <ManageUserActions userData={row.original} />,
  },
];
