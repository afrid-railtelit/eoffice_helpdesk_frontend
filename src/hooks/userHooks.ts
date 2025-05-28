/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHandleApiResponse } from "@/apiServices";
import { useAppContext } from "@/apputils/AppContext";
import {
  addUserAPI,
  changePasswordAPI,
  editUserAPI,
  getAllTicketsAPI,
  getAllUsers,
  getZonesAPI,
  loginUserAPI,
  raiseNewTicketAPI,
  restePasswordAPI,
  updateTicketAPI,
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
      users: any;
      level: number;
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
  const { dispatch } = useAppContext();

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
      if (data?.data === "SUCCESS") {
        dispatch({
          type: "setZonesData",
          payload: data?.zones,
        });
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
export function useChangePassword() {
  const { handleToast } = useHandleApiResponse();
  const {
    data,
    isPending,
    mutate: changePassword,
  } = useMutation({
    mutationFn: ({
      emailId,
      password,
    }: {
      password: string;
      emailId: string;
    }) =>
      changePasswordAPI({
        emailId,
        password,
      }),
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
    changePassword,
  };
}
export function useRaiseNewTicket() {
  const { handleToast } = useHandleApiResponse();
  const {
    data,
    isPending,
    mutate: raiseNewTicket,
  } = useMutation({
    mutationFn: (data: any) => raiseNewTicketAPI(data),
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
    raiseNewTicket,
  };
}
export function useGetAllTickets() {
  const { handleToast } = useHandleApiResponse();
  const {
    data,
    isPending,
    mutate: getAllTickets,
  } = useMutation({
    mutationFn: (data: any) => getAllTicketsAPI(data),
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
    getAllTickets,
  };
}
export function useUpdateTikcetDetails() {
  const { handleToast } = useHandleApiResponse();
  const {
    data,
    isPending,
    mutate: updateTicket,
  } = useMutation({
    mutationFn: (data: any) => updateTicketAPI(data),
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
    updateTicket,
  };
}
