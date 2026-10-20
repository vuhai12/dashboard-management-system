import { notAuthorized } from "./handleErrors.js";

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return notAuthorized("Unauthorized", res);
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Require role Admin",
    });
  }

  next();
};
