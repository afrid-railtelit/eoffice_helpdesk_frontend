/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAPI, postAPI} from "@/apiServices";

export async function getEmployeeDetailsAPI(employeeId:string) {
  return getAPI(`api/employee?value=${employeeId}`);
}
export async function getIssuesDataAPI() {
  return getAPI(`api/issues`);
}
export async function addEmployeeAPI(data:any) {
  return postAPI(`api/addemployee`,data);
}
