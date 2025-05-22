import { useGetLastLoginDetails, useGetName } from "@/hooks/appHooks";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "./appUtils";

function NavBar() {
  const navigate = useNavigate();
  const { firstName, lastName } = useGetName();
  const loginDetails = useGetLastLoginDetails();

  function handleLogout() {
    localStorage.removeItem("rcilInitialLogin");
    localStorage.removeItem("rcilEmailId");
    localStorage.removeItem("rcilFN");
    localStorage.removeItem("rcilLN");
    localStorage.removeItem("rcilRole");
    localStorage.removeItem("rcilLastLoginDetails");
    navigate("/");
  }

  return (
    <nav className="bg-background border-b shadow drop-shadow py-2 px-5 h-fit    inset-0 flex items-center justify-between">
      <img alt="railtel-logo" src={"/railtel-logo1.png"} className="w-10" />
      <h3 className="text-foreground/70">
        Welcome back,{" "}
        <span className="text-foreground font-medium">
          {firstName + " " + (lastName ?? "")}
        </span>
      </h3>

      <div className="flex flex-row items-center gap-20">
        {loginDetails && <div>Last Login At : <span className="text-destructive font-semibold">{formatDateTime(loginDetails?.updatedAt)?.time}</span></div>}
        
        <AiOutlineLogout
          onClick={handleLogout}
          title="Logout"
          className="w-8 rounded-full flex items-center justify-center h-8 p-2 bg-destructive text-background cursor-pointer"
        />
      </div>
    </nav>
  );
}

export default NavBar;
