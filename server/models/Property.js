const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    rentAmount: {
      type: Number,
      required: [true, "Rent amount is required"],
      min: 0,
    },

    propertyType: {
      type: String,
      enum: [
        "Apartment",
        "Villa",
        "House",
        "Studio",
        "Farm House",
        "Penthouse",
        "Duplex",
        "Land",
        "Commercial",
        "Hostel",
      ],
      required: true,
    },

    bedrooms: {
      type: Number,
      default: 0,
      min: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
      min: 0,
    },

    furnishingStatus: {
      type: String,
      enum: [
        "Fully Furnished",
        "Semi Furnished",
        "Unfurnished",
        "Not Applicable",
      ],
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Available", "Booked", "Unavailable"],
      default: "Available",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);