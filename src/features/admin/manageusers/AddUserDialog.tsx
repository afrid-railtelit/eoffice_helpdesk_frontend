/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppContext } from "@/apputils/AppContext";
import AppDialog from "@/apputils/AppDialog";
import AppSpinner from "@/apputils/AppSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddUser } from "@/hooks/userHooks";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { RiUserAddLine } from "react-icons/ri";
import Papa from "papaparse";

interface AddUserDialogInterface {
  onClose: () => void;
}
function AddUserDialog({ onClose }: AddUserDialogInterface) {
  const { handleSubmit, register, formState, setValue, watch } = useForm();
  const { errors } = formState;
  const { addUser, isPending } = useAddUser();
  const { dispatch } = useAppContext();

  function handleAddUser(e: any) {
    addUser(
      {
        email: e?.email,
        firstName: e?.firstName,
        lastName: e?.lastName,
        mobile: parseInt(e?.mobile ?? ""),
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
  }

  function handleCSVUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data as any[];
        if (data.length > 0) {
          // Just picking first row for now, assuming fields are: firstName, lastName, email, mobile
          const user = data[0];
          setValue("firstName", user.firstName || "");
          setValue("lastName", user.lastName || "");
          setValue("email", user.email || "");
          setValue("mobile", user.mobile || "");
        }
      },
    });
  }

  return (
    <>
      <AppSpinner isPending={isPending} />
      <AppDialog onClose={onClose} placement="CENTER" title="Add user">
        <form
          onSubmit={handleSubmit(handleAddUser)}
          className="flex flex-col gap-3 "
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="lg:w-[20vw] border px-2 py-1 rounded"
          />
          <p className=" text-foreground/60 w-[19vw] ml-1 -mt-2">
            Upload CSV with headers: firstName, lastName, email, mobile
          </p>
          <Input
            value={watch("firstName") ?? ""}
            className="lg:w-[20vw]"
            placeholder="Fisrt name"
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
          <div className="flex -ml-2 items-center gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="w-1/2"
              variant={"ghost"}
            >
              <X />
              CLose
            </Button>
            <Button className="w-1/2">
              <RiUserAddLine />
              Add user
            </Button>
          </div>
        </form>
      </AppDialog>
    </>
  );
}

export default AddUserDialog;
