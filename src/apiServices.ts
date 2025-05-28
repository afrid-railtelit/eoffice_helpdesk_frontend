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
    {
      data: "SUCCESS",
      message: "Success",
      description: "Your action was completed successfully.",
      variant: "constructive",
    },
    {
      data: "OTP_SUCCESS",
      message: "OTP Verified",
      description: "You’ve successfully verified the OTP.",
      variant: "constructive",
    },
    {
      data: "OTP_SENT",
      message: "OTP Sent",
      description: "Check your inbox for the verification code.",
      variant: "constructive",
    },
    {
      data: "DISABLED",
      message: "Account Disabled",
      description: "Your account has been disabled. Please contact support.",
      variant: "destructive",
    },
    {
      data: "ERROR",
      message: "Error",
      description: "Something went wrong. Please try again later.",
      variant: "destructive",
    },
    {
      data: "UNAUTHORIZED",
      message: "Unauthorized",
      description: "You do not have permission to perform this action.",
      variant: "destructive",
    },
    {
      data: "WRONG_PASSWORD",
      message: "Incorrect Password",
      description: "The password you entered is incorrect.",
      variant: "destructive",
    },
    {
      data: "BAD_REQUEST",
      message: "Bad Request",
      description: "The request was invalid. Please check and try again.",
      variant: "destructive",
    },
    {
      data: "USER_EXISTS",
      message: "User Exists",
      description: "A user with this information already exists.",
      variant: "destructive",
    },
    {
      data: "INVALID_EMAIL_ID",
      message: "Invalid Email",
      description: "The email address provided is not valid.",
      variant: "destructive",
    },
    {
      data: "INVALID_MOBILE_NUMBER",
      message: "Invalid Mobile Number",
      description: "The mobile number provided is not valid.",
      variant: "destructive",
    },
    {
      data: "SERVER_ERROR",
      message: "Server Error",
      description: "Internal server error. Please try again later.",
      variant: "destructive",
    },
    {
      data: "INVALID_OTP",
      message: "Invalid OTP",
      description: "The OTP you entered is invalid or expired.",
      variant: "destructive",
    },
    {
      data: "USER_NOT_FOUND",
      message: "User Not Found",
      description: "No user found matching your credentials.",
      variant: "destructive",
    },
    {
      data: "EMPLOYEE_NOT_FOUND",
      message: "Employee Not Found",
      description: "No employee found with the given details.",
      variant: "destructive",
    },
    {
      data: "INVALID_NAME",
      message: "Invalid Name",
      description: "Please enter a valid name.",
      variant: "destructive",
    },
    {
      data: "INVALID_USER_LOGIN_TYPE",
      message: "Login Type Error",
      description: "This account is registered with Google Sign-In. Please use Google login.",
      variant: "destructive",
    },
    {
      data: "INVALID_USER_LOGIN_TYPE_GOOGLE",
      message: "Login Type Error",
      description: "This account is not linked with Google Sign-In. Please login with email/password.",
      variant: "destructive",
    },
    {
      data: "LINK_EXPIRED",
      message: "Link Expired",
      description: "This link has expired. Please request a new one.",
      variant: "destructive",
    },
  ];

  const { toast } = useToast();

  function handleToast(data: string) {
    const response = responseData.find((item) => item.data === data);
    if (response) {
      toast({
        title: response.message,
        description: response.description,
        variant: response.variant as "constructive" | "destructive" | "default",
      });
    }
  }

  return { handleToast };
}
