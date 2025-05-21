/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

function ManageUsersTableToolbar({
  table,
  setColumnsToSearch,
}: {
  table: Table<any>;
  setColumnsToSearch: any;
}) {
  const [searchedValue, setSearchedValue] = useState<string>("");
  useEffect(() => {
    setColumnsToSearch(["firstName", "lastName", "mobileNumber", "emailId"]);
  }, []);

  return (
    <div className="flex flex-row items-center gap-3">
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
        onClear={() => {
          setSearchedValue("");
          table.setGlobalFilter("");
        }}
      />
      <Button
        onClick={() => {
          table.setPageIndex(0); // Go to first page
          table.setGlobalFilter(searchedValue);
        }}
        disabled={!searchedValue}
      >
        Search
      </Button>
    </div>
  );
}

export default ManageUsersTableToolbar;
