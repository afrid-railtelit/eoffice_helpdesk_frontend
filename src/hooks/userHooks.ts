/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHandleApiResponse } from "@/apiServices";
import {
  addUserAPI,
  editUserAPI,
  getAllUsers,
  getZonesAPI,
  loginUserAPI,
  restePasswordAPI,
} from "@/servcies/userAPIS";
import { useMutation } from "@tanstack/react-query";

export function useGetAlUsers() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: getUsers,
  } = useMutation({
    mutationFn: (value: string) => getAllUsers(value),
    onError() {
      handleToast("ERROR");
    },
  });

  return {
    data,
    isPending,
    getUsers,
  };
}

export function useAddUser() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: addUser,
  } = useMutation({
    mutationFn: (data: {
      email: string;
      mobile: number;
      firstName: string;
      lastName: string;
    }) => addUserAPI(data),
    onSuccess(data) {
      handleToast(data?.data);
    },
    onError() {
      handleToast("ERROR");
    },
  });

  return {
    data,
    isPending,
    addUser,
  };
}
export function useDisableOrEnableUser() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: editUser,
  } = useMutation({
    mutationFn: (data: {
      emailId: string;
      disabled?: boolean;
      method: string;
      userData?: any;
    }) => editUserAPI(data),
    onSuccess(data) {
      handleToast(data?.data);
    },
    onError() {
      handleToast("ERROR");
    },
  });

  return {
    data,
    isPending,
    editUser,
  };
}
export function useLogin() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: login,
  } = useMutation({
    mutationFn: (data: { emailId: string; password: boolean; otp?: number }) =>
      loginUserAPI(data),
    onSuccess(data) {
      if (data?.data !== "SUCCESS") {
        handleToast(data?.data);
      }
    },
    onError() {
      handleToast("ERROR");
    },
  });

  return {
    data,
    isPending,
    login,
  };
}
export function useResetPassword() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: resetPassword,
  } = useMutation({
    mutationFn: (data: { emailId: string; password?: boolean; otp?: number }) =>
      restePasswordAPI(data),
    onSuccess(data) {
      handleToast(data?.data);
    },
    onError() {
      handleToast("ERROR");
    },
  });

  return {
    data,
    isPending,
    resetPassword,
  };
}
export function useGetZonesData() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: getZonesData,
  } = useMutation({
    mutationFn: () => getZonesAPI(),
    onSuccess(data) {
      if (data?.data !== "SUCCESS") {
        handleToast(data?.data);
      }
    },
    onError() {
      handleToast("ERROR");
    },
  });

  return {
    data,
    isPending,
    getZonesData,
  };
}
