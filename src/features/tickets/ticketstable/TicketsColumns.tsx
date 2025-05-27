import { ColumnDef } from "@tanstack/react-table";
import { MdVerified } from "react-icons/md";
import { GrCircleAlert } from "react-icons/gr";
import ReportsTableActions from "./TicketsTableActions";
import { ticketDataType } from "@/types/ticketDataType";
import { formatDateTime } from "@/apputils/appUtils";

export const ticketsColumns: ColumnDef<ticketDataType>[] = [
  { accessorKey: "sNo", header: "S No" },
  { accessorKey: "ticketNumber", header: "Docket Number" },
  // { accessorKey: "zone", header: "ZONE" },
  // { accessorKey: "division", header: "DIV" },
  // { accessorKey: "designation", header: "DESIGNATION" },
  { accessorKey: "employeeData.employeeName", header: "NAME" },
  {
    accessorKey: "employeeData.employeeMobile",
    header: "User Mobile Number",
    cell: ({ row }) => {
      return <p>{row?.original?.employeeData?.employeeMobile ?? "-"}</p>;
    },
  },

  { accessorKey: "issueData.issueCode", header: "Issue" },
  { accessorKey: "issueData.issueDescription", header: "Issue Description" },
  {
    accessorKey: "criticalLevel",
    header: "Critical level",
    cell: ({ row }) => (
      <div className="font-semibold">
        {row.getValue("criticalLevel") === "MAJOR" ? (
          <p className="text-destructive">Major</p>
        ) : row.getValue("criticalLevel") === "MINOR" ? (
          <p className="text-orange-400">Minor</p>
        ) : (
          <p className="text-destructive ">Critical</p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "ticketStatus",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("ticketStatus") === "PENDING" ? (
          <div
            title="Pending"
            className="flex gap-1 items-center text-destructive"
          >
            Pending
            <GrCircleAlert className="mt-[0.1rem]" />
          </div>
        ) : row.getValue("ticketStatus") === "INPROGRESS" ? (
          <div
            title="Resolved"
            className="text-yellow-500 gap-1 flex items-center"
          >
            In progress
            <MdVerified />
          </div>
        ) : (
          <div
            title="Resolved"
            className="text-constructive gap-1 flex items-center"
          >
            Resolved
            <MdVerified />
          </div>
        )}
      </div>
    ),
  },
  { accessorKey: "createdBy", header: "Created By" },
  {
    accessorKey: "resolvedBy",
    header: "Resolved By",
    cell: ({ row }) => (
      <div>
        {row.getValue("resolvedBy") ? (
          <p>{row.getValue("resolvedBy")}</p>
        ) : (
          <p>-</p>
        )}
      </div>
    ),
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
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => (
      <p className="flex flex-col ">
        <span>{formatDateTime(row?.getValue("updatedAt")).date}</span>
        <span>{formatDateTime(row?.getValue("updatedAt")).time}</span>
      </p>
    ),
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ReportsTableActions ticketData={row.original} />;
    },
  },
];
