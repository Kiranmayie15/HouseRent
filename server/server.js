require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ===========================
// Connect MongoDB
// ===========================
connectDB();

// ===========================
// Middlewares
// ===========================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ===========================
// API Routes
// ===========================
app.use("/api/auth", authRoutes);

app.use("/api/properties", propertyRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/admin", adminRoutes);

// ===========================
// Default Route
// ===========================
app.get("/", (req, res) => {
  res.send("House Rent Management API Running...");
});

// ===========================
// 404 Route
// ===========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===========================
// Start Server
// ===========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});