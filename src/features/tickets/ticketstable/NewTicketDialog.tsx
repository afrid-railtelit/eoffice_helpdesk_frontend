/* eslint-disable @typescript-eslint/no-explicit-any */
import AppDialog from "@/apputils/AppDialog";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useGetEmployeeDetails, useGetIssuesData } from "@/hooks/employeeHooks";
import AppSpinner from "@/apputils/AppSpinner";
import { employeeDataType } from "@/types/employeeDataTypes";
import SearchableSelect, {
  searchableSelectDataType,
} from "@/apputils/SearchableSelect";
import { useAppContext } from "@/apputils/AppContext";
import { LuAsterisk } from "react-icons/lu";
import { useGetZonesData, useRaiseNewTicket } from "@/hooks/userHooks";
import { useGetEmailId } from "@/hooks/appHooks";
import { divisionDataType, zoneDataType } from "@/types/userDataTypes";

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

  const { getEmployeeDetails, isPending } = useGetEmployeeDetails();
  const { issuesData } = useAppContext();

  const [selectIssueType, setSelectedIssueType] = useState<any>();
  const [selectedIssueCriticalLevel, setSelectedIssueCriticalLevel] =
    useState<string>("");
  const [issueCriticalLevelError, setIssueCriticalLevelError] =
    useState<string>("");
  const [issueTypeError, setIssueTypeError] = useState<string>("");
  const { isPending: raisingNewTicket, raiseNewTicket } = useRaiseNewTicket();
  const myEmailId = useGetEmailId();
  const { dispatch, zonesData } = useAppContext();
  const { getZonesData, isPending: gettingZonesData } = useGetZonesData();
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [divisionsData, setDivisionsData] = useState<divisionDataType[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [divisionClear, setDivisionClear] = useState<boolean>(false);
  const [zoneClear, setZoneClear] = useState<boolean>(false);
  const { zonesData: zonesMainData } = useAppContext();
  const { getIssuesData, isPending: gettingIssueData } = useGetIssuesData();

  useEffect(() => {
    if (zonesData?.length === 0) {
      getZonesData();
    }
    if (issuesData?.length === 0) getIssuesData();
  }, []);

  function handleGetEmployeeDetails() {
    if (searchedValue) {
      getEmployeeDetails(
        {
          value: searchedValue?.trim(),
          zone: selectedZone,
          division: selectedDivision,
        },
        {
          onSuccess(data) {
            setData(data?.employee);
          },
        }
      );
    }
  }

  function handleSelectIssueType(item: searchableSelectDataType) {
    const issueCode = item.key.trim().split("-")[0];
    const issueDescription = item.key.trim().split("-")[1];
    setSelectedIssueType({
      issueCode: issueCode?.trim(),
      issueDescription,
      issueId: item?.value,
    });
    setIssueTypeError("");
  }

  function handleRaiseTicket() {
    if (!selectedIssueCriticalLevel) {
      setIssueCriticalLevelError("Please select issue critical level");
    }
    if (!selectIssueType) {
      setIssueTypeError("Please select issue type");
    }
    if (selectedIssueCriticalLevel && selectIssueType) {
      raiseNewTicket(
        {
          employeeCode: data[0]?.employeeCode,
          criticalLevel: selectedIssueCriticalLevel,
          issueId: selectIssueType?.issueId,
          emailId: myEmailId,
        },
        {
          onSuccess(data) {
            if (data?.data === "SUCCESS") {
              dispatch({
                type: "setRefresh",
                payload: "",
              });
              onClose();
            }
          },
        }
      );
    }
  }
  function handleClear() {
    setSelectedIssueType(undefined);
    setIssueCriticalLevelError("");
    setIssueTypeError("");
    setSelectedIssueCriticalLevel("");
    setData(undefined);
    setSearchedValue("");

    setZoneClear(true);
    setDivisionClear(true);
    setSelectedDivision("");
    setSelectedZone("");
    setTimeout(() => {
      setZoneClear(false);
      setDivisionClear(false);
    }, 50);
  }

  function handleZoneSelectDataType(item: searchableSelectDataType) {
    const zoneCode = item.value.split("#");
    for (let index = 0; index < zonesMainData?.length; index++) {
      if (zonesMainData[index].id === zoneCode[0]) {
        setDivisionsData(zonesMainData[index]?.divisions);
      }
    }
    setSelectedZone(zoneCode[1]);
    setSelectedDivision("");
    setDivisionClear(true);
    setTimeout(() => {
      setDivisionClear(false);
    }, 50);
  }

  return (
    <div>
      {
        <AppSpinner
          isPending={
            isPending ||
            raisingNewTicket ||
            gettingZonesData ||
            gettingIssueData
          }
        />
      }
      <AppDialog onClose={onClose} placement="CENTER" title="New Ticket">
        <div className=" min-w-[70vw]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <SearchableSelect
                clear={zoneClear}
                onSelect={handleZoneSelectDataType}
                label="Select Zone"
                data={zonesMainData?.map((item: zoneDataType) => {
                  return {
                    key: item?.zoneCode + " - " + item?.zoneName,
                    value: item?.id + "#" + item.zoneCode,
                  };
                })}
                icon="zone"
              />
              <SearchableSelect
                clear={divisionClear}
                isDisabled={!selectedZone}
                onSelect={(item) => {
                  setSelectedDivision(item?.value);
                }}
                label="Select Division"
                data={divisionsData?.map((item: divisionDataType) => {
                  return {
                    key: item?.divisionCode + " - " + item?.divisionName,
                    value: item?.divisionCode,
                  };
                })}
                icon="division"
              />
            </div>

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
                  setSelectedIssueType(undefined);
                  setIssueCriticalLevelError("");
                  setIssueTypeError("");
                  setSelectedIssueCriticalLevel("");
                  setData(undefined);
                  setSearchedValue("");
                }}
                noErrorMessage={true}
                about="Search by Employee Code or Email "
                placeholder="Search by Employee Code or Email "
              />
            </div>
            <Button
              title="Search"
              disabled={!searchedValue}
              onClick={handleGetEmployeeDetails}
            >
              <RiSearchLine />
              Search
            </Button>
            <Button onClick={handleClear} variant={"ghost"} title="Clear">
              <X />
              Clear
            </Button>
          </div>
          <div>
            {data && searchedValue && (
              <div className="flex flex-col gap-4 mt-4">
                <DataTable
                  columns={newTicketDialogColumn}
                  totalPages={1}
                  pagination={pagination}
                  setPagination={setPagination}
                  data={data?.map((item: employeeDataType, index: number) => {
                    return {
                      ...item,
                      sNo: index + 1,
                    };
                  })}
                  columnFilters={columnFilters}
                  setColumnFilters={setColumnFilters}
                />
                <div className="flex flex-row items-center gap-5 ">
                  <div className="flex flex-col h-14">
                    <div className="flex flex-row items-center ">
                      <Select
                        onValueChange={(value) => {
                          setIssueCriticalLevelError("");
                          setSelectedIssueCriticalLevel(value);
                        }}
                      >
                        <SelectTrigger
                          value={selectedIssueCriticalLevel}
                          about="Issue critical Level"
                          className="lg:w-[20vw] text-xs min-h-10 "
                        >
                          <SelectValue placeholder="Select critical Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Issue critical Level</SelectLabel>
                            <SelectItem value="MINOR">Minor</SelectItem>
                            <SelectItem value="MAJOR">Major</SelectItem>
                            <SelectItem value="CRITICAL">Critical</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <span className="w-3 h-3">
                        <LuAsterisk className="w-3  h-3  text-destructive" />
                      </span>
                    </div>
                    {
                      <p className="text-destructive ml-[0.1rem] ">
                        {
                          <label className="text-xs">
                            {issueCriticalLevelError}
                          </label>
                        }
                      </p>
                    }
                  </div>

                  <div className="flex flex-col h-14">
                    <div className="flex flex-row items-center">
                      <SearchableSelect
                        onSelect={handleSelectIssueType}
                        label="Select issue type"
                        data={issuesData?.map((item) => {
                          return {
                            key:
                              item?.issueCode + " - " + item?.issueDescription,
                            value: item?.id,
                          };
                        })}
                      />
                      <span className="w-3 h-3">
                        <LuAsterisk className="w-3  h-3  text-destructive" />
                      </span>
                    </div>
                    {
                      <p className="text-destructive ml-[0.1rem] ">
                        {<label className="text-xs">{issueTypeError}</label>}
                      </p>
                    }
                  </div>
                </div>
                <div className="w-full flex justify-center ">
                  <Button
                    onClick={handleRaiseTicket}
                    className="px-10 py-6"
                    variant={"destructive"}
                  >
                    Raise ticekt
                  </Button>
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
