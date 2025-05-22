import { ColumnDef } from "@tanstack/react-table";


export type HelpdeskTicket = {
  sNo: number;
  zone: string;
  division: string;
  designation: string;
  name: string;
  userMobileNumber: string;
};

export const newTicketDialogColumn: ColumnDef<HelpdeskTicket>[] = [
  { accessorKey: "sNo", header: "S No" },
  { accessorKey: "zone", header: "ZONE" },
  { accessorKey: "division", header: "DIV" },
  { accessorKey: "designation", header: "DESIGNATION" },
  { accessorKey: "name", header: "NAME" },
  { accessorKey: "userMobileNumber", header: "User Mobile Number" },
];

