/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useGetrole } from "@/hooks/appHooks";

function TicketsTableToolBar({ table }: { table: any }) {
  const myRole = useGetrole();
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>(
    myRole === "ADMIN" ? "RESOLVED" : ""
  );
  const [criticalLevel, setCriticalLevel] = useState<string>();

  function handleSearch() {
    table.getColumn("ticketNumber")?.setFilterValue(searchedValue);
    table
      .getColumn("criticalLevel")
      ?.setFilterValue(criticalLevel ? criticalLevel : "null");
    table
      .getColumn("ticketStatus")
      ?.setFilterValue(selectedStatus ? selectedStatus : "null");
    table.setPageIndex(0);
  }

  function handleClear() {
    setSearchedValue("");
    setSelectedStatus("");
    setCriticalLevel("");

    table.getColumn("ticketNumber")?.setFilterValue("null");
    table.getColumn("ticketStatus")?.setFilterValue("null");
    table.getColumn("criticalLevel")?.setFilterValue("null");
    table.getColumn("ticketStatus")?.setFilterValue("clear");
    table.setPageIndex(0);
  }
  function handleInputClear() {
    setSearchedValue("");
    table.getColumn("ticketNumber")?.setFilterValue("null");
    table.setPageIndex(0);
  }
  return (
    <div className="flex flex-row items-center gap-3">
      {myRole !== "ADMIN" && (
        <Input
          icon="search"
          value={searchedValue}
          onChange={(e) => {
            const value = e?.target?.value;
            setSearchedValue(value);
          }}
          about="Search By Email id,Name or Mobile number..."
          className="lg:w-[20vw]"
          placeholder="Search By Email id,Name or Mobile number..."
          noErrorMessage={true}
          onClear={handleInputClear}
        />
      )}
      <Select
        value={selectedStatus}
        onValueChange={(value) => {
          setSelectedStatus(value);
        }}
      >
        <SelectTrigger
          value={selectedStatus}
          about="Select ticket Status"
          className="lg:w-[12vw]"
        >
          <SelectValue placeholder="Select a ticket status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="RESOLVED">Resolved</SelectItem>
          <SelectItem value="INPROGRESS">In progress</SelectItem>
        </SelectContent>
      </Select>

      {myRole !== "ADMIN" && (
        <Select
          onValueChange={(value) => {
            setCriticalLevel(value);
          }}
          value={criticalLevel}
        >
          <SelectTrigger
            value={criticalLevel}
            about="Select critical level"
            className="lg:w-[12vw]"
          >
            <SelectValue placeholder="Select critical level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MINOR">Minor</SelectItem>
            <SelectItem value="MAJOR">Major</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Button onClick={handleSearch} title="Search">
        <RiSearchLine />
        Search
      </Button>

      <Button onClick={handleClear} variant={"ghost"} title="Clear">
        <X />
        Clear
      </Button>
    </div>
  );
}

export default TicketsTableToolBar;
