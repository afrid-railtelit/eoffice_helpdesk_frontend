import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("rcilInitialLogin");
    localStorage.removeItem("rcilEmailId");
    navigate("/");
  }

  return (
    <nav className="bg-background border-b shadow drop-shadow py-2 px-5 h-fit    inset-0 flex items-center justify-between">
      <img alt="railtel-logo" src={"/railtel-logo1.png"} className="w-10" />
      <h3 className="text-foreground">
        Welcome back👋 <span className="text-foreground text-lg">Shaik</span>
      </h3>

      <AiOutlineLogout
        onClick={handleLogout}
        title="Logout"
        className="w-8 rounded-full flex items-center justify-center h-8 p-2 bg-destructive text-background cursor-pointer"
      />
    </nav>
  );
}

export default NavBar;
