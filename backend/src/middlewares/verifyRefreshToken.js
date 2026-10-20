import jwt from "jsonwebtoken";
import { notAuthorized } from "./handleErrors.js";

export const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;
  const { TokenExpiredError } = jwt;

  if (!refreshToken) {
    return notAuthorized("Refresh token required", res);
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return notAuthorized("Refresh token expired", res);
      }

      return notAuthorized("Refresh token invalid", res);
    }

    if (payload.type !== "refresh") {
      return notAuthorized("Invalid token type", res);
    }

    req.user = payload;
    next();
  });
};
