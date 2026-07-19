const Booking = require("../models/Booking");
const Property = require("../models/Property");

// ======================================
// Create Booking
// ======================================
const createBooking = async (req, res) => {
  try {
    const {
      property,
      owner,
      moveInDate,
      duration,
      totalAmount,
      message,
    } = req.body;

    const propertyExists = await Property.findById(property);

    if (!propertyExists) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (propertyExists.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Property is not available",
      });
    }

    const booking = await Booking.create({
      property,
      tenant: req.user._id,
      owner,
      moveInDate,
      duration,
      totalAmount,
      message,
    });

    const result = await Booking.findById(booking._id)
      .populate("tenant", "name email phone")
      .populate("owner", "name email phone")
      .populate("property", "title location rentAmount");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Bookings
// ======================================
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tenant", "name email phone")
      .populate("owner", "name email phone")
      .populate("property", "title location rentAmount images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get My Bookings
// ======================================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      tenant: req.user._id,
    })
      .populate("property", "title location rentAmount images")
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Booking By ID
// ======================================
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("tenant", "name email phone")
      .populate("owner", "name email phone")
      .populate("property", "title location rentAmount images");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Booking Status
// ======================================
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.bookingStatus = bookingStatus;

    await booking.save();

    if (bookingStatus === "Approved") {
      await Property.findByIdAndUpdate(booking.property, {
        status: "Booked",
      });
    }

    if (
      bookingStatus === "Rejected" ||
      bookingStatus === "Cancelled"
    ) {
      await Property.findByIdAndUpdate(booking.property, {
        status: "Available",
      });
    }

    const updated = await Booking.findById(booking._id)
      .populate("tenant", "name")
      .populate("owner", "name")
      .populate("property", "title");

    res.status(200).json({
      success: true,
      message: "Booking Updated",
      booking: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Booking
// ======================================
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus === "Approved") {
      await Property.findByIdAndUpdate(booking.property, {
        status: "Available",
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};