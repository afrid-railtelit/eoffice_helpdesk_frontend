/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppContext } from "@/apputils/AppContext";
import AppDialog from "@/apputils/AppDialog";
import AppSpinner from "@/apputils/AppSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddUser, useDisableOrEnableUser } from "@/hooks/userHooks";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { RiUserAddLine } from "react-icons/ri";
import { UserDataType } from "@/types/userDataTypes";
import CsvReader from "@/apputils/CsvReader";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface AddUserDialogInterface {
  onClose: () => void;
  edit?: boolean;
  userData?: UserDataType;
  data?: UserDataType[];
}
function AddUserDialog({
  onClose,
  edit,
  userData,
  data,
}: AddUserDialogInterface) {
  const { handleSubmit, register, formState, watch } = useForm({
    defaultValues: {
      firstName: edit ? userData?.firstName : "",
      lastName: edit ? (userData?.lastName ? userData?.lastName : "") : "",
      email: edit ? userData?.emailId : "",
      mobile: edit
        ? userData?.mobileNumber
          ? userData?.mobileNumber
          : ""
        : "",
    },
  });
  const { errors } = formState;
  const { addUser, isPending } = useAddUser();
  const { dispatch } = useAppContext();
  const { editUser, isPending: editUserPending } = useDisableOrEnableUser();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileData, setFileData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("1");

  useEffect(() => {
    if (edit) {
      if (userData) {
        setSelectedLevel(userData?.level?.toString());
      }
    }
  }, [edit]);

  function handleAddUser(e: any) {
    if (!edit)
      addUser(
        {
          email: e?.email,
          firstName: e?.firstName,
          lastName: e?.lastName,
          mobile: parseInt(e?.mobile ?? ""),
          users: fileData,
          level: parseInt(selectedLevel),
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
        editUser(
          {
            emailId: e?.email,
            method: "editUser",
            userData: {
              ...e,
              level:selectedLevel
            },
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
      <AppSpinner isPending={isPending || editUserPending} />
      <AppDialog onClose={onClose} placement="CENTER" title="Add user">
        <form
          onSubmit={handleSubmit(handleAddUser)}
          className="flex flex-col gap-3 "
        >
          {!edit && (
            <CsvReader
            filePath="/sample_user.csv"
              userData={data}
              callBack={() => {
                handleAddUser(undefined);
              }}
              labelString="Add user"
              setFileData={setFileData}
              fileHeaders={[
                {
                  value: "First name",
                  pattern: /^[A-Za-z]{2,50}$/,
                  required: true,
                },
                {
                  value: "Last name",
                  required: false,
                },
                {
                  value: "Email id",
                  pattern: /^\S+@\S+$/,
                  required: true,
                },
                {
                  value: "Mobile number",
                  pattern: /^[6-9]\d{9}$/,
                  required: true,
                },
                {
                  value: "Level",
                  pattern: /^\d+$/,
                  required: true,
                },
              ]}
              onClose={onClose}
              setSelectedFile={setSelectedFile}
            />
          )}

          {!selectedFile && (
            <div className="flex flex-col gap-3">
              <Input
                value={watch("firstName") ?? ""}
                className="lg:w-[20vw]"
                placeholder="First name"
                about="First name"
                icon="FN"
                errorMessage={errors?.firstName?.message}
                {...register("firstName", {
                  required: "Please enter First name",
                })}
              />

              <Input
                value={watch("lastName") ?? ""}
                className="lg:w-[20vw]"
                placeholder="Last name"
                about="Last name"
                icon="LN"
                errorMessage={errors?.lastName?.message}
                {...register("lastName", {
                  required: false,
                })}
              />

              <Input
                value={watch("email") ?? ""}
                className="lg:w-[20vw]"
                placeholder="Email id"
                about="Email id"
                icon="email"
                errorMessage={errors?.email?.message}
                {...register("email", {
                  required: "Please enter Email id",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid Email Adress format",
                  },
                })}
              />

              <Input
                value={watch("mobile") ?? ""}
                className="lg:w-[20vw]"
                placeholder="Mobile number"
                about="Mobile number"
                icon="phone"
                type="number"
                errorMessage={errors?.mobile?.message}
                {...register("mobile", {
                  required: false,
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Invalid mobile number format",
                  },
                })}
              />
              <Select
                onValueChange={(value) => {
                  setSelectedLevel(value);
                }}
                value={selectedLevel}
              >
                <SelectTrigger
                  value={selectedLevel}
                  about="Select Status"
                  className="lg:w-[20vw]"
                >
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"1"}>1</SelectItem>
                  <SelectItem value={"2"}>2</SelectItem>
                </SelectContent>
              </Select>
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

export default AddUserDialog;
