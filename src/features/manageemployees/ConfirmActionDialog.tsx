import AppDialog from "@/apputils/AppDialog";
import { Button } from "@/components/ui/button";
import { UserDataType } from "@/types/userDataTypes";
import { X } from "lucide-react";
import { MdCheck } from "react-icons/md";

interface ConfirmActionDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  action: "disable" | "enable" | "delete";
  user: UserDataType;
}

const actionLabels: Record<string, { label: string; destructive: boolean }> = {
  disable: { label: "Disable User", destructive: true },
  enable: { label: "Enable User", destructive: false },
  delete: { label: "Delete User", destructive: true },
};

export default function ConfirmActionDialog({
  onClose,
  onConfirm,
  action,
  user,
}: ConfirmActionDialogProps) {
  const { label, destructive } = actionLabels[action];

  return (
    <AppDialog title={label} onClose={onClose} placement="CENTER">
      <div className="flex flex-col gap-4">
        <p>
          Are you sure you want to <strong>{action}</strong> the following user?
        </p>

        <div className="border rounded-md p-3 bg-gray-50">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName || ""}
          </p>
          <p>
            <strong>Email:</strong> {user.mobileNumber}
          </p>
          {user.mobileNumber && (
            <p>
              <strong>Mobile:</strong> {user.mobileNumber}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt- ml-2">
          <Button variant="ghost" onClick={onClose} className="w-1/2">
            <X />
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant={destructive ? "destructive" : "constructive"}
            className="w-1/2"
          >
            <MdCheck /> Confirm
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
