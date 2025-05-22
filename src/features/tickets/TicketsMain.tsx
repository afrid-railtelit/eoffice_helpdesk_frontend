/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { ticketsColumns } from "./ticketstable/TicketsColumns";
import TicketsTableToolBar from "./ticketstable/TicketsTableToolBar";
import { Button } from "@/components/ui/button";
import { FaTicketSimple } from "react-icons/fa6";
import NewTicketDialog from "./ticketstable/NewTicketDialog";

function TicketsMain() {
  const data = [
    {
      sNo: 1,
      docketNumber: "07042025/eOffice/10",
      zone: "WR",
      division: "HQ",
      designation: "CCE",
      name: "RAKESH GUPTA",
      startDate: "07.04.2025",
      startTime: "12:53",
      endDate: null,
      endTime: null,
      issue: "FMS",
      issueDescription: "Slowness accessing FMS",
      issueResolution:
        "A ticket has been registered with NIC for quick resolution. ticket #20250405194727485066",
      issueType: "MAJOR",
      status: "PENDING",
      userMobileNumber: "7975610340",
      resolvedByHelpdesk: "ANANDKUMAR",
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [openNewTicket, setOpenNewTikcet] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full justify-end flex -mt-14">
        <Button
          onClick={() => {
            setOpenNewTikcet(true);
          }}
        >
          <FaTicketSimple />
          New Ticket
        </Button>
      </div>
      <div className="">
        <DataTable
          pagination={pagination}
          setPagination={setPagination}
          data={data as any}
          columns={ticketsColumns}
          Toolbar={TicketsTableToolBar}
          totalPages={Math.ceil(data?.length / pagination.pageSize)}
        />
      </div>  
      {openNewTicket && (
        <NewTicketDialog
          onClose={() => {
            setOpenNewTikcet(false);
          }}
        />
      )}
    </div>
  );
}

export default TicketsMain;
