/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppContext } from "@/apputils/AppContext";
import { lastLoginType } from "@/types/userDataTypes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useGetrole() {
  const role = localStorage.getItem("rcilRole");

  return role ?? undefined;
}

export function useGetName() {
  const firstName = localStorage.getItem("rcilFN");
  const lastName = localStorage.getItem("rcilLN");

  return { firstName, lastName };
}

export function useGetEmailId() {
  const emailId = localStorage.getItem("rcilEmailId");
  return emailId;
}
export function useGetLastLoginDetails() {
  const loginDetails:lastLoginType | string = localStorage.getItem("rcilLastLoginDetails") as any;
  if(loginDetails !== "undefined") return JSON.parse(loginDetails as any);
  else return undefined
}


export function useUpdatePage() {
  const { dispatch } = useAppContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/tickets" || pathname === "/admin/tickets") {
      dispatch({
        type: "setPage",
        payload: {
          title: "Tickets",
          desc: "View and manage support tickets and more...",
          index: 2,
        },
      });
    } else if (pathname === "/reports" || pathname === "/admin/reports") {
      dispatch({
        type: "setPage",
        payload: {
          title: "Reports",
          desc: "Generate and view system usage and performance reports.",
          index: 3,
        },
      });
    } else if (pathname === "/users" || pathname === "/admin/users") {
      dispatch({
        type: "setPage",
        payload: {
          title: "Manage Users",
          desc: "Add, edit, or remove user accounts and permissions.",
          index: 1,
        },
      });
    } else if (pathname === "/dashboard" || pathname === "/admin/dashboard") {
      dispatch({
        type: "setPage",
        payload: {
          title: "Dashboard",
          desc: "Overview of system metrics and quick actions.",
          index: 0,
        },
      });
    }
  }, [pathname]);
}
