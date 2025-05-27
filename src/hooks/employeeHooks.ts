/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHandleApiResponse } from "@/apiServices";
import { useAppContext } from "@/apputils/AppContext";
import {
  addEmployeeAPI,
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
    mutationFn: (value: string) => getEmployeeDetailsAPI(value),
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
