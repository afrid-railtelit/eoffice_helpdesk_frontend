import { ColumnDef } from "@tanstack/react-table";
import { MdVerified } from "react-icons/md";
import { GrCircleAlert } from "react-icons/gr";
import ReportsTableActions from "./TicketsTableActions";

export type HelpdeskTicket = {
  sNo: number;
  docketNumber: string;
  zone: string;
  division: string;
  designation: string;
  name: string;
  startDate: string;
  startTime: string;
  endDate: string | null;
  endTime: string | null;
  issue: string;
  issueDescription: string;
  issueResolution: string;
  issueType: "MINOR" | "MAJOR" | "CRITICAL";
  status: "PENDING" | "RESOLVED";
  userMobileNumber: string;
  resolvedByHelpdesk: string;
  remarks: string | null;
};

export const ticketsColumns: ColumnDef<HelpdeskTicket>[] = [
  { accessorKey: "sNo", header: "S No" },
  { accessorKey: "docketNumber", header: "Docket Number" },
  // { accessorKey: "zone", header: "ZONE" },
  // { accessorKey: "division", header: "DIV" },
  // { accessorKey: "designation", header: "DESIGNATION" },
  { accessorKey: "name", header: "NAME" },
  { accessorKey: "userMobileNumber", header: "User Mobile Number" },

  { accessorKey: "issue", header: "Issue" },
  // { accessorKey: "issueDescription", header: "Issue Description" },
  // { accessorKey: "issueResolution", header: "Issue Resolution" },
  // {
  //   accessorKey: "issueType",
  //   header: "Issue Type",
  //   cell: ({ row }) => (
  //     <div>
  //       {row.getValue("issueType") === "MAJOR" ? (
  //         <p className="text-destructive">Major</p>
  //       ) : (
  //         <p className="text-orange-400">Minor</p>
  //       )}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("status") === "PENDING" ? (
          <div title="Pending" className="flex items-center text-destructive">
            Pending
            <GrCircleAlert className="mt-[0.1rem]" />
          </div>
        ) : (
          <div title="Resolved" className="text-constructive flex items-center">
            Resolved
            <MdVerified />
          </div>
        )}
      </div>
    ),
  },
  { accessorKey: "resolvedByHelpdesk", header: "Resolved By" },
  { accessorKey: "startDate", header: "Start Date" },
  { accessorKey: "startTime", header: "Start Time" },
  { accessorKey: "endDate", header: "End Date" },
  { accessorKey: "endTime", header: "End Time" },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ReportsTableActions />;
    },
  },
  // { accessorKey: "remarks", header: "Remarks" },
];

//

// import { ColumnDef } from "@tanstack/react-table"

// export type HelpdeskTicket = {
//   sNo: number
//   docketNumber: string
//   zone: string
//   division: string
//   designation: string
//   name: string
//   startDate: string
//   startTime: string
//   endDate: string | null
//   endTime: string | null
//   issue: string
//   issueDescription: string
//   issueResolution: string
//   issueType: "MINOR" | "MAJOR" | "CRITICAL"
//   status: "PENDING" | "RESOLVED"
//   userMobileNumber: string
//   resolvedByHelpdesk: string
//   remarks: string | null
// }

// export const columns: ColumnDef<HelpdeskTicket>[] = [
//   { accessorKey: "sNo", header: "S No" },
//   { accessorKey: "docketNumber", header: "Docket Number" },
//   { accessorKey: "zone", header: "ZONE" },
//   { accessorKey: "division", header: "DIVISION" },
//   { accessorKey: "designation", header: "DESIGNATION" },
//   { accessorKey: "name", header: "NAME" },
//   { accessorKey: "startDate", header: "Start Date" },
//   { accessorKey: "startTime", header: "Start Time" },
//   { accessorKey: "endDate", header: "End Date" },
//   { accessorKey: "endTime", header: "End Time" },
//   { accessorKey: "issue", header: "Issue" },
//   { accessorKey: "issueDescription", header: "Issue Description" },
//   { accessorKey: "issueResolution", header: "Issue Resolution" },
//   {
//     accessorKey: "issueType",
//     header: "Issue Type",
//   },
//   { accessorKey: "status", header: "Status" },
//   { accessorKey: "userMobileNumber", header: "User Mobile Number" },
//   { accessorKey: "resolvedByHelpdesk", header: "Resolved By" },
//   { accessorKey: "remarks", header: "Remarks" },
// ]
