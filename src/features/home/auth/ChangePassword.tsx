/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import AppDialog from "@/apputils/AppDialog";
import { useChangePassword } from "@/hooks/userHooks";
import { useAppContext } from "@/apputils/AppContext";
import AppSpinner from "@/apputils/AppSpinner";
import { useGetEmailId } from "@/hooks/appHooks";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [show, setShow] = useState(false);
  const { isPending, changePassword } = useChangePassword();
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const emailId = useGetEmailId();

  function onSubmit(e: any) {
    changePassword(
      {
        emailId: emailId as never,
        password: e?.password,
      },
      {
        onSuccess(data) {
          if (data?.data === "SUCCESS") {
            localStorage.setItem("rcilInitialLogin","false")
            dispatch({
              type: "setPage",
              payload: {
                title: "Tickets",
                desc: "View and manage support tickets and more...",
                index: 2,
              },
            });
            navigate("/tickets");
          }
        },
      }
    );
  }

  return (
    <div className="flex flex-col ">
      <AppSpinner isPending={isPending} />
      <AppDialog onClose={() => {}} noClose={true} title="Change password">
        <div className="flex flex-col h-[40vh]">
          <div className="flex justify-center w-full h-screen  items-center">
            <div className="w-[20vw] mx-auto  px-6  bg-white ">
              <h2 className="text-xl font-bold text-center text-blue-950 mb-6">
                Change Your Password
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-10"
              >
                <div className="relative">
                  <Input
                    about="New Password"
                    type={show ? "text" : "password"}
                    placeholder="Enter new password"
                    errorMessage={errors.password?.message}
                    {...register("password", {
                      required: "Please enter new password",
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
                        message:
                          "Password must be at least 8 characters, include an uppercase letter, a number, and a special character",
                      },
                    })}
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-2 top-[10px] cursor-pointer text-gray-500"
                  >
                    {show ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </span>
                </div>

                <Input
                  about="Confirm Password"
                  type="password"
                  placeholder="Re-enter your password"
                  errorMessage={errors.confirmPassword?.message}
                  {...register("confirmPassword", {
                    required: "Please re-enter your password",
                    validate: (val) =>
                      val === watch("password") || "Passwords do not match",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
                      message:
                        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character",
                    },
                  })}
                />

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={isSubmitting}
                >
                  Change Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </AppDialog>
    </div>
  );
}

export default ChangePassword;
