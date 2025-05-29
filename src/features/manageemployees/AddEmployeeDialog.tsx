/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppContext } from "@/apputils/AppContext";
import AppDialog from "@/apputils/AppDialog";
import AppSpinner from "@/apputils/AppSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetZonesData } from "@/hooks/userHooks";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { RiUserAddLine } from "react-icons/ri";
import {
  divisionDataType,
  UserDataType,
  zoneDataType,
} from "@/types/userDataTypes";
import CsvReader from "@/apputils/CsvReader";
import { useEffect, useState } from "react";
import SearchableSelect, {
  searchableSelectDataType,
} from "@/apputils/SearchableSelect";
import { useAddEmployee, useEditEmployee } from "@/hooks/employeeHooks";
import { employeeDataType } from "@/types/employeeDataTypes";

interface AddEmployeeDialogInterface {
  onClose: () => void;
  edit?: boolean;
  employeeData?: employeeDataType;
  data?: UserDataType[];
}
function AddEmployeeDialog({
  onClose,
  edit,
  employeeData,
  data,
}: AddEmployeeDialogInterface) {
  const { handleSubmit, register, formState, watch, setValue } = useForm({
    defaultValues: {
      employeeCode: employeeData ? employeeData?.employeeCode : "",
      employeeDesignation: employeeData ? employeeData?.designation : "",
      employeeName: employeeData ? employeeData?.employeeName : "",
      employeeEmail: employeeData ? employeeData?.email : "",
      employeeMobile: employeeData ? employeeData?.mobile : "",
      employeeOrganisationUnit: employeeData
        ? employeeData?.organisationUnit
        : "",
      employeeDataOfBirth: employeeData
        ? employeeData?.dateOfBirth.split("T")[0]
        : "",
      employeePost: employeeData ? employeeData?.post : "",
      division: employeeData ? employeeData?.division : "",
      zone: employeeData ? employeeData?.zone : "",
    },
  });
  const { errors } = formState;

  const { addEmployee, isPending } = useAddEmployee();

  const { dispatch, zonesData: zonesMainData } = useAppContext();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileData, setFileData] = useState([]);
  const { getZonesData, isPending: gettingZonesData } = useGetZonesData();
  const [selectedZone, setSelectedZone] = useState<searchableSelectDataType>();
  const [divisionsData, setDivisionsData] = useState<divisionDataType[]>([]);
  const [selectedDivision, setSelectedDivision] =
    useState<searchableSelectDataType>();
  const [divisionClear, setDivisionClear] = useState<boolean>(false);
  const { editEmployee, isPending: editEmployeePending } = useEditEmployee();

  useEffect(() => {
    if (edit && employeeData) {
      setSelectedDivision(employeeData?.division as any);
      setSelectedZone(employeeData?.zone as any);
      setValue("zone", employeeData?.zone);
      setValue("division", employeeData?.division);
      for (let index = 0; index < zonesMainData?.length; index++) {
        if (
          zonesMainData[index]?.zoneCode?.trim()?.toLowerCase() ===
          employeeData?.zone?.trim()?.toLowerCase()
        ) {
          setDivisionsData(zonesMainData[index]?.divisions);
        }
      }
    }

    if (zonesMainData?.length === 0) getZonesData();
  }, [edit]);

  function handleZoneSelectDataType(item: searchableSelectDataType) {
    for (let index = 0; index < zonesMainData?.length; index++) {
      if (zonesMainData[index].zoneCode?.trim() === item?.value) {
        console.log(zonesMainData[index])
        setDivisionsData(zonesMainData[index]?.divisions);
      }
    }
    setValue("zone", item?.value);
    setSelectedZone(item);
    setSelectedDivision(undefined);
    setDivisionClear(true);
    setTimeout(() => {
      setDivisionClear(false);
    }, 50);
  }

  function handleAddUser(e: any) {
    if (!edit)
      addEmployee(
        {
          ...e,
          employees: fileData,
        },
        {
          onSuccess() {
            dispatch({
              type: "setRefresh",
              payload: "",
            });
            onClose();
          },
        }
      );
    else {
      {
        editEmployee(
          {
            ...e,
          },
          {
            onSuccess(data) {
              if (data?.data === "SUCCESS") {
                onClose();
              }
              dispatch({
                type: "setRefresh",
                payload: "",
              });
            },
          }
        );
      }
    }
  }

  return (
    <>
      <AppSpinner
        isPending={isPending || editEmployeePending || gettingZonesData}
      />
      <AppDialog onClose={onClose} placement="CENTER" title="Add user">
        <form
          onSubmit={handleSubmit(handleAddUser)}
          className="flex flex-col gap-3 "
        >
          {!edit && (
            <CsvReader
              filePath="/sample_employee.csv"
              userData={data}
              callBack={() => {
                handleAddUser(undefined);
              }}
              labelString="Add employee"
              setFileData={setFileData}
              fileHeaders={[
                {
                  value: "Zone",
                  required: true,
                },
                {
                  value: "Division",
                  required: true,
                },
                {
                  value: "Employee code",
                  required: true,
                },
                {
                  value: "Employee name",
                  required: true,
                },
                {
                  value: "Date of birth",
                  required: true,
                },

                {
                  value: "Designation",
                  required: false,
                },

                {
                  value: "Email id",
                  required: false,
                },
                {
                  value: "Mobile number",
                  required: false,
                },

                {
                  value: "Organisation unit",
                  required: false,
                },
                {
                  value: "Post",
                  required: false,
                },
              ]}
              onClose={onClose}
              setSelectedFile={setSelectedFile}
            />
          )}
          {!selectedFile && (
            <div className="flex flex-col gap-3">
              <SearchableSelect
                value={edit && !selectedZone?.key && (selectedZone as any)}
                mandatory
                onSelect={handleZoneSelectDataType}
                label="Select Zone"
                data={zonesMainData?.map((item: zoneDataType) => {
                  return {
                    key: item?.zoneCode + " - " + item?.zoneName,
                    value: item?.zoneCode?.trim(),
                  };
                })}
                register={register}
                error="Please select zone"
                errorMessage={errors?.zone?.message as any}
                name="zone"
                icon="zone"
              />
              <SearchableSelect
                value={
                  edit && !selectedDivision?.key && (selectedDivision as any)
                }
                mandatory
                clear={divisionClear}
                isDisabled={!selectedZone}
                onSelect={(item) => {
                  setSelectedDivision(item);
                  setValue("division", item.value);
                }}
                label="Select Division"
                data={divisionsData?.map((item: divisionDataType) => {
                  return {
                    key: item?.divisionCode + " - " + item?.divisionName,
                    value: item?.divisionCode,
                  };
                })}
                icon="division"
                register={register}
                error="Please select division"
                errorMessage={errors?.division?.message as any}
                name="division"
              />
            </div>
          )}

          {((!selectedFile && selectedZone && selectedDivision) || edit) && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <Input
                  value={watch("employeeCode") ?? ""}
                  className="lg:w-[20vw]"
                  placeholder="Employee code"
                  about="Employee code"
                  icon="employeecode"
                  errorMessage={errors?.employeeCode?.message}
                  {...register("employeeCode", {
                    required: "Please enter Employee code",
                  })}
                />
                <Input
                  value={watch("employeeDesignation") ?? ""}
                  className="lg:w-[20vw]"
                  placeholder="Employee designation"
                  about="Employee designation"
                  icon="tie"
                  errorMessage={errors?.employeeDesignation?.message}
                  {...register("employeeDesignation", {
                    required: "Please enter Employee designation",
                  })}
                />
                <Input
                  value={watch("employeeName") ?? ""}
                  className="lg:w-[20vw]"
                  placeholder="Employee name"
                  about="Employee name"
                  icon="FN"
                  errorMessage={errors?.employeeName?.message}
                  {...register("employeeName", {
                    required: "Please enter Employee name",
                  })}
                />

                <Input
                  value={watch("employeeEmail") ?? ""}
                  className="lg:w-[20vw]"
                  placeholder="Employee email"
                  about="Employee email"
                  icon="email"
                  errorMessage={errors?.employeeEmail?.message}
                  {...register("employeeEmail", {
                    required: "Please enter Employee Email id",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid Email Adress format",
                    },
                  })}
                />

                <Input
                  value={watch("employeeMobile") ?? ""}
                  className="lg:w-[20vw]"
                  placeholder="Employee mobile"
                  about="Employee mobile"
                  icon="phone"
                  type="number"
                  errorMessage={errors?.employeeMobile?.message}
                  {...register("employeeMobile", {
                    required: false,
                  })}
                />
                <Input
                  value={watch("employeeDataOfBirth") ?? ""}
                  className="lg:w-[20vw]"
                  placeholder="Employee date of birth"
                  about="Employee date of birth"
                  type="date"
                  errorMessage={errors?.employeeDataOfBirth?.message}
                  {...register("employeeDataOfBirth", {
                    required: "Please enter Employee date of birth",
                  })}
                />

                <Input
                  icon="organisaton"
                  value={watch("employeeOrganisationUnit") ?? ""}
                  className="lg:w-[20vw]"
                  placeholder="Employee organisation unit"
                  about="Employee organisation unit"
                  errorMessage={errors?.employeeOrganisationUnit?.message}
                  {...register("employeeOrganisationUnit", {
                    required: false,
                  })}
                />
                <Input
                  icon="post"
                  value={watch("employeePost") ?? ""}
                  className="lg:w-[20vw]"
                  placeholder="Employee post"
                  about="Employee post"
                  errorMessage={errors?.employeePost?.message}
                  {...register("employeePost", {
                    required: false,
                  })}
                />
              </div>

              <div className="flex -ml-2 items-center gap-3">
                <Button
                  type="button"
                  onClick={onClose}
                  className="w-1/2"
                  variant={"ghost"}
                >
                  <X />
                  Close
                </Button>
                <Button className="w-1/2">
                  <RiUserAddLine />
                  Add user
                </Button>
              </div>
            </div>
          )}
        </form>
      </AppDialog>
    </>
  );
}

export default AddEmployeeDialog;
