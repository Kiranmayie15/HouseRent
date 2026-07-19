import { useNavigate } from "react-router-dom";
import "../Styles/Topbar.css";

const Topbar = ({ role }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-greeting">
          👋 Hello, {user.name || role || "User"}
        </span>
        <span className="topbar-role">{role} Dashboard</span>
      </div>

      <div className="topbar-right">
        {/* Notification Bell */}
        <button className="topbar-bell" aria-label="Notifications">
          🔔
          <span className="topbar-bell-dot" />
        </button>

        {/* Logout */}
        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;