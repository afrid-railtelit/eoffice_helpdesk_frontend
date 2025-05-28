/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import ManageEmployeeTableToolbar from "./ManageEmployeeTableToolbar";
import { Button } from "@/components/ui/button";
import AppSpinner from "@/apputils/AppSpinner";
import { useAppContext } from "@/apputils/AppContext";
import { ColumnFiltersState } from "@tanstack/react-table";
import { employeeColumns } from "./ManageEmployeesColumns";
import { FaUserTie } from "react-icons/fa";
import AddEmployeeDialog from "./AddEmployeeDialog";
import { useGetAllEmployees } from "@/hooks/employeeHooks";
import { useGetZonesData } from "@/hooks/userHooks";
import SearchableSelect, {
  searchableSelectDataType,
} from "@/apputils/SearchableSelect";
import { divisionDataType, zoneDataType } from "@/types/userDataTypes";

function ManageEmployeeMain() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openAddUser, setOpenAdduser] = useState<boolean>(false);
  const { refresh } = useAppContext();
  const { isPending, getAllEmployees, data } = useGetAllEmployees();
  const {
    getZonesData,
    isPending: gettingZonesData,
  } = useGetZonesData();
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [divisionsData, setDivisionsData] = useState<divisionDataType[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [divisionClear, setDivisionClear] = useState<boolean>(false);
  const [zoneClear, setZoneClear] = useState<boolean>(false);
  const [searchedValue, setSearchedValue] = useState<string>("");
  const { zonesData: zonesMainData } = useAppContext();

  useEffect(() => {
    if (selectedDivision && selectedZone) {
      getAllEmployees({
        pagination,
        zone: selectedZone,
        division: selectedDivision,
        searchValue: searchedValue.trim(),
      });
    }
    if (zonesMainData?.length === 0) {
      getZonesData();
    }
  }, [refresh, selectedZone, selectedDivision, pagination, searchedValue]);

  useEffect(() => {
    handleColumnFilters(columnFilters);
  }, [columnFilters]);

  function handleColumnFilters(value: any) {
    for (let index = 0; index < value?.length; index++) {
      if (value[index]?.id === "employeeName") {
        setSearchedValue(
          value[index]?.value !== "null" ? value[index]?.value : ""
        );
      }

      else if (value[index]?.id === "designation") {
        if (value[index]?.value === "clear") {
          setSelectedDivision("");
          setSelectedZone("");
          setDivisionClear(true);
          setZoneClear(true);
          setTimeout(() => {
            setDivisionClear(false);
            setZoneClear(false);
          }, 50);
        }
      }
    }
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
    <div className="relative">
      <AppSpinner isPending={isPending || gettingZonesData} />
      <div className="flex items-center gap-3">
        <SearchableSelect
        clear={zoneClear}
          mandatory
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
        {selectedZone && (
          <SearchableSelect
            mandatory
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
        )}
      </div>
      <div className="w-full flex justify-end absolute -top-12 right-1">
        <Button
          onClick={() => {
            setOpenAdduser(true);
          }}
        >
          <FaUserTie />
          Add Employee
        </Button>
      </div>
      {selectedZone && selectedDivision && (
        <DataTable
          data={data?.employees ?? []}
          columns={employeeColumns}
          pagination={pagination}
          setPagination={setPagination}
          totalPages={Math.ceil(data?.totalCount / pagination.pageSize)}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          Toolbar={ManageEmployeeTableToolbar}
          manualFiltering={true}
        />
      )}
      {openAddUser && (
        <AddEmployeeDialog
          onClose={() => {
            setOpenAdduser(false);
          }}
          data={data?.employees}
        />
      )}
    </div>
  );
}

export default ManageEmployeeMain;
