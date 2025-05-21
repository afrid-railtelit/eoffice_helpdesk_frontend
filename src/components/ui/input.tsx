/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cn } from "@/lib/utils";
import { LuAsterisk, LuUserRound } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { X } from "lucide-react";
import { IoLockOpenOutline } from "react-icons/io5";
import { MdOutlineMail, MdPhoneEnabled } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";

interface InputInterface extends React.ComponentProps<"input"> {
  label?: string;
  errorMessage?: any;
  mandatory?: boolean;
  icon?: string;
  onClear?: () => void;
  noErrorMessage?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputInterface>(
  (
    {
      className,
      type,
      label,
      errorMessage,
      mandatory,
      icon,
      onClear,
      noErrorMessage = false,
      ...props
    },
    ref
  ) => {
    function getIcon() {
      switch (icon?.toLowerCase()) {
        case "search":
          return <CiSearch className="w-5 h-5" />;
        
        case "phone":
          return <MdPhoneEnabled  className="w-5 h-5" />;
        

        case "user":
          return <LuUserRound className="w-5 h-5" />;

        case "lock":
          return <IoLockOpenOutline className="w-5 h-5" />;

        case "email":
          return <MdOutlineMail className="w-5 h-5" />;
          
        case "fn":
          return <BiSolidUserDetail    className="w-5 h-5" />;
        case "ln":
          return <CgDetailsMore   className="w-5 h-5" />;

      }
    }

    return (
      <div className={`flex flex-col ${noErrorMessage ? "" : "h-14"}`}>
        <div>
          {label && (
            <label className=" font-medium mb-1 flex items-center">
              {label}
              {mandatory && (
                <span className="w-3 h-3">
                  <LuAsterisk className="w-3  h-3  text-destructive" />
                </span>
              )}
            </label>
          )}
          <div className="relative flex items-center ">
            {props?.value && (
              <label className="absolute left-4 -top-2 px-3 text-[10px] bg-white text-foreground/80 transition-all duration-200 ease-in-out">
                {props?.about}
              </label>
            )}

            <div className="absolute pl-1">{getIcon()}</div>
            <input
              autoComplete="off"
              ref={ref} // Pass ref here
              type={type}
              data-slot="input"
              className={cn(
                "file:text-foreground placeholder:text-xs placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-border flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                `${icon && "pl-7"}`,
                className
              )}
              {...props}
            />
            {onClear && props?.value && (
              <div
                className="absolute  right-2 cursor-pointer w-5 h-5 bg-gray-100 lg:hover:bg-gray-300 flex items-center justify-center rounded-full"
                onClick={onClear}
              >
                <X className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
        {errorMessage && (
          <p className="text-destructive ml-[0.1rem] ">
            {<label className="text-xs">{errorMessage}</label>}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; // This is useful for debugging.

export { Input };
