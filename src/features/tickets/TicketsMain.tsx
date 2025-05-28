/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { ticketsColumns } from "./ticketstable/TicketsColumns";
import TicketsTableToolBar from "./ticketstable/TicketsTableToolBar";
import { Button } from "@/components/ui/button";
import { FaTicketSimple } from "react-icons/fa6";
import NewTicketDialog from "./ticketstable/NewTicketDialog";
import { useGetAllTickets } from "@/hooks/userHooks";
import AppSpinner from "@/apputils/AppSpinner";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useAppContext } from "@/apputils/AppContext";
import { useGetrole } from "@/hooks/appHooks";
import { FaFileDownload } from "react-icons/fa";
import { ticketDataType, ticketRemarkDataType } from "@/types/ticketDataType";

function TicketsMain() {
  const { getAllTickets, isPending, data: ticketsData } = useGetAllTickets();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const myRole = useGetrole();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openNewTicket, setOpenNewTikcet] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(
    myRole === "ADMIN" ? "RESOLVED" : ""
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [criticalLevel, setCriticalLevel] = useState<string>("");
  const { refresh } = useAppContext();

  useEffect(() => {
    getAllTickets({
      pagination,
      status,
      searchValue,
      criticalLevel,
    });
  }, [status, searchValue, refresh, criticalLevel]);

  useEffect(() => {
    handleColumnFilters(columnFilters);
  }, [columnFilters]);

  function handleColumnFilters(value: any) {
    for (let index = 0; index < value?.length; index++) {
      if (value[index]?.id === "ticketNumber") {
        setSearchValue(
          value[index]?.value !== "null" ? value[index]?.value : ""
        );
      } else if (value[index]?.id === "criticalLevel") {
        setCriticalLevel(
          value[index]?.value !== "null" ? value[index]?.value : ""
        );
      } else if (value[index]?.id === "ticketStatus") {
        setStatus(
          value[index]?.value !== "null" && value[index]?.value !== "clear"
            ? value[index]?.value
            : ""
        );
      }
    }
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
  }
  function exportToCSV(tickets: ticketDataType[], filename = "tickets.csv") {
    if (!tickets.length) return;

    const headers = [
      "S No",
      "Docket Number",
      "ZONE",
      "DIVISION",
      "DESIGNATION",
      "NAME",
      "START DATE",
      "START TIME",
      "END DATE",
      "END TIME",
      "ISSUE",
      "ISSUE DESCRIPTION",
      "ISSUE RESOLUTION",
      "ISSUE TYPE OF CATEGORY MINOR/MAJOR/CRITICAL",
      "STATUS",
      "USER MOBILE NUMBER",
      "RESOLVED BY HELPDESK",
      "REMARKS",
    ];

    const rows = tickets.map((ticket, index) => {
      const {
        employeeData,
        issueData,
        createdAt,
        updatedAt,
        ticketNumber,
        ticketStatus,
        resolvedBy,
        criticalLevel,
        remarks,
      } = ticket;
      const startDate = createdAt.split("T")[0];
      const startTime = createdAt.split("T")[1]?.slice(0, 5) || "";
      const endDate = updatedAt.split("T")[0];
      const endTime = updatedAt.split("T")[1]?.slice(0, 5) || "";

      return [
        index + 1,
        ticketNumber,
        employeeData.zone,
        employeeData.division,
        employeeData.designation,
        employeeData.employeeName,
        startDate,
        startTime,
        endDate,
        endTime,
        issueData.issueCode,
        issueData.issueDescription,
        issueData.issueResolution,
        criticalLevel,
        ticketStatus,
        employeeData.employeeMobile,
        resolvedBy || "",
        remarks
          .map((r: ticketRemarkDataType, i: number) => `${i + 1}. ${r.remark}`)
          .join(", "),
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`) // Escape quotes
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-5">
      {<AppSpinner isPending={isPending} />}
      {myRole === "EMPLOYEE" && (
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
      )}

      {myRole === "ADMIN" && (
        <div className="w-full justify-end flex -mt-14">
          <Button
            disabled={ticketsData?.tickets?.data?.length === 0}
            onClick={() => {
              exportToCSV(ticketsData?.tickets?.data, "employees.csv");
            }}
          >
            <FaFileDownload />
            Downlaod report
          </Button>
        </div>
      )}

      <div className="">
        <DataTable
          pagination={pagination}
          setPagination={setPagination}
          data={ticketsData?.tickets?.data ?? ([] as any)}
          columns={ticketsColumns}
          Toolbar={TicketsTableToolBar}
          totalPages={Math.ceil(
            ticketsData?.tickets?.total / pagination.pageSize
          )}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          manualFiltering={true}
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
