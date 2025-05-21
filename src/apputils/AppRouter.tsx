;

import DashboardTable from "@/app/dashboard/page";
import HomeMain from "@/pages/home/HomeMain";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function AppRouter() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/a" element={<DashboardTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
