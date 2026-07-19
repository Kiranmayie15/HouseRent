const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getUsers,
  getProperties,
  getBookings,
  deleteUser,
  deleteProperty,
  deleteBooking,
  getPendingUsers,
  approveOwner,
  rejectOwner,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ===================================
// Dashboard
// ===================================
router.get(
  "/dashboard",
  protect,
  authorize("Admin"),
  getDashboard
);

// ===================================
// Users
// ===================================
router.get(
  "/users",
  protect,
  authorize("Admin"),
  getUsers
);

// ===================================
// Properties
// ===================================
router.get(
  "/properties",
  protect,
  authorize("Admin"),
  getProperties
);

// ===================================
// Bookings
// ===================================
router.get(
  "/bookings",
  protect,
  authorize("Admin"),
  getBookings
);

// ===================================
// Owner Approval Routes
// ===================================

// Get Pending Owners
router.get(
  "/pending-users",
  protect,
  authorize("Admin"),
  getPendingUsers
);

// Approve Owner
router.put(
  "/approve/:id",
  protect,
  authorize("Admin"),
  approveOwner
);

// Reject Owner
router.put(
  "/reject/:id",
  protect,
  authorize("Admin"),
  rejectOwner
);

// ===================================
// Delete User
// ===================================
router.delete(
  "/user/:id",
  protect,
  authorize("Admin"),
  deleteUser
);

// ===================================
// Delete Property
// ===================================
router.delete(
  "/property/:id",
  protect,
  authorize("Admin"),
  deleteProperty
);

// ===================================
// Delete Booking
// ===================================
router.delete(
  "/booking/:id",
  protect,
  authorize("Admin"),
  deleteBooking
);

module.exports = router;