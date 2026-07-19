import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css";

const NAV_ITEMS = {
  owner: [
    { to: "/owner/dashboard",     icon: "📊", label: "Dashboard" },
    { to: "/owner/add-property",  icon: "➕", label: "Add Property" },
    { to: "/owner/my-properties", icon: "🏘️", label: "My Properties" },
    { to: "/owner/bookings",      icon: "📋", label: "Booking Requests" },
  ],
  tenant: [
    { to: "/tenant/dashboard", icon: "📊", label: "Dashboard" },
    { to: "/properties",       icon: "🔍", label: "Browse Properties" },
    { to: "/my-bookings",      icon: "📋", label: "My Bookings" },
    { to: "/profile",          icon: "👤", label: "Profile" },
  ],
  admin: [
    { to: "/admin/dashboard",   icon: "📊", label: "Dashboard" },
    { to: "/admin/users",       icon: "👥", label: "Users" },
    { to: "/admin/approvals",   icon: "✅", label: "Approvals" },
    { to: "/admin/properties",  icon: "🏠", label: "Properties" },
    { to: "/admin/bookings",    icon: "📋", label: "Bookings" },
  ],
};

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const items = NAV_ITEMS[role] || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">🏠</span> RentEase
      </div>

      {/* Section label */}
      <div className="sidebar-section-label">
        {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Menu` : "Navigation"}
      </div>

      {/* Nav Links */}
      {items.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `sidebar-link${isActive ? " active" : ""}`
          }
        >
          <span className="sidebar-link-icon">{icon}</span>
          {label}
        </NavLink>
      ))}

      {/* Logout */}
      <button className="sidebar-logout" onClick={handleLogout}>
        🚪 Log Out
      </button>
    </aside>
  );
};

export default Sidebar;