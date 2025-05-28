
import { useAppContext } from "./AppContext";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { menuItems, useGetrole, useGetUserLevel } from "@/hooks/appHooks";

function Sidebar() {
  const myRole = useGetrole();
  const userLevel = useGetUserLevel()

  
  const { selectedPage, dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="bg-primary text-background  py-10 px-4 w-fit min-w-[15vw] flex flex-col gap-4">
      {menuItems?.map(
        ({ label, role, path, description, indexPath,level, icon: Icon }) => {
          if ((!role || role === myRole) && (!level || level === userLevel)) {
            return (
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
                    navigate(myRole === "ADMIN" ? "/admin" + path : path);
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
            );
          }
        }
      )}
    </div>
  );
}

export default Sidebar;
