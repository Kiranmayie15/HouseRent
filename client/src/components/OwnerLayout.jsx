import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../Styles/OwnerLayout.css";

const OwnerLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Get initials for avatar
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "O";

  const navLinks = [
    { to: "/owner/add-property",  label: "➕ Add Property" },
    { to: "/owner/my-properties", label: "🏘️ All Properties" },
    { to: "/owner/bookings",      label: "📋 All Bookings" },
  ];

  return (
    <div className="owner-layout">

      {/* Header */}
      <header className="owner-header">
        <div className="owner-logo">🏠 RentEase</div>

        <div className="owner-user">
          <div className="owner-user-info">
            <span className="owner-user-name">Hi, {user.name || "Owner"}</span>
            <span className="owner-user-role">Property Owner</span>
          </div>
          <div className="owner-avatar">{initials}</div>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="owner-nav">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Page Content */}
      <main className="owner-content">
        <Outlet />
      </main>

    </div>
  );
};

export default OwnerLayout;