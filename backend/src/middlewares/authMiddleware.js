import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import { Department } from "../models/Department.models.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    
    // ✅ FIX: Use ACCESS_TOKEN_SECRET (same as Department model)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log("🔍 Decoded token:", decoded);

    let user = await User.findById(decoded._id).select("-password -refreshToken");
    let role = "student";

    // If not found in User collection, check Department collection
    if (!user) {
      user = await Department.findById(decoded._id).select("-password -refreshToken");
      role = "admin";
      console.log("✅ Admin found:", user?.department);
    }

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = { ...user.toObject(), role }; // attach user/admin info with role
    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    next(new ApiError(401, "Unauthorized", [error.message]));
  }
};