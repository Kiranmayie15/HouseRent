import React from "react";

import {
  Notifications,
  AccountCircle,
} from "@mui/icons-material";

import "../../styles/admin/Navbar.css";

const AdminNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="admin-navbar">

      <h3>
        Admin Panel
      </h3>

      <div className="navbar-right">

        <Notifications className="icon" />

        <div className="profile">

          <AccountCircle />

          <span>
            {user?.name || "Admin"}
          </span>

        </div>

      </div>

    </div>
  );
};

export default AdminNavbar;