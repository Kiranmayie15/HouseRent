import { NavLink, useNavigate } from "react-router-dom";

import {
  Dashboard,
  People,
  Apartment,
  BookOnline,
  VerifiedUser,
  Person,
  Logout,
} from "@mui/icons-material";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 20px",
          borderBottom: "1px solid #334155",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          HouseRent Admin
        </h4>

        <button
          onClick={logoutHandler}
          style={{
            border: "none",
            background: "#dc3545",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Logout fontSize="small" />
          Logout
        </button>
      </div>

      {/* Menu */}
      <div
        style={{
          padding: "20px 15px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <NavLink
          to="/admin/dashboard"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <Dashboard />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <People />
          Users
        </NavLink>

        <NavLink
          to="/admin/properties"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <Apartment />
          Properties
        </NavLink>

        <NavLink
          to="/admin/bookings"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <BookOnline />
          Bookings
        </NavLink>

        <NavLink
          to="/admin/approvals"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <VerifiedUser />
          Owner Approvals
        </NavLink>

        <NavLink
          to="/admin/profile"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <Person />
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;