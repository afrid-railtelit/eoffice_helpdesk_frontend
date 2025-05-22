import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "@/apputils/Sidebar";
import PageTitle from "./PageTitle";
import NavBar from "./NavBar";
import { useEffect } from "react";

function Protected() {
  const loggedIn = localStorage.getItem("rcilEmailId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full h-full  flex flex-col">
      <NavBar />
      <div className="flex  h-full">
        <Sidebar />
        <div className="w-full  flex flex-col  border m-2 rounded p-3 ">
          <PageTitle />

          <div className="  pt-6 h-[80vh]  ">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Protected;
