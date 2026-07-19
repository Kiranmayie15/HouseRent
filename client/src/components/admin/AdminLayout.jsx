import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "../../styles/admin/Admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;