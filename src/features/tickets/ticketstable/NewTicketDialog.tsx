/* eslint-disable @typescript-eslint/no-explicit-any */
import AppDialog from "@/apputils/AppDialog";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";

import { X } from "lucide-react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { newTicketDialogColumn } from "./newticketdialog/NewTicketDialogColumns";
import { ColumnFilter } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewTicketDialogInterface {
  onClose: () => void;
}
function NewTicketDialog({ onClose }: NewTicketDialogInterface) {
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 1,
  });
  const [data, setData] = useState<any>();
  const [selectedStatus, setSelectedStatus] = useState<string>("");


  return (
    <div>
      {/* {<AppSpinner isPending={isPending} />} */}
      <AppDialog onClose={onClose} placement="CENTER" title="New Ticket">
        <div className="min-h-[50vh] min-w-[50vw]">
          <div className="flex items-center gap-3">
            <div className="lg:w-[20vw]">
              <Input
                className="lg:w-[20vw]"
                icon="search"
                value={searchedValue}
                onChange={(e) => {
                  const value = e?.target?.value;
                  setSearchedValue(value);
                }}
                onClear={() => {
                  setSearchedValue("");
                }}
                noErrorMessage={true}
                about="Search by Employee Code "
                placeholder="Search by Employee Code "
              />
            </div>
            <Button
              title="Search"
              onClick={() => {
                setData([
                  {
                    sNo: 1,
                    zone: "CR",
                    division: "SCR HQ",
                    designation: "JR CLERK",
                    name: "David",
                    userMobileNumber: 93905579289,
                  },
                ]);
              }}
            >
              <RiSearchLine />
              Search
            </Button>
            <Button variant={"ghost"} title="Clear">
              <X />
              Clear
            </Button>
          </div>
          <div>
            {data && (
              <div className="flex flex-col gap-4">
                <DataTable
                  columns={newTicketDialogColumn}
                  totalPages={1}
                  pagination={pagination}
                  setPagination={setPagination}
                  data={data}
                  columnFilters={columnFilters}
                  setColumnFilters={setColumnFilters}
                />
                <div>
                  <Select
                    onValueChange={(value) => {
                      setSelectedStatus(value);
                    }}
                  >
                    <SelectTrigger
                      value={selectedStatus}
                      about="Issue type"
                      className="lg:w-[20vw]"
                    >
                      <SelectValue placeholder="Select Issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Issue Category</SelectLabel>
                        <SelectItem value="PENDING">Minor</SelectItem>
                        <SelectItem value="RESOLVED">Major</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </AppDialog>
    </div>
  );
}

export default NewTicketDialog;

{
  //     import SearchableSelect from "@/apputils/SearchableSelect";
  // import { useGetZonesData } from "@/hooks/userHooks";
  // import { zoneDataType } from "@/types/userDataTypes";
  // const { getZonesData, data, isPending } = useGetZonesData();
  //   const [selectedZoneData, setSelectedZoneData] = useState<zoneDataType>();
  //   useEffect(() => {
  //     getZonesData();
  //   }, []);
  /* <div className="flex flex-col gap-4">
              <SearchableSelect
                onSelect={() => {}}
                label="Select Zone"
                data={data?.zones.map((item: zoneDataType) => {
                  return {
                    key: item?.zoneCode + " - " + item?.zoneName,
                    value: item?.zoneCode,
                  };
                })}
              />

              <SearchableSelect
                onSelect={() => {}}
                label="Select Division"
                data={data?.zones.map((item: zoneDataType) => {
                  return {
                    key: item?.zoneCode + " - " + item?.zoneName,
                    value: item?.zoneCode,
                  };
                })}
              />
            </div> */
}
