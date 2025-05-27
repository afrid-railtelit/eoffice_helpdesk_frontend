import { employeeDataType } from "@/types/employeeDataTypes";
import { ColumnDef } from "@tanstack/react-table";




export const newTicketDialogColumn: ColumnDef<employeeDataType>[] = [
  { accessorKey: "sNo", header: "S No" },
  { accessorKey: "employeeCode", header: "Employee code" },

  { accessorKey: "zone", header: "Zone" },
  { accessorKey: "division", header: "Division" },
  { accessorKey: "designation", header: "DESIGNATION" },
  { accessorKey: "employeeName", header: "NAME" },
  { accessorKey: "dateOfBirth", header: "Date of birth" },

  { accessorKey: "mobile", header: "User Mobile Number" },
  { accessorKey: "email", header: "Email id" },
];

