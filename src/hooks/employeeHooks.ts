/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHandleApiResponse } from "@/apiServices";
import { useAppContext } from "@/apputils/AppContext";
import {
  addEmployeeAPI,
  allEmployeeAPI,
  editEmployeeAPI,
  getEmployeeDetailsAPI,
  getIssuesDataAPI,
} from "@/servcies/employeeAPIS";
import { useMutation } from "@tanstack/react-query";

export function useGetEmployeeDetails() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: getEmployeeDetails,
  } = useMutation({
    mutationFn: (data:{value:string,zone:string,division:string}) => getEmployeeDetailsAPI(data),
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
    getEmployeeDetails,
  };
}
export function useGetIssuesData() {
  const { dispatch } = useAppContext();
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: getIssuesData,
  } = useMutation({
    mutationFn: () => getIssuesDataAPI(),
    onSuccess(data) {
      if (data?.data !== "SUCCESS") {
        handleToast(data?.data);
      }
      if (data?.data === "SUCCESS") {
        dispatch({
          type: "setIssuesData",
          payload: data?.issues,
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
    getIssuesData,
  };
}
export function useAddEmployee() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: addEmployee,
  } = useMutation({
    mutationFn: (data: any) => addEmployeeAPI(data),
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
    addEmployee,
  };
}
export function useGetAllEmployees() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: getAllEmployees,
  } = useMutation({
    mutationFn: (data: any) => allEmployeeAPI(data),
    onSuccess(data) {
      if(data?.data !== "SUCCESS"){
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
    getAllEmployees,
  };
}
export function useEditEmployee() {
  const { handleToast } = useHandleApiResponse();

  const {
    data,
    isPending,
    mutate: editEmployee,
  } = useMutation({
    mutationFn: (data: any) => editEmployeeAPI(data),
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
    editEmployee,
  };
}
