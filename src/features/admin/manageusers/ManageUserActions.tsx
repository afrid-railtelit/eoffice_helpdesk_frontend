import { Button } from "@/components/ui/button";
import { UserDataType } from "@/types/userDataTypes";
import { useEffect, useState } from "react";
import { FiCheck, FiSlash } from "react-icons/fi";
import ConfirmActionDialog from "./ConfirmActionDialog";
import { useDisableOrEnableUser } from "@/hooks/userHooks";
import AppSpinner from "@/apputils/AppSpinner";
import { useAppContext } from "@/apputils/AppContext";
import { MdEdit } from "react-icons/md";
import AddUserDialog from "./AddUserDialog";
interface ManageUserActionsInterface {
  userData: UserDataType;
}

function ManageUserActions({ userData }: ManageUserActionsInterface) {
  const [openActionDialog, setOpenActionDialog] = useState<boolean>(false);
  const [actionMethod, setActionMethod] = useState<
    "disable" | "enable" | undefined
  >();
  const { editUser, isPending } = useDisableOrEnableUser();
  const { dispatch } = useAppContext();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  useEffect(() => {
    if (actionMethod) {
      setOpenActionDialog(true);
    }
  }, [actionMethod]);

  function handleCloseDialog() {
    setOpenActionDialog(false);
    setActionMethod(undefined);
  }
  function onConfirmAction() {
    editUser(
      {
        emailId: userData?.emailId,
        disabled: actionMethod === "disable" ? true : false,
        method:"enable"
      },
      {
        onSuccess(data) {
          if (data?.data === "SUCCESS") {
            handleCloseDialog();
          }
          dispatch({
            type: "setRefresh",
            payload: "",
          });
        },
      }
    );
  }

  return (
    <div>
      {<AppSpinner isPending={isPending} />}
      <div className="flex flex-row items-center gap-2">
        {!userData?.disabled ? (
          <Button
            onClick={() => {
              setActionMethod("disable");
            }}
            className="h-7 flex items-center gap-1"
            variant="constructive"
          >
            <FiCheck size={16} /> Enabled
          </Button>
        ) : (
          <Button
            onClick={() => {
              setActionMethod("enable");
            }}
            className="h-7 flex items-center gap-1"
            variant="destructive"
          >
            <FiSlash size={16} /> Disabled
          </Button>
        )}
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
      {openActionDialog && actionMethod && (
        <ConfirmActionDialog
          onConfirm={onConfirmAction}
          user={userData}
          action={actionMethod}
          onClose={handleCloseDialog}
        />
      )}
      {openEditDialog && (
        <AddUserDialog
          onClose={() => {
            setOpenEditDialog(false);
          }}
          edit={true}
          userData={userData}
        />
      )}
    </div>
  );
}

export default ManageUserActions;
