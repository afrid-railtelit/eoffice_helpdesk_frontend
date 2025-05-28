/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAPI, postAPI } from "@/apiServices";

export async function getEmployeeDetailsAPI(data: any) {
  return getAPI(
    `api/employee?value=${data?.value}&zone=${
      data?.zone ? data?.zone : ""
    }&division=${data?.division ? data?.division : ""}`
  );
}
export async function getIssuesDataAPI() {
  return getAPI(`api/issues`);
}
export async function addEmployeeAPI(data: any) {
  return postAPI(`api/addemployee`, data);
}
export async function allEmployeeAPI(data: any) {
  return postAPI(`api/allemployees`, data);
}
export async function editEmployeeAPI(data: any) {
  return postAPI(`api/editemployee`, data);
}
