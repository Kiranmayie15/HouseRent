import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <header className="dashboard-header">

        {/* Logo */}
        <div className="logo">
          RentEase
        </div>

        {/* Navigation */}
        <nav className="dashboard-nav">

          <NavLink
            to="/owner/add-property"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Add Property
          </NavLink>

          <NavLink
            to="/owner/my-properties"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            All Properties
          </NavLink>

          <NavLink
            to="/owner/bookings"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            All Bookings
          </NavLink>

        </nav>

        {/* Right Side */}
        <div className="right-section">

          <span className="welcome">
            Hi, {user.name || "Owner"}
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
      <main className="dashboard-content">
        <Outlet />
      </main>

    </div>
  );
};

export default Dashboard;