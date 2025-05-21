import { FaUsers, FaTicketAlt, FaChartBar } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { useAppContext } from "./AppContext";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const menuItems = [
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
    },
    {
      label: "Tickets",
      icon: FaTicketAlt,
      indexPath: 2,
      path: "/tickets",
      description: "View and manage support tickets and more...",
    },
    {
      label: "Reports",
      icon: FaChartBar,
      indexPath: 3,
      path: "/reports",
      description: "Generate and view system usage and performance reports.",
    }
  ];
  const { selectedPage, dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="bg-primary text-background  py-10 px-4 w-fit min-w-[15vw] flex flex-col gap-4">
      {menuItems.map(
        ({ label, path, description, indexPath, icon: Icon }) => (
          <li
            onClick={() => {
              dispatch({
                type: "setPage",
                payload: {
                  title: label,
                  desc: description,
                  index: indexPath,
                },
              });
              setTimeout(() => {
                navigate("admin"+path);
              }, 50);
            }}
            key={label}
            className={clsx(
              "list-none px-3 py-2 rounded-md flex items-center gap-3 cursor-pointer transition-all duration-200",
              selectedPage?.index === indexPath
                ? "bg-background text-primary font-semibold"
                : "hover:bg-background/90 hover:text-primary"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm">{label}</span>
          </li>
        )
      )}
    </div>
  );
}

export default Sidebar;
