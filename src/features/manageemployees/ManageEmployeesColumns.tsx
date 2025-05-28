import { ColumnDef } from "@tanstack/react-table";
import { employeeDataType } from "@/types/employeeDataTypes";
import ManageEmployee from "./ManageEmployeeActions";

export const employeeColumns: ColumnDef<employeeDataType>[] = [
  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "division",
    header: "Division",
  },

  {
    accessorKey: "employeeName",
    header: "Employee name",
  },

  {
    accessorKey: "employeeCode",
    header: "Employee code",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "email",
    header: "Email ID",
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
    header: "Mobile Number",
    cell: ({ row }) => {
      return <p>{row.original.mobile ? row.original.mobile : "-"}</p>;
    },
  },

  {
    accessorKey: "disabled",
    header: "Actions",
    cell: ({ row }) => <ManageEmployee employeeData={row.original} />,
  },

];
