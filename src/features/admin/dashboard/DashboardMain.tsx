import { useAppContext } from "@/apputils/AppContext";
import { useNavigate } from "react-router-dom";

function DashboardMain() {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  return (
    <div className="p-6 bg-gray-100">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-sm font-semibold">Welcome, Shaik afrid</h1>
        <p className="text-gray-600">Role: Helpdesk Administrator</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className=" text-gray-500">Open Tickets</p>
          <p className="text-sm font-bold">24</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className=" text-gray-500">Tickets Resolved Today</p>
          <p className="text-sm font-bold">18</p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div
          onClick={() => {
            navigate("/admin/users");
            dispatch({
              type: "setPage",
              payload: {
                title: "Manage Users",
                desc: "Add, edit, or remove user accounts and permissions.",
                index: 1,
              },
            });
          }}
          className="bg-white p-6 rounded shadow hover:bg-blue-50 cursor-pointer"
        >
          <h2 className="text-sm font-semibold">User Administration</h2>
          <p className=" text-gray-600">Manage user accounts and roles.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:bg-blue-50 cursor-pointer">
          <h2 className="text-sm font-semibold">Ticket Management</h2>
          <p className=" text-gray-600">View and manage support tickets.</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-sm font-semibold mb-4">Recent Activity</h2>
        <ul className=" text-gray-700">
          <li>Ticket #1234 assigned to John Doe.</li>
          <li>User Jane Smith added to the system.</li>
          <li>System maintenance scheduled for 10 PM.</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardMain;
