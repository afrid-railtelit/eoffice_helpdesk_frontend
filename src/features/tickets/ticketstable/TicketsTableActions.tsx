/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TicketSubmitDialog from "./TicketSubmitDialog";
import { ticketDataType } from "@/types/ticketDataType";

interface TicketsTableActionsInterface {
  ticketData: ticketDataType;
}
function TicketsTableActions({ ticketData }: TicketsTableActionsInterface) {
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
        {ticketData?.ticketStatus === "RESOLVED"?"Details":"Submit"}
      </Button>
      {openDialog && (
        <TicketSubmitDialog
          issueData={ticketData?.issueData as never}
          onClose={() => {
            setOpenDialog(false);
          }}
          ticketId={ticketData?.ticketId}
          remarksData={ticketData?.remarks as any}
          ticketNumber={ticketData?.ticketNumber}
          ticketStatus={ticketData?.ticketStatus}
        />
      )}
    </div>
  );
}

export default TicketsTableActions;
