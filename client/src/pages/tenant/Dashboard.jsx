import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../../styles/TenantDashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="tenant-dashboard">

      {/* Header */}
      <header className="tenant-header">

        <div className="tenant-logo">
          RentEase
        </div>

        <nav className="tenant-nav">

          <NavLink
            to="/tenant/dashboard"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tenant/properties"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Properties
          </NavLink>

          <NavLink
            to="/tenant/my-bookings"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            My Bookings
          </NavLink>

        </nav>

        <div className="tenant-right">

          <span>
            Hi, {user.name || "Tenant"}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* Page Content */}
      <div className="tenant-content">
        <Outlet />
      </div>

    </div>
  );
};

export default Dashboard;