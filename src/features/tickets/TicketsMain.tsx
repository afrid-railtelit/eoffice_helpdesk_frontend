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

function TicketsMain() {
  const { getAllTickets, isPending, data: ticketsData } = useGetAllTickets();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openNewTicket, setOpenNewTikcet] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
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
          value[index]?.value !== "null" ? value[index]?.value : ""
        );
      }
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {<AppSpinner isPending={isPending} />}
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
          data={ticketsData?.tickets?.data ?? ([] as any)}
          columns={ticketsColumns}
          Toolbar={TicketsTableToolBar}
          totalPages={Math.ceil(
            ticketsData?.tickets?.total?.length / pagination.pageSize
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
