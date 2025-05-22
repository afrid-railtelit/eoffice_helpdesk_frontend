import { DataTable } from "@/components/ui/data-table";
import { useMemo, useState } from "react";
import { ticketsColumns } from "./ticketstable/TicketsColumns";
import TicketsTableToolBar from "./ticketstable/TicketsTableToolBar";
import { Button } from "@/components/ui/button";
import { FaTicketSimple } from "react-icons/fa6";

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
    {
      sNo: 2,
      docketNumber: "15052025/eOffice/01",
      zone: "SCR",
      division: "HO",
      designation: "ISSE",
      name: "MUPPIDI HEMANTHA",
      startDate: "15.05.2025",
      startTime: "09:31",
      endDate: "15.05.2025",
      endTime: "09:42",
      issue: "EMD",
      issueDescription: "Employee transfer",
      issueResolution: "Collected transfer details and forwarded to HRMS",
      issueType: "MINOR",
      status: "RESOLVED",
      userMobileNumber: "8857458568",
      resolvedByHelpdesk: "VAJUBABU",
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 13, // 👈 Set default rows per page here
  });
  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return data.slice(start, end);
  }, [data, pagination]);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full justify-end flex -mt-14">
        <Button><FaTicketSimple />New Ticket</Button>
      </div>
      <div className="">
        <DataTable
          pagination={pagination}
          setPagination={setPagination}
          data={paginatedData}
          columns={ticketsColumns}
          Toolbar={TicketsTableToolBar}
          totalPages={Math.ceil(data?.length / pagination.pageSize)}
        />
      </div>
    </div>
  );
}

export default TicketsMain;
