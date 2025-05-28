import { Routes, Route, useLocation } from "react-router-dom";
import HomeMain from "./features/home/HomeMain";
import Protected from "./apputils/Protected";
import ManageUserMain from "./features/admin/manageusers/ManageUserMain";
import DashboardMain from "./features/admin/dashboard/DashboardMain";
import TicketsMain from "./features/tickets/TicketsMain";
import { useUpdatePage } from "./hooks/appHooks";
import ManageEmployeeMain from "./features/manageemployees/ManageEmployeeMain";

function AppRoutes() {
  const location = useLocation();
  useUpdatePage();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" index element={<HomeMain />} />
      <Route element={<Protected />}>
        <Route path="/admin/dashboard" element={<DashboardMain />} />
        <Route path="/admin/users" element={<ManageUserMain />} />
        <Route path="/admin/reports" element={<TicketsMain />} />
        <Route path="/admin/employees" element={<ManageEmployeeMain />} />


        <Route path="/dashboard" element={<DashboardMain />} />
        <Route path="/tickets" element={<TicketsMain />} />
        <Route path="/employees" element={<ManageEmployeeMain />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
