const jwt = require("jsonwebtoken");
const { UserModel: userModel } = require("../models/user.model");

exports.protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

    token = req.headers.authorization.split(" ")[1]; // Get token after "Bearer "
    console.log("Token:", token);
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized to access this route" });
  }

  try {
    // 2. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // 3. Find user by ID from token and attach to the request object
    req.user = await userModel.findById(decoded.userId);
    console.log(req.user);
    // Move to the next function
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};