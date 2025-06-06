/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAPI, postAPI } from "@/apiServices";

export async function getAllUsers(value?:string) {
  return getAPI(`api/allusers?value=${value}    `);
}
export async function addUserAPI(data: any) {
  return postAPI("api/adduser", data);
}
export async function editUserAPI(data: any) {
  return postAPI("api/edituser", data);
}
export async function loginUserAPI(data: any) {
  return postAPI("api/login", data);
}
export async function restePasswordAPI(data: any) {
  return postAPI("api/resetpassword", data);
}
export async function getZonesAPI() {
  return getAPI("api/zones");
}
export async function changePasswordAPI(data:any) {
  return postAPI("api/changepassword",data);
}
export async function raiseNewTicketAPI(data:any) {
  return postAPI("api/newticket",data);
}
export async function getAllTicketsAPI(data:any) {
  return postAPI("api/tickets",data);
}
export async function updateTicketAPI(data:any) {
  return postAPI("api/updateticket",data);
}
