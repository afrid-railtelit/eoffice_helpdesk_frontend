/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppContext } from "@/apputils/AppContext";
import AppSpinner from "@/apputils/AppSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useLogin, useResetPassword } from "@/hooks/userHooks";
import { UserDataType } from "@/types/userDataTypes";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginMain() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    clearErrors,
    watch,
    setValue,
    setError,
  } = useForm();
  const { errors } = formState;
  const [step, setStep] = useState<number>(0);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const { isPending, login } = useLogin();
  const { isPending: resetPasswordPending, resetPassword } = useResetPassword();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [timer, setTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  function handleLogin(e: any) {
    if (step === 0) {
      login(
        {
          emailId: e?.emailId,
          password: e?.password,
          otp: showOtp && canResendOtp && !watch("otp") ? undefined : e?.otp,
        },
        {
          onSuccess(data) {
            if (data?.data === "OTP_SENT") {
              setShowOtp(true);
              setTimer(60); // start countdown
              setCanResendOtp(false);
            } else if (data?.data === "WRONG_PASSWORD") {
              setValue("password", "");
              setError("password", {
                type: "manual",
                message: "Incorrect password entered!",
              });
            } else if (data?.data === "SUCCESS") {
              const userData: UserDataType = data?.user;
              localStorage.setItem(
                "rcilInitialLogin",
                userData?.initialLogin?.toString()
              );
              localStorage.setItem("rcilEmailId", userData?.emailId);
              localStorage.setItem("rcilFN", userData?.firstName);
              localStorage.setItem("rcilLN", userData?.lastName);
              localStorage.setItem("rcilRole", userData?.role);
              localStorage.setItem("rcilLevel", userData?.level?.toString());
              localStorage.setItem(
                "rcilLastLoginDetails",
                JSON.stringify(data?.lastLoginDetails)
              );

              if (userData?.role === "ADMIN") {
                dispatch({
                  type: "setPage",
                  payload: {
                    title: "Dashboard",
                    desc: "Overview of system metrics and quick actions.",
                    index: 0,
                  },
                });
                navigate("/admin/dashboard");
              } else {
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
            }
          },
        }
      );
    } else {
      resetPassword(
        {
          emailId: e?.emailId,
          password: e?.password,
          otp: showOtp && canResendOtp && !watch("otp") ? undefined : e?.otp,
        },
        {
          onSuccess(data) {
            if (data?.data === "OTP_SENT") {
              setShowOtp(true);
              setTimer(60); // start countdown
              setCanResendOtp(false);
            }
            if (data?.data === "OTP_SUCCESS") {
              setShowPassword(true);
            } else if (data?.data === "SUCCESS") {
              setStep(0);
              setShow(false);
              setShowOtp(false);
              setShowPassword(false);
              reset();
            }
          },
        }
      );
    }
  }

  return (
    <div className=" bg-white w-full items-center flex justify-center  p-6 flex-col">
      <AppSpinner isPending={isPending || resetPasswordPending} />

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col p-6  gap-2"
      >
        <img alt="logo" src={"logo.png"} className="h-fit mb-10" />

        {step === 0 && (
          <div className="flex flex-col gap-3">
            <div className={`${showOtp ? "hidden" : "flex"}  flex-col gap-3`}>
              <Input
                icon="email"
                placeholder="Email id"
                errorMessage={errors?.emailId?.message}
                {...register("emailId", {
                  required: "Please enter Email id",
                })}
              />

              <Input
                value={watch("password") ?? ""}
                icon="lock"
                placeholder="Password"
                errorMessage={errors?.password?.message}
                {...register("password", {
                  required: "Please enter Password",
                })}
              />
            </div>

            {showOtp && (
              <Input
                onClear={() => {
                  setValue("otp", undefined);
                }}
                value={watch("otp") ?? ""}
                icon="lock"
                placeholder="otp"
                errorMessage={errors?.otp?.message}
                {...register("otp", {
                  required: canResendOtp ? false : "Please enter OTP",

                  pattern: {
                    value: /^[0-9]{6}$/,
                    message:
                      "OTP must be exactly 6 digits and contain only numbers",
                  },
                })}
              />
            )}
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-3">
            <div className={`${showOtp ? "hidden" : ""} `}>
              <Input
                className="w-full"
                icon="email"
                placeholder="Email id"
                errorMessage={errors?.emailId?.message}
                {...register("emailId", {
                  required: "Please enter Email id",
                })}
              />
            </div>
            {showOtp && !showPassword && (
              <div className="flex flex-col">
                <Input
                  onClear={() => {
                    setValue("otp", undefined);
                  }}
                  value={watch("otp") ?? ""}
                  icon="lock"
                  placeholder="otp"
                  errorMessage={errors?.otp?.message}
                  {...register("otp", {
                    required: canResendOtp ? false : "Please enter OTP",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message:
                        "OTP must be exactly 6 digits and contain only numbers",
                    },
                  })}
                />
              </div>
            )}
            {showPassword && (
              <div className="gap-8 flex  flex-col">
                <div className="relative">
                  <Input
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
                    className="absolute right-2 top-[11px] cursor-pointer text-gray-500"
                  >
                    {show ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </span>
                </div>

                <Input
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
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col mt-3">
          {timer > 0 && showOtp && (
            <p>
              Resend otp in : <span className="text-destructive">{timer}s</span>
            </p>
          )}
          <div className="flex flex-row items-center gap-3">
            {showOtp && (
              <Button
                type="button"
                onClick={() => {
                  if (step === 0) {
                    clearErrors("otp");
                    setShowOtp(false);
                    setValue("otp", undefined);
                  } else {
                    if (showOtp && !showPassword) {
                      setShowOtp(false);
                      clearErrors("otp");
                      setValue("otp", undefined);
                    } else if (showOtp && showPassword) {
                      setShowOtp(false);
                      setShowOtp(false);
                      clearErrors("otp");
                      clearErrors("password");
                      clearErrors("confirmPassword");
                      setValue("otp", undefined);
                      setValue("password", undefined);
                      setValue("confirmPassword", undefined);
                    }
                  }
                }}
                variant={"ghost"}
                className=" w-fit px-8 mt-3 py-5"
              >
                Back
              </Button>
            )}

            <Button type="submit" className=" w-fit px-8 mt-3 py-5">
              {step === 0
                ? showOtp
                  ? canResendOtp && !watch("otp")
                    ? "Resend otp"
                    : "SUBMIT"
                  : "Login"
                : step === 1 && !showOtp
                ? "Send OTP"
                : canResendOtp && !watch("otp")
                ? "Resend Otp"
                : "Submit"}
            </Button>
          </div>
        </div>
        <div className="text-foreground/60 ">
          {step === 0
            ? "Forgot your password? Reset"
            : "Rember password? Login"}{" "}
          <Button
            type="button"
            className="-ml-4"
            onClick={() => {
              reset();
              if (step === 0) {
                setStep(1);
              } else {
                setStep(0);
              }
            }}
            variant={"link"}
          >
            from here
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginMain;
