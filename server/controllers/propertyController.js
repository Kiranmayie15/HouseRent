const Property = require("../models/Property");

// ======================
// Add Property
// ======================
const addProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      rentAmount,
      propertyType,
      adType,
      bedrooms,
      bathrooms,
      furnishingStatus,
      amenities,
      status,
    } = req.body;

    // Store Uploaded Images
    const images = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push(
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );
      });
    }

    const property = await Property.create({
      owner: req.user._id,
      title,
      description,
      location,
      rentAmount,
      propertyType,
      adType,
      bedrooms,
      bathrooms,
      furnishingStatus,
      amenities: amenities
        ? Array.isArray(amenities)
          ? amenities
          : [amenities]
        : [],
      images,
      status: status || "Available",
    });

    res.status(201).json({
      success: true,
      message: "Property Added Successfully",
      property,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get All Properties
// ======================
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email phone");

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get Logged In Owner Properties
// ======================
const getMyProperties = async (req, res) => {
  try {

    const properties = await Property.find({
      owner: req.user._id,
    }).populate("owner", "name email phone");

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get Property By ID
// ======================
const getPropertyById = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id)
      .populate("owner", "name email phone");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Update Property
// ======================
const updateProperty = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    let images = property.images;

    if (req.files && req.files.length > 0) {
      images = [];

      req.files.forEach((file) => {
        images.push(
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("owner", "name email phone");

    res.status(200).json({
      success: true,
      message: "Property Updated Successfully",
      property: updatedProperty,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Delete Property
// ======================
const deleteProperty = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProperty,
  getProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};