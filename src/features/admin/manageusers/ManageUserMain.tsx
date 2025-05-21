/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/ui/data-table";
import { userColumns } from "./ManageUsersColumns";
import { useEffect, useState } from "react";
import ManageUsersTableToolbar from "./ManageUsersTableToolbar";
import { Button } from "@/components/ui/button";
import { FiUserPlus } from "react-icons/fi";
import AddUserDialog from "./AddUserDialog";
import { useGetAlUsers } from "@/hooks/userHooks";
import AppSpinner from "@/apputils/AppSpinner";
import { useAppContext } from "@/apputils/AppContext";
import { ColumnFiltersState } from "@tanstack/react-table";

function ManageUserMain() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openAddUser, setOpenAdduser] = useState<boolean>(false);
  const { isPending, getUsers ,data} = useGetAlUsers();
  const { refresh } = useAppContext();

  useEffect(() => {
    getUsers( "", {
    });
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
          <FiUserPlus />
          Add User
        </Button>
      </div>
      <DataTable
        data={data?.users ?? []}
        columns={userColumns}
        pagination={pagination}
        setPagination={setPagination}
        totalPages={1}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        Toolbar={ManageUsersTableToolbar}
      />
      {openAddUser && (
        <AddUserDialog
          onClose={() => {
            setOpenAdduser(false);
          }}
        />
      )}
    </div>
  );
}

export default ManageUserMain;
