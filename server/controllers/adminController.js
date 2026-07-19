const User = require("../models/User");
const Property = require("../models/Property");
const Booking = require("../models/Booking");

// =====================================
// Admin Dashboard
// =====================================
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOwners = await User.countDocuments({ userType: "Owner" });
    const totalTenants = await User.countDocuments({ userType: "Tenant" });
    const totalProperties = await Property.countDocuments();
    const totalBookings = await Booking.countDocuments();

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalOwners,
        totalTenants,
        totalProperties,
        totalBookings,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get All Users
// =====================================
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get All Properties
// =====================================
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get All Bookings
// =====================================
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tenant", "name email")
      .populate("owner", "name email")
      .populate("property", "title location rentAmount")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete User
// =====================================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Property
// =====================================
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Booking
// =====================================
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Pending Owners
// =====================================
const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({
      userType: "Owner",
      isApproved: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Approve Owner
// =====================================
const approveOwner = async (req, res) => {
  try {
    const owner = await User.findById(req.params.id);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    owner.isApproved = true;

    await owner.save();

    res.status(200).json({
      success: true,
      message: "Owner approved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Reject Owner
// =====================================
const rejectOwner = async (req, res) => {
  try {
    const owner = await User.findById(req.params.id);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    await owner.deleteOne();

    res.status(200).json({
      success: true,
      message: "Owner rejected successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Export
// =====================================
module.exports = {
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
};