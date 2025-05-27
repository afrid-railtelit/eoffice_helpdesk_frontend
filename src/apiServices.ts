/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useToast } from "./components/ui/use-toast";

// export const BASE_URL = "https://api.freegrow.live/"

export const BASE_URL = "http://localhost:3000/";

export async function getAPI(url: string) {
  const { data } = await axios.get(BASE_URL + url);
  return data;
}

export async function postAPI(url: string, payload: any) {
  const { data } = await axios.post(BASE_URL + url, payload, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
}

export function useHandleApiResponse() {
  const responseData = [
    { data: "SUCCESS", message: "Success", variant: "constructive" },
    {
      data: "DISABLED",
      message: "Account has been disabled",
      variant: "destructive",
    },
    { data: "OTP_SUCCESS", message: "Success", variant: "constructive" },
    { data: "ERROR", message: "Something went wrong", variant: "destructive" },
    {
      data: "UNAUTHORIZED",
      message: "You are not authorized",
      variant: "destructive",
    },
    {
      data: "WRONG_PASSWORD",
      message: "Incorrect password",
      variant: "destructive",
    },
    { data: "BAD_REQUEST", message: "Bad request", variant: "destructive" },
    {
      data: "USER_EXISTS",
      message: "User already exists",
      variant: "destructive",
    },
    {
      data: "INVALID_EMAIL_ID",
      message: "Invalid email address",
      variant: "destructive",
    },
    {
      data: "INVALID_MOBILE_NUMBER",
      message: "Invalid mobile number",
      variant: "destructive",
    },
    {
      data: "SERVER_ERROR",
      message: "Internal server error",
      variant: "destructive",
    },
    {
      data: "OTP_SENT",
      message: "OTP has been sent to your Email address",
      variant: "constructive",
    },
    { data: "INVALID_OTP", message: "Invalid OTP", variant: "destructive" },
    {
      data: "USER_NOT_FOUND",
      message: "User not found",
      variant: "destructive",
    },

    {
      data: "EMPLOYEE_NOT_FOUND",
      message: "Employee not found",
      variant: "destructive",
    },

    {
      data: "INVALID_NAME",
      message: "Please enter a valid name",
      variant: "destructive",
    },
    {
      data: "INVALID_USER_LOGIN_TYPE",
      message:
        "This account is registered with Google Sign-In. Please use Google to log in.",
      variant: "destructive",
    },
    {
      data: "INVALID_USER_LOGIN_TYPE_GOOGLE",
      message:
        "This account is not linked with Google Sign-In. Please log in using your email and password.",
      variant: "destructive",
    },
    {
      data: "LINK_EXPIRED",
      message: "This link has expired. Please request a new one.",
      variant: "destructive",
    },
  ];

  const { toast } = useToast();

  function handleToast(data: string) {
    for (let index = 0; index < responseData.length; index++) {
      if (responseData[index].data === data) {
        toast({
          title: responseData[index].message,
          variant: responseData[index].variant as
            | "constructive"
            | "destructive"
            | "default",
        });

        break;
      }
    }
  }
  return { handleToast };
}
