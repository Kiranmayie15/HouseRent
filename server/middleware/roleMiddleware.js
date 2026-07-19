const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      // Check if user exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. Please login first.",
        });
      }

      // Check role
      if (!roles.includes(req.user.userType)) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You are not authorized to access this resource.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

module.exports = authorize;