import { ApiError } from "../utils/ApiError.js";

// Accepts an array of allowed roles
export const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden: Access denied"));
    }

    next();
  };
};
