import Footer from "@/apputils/Footer";
import LoginMain from "./auth/LoginMain";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/apputils/AppContext";

function HomeMain() {
  const loggedIn = localStorage.getItem("rcilEmailId");
  const role = localStorage.getItem("rcilRole");
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  useEffect(() => {
    if (loggedIn) {
      dispatch({
        type: "setPage",
        payload: {
          title: "Dashboard",
          desc: "Overview of system metrics and quick actions.",
          index: 0,
        },
      });
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col-reverse gap-5 lg:flex-row ">
        <LoginMain />
        <img
          alt="banner"
          src={"home_banner.png"}
          className="h-[30vh]    lg:w-[80vw] lg:h-[100vh]"
        />
      </div>
      <Footer />
    </div>
  );
}

export default HomeMain;
