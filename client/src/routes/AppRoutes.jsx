import { Routes, Route, Navigate } from "react-router-dom";

// ====================
// Common Pages
// ====================
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

// ====================
// Owner Pages
// ====================
import OwnerDashboard from "../pages/owner/Dashboard";
import AddProperty from "../pages/owner/AddProperty";
import MyProperties from "../pages/owner/MyProperties";
import EditProperty from "../pages/owner/EditProperty";
import BookingRequests from "../pages/owner/BookingRequests";

// ====================
// Tenant Pages
// ====================
import TenantDashboard from "../pages/tenant/Dashboard";
import Properties from "../pages/tenant/Properties";
import PropertyDetails from "../pages/tenant/PropertyDetails";
import Booking from "../pages/tenant/Booking";
import MyBookings from "../pages/tenant/MyBookings";

// ====================
// Admin Pages
// ====================
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import AdminProperties from "../pages/admin/Properties";
import Bookings from "../pages/admin/Bookings";
import Approvals from "../pages/admin/Approvals";
import Profile from "../pages/admin/Profile";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= Public Routes ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= Owner Routes ================= */}
      <Route path="/owner" element={<OwnerDashboard />}>
        <Route index element={<Navigate to="add-property" replace />} />
        <Route path="dashboard" element={<Navigate to="/owner/add-property" replace />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="my-properties" element={<MyProperties />} />
        <Route path="edit-property/:id" element={<EditProperty />} />
        <Route path="bookings" element={<BookingRequests />} />
      </Route>

      {/* ================= Tenant Routes ================= */}
      <Route path="/tenant" element={<TenantDashboard />}>
        <Route index element={<Navigate to="properties" replace />} />
        <Route path="dashboard" element={<Properties />} />
        <Route path="properties" element={<Properties />} />
        <Route path="property/:id" element={<PropertyDetails />} />
        <Route path="booking" element={<Booking />} />
        <Route path="my-bookings" element={<MyBookings />} />
      </Route>

      {/* ================= Admin Routes ================= */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/properties" element={<AdminProperties />} />
      <Route path="/admin/bookings" element={<Bookings />} />
      <Route path="/admin/approvals" element={<Approvals />} />
      <Route path="/admin/profile" element={<Profile />} />

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;