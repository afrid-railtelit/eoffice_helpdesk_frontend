import { Button } from "@/components/ui/button";

import { MdEdit } from "react-icons/md";
import { employeeDataType } from "@/types/employeeDataTypes";
import { useState } from "react";
import AddEmployeeDialog from "./AddEmployeeDialog";
interface ManageEmployeeInterface {
  employeeData: employeeDataType;
}

function ManageEmployee({ employeeData }: ManageEmployeeInterface) {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  return (
    <div>
      {/* {<AppSpinner isPending={isPending} />} */}
      <div className="flex flex-row items-center gap-2">
        <Button
          className="h-7"
          onClick={() => {
            setOpenEditDialog(true);
          }}
        >
          <MdEdit />
          Edit
        </Button>
      </div>
      {openEditDialog && (
        <AddEmployeeDialog
          edit={true}
          onClose={() => {
            setOpenEditDialog(false);
          }}
          employeeData={employeeData}
        />
      )}
    </div>
  );
}

export default ManageEmployee;
