/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import ManageEmployeeTableToolbar from "./ManageEmployeeTableToolbar";
import { Button } from "@/components/ui/button";
import { useGetAlUsers } from "@/hooks/userHooks";
import AppSpinner from "@/apputils/AppSpinner";
import { useAppContext } from "@/apputils/AppContext";
import { ColumnFiltersState } from "@tanstack/react-table";
import { employeeColumns } from "./ManageEmployeesColumns";
import { FaUserTie } from "react-icons/fa";
import AddEmployeeDialog from "./AddEmployeeDialog";

function ManageEmployeeMain() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openAddUser, setOpenAdduser] = useState<boolean>(false);
  const { isPending, getUsers, data } = useGetAlUsers();
  const { refresh } = useAppContext();

  useEffect(() => {
    getUsers("", {});
  }, [refresh]);

  return (
    <div>
      <AppSpinner isPending={isPending} />
      <div className="w-full flex justify-end -mt-11">
        <Button
          onClick={() => {
            setOpenAdduser(true);
          }}
        >
          <FaUserTie />
          Add Employee
        </Button>
      </div>
      <DataTable
        data={data?.users ?? []}
        columns={employeeColumns}
        pagination={pagination}
        setPagination={setPagination}
        totalPages={1}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        Toolbar={ManageEmployeeTableToolbar}
      />
      {openAddUser && (
        <AddEmployeeDialog
          onClose={() => {
            setOpenAdduser(false);
          }}
          data={data?.users}
        />
      )}
    </div>
  );
}

export default ManageEmployeeMain;
