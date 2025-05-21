import AppDialog from "@/apputils/AppDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DashboardSubmitDialog from "./TicketSubmitDialog";

function ReportsTableActions() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <div>
      <Button
        className="h-7"
        title="Submit"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        Submit
      </Button>
      {openDialog && (
        <AppDialog
          title="Hell owolrd"
          onClose={() => {
            setOpenDialog(false);
          }}
        >
          <DashboardSubmitDialog />
        </AppDialog>
      )}
    </div>
  );
}

export default ReportsTableActions;
