import { employeeDataType } from "@/types/employeeDataTypes";
import { ColumnDef } from "@tanstack/react-table";

export const newTicketDialogColumn: ColumnDef<employeeDataType>[] = [
  { accessorKey: "sNo", header: "S No" },
  { accessorKey: "zone", header: "Zone" },
  { accessorKey: "division", header: "Division" },
  { accessorKey: "employeeCode", header: "Employee code" },
  { accessorKey: "employeeName", header: "NAME" },
  { accessorKey: "designation", header: "DESIGNATION" },
  {
    accessorKey: "email",
    header: "Email id",
    cell: ({ row }) => {
      return <p>{row.original.email ? row.original.email : "-"}</p>;
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of birth",
    cell: ({ row }) => {
      return (
        <p>
          {row.original.dateOfBirth
            ? row.original.dateOfBirth.split("T")[0]
            : "-"}
        </p>
      );
    },
  },

  {
    accessorKey: "mobile",
    header: "User Mobile Number",
    cell: ({ row }) => {
      return <p>{row.original.mobile ? row.original.mobile : "-"}</p>;
    },
  },
];
