/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useState } from "react";

function ManageEmployeeTableToolbar({ table }: { table: Table<any> }) {
  const [searchedValue, setSearchedValue] = useState<string>("");
  function handleClear() {
    setSearchedValue("");
    table.getColumn("employeeName")?.setFilterValue("null");
    table.getColumn("designation")?.setFilterValue("clear");
    table.setPageIndex(0);
  }

  return (
    <div className="flex flex-row items-center gap-3 ml-[41vw] pl-2 -mt-[50px]">
      <Input
        icon="search"
        value={searchedValue}
        onChange={(e) => {
          const value = e?.target?.value;
          setSearchedValue(value);
        }}
        about="Search By Employee code,Email id,Name..."
        className="lg:w-[20vw]"
        placeholder="Search By Employee code,Email id,Name..."
        noErrorMessage={true}
        onClear={() => {
          setSearchedValue("");
          table.getColumn("employeeName")?.setFilterValue("null");
          table.setPageIndex(0);
        }}
      />
      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            table.setPageIndex(0);
            table.getColumn("employeeName")?.setFilterValue(searchedValue);
          }}
          disabled={!searchedValue}
        >
          Search
        </Button>
        <Button onClick={handleClear} variant={"ghost"} title="Clear">
          <X />
          Clear
        </Button>
      </div>
    </div>
  );
}

export default ManageEmployeeTableToolbar;
