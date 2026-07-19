const express = require("express");
const router = express.Router();

const {
  addProperty,
  getProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ==========================================
// Public Routes
// ==========================================

// Get all approved properties
router.get("/", getProperties);

// Get property by ID
router.get("/:id", getPropertyById);

// ==========================================
// Owner Routes
// ==========================================

// Add Property
router.post(
  "/",
  protect,
  authorize("Owner"),
  addProperty
);

// Get Logged In Owner Properties
router.get(
  "/owner/my-properties",
  protect,
  authorize("Owner"),
  getMyProperties
);

// Update Property
router.put(
  "/:id",
  protect,
  authorize("Owner"),
  updateProperty
);

// Delete Property
router.delete(
  "/:id",
  protect,
  authorize("Owner"),
  deleteProperty
);

module.exports = router;