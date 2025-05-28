/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppContext } from "@/apputils/AppContext";
import { lastLoginType } from "@/types/userDataTypes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaUsers, FaTicketAlt, FaChartBar } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";


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
export function useGetUserLevel() {
  const level = localStorage.getItem("rcilLevel");
  return level ? parseInt(level) : 1;
}
export function useGetLastLoginDetails() {
  const loginDetails: lastLoginType | string = localStorage.getItem(
    "rcilLastLoginDetails"
  ) as any;
  if (loginDetails !== "undefined") return JSON.parse(loginDetails as any);
  else return undefined;
}



export function useUpdatePage() {
  const { dispatch } = useAppContext();
  const { pathname } = useLocation();

  useEffect(() => {
    // Normalize pathname by removing the "/admin" prefix if present
    const normalizedPath = pathname.startsWith("/admin")
      ? pathname.slice("/admin".length)
      : pathname;

    // Find matching menu item by path (exact match)
    const matchedItem = menuItems.find(
      (item) => item.path === normalizedPath
    );

    if (matchedItem) {
      dispatch({
        type: "setPage",
        payload: {
          title: matchedItem.label,
          desc: matchedItem.description,
          index: matchedItem.indexPath,
        },
      });
    }
  }, [pathname, dispatch]);
}

export const menuItems = [
    {
      label: "Dashboard",
      icon: MdOutlineDashboard,
      indexPath: 0,
      path: "/dashboard",
      description: "Overview of system metrics and quick actions.",
    },
    {
      label: "Manage Users",
      icon: FaUsers,
      indexPath: 1,
      path: "/users",
      description: "Add, edit, or remove user accounts and permissions.",
      role: "ADMIN",
    },
    {
      label: "Tickets",
      icon: FaTicketAlt,
      indexPath: 2,
      path: "/tickets",
      description: "View and manage support tickets and more...",
      role: "EMPLOYEE",
    },
    {
      label: "Reports",
      icon: FaChartBar,
      indexPath: 3,
      path: "/reports",
      description: "Generate and view system usage and performance reports.",
      role: "ADMIN",
    },

    {
      label: "Manage Employees",
      icon: FaUserTie, 
      indexPath: 4,
      path: "/employees",
      description: "Add, edit, and manage employee records and access.",
      level:2
    },
  ];