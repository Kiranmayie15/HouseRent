const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");

// =======================
// Create Booking
// =======================
router.post("/", protect, createBooking);

// =======================
// Logged-in Tenant Bookings
// =======================
router.get("/my-bookings", protect, getMyBookings);

// =======================
// Get All Bookings
// =======================
router.get("/", protect, getBookings);

// =======================
// Get Single Booking
// =======================
router.get("/:id", protect, getBookingById);

// =======================
// Update Booking Status
// =======================
router.put("/:id", protect, updateBookingStatus);

// =======================
// Delete Booking
// =======================
router.delete("/:id", protect, deleteBooking);

module.exports = router;