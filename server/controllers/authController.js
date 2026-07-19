const User = require("../models/User");
const jwt = require("jsonwebtoken");

// =====================================
// Generate JWT Token
// =====================================
const generateToken = (id, userType) => {
  return jwt.sign(
    {
      id,
      userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// =====================================
// Register User
// =====================================
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      userType,
    } = req.body;

    // Validation
    if (!name || !email || !password || !phone || !userType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create User
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password, // Plain-text password
      phone,
      address,
      userType,
      isApproved: true,
    });

    const token = generateToken(user._id, user.userType);

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user: userData,
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
// Login User
// =====================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // Find User
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist",
      });
    }

    // Password Check (Plain Text)
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate Token
    const token = generateToken(user._id, user.userType);

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: userData,
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
// Get Logged-in User
// =====================================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};